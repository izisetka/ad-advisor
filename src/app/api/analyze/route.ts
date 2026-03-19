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

    const hasAIKey =
      process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;

    if (hasAIKey) {
      try {
        const site = await scrapeSite(url);
        const analysis = await analyzeWithAI(site);
        const report = {
          id,
          url,
          createdAt: new Date().toISOString(),
          ...analysis,
        };
        await saveReport(report);
        return NextResponse.json({ id, report });
      } catch (error) {
        console.error("AI analysis failed, falling back to mock:", error);
        const report = generateMockData(url, id);
        await saveReport(report);
        return NextResponse.json({ id, report });
      }
    }

    const report = generateMockData(url, id);
    await saveReport(report);
    return NextResponse.json({ id, report });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
