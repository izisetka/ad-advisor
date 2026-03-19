"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building2,
  Search,
  PenTool,
  Ban,
  DollarSign,
  Swords,
  ArrowLeft,
  Copy,
  Check,
  Flame,
  Sun,
  Globe,
  TrendingUp,
  MapPin,
  Tag,
} from "lucide-react";
import { AdReport } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

const tabs = [
  { id: "overview", label: "Обзор", icon: Building2 },
  { id: "keywords", label: "Ключевые слова", icon: Search },
  { id: "ads", label: "Объявления", icon: PenTool },
  { id: "negative", label: "Минус-слова", icon: Ban },
  { id: "budget", label: "Бюджет", icon: DollarSign },
  { id: "competitors", label: "Конкуренты", icon: Swords },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Скопировано!" : "Скопировать"}
    </button>
  );
}

const competitionColors: Record<string, string> = {
  "низкая": "bg-green-50 text-green-700 border-green-200",
  "средняя": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "высокая": "bg-red-50 text-red-700 border-red-200",
};

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [report, setReport] = useState<AdReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch(`/api/report/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setReport(null);
        else setReport(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-64 mb-8 rounded-xl bg-slate-200" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl bg-slate-200" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center rounded-2xl p-12 border border-slate-200 bg-white shadow-sm">
          <h1 className="text-2xl font-bold mb-4 text-slate-900">Отчёт не найден</h1>
          <Link href="/analyze" className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors">
            Начать новый анализ →
          </Link>
        </div>
      </div>
    );
  }

  const { business, keywords, ads, negativeKeywords, budget, competitors, strategy } = report;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Nav */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
          <Link href="/analyze" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Новый анализ</span>
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/25">
              РП
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">РекламаПлан</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                {business.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200">{business.niche}</Badge>
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <MapPin className="w-3.5 h-3.5" /> {business.city}
                </span>
                <span className="flex items-center gap-1 text-sm text-slate-500">
                  <Tag className="w-3.5 h-3.5" /> {business.priceRange}
                </span>
              </div>
            </div>
            <div className="text-sm text-slate-400">{report.url}</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="rounded-2xl p-1.5 inline-flex gap-1 min-w-max bg-white border border-slate-200 shadow-sm">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-slate-900">О вашем бизнесе</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">{business.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {business.services.map((s, i) => (
                    <Badge key={i} className="bg-slate-100 text-slate-700 border-slate-200">{s}</Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-900">Рекомендуемая стратегия</h2>
                </div>
                <p className="text-slate-700 leading-relaxed">{strategy}</p>
              </motion.div>

              {/* Quick stats */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm text-center">
                  <p className="text-3xl font-bold text-indigo-600">{keywords.hot.keywords.length + keywords.warm.keywords.length + keywords.broad.keywords.length}</p>
                  <p className="text-xs text-slate-500 mt-1">ключевых слов</p>
                </div>
                <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm text-center">
                  <p className="text-3xl font-bold text-violet-600">{ads.length}</p>
                  <p className="text-xs text-slate-500 mt-1">готовых объявлений</p>
                </div>
                <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm text-center">
                  <p className="text-3xl font-bold text-red-500">{negativeKeywords.length}</p>
                  <p className="text-xs text-slate-500 mt-1">минус-слов</p>
                </div>
                <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm text-center">
                  <p className="text-3xl font-bold text-emerald-600">{budget.optimal.clients}</p>
                  <p className="text-xs text-slate-500 mt-1">клиентов/мес (прогноз)</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* KEYWORDS */}
          {activeTab === "keywords" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              {[
                { group: keywords.hot, icon: Flame, color: "border-l-4 border-red-500", iconColor: "text-red-500", bg: "bg-red-50" },
                { group: keywords.warm, icon: Sun, color: "border-l-4 border-amber-500", iconColor: "text-amber-500", bg: "bg-amber-50" },
                { group: keywords.broad, icon: Globe, color: "border-l-4 border-blue-500", iconColor: "text-blue-500", bg: "bg-blue-50" },
              ].map(({ group, icon: Icon, color, iconColor, bg }) => (
                <motion.div key={group.label} variants={fadeUp} className={`rounded-2xl p-6 bg-white border border-slate-200 shadow-sm ${color}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{group.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {group.keywords.map((kw, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <span className="font-medium text-slate-800">{kw.text}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500">{kw.volume}</span>
                          <span className="text-xs font-semibold text-slate-700">{kw.cpc}</span>
                          <Badge className={`text-xs ${competitionColors[kw.competition]} border`}>{kw.competition}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <CopyButton text={group.keywords.map(k => k.text).join("\n")} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ADS */}
          {activeTab === "ads" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-4">
              {ads.map((ad, i) => (
                <motion.div key={i} variants={fadeUp} className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-slate-400">Объявление {i + 1}</span>
                    <CopyButton text={`${ad.title}\n${ad.description}`} />
                  </div>
                  
                  {/* Директ preview */}
                  <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                    <p className="text-indigo-600 font-semibold text-base mb-1 hover:underline cursor-pointer">{ad.title}</p>
                    <p className="text-sm text-slate-600 mb-2">{ad.description}</p>
                    <p className="text-xs text-green-700">ad · {report.url}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="text-xs text-slate-500">Для запросов:</span>
                    {ad.targetKeywords.map((kw, j) => (
                      <Badge key={j} className="bg-indigo-50 text-indigo-600 border-indigo-200 text-xs">{kw}</Badge>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-4 text-xs text-slate-400">
                    <span>Заголовок: {ad.title.length}/56 символов</span>
                    <span>Текст: {ad.description.length}/81 символ</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* NEGATIVE KEYWORDS */}
          {activeTab === "negative" && (
            <motion.div variants={fadeUp} initial="initial" animate="animate">
              <div className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Минус-слова</h2>
                    <p className="text-sm text-slate-500 mt-1">Добавьте эти слова в кампанию, чтобы не тратить деньги на нецелевые клики</p>
                  </div>
                  <CopyButton text={negativeKeywords.join("\n")} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {negativeKeywords.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="px-3 py-1.5 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200 font-medium"
                    >
                      −{word}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* BUDGET */}
          {activeTab === "budget" && (
            <motion.div variants={stagger} initial="initial" animate="animate">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { tier: budget.minimum, label: "Минимальный", desc: "Попробовать и посмотреть", color: "border-slate-200", icon: "💡" },
                  { tier: budget.optimal, label: "Оптимальный", desc: "Лучшее соотношение цена/результат", color: "border-indigo-300 ring-2 ring-indigo-100", icon: "⭐" },
                  { tier: budget.aggressive, label: "Агрессивный", desc: "Максимум клиентов", color: "border-slate-200", icon: "🚀" },
                ].map(({ tier, label, desc, color, icon }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className={`rounded-2xl p-6 bg-white border ${color} shadow-sm text-center`}
                  >
                    <div className="text-3xl mb-3">{icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{label}</h3>
                    <p className="text-xs text-slate-500 mb-4">{desc}</p>
                    <p className="text-3xl font-bold text-indigo-600 mb-4">{tier.amount}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                        <span className="text-slate-500">Кликов</span>
                        <span className="font-semibold text-slate-800">{tier.clicks}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                        <span className="text-slate-500">Клиентов</span>
                        <span className="font-semibold text-emerald-600">{tier.clients}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeUp} className="mt-6 rounded-2xl p-6 bg-amber-50 border border-amber-200">
                <p className="text-sm text-amber-800">
                  ⚠️ <strong>Это приблизительный прогноз.</strong> Реальные цифры зависят от конкуренции, сезона и качества вашего сайта. Рекомендуем начать с минимального бюджета и увеличивать по результатам.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* COMPETITORS */}
          {activeTab === "competitors" && (
            <motion.div variants={fadeUp} initial="initial" animate="animate">
              <div className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Swords className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-900">Конкурентная среда</h2>
                </div>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                  {competitors}
                </div>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
