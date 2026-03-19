import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { saveReport } from "@/lib/store";
import { generateMockData } from "@/lib/mock-data";
import { scrapeSite } from "@/lib/scraper";
import { analyzeWithAI } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL обязателен" }, { status: 400 });
    }

    const id = uuidv4();

    // Проверяем наличие API ключей
    const hasAIKey =
      process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (hasAIKey) {
      try {
        // 1. Скрейпим сайт
        const site = await scrapeSite(url);

        // 2. ИИ анализ
        const analysis = await analyzeWithAI(site);

        // 3. Собираем отчёт
        const report = {
          id,
          url,
          createdAt: new Date().toISOString(),
          ...analysis,
        };

        saveReport(report);
        return NextResponse.json({ id, report });
      } catch (error) {
        console.error("AI analysis failed, falling back to mock:", error);
        // Fallback на моки
        const report = generateMockData(url, id);
        saveReport(report);
        return NextResponse.json({ id, report });
      }
    }

    // Нет API ключей — моки
    const report = generateMockData(url, id);
    saveReport(report);
    return NextResponse.json({ id, report });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
