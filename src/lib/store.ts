import { AdReport } from "./types";

const reports = new Map<string, AdReport>();

export function saveReport(report: AdReport): void {
  reports.set(report.id, report);
}

export function getReport(id: string): AdReport | undefined {
  return reports.get(id);
}
