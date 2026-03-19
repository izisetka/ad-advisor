import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { saveReport } from "@/lib/store";
import { generateMockData } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL обязателен" }, { status: 400 });
    }

    const id = uuidv4();
    const report = generateMockData(url, id);
    saveReport(report);
    return NextResponse.json({ id, report });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
