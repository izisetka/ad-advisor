"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Plus,
  ArrowUpRight,
  Clock,
  FileText,
  Zap,
  RefreshCw,
  Download,
  MessageCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const mockReports = [
  {
    id: "1",
    business: "Пекарня «Хлебница»",
    date: "18 марта 2026",
    status: "ready" as const,
  },
  {
    id: "2",
    business: "Салон красоты LuxNails",
    date: "15 марта 2026",
    status: "ready" as const,
  },
  {
    id: "3",
    business: "Доставка еды «ЕдаВезде»",
    date: "20 марта 2026",
    status: "processing" as const,
  },
];

const mockAlerts = [
  {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    text: "Ставка по «торт уфа» выросла с 35\u20BD до 52\u20BD",
  },
  {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    text: "Новый конкурент появился по запросу «пекарня уфа»",
  },
  {
    icon: BarChart3,
    color: "text-[#005bbf]",
    bg: "bg-[#005bbf]/5",
    text: "Ваш ежемесячный отчёт готов",
  },
];

export default function DashboardPage() {
  const userName = "Алексей";

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191c23]">
      <Navbar currentPage="/dashboard" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-headline font-extrabold text-3xl md:text-4xl mb-2">
            Добрый день, {userName}
          </h1>
          <p className="text-[#414754]">
            Вот что происходит с вашей рекламой
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Current plan card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-6"
          >
            <p className="text-sm text-[#414754] mb-1">Текущий план</p>
            <h3 className="font-headline font-bold text-xl text-[#191c23] mb-1">
              Старт
            </h3>
            <p className="text-2xl font-headline font-extrabold text-[#005bbf] mb-4">
              1 900 &#8381;
              <span className="text-sm font-normal text-[#414754] ml-1">
                / мес
              </span>
            </p>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#005bbf] hover:underline"
            >
              Улучшить план <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-6"
          >
            <p className="text-sm text-[#414754] mb-1">Отчёты</p>
            <p className="text-3xl font-headline font-extrabold text-[#191c23] mb-1">
              3
            </p>
            <p className="text-sm text-[#414754]">
              2 готовы, 1 в процессе
            </p>
          </motion.div>

          {/* New analysis CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-sm text-[#414754] mb-1">Новый анализ</p>
              <p className="text-sm text-[#414754]">
                Проанализируйте ещё один сайт
              </p>
            </div>
            <Link
              href="/analyze"
              className="mt-4 inline-flex items-center justify-center gap-2 h-11 rounded-xl text-white font-headline font-bold text-sm transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
            >
              <Plus className="w-4 h-4" />
              Новый анализ
            </Link>
          </motion.div>
        </div>

        {/* Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10"
        >
          <h2 className="font-headline font-bold text-xl mb-4">Мои отчёты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#005bbf]/5 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#005bbf]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-headline font-bold text-sm text-[#191c23] truncate">
                      {report.business}
                    </h3>
                    <p className="text-xs text-[#414754] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {report.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                      report.status === "ready"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {report.status === "ready" ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Готов
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" /> В процессе
                      </>
                    )}
                  </span>

                  {report.status === "ready" && (
                    <Link
                      href={`/report/${report.id}`}
                      className="text-sm font-semibold text-[#005bbf] hover:underline flex items-center gap-1"
                    >
                      Открыть <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="font-headline font-bold text-xl mb-4">Алерты</h2>
          <div className="space-y-3">
            {mockAlerts.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
                className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-5 flex items-center gap-4"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${alert.bg} flex items-center justify-center shrink-0`}
                >
                  <alert.icon className={`w-5 h-5 ${alert.color}`} />
                </div>
                <p className="text-sm text-[#191c23]">{alert.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <h2 className="font-headline font-bold text-xl mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Новый анализ", icon: Plus, href: "/analyze", color: "bg-[#005bbf]" },
              { label: "Обновить отчёт", icon: RefreshCw, href: "#", color: "bg-[#006875]" },
              { label: "Скачать PDF", icon: Download, href: "#", color: "bg-[#006d36]" },
              { label: "Поддержка", icon: MessageCircle, href: "/contacts", color: "bg-amber-500" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-5 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-semibold text-[#191c23] text-center">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* CPC Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10"
        >
          <h2 className="font-headline font-bold text-xl mb-4">Стоимость клика за 30 дней</h2>
          <div className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-6">
            <div className="flex items-end justify-between gap-1 h-40">
              {[35, 38, 42, 37, 45, 52, 48, 44, 40, 38, 36, 42, 47, 50, 46, 43, 39, 41, 44, 48, 52, 49, 45, 42, 38, 35, 37, 40, 43, 41].map((val, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${(val / 52) * 100}%`,
                    background: val > 45 ? "linear-gradient(to top, #ef4444, #f87171)" : "linear-gradient(to top, #005bbf, #1a73e8)",
                  }}
                  title={`День ${i + 1}: ${val}₽`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-[#414754]">
              <span>1 мар</span>
              <span>15 мар</span>
              <span>30 мар</span>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-[#414754]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(to top, #005bbf, #1a73e8)" }} />
                Норма
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(to top, #ef4444, #f87171)" }} />
                Выше среднего
              </span>
            </div>
          </div>
        </motion.div>

        {/* Top Keywords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 mb-10"
        >
          <h2 className="font-headline font-bold text-xl mb-4">Ваши ключевики</h2>
          <div className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e6e8f2]">
                    <th className="text-left text-xs font-semibold text-[#414754] px-6 py-4">Ключевое слово</th>
                    <th className="text-right text-xs font-semibold text-[#414754] px-6 py-4">Частотность</th>
                    <th className="text-right text-xs font-semibold text-[#414754] px-6 py-4">CPC</th>
                    <th className="text-right text-xs font-semibold text-[#414754] px-6 py-4">Конкуренция</th>
                    <th className="text-right text-xs font-semibold text-[#414754] px-6 py-4">Тренд</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { keyword: "торт на заказ уфа", volume: "5 100", cpc: "35₽", competition: "средняя", trend: "up" },
                    { keyword: "купить торт уфа", volume: "3 200", cpc: "42₽", competition: "высокая", trend: "up" },
                    { keyword: "пекарня уфа", volume: "2 800", cpc: "28₽", competition: "низкая", trend: "stable" },
                    { keyword: "доставка тортов уфа", volume: "1 900", cpc: "38₽", competition: "средняя", trend: "down" },
                    { keyword: "свадебный торт уфа", volume: "1 200", cpc: "52₽", competition: "высокая", trend: "up" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[#e6e8f2] last:border-0 hover:bg-[#f2f3fd] transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#191c23]">{row.keyword}</td>
                      <td className="px-6 py-4 text-sm text-[#414754] text-right">{row.volume}/мес</td>
                      <td className="px-6 py-4 text-sm font-semibold text-[#191c23] text-right">{row.cpc}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          row.competition === "низкая" ? "bg-[#006d36]/10 text-[#006d36]" :
                          row.competition === "средняя" ? "bg-amber-50 text-amber-700" :
                          "bg-red-50 text-red-700"
                        }`}>
                          {row.competition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {row.trend === "up" && <TrendingUp className="w-4 h-4 text-[#006d36] inline" />}
                        {row.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500 inline" />}
                        {row.trend === "stable" && <span className="text-[#414754] text-xs">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
