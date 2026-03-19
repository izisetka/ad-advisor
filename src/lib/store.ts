import { AdReport } from "./types";
import { supabase } from "./supabase";

// In-memory fallback (когда Supabase не настроен)
const memoryStore = new Map<string, AdReport>();

/**
 * Сохраняет отчёт в Supabase или в память
 */
export async function saveReport(report: AdReport): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from("reports").insert({
      id: report.id,
      url: report.url,
      created_at: report.createdAt,
      data: report, // весь отчёт как JSONB
    });
    if (error) {
      console.error("Supabase save error:", error);
      // Fallback на память
      memoryStore.set(report.id, report);
    }
  } else {
    memoryStore.set(report.id, report);
  }
}

/**
 * Получает отчёт из Supabase или из памяти
 */
export async function getReport(
  id: string
): Promise<AdReport | undefined> {
  if (supabase) {
    const { data, error } = await supabase
      .from("reports")
      .select("data")
      .eq("id", id)
      .single();

    if (error || !data) {
      // Попробуем из памяти
      return memoryStore.get(id);
    }
    return data.data as AdReport;
  }

  return memoryStore.get(id);
}
