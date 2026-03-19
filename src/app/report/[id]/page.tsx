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
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#f2f3fd] text-[#414754] hover:bg-[#005bbf]/10 hover:text-[#005bbf] transition-colors"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Скопировано!" : "Скопировать"}
    </button>
  );
}

const competitionColors: Record<string, string> = {
  "низкая": "bg-[#006d36]/10 text-[#006d36] border-[#006d36]/20",
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
      <div className="min-h-screen bg-[#f9f9ff] p-6 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-64 mb-8 rounded-xl bg-[#e6e8f2]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-[1.5rem] bg-[#e6e8f2]" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-[1.5rem] bg-[#e6e8f2]" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#f9f9ff] flex items-center justify-center">
        <div className="text-center rounded-[1.5rem] p-12 border border-[#c1c6d6]/20 bg-white shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
          <h1 className="font-headline text-2xl font-bold mb-4 text-[#191c23]">Отчёт не найден</h1>
          <Link href="/analyze" className="text-[#005bbf] font-semibold hover:opacity-80 transition-opacity">
            Начать новый анализ →
          </Link>
        </div>
      </div>
    );
  }

  const { business, keywords, ads, negativeKeywords, budget, competitors, strategy } = report;

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191c23]">
      {/* Nav — glass panel */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-[#c1c6d6]/30 shadow-[0px_4px_12px_rgba(25,28,35,0.04)]">
        <div className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
          <Link href="/analyze" className="flex items-center gap-2 text-[#414754] hover:text-[#005bbf] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Новый анализ</span>
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-[#005bbf]/25"
              style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
            >
              K
            </div>
            <span className="font-headline font-bold text-lg tracking-tight text-[#191c23]">Klivvo</span>
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
              <h1 className="font-headline text-3xl font-bold tracking-tight text-[#191c23] mb-2">
                {business.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-[#005bbf]/10 text-[#005bbf] border border-[#005bbf]/20">{business.niche}</Badge>
                <span className="flex items-center gap-1 text-sm text-[#414754]">
                  <MapPin className="w-3.5 h-3.5" /> {business.city}
                </span>
                <span className="flex items-center gap-1 text-sm text-[#414754]">
                  <Tag className="w-3.5 h-3.5" /> {business.priceRange}
                </span>
              </div>
            </div>
            <div className="text-sm text-[#414754]">{report.url}</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="rounded-[1.5rem] p-1.5 inline-flex gap-1 min-w-max bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-lg shadow-[#005bbf]/25"
                      : "text-[#414754] hover:text-[#191c23] hover:bg-[#f2f3fd]"
                  }`}
                  style={isActive ? { background: "linear-gradient(135deg, #005bbf, #1a73e8)" } : undefined}
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
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                <h2 className="font-headline text-xl font-bold mb-4 text-[#191c23]">О вашем бизнесе</h2>
                <p className="text-[#414754] mb-6 leading-relaxed">{business.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {business.services.map((s, i) => (
                    <Badge key={i} className="bg-[#f2f3fd] text-[#414754] border-[#c1c6d6]/30">{s}</Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-[#005bbf]/5 border border-[#005bbf]/10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#005bbf]" />
                  <h2 className="font-headline text-xl font-bold text-[#191c23]">Рекомендуемая стратегия</h2>
                </div>
                <p className="text-[#414754] leading-relaxed">{strategy}</p>
              </motion.div>

              {/* Quick stats */}
              <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-[1.5rem] p-5 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] text-center">
                  <p className="text-3xl font-headline font-bold text-[#005bbf]">{keywords.hot.keywords.length + keywords.warm.keywords.length + keywords.broad.keywords.length}</p>
                  <p className="text-xs text-[#414754] mt-1">ключевых слов</p>
                </div>
                <div className="rounded-[1.5rem] p-5 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] text-center">
                  <p className="text-3xl font-headline font-bold text-[#005bbf]">{ads.length}</p>
                  <p className="text-xs text-[#414754] mt-1">готовых объявлений</p>
                </div>
                <div className="rounded-[1.5rem] p-5 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] text-center">
                  <p className="text-3xl font-bold text-red-500">{negativeKeywords.length}</p>
                  <p className="text-xs text-[#414754] mt-1">минус-слов</p>
                </div>
                <div className="rounded-[1.5rem] p-5 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] text-center">
                  <p className="text-3xl font-headline font-bold text-[#006d36]">{budget.optimal.clients}</p>
                  <p className="text-xs text-[#414754] mt-1">клиентов/мес (прогноз)</p>
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
                { group: keywords.broad, icon: Globe, color: "border-l-4 border-[#005bbf]", iconColor: "text-[#005bbf]", bg: "bg-[#005bbf]/10" },
              ].map(({ group, icon: Icon, color, iconColor, bg }) => (
                <motion.div key={group.label} variants={fadeUp} className={`rounded-[1.5rem] p-6 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] ${color}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    <h3 className="font-headline text-lg font-bold text-[#191c23]">{group.label}</h3>
                  </div>
                  <div className="space-y-2">
                    {group.keywords.map((kw, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3fd] hover:bg-[#e6e8f2] transition-colors">
                        <span className="font-medium text-[#191c23]">{kw.text}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[#414754]">{kw.volume}</span>
                          <span className="text-xs font-semibold text-[#191c23]">{kw.cpc}</span>
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
                <motion.div key={i} variants={fadeUp} className="rounded-[1.5rem] p-6 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-[#414754]">Объявление {i + 1}</span>
                    <CopyButton text={`${ad.title}\n${ad.description}`} />
                  </div>

                  {/* Директ preview */}
                  <div className="rounded-xl border border-[#c1c6d6]/30 p-4 bg-[#f2f3fd]">
                    <p className="text-[#005bbf] font-semibold text-base mb-1 hover:underline cursor-pointer">{ad.title}</p>
                    <p className="text-sm text-[#414754] mb-2">{ad.description}</p>
                    <p className="text-xs text-[#006d36]">ad · {report.url}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="text-xs text-[#414754]">Для запросов:</span>
                    {ad.targetKeywords.map((kw, j) => (
                      <Badge key={j} className="bg-[#005bbf]/10 text-[#005bbf] border-[#005bbf]/20 text-xs">{kw}</Badge>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-4 text-xs text-[#414754]">
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
              <div className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-headline text-xl font-bold text-[#191c23]">Минус-слова</h2>
                    <p className="text-sm text-[#414754] mt-1">Добавьте эти слова в кампанию, чтобы не тратить деньги на нецелевые клики</p>
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
                  { tier: budget.minimum, label: "Минимальный", desc: "Попробовать и посмотреть", color: "border-[#c1c6d6]/20", icon: "💡" },
                  { tier: budget.optimal, label: "Оптимальный", desc: "Лучшее соотношение цена/результат", color: "border-[#005bbf] ring-2 ring-[#005bbf]/10", icon: "⭐" },
                  { tier: budget.aggressive, label: "Агрессивный", desc: "Максимум клиентов", color: "border-[#c1c6d6]/20", icon: "🚀" },
                ].map(({ tier, label, desc, color, icon }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className={`rounded-[1.5rem] p-6 bg-white border ${color} shadow-[0px_24px_48px_rgba(25,28,35,0.06)] text-center`}
                  >
                    <div className="text-3xl mb-3">{icon}</div>
                    <h3 className="font-headline text-lg font-bold text-[#191c23] mb-1">{label}</h3>
                    <p className="text-xs text-[#414754] mb-4">{desc}</p>
                    <p className="text-3xl font-headline font-bold text-[#005bbf] mb-4">{tier.amount}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 rounded-lg bg-[#f2f3fd]">
                        <span className="text-[#414754]">Кликов</span>
                        <span className="font-semibold text-[#191c23]">{tier.clicks}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-[#f2f3fd]">
                        <span className="text-[#414754]">Клиентов</span>
                        <span className="font-semibold text-[#006d36]">{tier.clients}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={fadeUp} className="mt-6 rounded-[1.5rem] p-6 bg-amber-50 border border-amber-200">
                <p className="text-sm text-amber-800">
                  ⚠️ <strong>Это приблизительный прогноз.</strong> Реальные цифры зависят от конкуренции, сезона и качества вашего сайта. Рекомендуем начать с минимального бюджета и увеличивать по результатам.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* COMPETITORS */}
          {activeTab === "competitors" && (
            <motion.div variants={fadeUp} initial="initial" animate="animate">
              <div className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                <div className="flex items-center gap-2 mb-4">
                  <Swords className="w-5 h-5 text-[#005bbf]" />
                  <h2 className="font-headline text-xl font-bold text-[#191c23]">Конкурентная среда</h2>
                </div>
                <div className="prose max-w-none text-[#414754] leading-relaxed whitespace-pre-line">
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
