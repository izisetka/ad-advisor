/**
 * Скрейпер сайтов через Firecrawl API
 * Fallback: простой fetch + cheerio если нет ключа
 */

export interface ScrapedSite {
  url: string;
  title: string;
  description: string;
  content: string; // markdown
  statusCode: number;
}

/**
 * Скрейпит сайт через Firecrawl API
 */
export async function scrapeSite(url: string): Promise<ScrapedSite> {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  const firecrawlKey = process.env.FIRECRAWL_API_KEY;

  if (firecrawlKey) {
    return scrapeWithFirecrawl(normalizedUrl, firecrawlKey);
  }

  // Fallback: простой fetch
  return scrapeWithFetch(normalizedUrl);
}

async function scrapeWithFirecrawl(
  url: string,
  apiKey: string
): Promise<ScrapedSite> {
  const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
    }),
  });

  if (!response.ok) {
    throw new Error(`Firecrawl error: ${response.status}`);
  }

  const data = await response.json();

  return {
    url,
    title: data.data?.metadata?.title || "",
    description: data.data?.metadata?.description || "",
    content: data.data?.markdown || "",
    statusCode: data.data?.metadata?.statusCode || 200,
  };
}

async function scrapeWithFetch(url: string): Promise<ScrapedSite> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; KlivvoBot/1.0; +https://klivvo.ru)",
    },
    signal: AbortSignal.timeout(10000),
  });

  const html = await response.text();

  // Извлекаем title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";

  // Извлекаем meta description
  const descMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
  );
  const description = descMatch ? descMatch[1].trim() : "";

  // Грубое извлечение текста (убираем теги)
  const content = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 15000);

  return {
    url,
    title,
    description,
    content,
    statusCode: response.status,
  };
}
