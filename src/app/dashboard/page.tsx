"use client";

import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

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

const navLinks = [
  { label: "Возможности", href: "/#features" },
  { label: "Как это работает", href: "/how" },
  { label: "Цены", href: "/#pricing" },
];

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const userName = "Алексей";

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191c23]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 h-20 backdrop-blur-xl bg-white/70 border-b border-[#c1c6d6]/30">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          <Link
            href="/"
            className="font-headline font-bold text-xl tracking-tight text-[#191c23] flex items-center gap-2"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-headline font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
            >
              K
            </div>
            Klivvo
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#414754] hover:text-[#005bbf] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#191c23]">
              <div className="w-8 h-8 rounded-full bg-[#005bbf]/10 flex items-center justify-center text-[#005bbf] font-bold text-xs">
                {userName[0]}
              </div>
              {userName}
            </div>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-[#c1c6d6]/30 px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-[#414754]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

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
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-[#c1c6d6]/30 py-8 px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-headline font-bold text-lg text-[#191c23]">
            Klivvo
          </span>
          <div className="flex gap-6 text-sm text-[#414754]">
            <Link href="/how" className="hover:text-[#005bbf] transition-colors">
              Как это работает
            </Link>
            <Link href="/auth" className="hover:text-[#005bbf] transition-colors">
              Войти
            </Link>
            <Link href="/" className="hover:text-[#005bbf] transition-colors">
              Главная
            </Link>
          </div>
          <p className="text-sm text-[#414754]">&copy; 2026 Klivvo</p>
        </div>
      </footer>
    </div>
  );
}
