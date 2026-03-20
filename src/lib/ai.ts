/**
 * ИИ-анализ бизнеса и генерация маркетинговой стратегии
 * Поддержка: Claude (Anthropic) и GPT (OpenAI)
 */

import { MarketingReport } from "./types";
import { ScrapedSite } from "./scraper";

const SYSTEM_PROMPT = `Ты — опытный маркетолог для малого бизнеса в России. Тебе дают сайт клиента. Ты должен разобраться в его бизнесе, понять на чём он зарабатывает, и дать СТРАТЕГИЮ: куда тратить рекламный бюджет, какие каналы использовать, что делать первым. Не просто список ключевиков — а объяснение ПОЧЕМУ и конкретный план действий на месяц.

Тебе нужно:
1. Понять бизнес: что продают, кому, с какой маржой. Найти самую прибыльную услугу.
2. Оценить рынок: уровень спроса, сколько конкурентов, что они делают.
3. Дать стратегию: на чём фокусироваться и ПОЧЕМУ, на что НЕ тратить деньги и ПОЧЕМУ.
4. Рекомендовать каналы по приоритету (Яндекс.Директ, Яндекс.Карты, VK, Авито, 2ГИС) с бюджетом и конкретными шагами.
5. Составить план на 4 недели с задачами.
6. Написать готовые тексты объявлений для разных каналов.
7. Подобрать приоритетные ключевики и минус-слова.
8. Дать прогноз бюджета и ROI.

Пиши как опытный маркетолог, объясняй ПОЧЕМУ — это главная ценность.
Все тексты на русском языке. Бюджеты в рублях.

Верни JSON строго по формату (без markdown, без комментариев):
{
  "business": {
    "name": "Название бизнеса",
    "description": "Описание",
    "niche": "ниша",
    "city": "город",
    "services": [{"name": "услуга", "estimatedMargin": "высокая (60-70%)"}],
    "strengths": ["сильная сторона"],
    "weaknesses": ["слабая сторона"],
    "targetAudience": "описание ЦА"
  },
  "market": {
    "demandLevel": "высокий/средний/низкий",
    "competitorCount": "описание количества",
    "competitorInsights": "что делают конкуренты и какие ошибки допускают",
    "opportunities": ["возможность"]
  },
  "strategy": {
    "summary": "1 абзац: что делать и почему",
    "focusOn": "на чём фокусироваться и ПОЧЕМУ",
    "avoidWasting": "на что НЕ тратить деньги и ПОЧЕМУ",
    "channels": [
      {
        "name": "Яндекс.Директ",
        "priority": 1,
        "why": "почему этот канал",
        "budget": "сколько тратить",
        "expectedResult": "ожидаемый результат",
        "actionItems": ["конкретное действие"]
      }
    ],
    "monthlyPlan": [
      {"week": 1, "title": "Название недели", "tasks": ["задача"]}
    ]
  },
  "materials": {
    "adTexts": [
      {"channel": "Яндекс.Директ", "title": "заголовок", "description": "описание", "targetAudience": "для кого"}
    ],
    "keywords": ["ключевик"],
    "negativeKeywords": ["минус-слово"]
  },
  "budget": {
    "recommended": "15 000 — 25 000₽/мес",
    "expectedClients": "~10-20 новых клиентов",
    "roi": "при среднем чеке 2500₽ — окупается за 2 недели"
  }
}

Рекомендуй 3-5 каналов, 4 недели плана, 3-5 текстов объявлений, 8-12 ключевиков, 12+ минус-слов.`;

/**
 * Анализирует сайт и генерирует маркетинговую стратегию
 */
export async function analyzeWithAI(
  site: ScrapedSite
): Promise<Omit<MarketingReport, "id" | "url" | "createdAt">> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  const userMessage = `Проанализируй этот сайт и составь маркетинговую стратегию для малого бизнеса.

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
      max_tokens: 8192,
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
