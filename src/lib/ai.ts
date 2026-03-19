/**
 * ИИ-анализ бизнеса и генерация рекламной стратегии
 * Поддержка: Claude (Anthropic) и GPT (OpenAI)
 */

import { AdReport } from "./types";
import { ScrapedSite } from "./scraper";

const SYSTEM_PROMPT = `Ты — эксперт по контекстной рекламе в Яндекс.Директе для малого бизнеса в России.

Тебе дают содержимое сайта. Ты должен:
1. Определить что это за бизнес (название, ниша, город, услуги, цены)
2. Подобрать ключевые слова для рекламы в Директе (3 группы: горячие, тёплые, широкие)
3. Написать готовые тексты объявлений (заголовок ≤56 символов, описание ≤81 символ)
4. Составить список минус-слов
5. Рассчитать примерный бюджет (3 уровня)
6. Описать конкурентную среду
7. Дать стратегию

Все тексты на русском языке. CPC указывай в рублях, приблизительно для данной ниши и города.
Ключевые слова должны быть реалистичными — как реальные люди ищут в Яндексе.

Верни JSON строго по формату (без markdown, без комментариев):
{
  "business": {
    "name": "Название бизнеса",
    "description": "Краткое описание",
    "niche": "ниша (пекарня, салон красоты и т.д.)",
    "city": "город",
    "services": ["услуга1", "услуга2"],
    "priceRange": "от X₽"
  },
  "keywords": {
    "hot": {
      "label": "Горячие — ищут прямо сейчас",
      "keywords": [
        {"text": "ключевик", "volume": "~1000/мес", "cpc": "~35₽", "competition": "средняя"}
      ]
    },
    "warm": {
      "label": "Тёплые — выбирают",
      "keywords": [...]
    },
    "broad": {
      "label": "Широкие — дешёвый охват",
      "keywords": [...]
    }
  },
  "negativeKeywords": ["рецепт", "обучение", "вакансия"],
  "ads": [
    {
      "title": "Заголовок до 56 символов",
      "description": "Описание до 81 символа",
      "targetKeywords": ["ключевик1", "ключевик2"]
    }
  ],
  "budget": {
    "minimum": {"amount": "10 000₽/мес", "clicks": "~60", "clients": "~3-5"},
    "optimal": {"amount": "25 000₽/мес", "clicks": "~170", "clients": "~8-15"},
    "aggressive": {"amount": "50 000₽/мес", "clicks": "~380", "clients": "~20-30"}
  },
  "competitors": "Текстовый анализ конкурентной среды...",
  "strategy": "Рекомендуемая стратегия..."
}

Подбери минимум 5 горячих, 4 тёплых, 3 широких ключевика.
Напиши минимум 4 объявления.
Минус-слов минимум 15.`;

/**
 * Анализирует сайт и генерирует рекламный план
 */
export async function analyzeWithAI(
  site: ScrapedSite
): Promise<Omit<AdReport, "id" | "url" | "createdAt">> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const userMessage = `Проанализируй этот сайт и составь план рекламы для Яндекс.Директа.

URL: ${site.url}
Заголовок: ${site.title}
Описание: ${site.description}

Содержимое сайта:
${site.content.slice(0, 12000)}`;

  let result: string;

  if (anthropicKey) {
    result = await callClaude(anthropicKey, userMessage);
  } else if (openaiKey) {
    result = await callOpenAI(openaiKey, userMessage);
  } else {
    throw new Error("NO_API_KEY");
  }

  // Парсим JSON
  const parsed = JSON.parse(result);
  return parsed;
}

async function callClaude(
  apiKey: string,
  userMessage: string
): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  const text = data.content[0]?.text || "";

  // Извлекаем JSON из ответа (на случай если обёрнут в markdown)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON in Claude response");
  return jsonMatch[0];
}

async function callOpenAI(
  apiKey: string,
  userMessage: string
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
