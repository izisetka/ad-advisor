"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building2,
  TrendingUp,
  Lightbulb,
  Megaphone,
  CalendarDays,
  FileText,
  Copy,
  Check,
  MapPin,
  Users,
  Target,
  ThumbsUp,
  AlertTriangle,
  ArrowUpRight,
  Download,
  Share2,
  ChevronRight,
} from "lucide-react";
import { MarketingReport } from "@/lib/types";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

const tabs = [
  { id: "business", label: "Ваш бизнес", icon: Building2 },
  { id: "market", label: "Рынок", icon: TrendingUp },
  { id: "strategy", label: "Стратегия", icon: Lightbulb },
  { id: "channels", label: "Каналы", icon: Megaphone },
  { id: "plan", label: "План на месяц", icon: CalendarDays },
  { id: "materials", label: "Материалы", icon: FileText },
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

const priorityColors: Record<number, string> = {
  1: "border-[#005bbf] bg-[#005bbf]/5",
  2: "border-[#006d36] bg-[#006d36]/5",
  3: "border-[#006875] bg-[#006875]/5",
  4: "border-[#414754] bg-[#414754]/5",
  5: "border-[#414754] bg-[#414754]/5",
};

const priorityBadgeColors: Record<number, string> = {
  1: "bg-[#005bbf] text-white",
  2: "bg-[#006d36] text-white",
  3: "bg-[#006875] text-white",
  4: "bg-[#414754] text-white",
  5: "bg-[#414754] text-white",
};

const channelIcons: Record<string, string> = {
  "Яндекс.Директ": "Ya",
  "Яндекс.Карты": "YK",
  "VK": "VK",
  "Авито": "Av",
  "2ГИС": "2G",
};

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [report, setReport] = useState<MarketingReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("business");

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

  const { business, market, strategy, materials, budget } = report;

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191c23]">
      <Navbar currentPage="/report" />

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
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => alert("Скоро!")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
              >
                <Download className="w-4 h-4" />
                Скачать PDF
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Ссылка скопирована!");
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#005bbf] bg-[#005bbf]/10 border border-[#005bbf]/20 hover:bg-[#005bbf]/15 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Поделиться
              </button>
            </div>
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

          {/* BUSINESS */}
          {activeTab === "business" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              {/* Description */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                <h2 className="font-headline text-xl font-bold mb-4 text-[#191c23]">Что мы поняли о вашем бизнесе</h2>
                <p className="text-[#414754] leading-relaxed text-base">{business.description}</p>
              </motion.div>

              {/* Target audience */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-[#005bbf]/5 border border-[#005bbf]/10">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#005bbf]" />
                  <h2 className="font-headline text-xl font-bold text-[#191c23]">Целевая аудитория</h2>
                </div>
                <p className="text-[#414754] leading-relaxed">{business.targetAudience}</p>
              </motion.div>

              {/* Services with margins */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                <h2 className="font-headline text-xl font-bold mb-4 text-[#191c23]">Услуги и маржинальность</h2>
                <div className="space-y-3">
                  {business.services.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#f2f3fd]">
                      <span className="font-medium text-[#191c23]">{s.name}</span>
                      <Badge className={`border ${
                        s.estimatedMargin.includes("очень высокая") ? "bg-[#006d36]/10 text-[#006d36] border-[#006d36]/20" :
                        s.estimatedMargin.includes("высокая") ? "bg-[#005bbf]/10 text-[#005bbf] border-[#005bbf]/20" :
                        s.estimatedMargin.includes("средняя") ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                        "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        Маржа: {s.estimatedMargin}
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeUp} className="rounded-[1.5rem] p-6 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <ThumbsUp className="w-5 h-5 text-[#006d36]" />
                    <h3 className="font-headline text-lg font-bold text-[#191c23]">Сильные стороны</h3>
                  </div>
                  <ul className="space-y-2">
                    {business.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#414754]">
                        <span className="text-[#006d36] mt-0.5 shrink-0">&#10003;</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={fadeUp} className="rounded-[1.5rem] p-6 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <h3 className="font-headline text-lg font-bold text-[#191c23]">Зоны роста</h3>
                  </div>
                  <ul className="space-y-2">
                    {business.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#414754]">
                        <span className="text-amber-500 mt-0.5 shrink-0">!</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* MARKET */}
          {activeTab === "market" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              {/* Market overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeUp} className="rounded-[1.5rem] p-6 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] text-center">
                  <p className="text-sm text-[#414754] mb-2">Уровень спроса</p>
                  <p className={`text-3xl font-headline font-bold ${
                    market.demandLevel === "высокий" ? "text-[#006d36]" :
                    market.demandLevel === "средний" ? "text-amber-600" : "text-red-500"
                  }`}>{market.demandLevel}</p>
                </motion.div>
                <motion.div variants={fadeUp} className="rounded-[1.5rem] p-6 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] text-center">
                  <p className="text-sm text-[#414754] mb-2">Конкуренция</p>
                  <p className="text-lg font-headline font-bold text-[#191c23]">{market.competitorCount}</p>
                </motion.div>
              </div>

              {/* Competitor insights */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-[#005bbf]" />
                  <h2 className="font-headline text-xl font-bold text-[#191c23]">Что делают конкуренты</h2>
                </div>
                <p className="text-[#414754] leading-relaxed">{market.competitorInsights}</p>
              </motion.div>

              {/* Opportunities */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-[#006d36]/5 border border-[#006d36]/10">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowUpRight className="w-5 h-5 text-[#006d36]" />
                  <h2 className="font-headline text-xl font-bold text-[#191c23]">Возможности для вас</h2>
                </div>
                <ul className="space-y-3">
                  {market.opportunities.map((o, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#414754]">
                      <span className="w-6 h-6 rounded-full bg-[#006d36]/10 text-[#006d36] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                      <span className="leading-relaxed">{o}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}

          {/* STRATEGY */}
          {activeTab === "strategy" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              {/* Summary */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                <h2 className="font-headline text-xl font-bold mb-4 text-[#191c23]">Общая стратегия</h2>
                <p className="text-[#414754] leading-relaxed text-base">{strategy.summary}</p>
              </motion.div>

              {/* Focus on */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-[#006d36]/5 border border-[#006d36]/10">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-[#006d36]" />
                  <h2 className="font-headline text-xl font-bold text-[#191c23]">На чём фокусироваться</h2>
                </div>
                <p className="text-[#414754] leading-relaxed">{strategy.focusOn}</p>
              </motion.div>

              {/* Avoid wasting */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h2 className="font-headline text-xl font-bold text-[#191c23]">На что НЕ тратить деньги</h2>
                </div>
                <p className="text-[#414754] leading-relaxed">{strategy.avoidWasting}</p>
              </motion.div>

              {/* Budget */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-[#005bbf]/5 border border-[#005bbf]/10">
                <h2 className="font-headline text-xl font-bold mb-4 text-[#191c23]">Рекомендуемый бюджет</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-white p-4 text-center border border-[#c1c6d6]/20">
                    <p className="text-xs text-[#414754] mb-1">Бюджет</p>
                    <p className="text-xl font-headline font-bold text-[#005bbf]">{budget.recommended}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center border border-[#c1c6d6]/20">
                    <p className="text-xs text-[#414754] mb-1">Ожидаемые клиенты</p>
                    <p className="text-xl font-headline font-bold text-[#006d36]">{budget.expectedClients}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center border border-[#c1c6d6]/20">
                    <p className="text-xs text-[#414754] mb-1">Окупаемость</p>
                    <p className="text-sm font-medium text-[#191c23] leading-snug">{budget.roi}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* CHANNELS */}
          {activeTab === "channels" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              {strategy.channels.map((ch, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={`rounded-[1.5rem] p-8 bg-white border-2 ${priorityColors[ch.priority] || "border-[#c1c6d6]/20"} shadow-[0px_24px_48px_rgba(25,28,35,0.06)]`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${priorityBadgeColors[ch.priority] || "bg-[#414754] text-white"}`}>
                      {channelIcons[ch.name] || ch.priority}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline text-lg font-bold text-[#191c23]">{ch.name}</h3>
                        <Badge className="bg-[#f2f3fd] text-[#414754] border-[#c1c6d6]/30 text-xs">Приоритет {ch.priority}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#414754] leading-relaxed mb-4">{ch.why}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="rounded-xl bg-[#f2f3fd] p-3">
                      <p className="text-xs text-[#414754]">Бюджет</p>
                      <p className="font-headline font-bold text-[#005bbf]">{ch.budget}</p>
                    </div>
                    <div className="rounded-xl bg-[#f2f3fd] p-3">
                      <p className="text-xs text-[#414754]">Ожидаемый результат</p>
                      <p className="font-headline font-bold text-[#006d36]">{ch.expectedResult}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#191c23] mb-2">Что конкретно сделать:</p>
                    <ul className="space-y-2">
                      {ch.actionItems.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#414754]">
                          <ChevronRight className="w-4 h-4 text-[#005bbf] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* PLAN */}
          {activeTab === "plan" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              {strategy.monthlyPlan.map((week, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border-2 border-[#005bbf] text-[#005bbf] flex items-center justify-center font-headline font-bold text-sm shrink-0">
                      {week.week}
                    </div>
                    <h3 className="font-headline text-lg font-bold text-[#191c23]">Неделя {week.week}: {week.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {week.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-3 text-[#414754]">
                        <div className="w-5 h-5 rounded border-2 border-[#c1c6d6] mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{task}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* MATERIALS */}
          {activeTab === "materials" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              {/* Ad texts */}
              <motion.div variants={fadeUp}>
                <h2 className="font-headline text-xl font-bold mb-4 text-[#191c23]">Тексты объявлений</h2>
                <div className="space-y-4">
                  {materials.adTexts.map((ad, i) => (
                    <div key={i} className="rounded-[1.5rem] p-6 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-[#005bbf]/10 text-[#005bbf] border border-[#005bbf]/20">{ad.channel}</Badge>
                        <CopyButton text={`${ad.title}\n${ad.description}`} />
                      </div>
                      <h3 className="font-bold text-base text-[#191c23] mb-1">{ad.title}</h3>
                      <p className="text-sm text-[#414754] leading-relaxed mb-3">{ad.description}</p>
                      <p className="text-xs text-[#414754]">
                        <span className="font-medium">Для аудитории:</span> {ad.targetAudience}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Keywords */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-headline text-xl font-bold text-[#191c23]">Приоритетные ключевики</h2>
                  <CopyButton text={materials.keywords.join("\n")} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {materials.keywords.map((kw, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="px-3 py-1.5 rounded-lg text-sm bg-[#005bbf]/10 text-[#005bbf] border border-[#005bbf]/20 font-medium"
                    >
                      {kw}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Negative keywords */}
              <motion.div variants={fadeUp} className="rounded-[1.5rem] p-8 bg-white border border-[#c1c6d6]/20 shadow-[0px_24px_48px_rgba(25,28,35,0.06)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-headline text-xl font-bold text-[#191c23]">Минус-слова</h2>
                    <p className="text-sm text-[#414754] mt-1">Добавьте в кампанию, чтобы не тратить деньги на нецелевые клики</p>
                  </div>
                  <CopyButton text={materials.negativeKeywords.join("\n")} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {materials.negativeKeywords.map((word, i) => (
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
              </motion.div>
            </motion.div>
          )}

        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
