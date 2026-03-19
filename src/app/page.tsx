"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Globe,
  ArrowRight,
  Timer,
  TrendingUp,
  Wand2,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

/* ─── Data ─── */

const placeholderDomains = [
  "пекарня-хлебница.рф",
  "salon-laki.ru",
  "edavezde.ru",
  "remont-ufa.ru",
];

const featureCards = [
  {
    Icon: Timer,
    color: "primary",
    title: "Анализ за 2 минуты",
    description: "Мощные алгоритмы мгновенно обрабатывают данные вашего сайта",
  },
  {
    Icon: TrendingUp,
    color: "secondary",
    title: "Только работающие стратегии",
    description: "Рекомендации, которые приносят реальную прибыль",
  },
  {
    Icon: Wand2,
    color: "tertiary",
    title: "Без сложной настройки",
    description: "Понятный интерфейс на русском для каждого",
  },
];

const steps = [
  { num: "01", title: "Расскажите о своем бизнесе", desc: "Вставьте ссылку на сайт — мы определим нишу, город и услуги" },
  { num: "02", title: "ИИ анализирует рынок", desc: "Подберём ключевые слова, конкурентов и рассчитаем бюджет" },
  { num: "03", title: "Получите готовый план", desc: "Скачайте отчёт с объявлениями, минус-словами и прогнозом" },
];

const faqItems = [
  {
    q: "Нужен ли мне опыт в рекламе?",
    a: "Нет. Klivvo создан для предпринимателей без опыта. Вы получаете готовые тексты объявлений и чёткий план, который можно просто скопировать в Яндекс.Директ.",
  },
  {
    q: "Сколько стоит попробовать?",
    a: "Регистрация бесплатна, и вы сразу получаете первый отчёт. Платные планы начинаются от 1 900\u20BD/мес.",
  },
  {
    q: "Чем вы лучше агентства?",
    a: "В 5-10 раз дешевле при том же результате. Агентство берёт от 20 000\u20BD/мес. Klivvo даёт тот же план за 1 900\u20BD.",
  },
  {
    q: "Как быстро я получу результат?",
    a: "Анализ занимает 1-2 минуты. Сразу после этого вы получаете полный отчёт с ключевыми словами, объявлениями и бюджетом.",
  },
  {
    q: "Могу ли я отменить подписку?",
    a: "Да, в любой момент. Нет долгосрочных контрактов. Отмена в один клик в личном кабинете.",
  },
];

/* ─── AnimatedPlaceholder ─── */

function AnimatedPlaceholder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = placeholderDomains[currentIndex];
    const timeout = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === current) {
      const timer = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timer);
    }
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % placeholderDomains.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.substring(0, displayText.length - 1)
          : current.substring(0, displayText.length + 1)
      );
    }, timeout);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <span className="text-[#414754]/50 pointer-events-none select-none">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

/* ─── UrlInput ─── */

function UrlInput({
  url,
  setUrl,
  onSubmit,
  isSubmitting,
}: {
  url: string;
  setUrl: (v: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="w-full">
      <div className="relative rounded-2xl p-2.5 bg-white border border-[#c1c6d6] shadow-xl shadow-[#005bbf]/10">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754] z-10" />
            {!url && (
              <div className="absolute left-11 top-1/2 -translate-y-1/2 text-base z-[1]">
                <AnimatedPlaceholder />
              </div>
            )}
            <Input
              type="text"
              placeholder=""
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              className="pl-11 h-12 bg-[#f2f3fd] border-[#c1c6d6] text-base text-[#191c23] rounded-xl focus-visible:ring-2 focus-visible:ring-[#005bbf]/30 relative z-[2]"
            />
          </div>
          <ShimmerButton
            onClick={onSubmit}
            disabled={isSubmitting}
            shimmerColor="rgba(255,255,255,0.2)"
            background="linear-gradient(135deg, #005bbf, #1a73e8)"
            borderRadius="12px"
            className="h-12 px-8 text-sm font-semibold"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Анализ...
              </>
            ) : (
              <>
                Анализировать
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
}

/* ─── Icon color helpers ─── */

function iconBg(color: string) {
  if (color === "primary") return "bg-[#005bbf]/10";
  if (color === "secondary") return "bg-[#006875]/10";
  return "bg-[#006d36]/10";
}
function iconColor(color: string) {
  if (color === "primary") return "text-[#005bbf]";
  if (color === "secondary") return "text-[#006875]";
  return "text-[#006d36]";
}

/* ─── Page ─── */

function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-10 py-20 px-6 bg-[#f2f3fd]">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-headline font-extrabold text-3xl md:text-4xl text-center mb-12"
        >
          Часто задаваемые вопросы
        </motion.h2>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-headline font-bold text-[#191c23] pr-4">
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#414754] shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-5 text-[#414754] leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (!url.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      router.push(`/report/${data.id}`);
    } catch {
      router.push("/analyze");
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="relative min-h-screen bg-[#f9f9ff] text-[#191c23]">
      <Navbar currentPage="/" />

      {/* ── Hero (two columns) ── */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — col-span-7 */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#6bfe9c] text-[#005228] px-4 py-1.5 text-sm font-semibold mb-6">
                &#9889; Результат за 2 минуты
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-headline font-extrabold text-5xl md:text-7xl tracking-tight mb-6 leading-[1.05]"
            >
              Узнай, какую рекламу запускать для Яндекс.Директа за{" "}
              <span className="text-[#005bbf]">2 минуты</span> с помощью ИИ
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-[#414754] mb-8 max-w-xl leading-relaxed"
            >
              Вставьте ссылку на свой сайт — мы подберём ключевые слова,
              напишем объявления и рассчитаем бюджет
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <UrlInput
                url={url}
                setUrl={setUrl}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-x-5 gap-y-1 mt-4 text-sm text-[#414754]"
            >
              {["Ключевые слова", "Объявления", "Минус-слова", "Бюджет"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <span className="text-[#006d36]">&#10003;</span> {item}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right — col-span-5 dashboard card */}
          <div className="lg:col-span-5 relative">
            {/* Blur circles background */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#005bbf]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#006875]/10 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative rounded-[2rem] bg-white shadow-2xl p-6 md:p-8 border border-[#c1c6d6]/30"
            >
              <h3 className="font-headline font-bold text-lg text-[#191c23] mb-6">
                Klivvo Dashboard
              </h3>

              {/* Metrics grid 2x2 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl bg-[#005bbf]/5 border border-[#005bbf]/10 p-4 text-center">
                  <p className="text-3xl font-headline font-bold text-[#005bbf]">
                    +142%
                  </p>
                  <p className="text-xs text-[#414754] mt-1">ROI</p>
                </div>
                <div className="rounded-2xl bg-[#006d36]/5 border border-[#006d36]/10 p-4 text-center">
                  <p className="text-3xl font-headline font-bold text-[#006d36]">
                    2 мин
                  </p>
                  <p className="text-xs text-[#414754] mt-1">настройка</p>
                </div>
              </div>

              {/* Skeleton lines */}
              <div className="space-y-3">
                <div className="h-3 bg-[#e6e8f2] rounded-full w-full" />
                <div className="h-3 bg-[#e6e8f2] rounded-full w-4/5" />
                <div className="h-3 bg-[#e6e8f2] rounded-full w-3/5" />
                <div className="h-3 bg-[#e6e8f2] rounded-full w-11/12" />
                <div className="h-3 bg-[#e6e8f2] rounded-full w-2/3" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Цифры ── */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "ключевиков", sublabel: "в каждом отчёте" },
              { value: "5+", label: "объявлений", sublabel: "готовых к запуску" },
              { value: "2 мин", label: "до готового", sublabel: "рекламного плана" },
              { value: "×10", label: "дешевле", sublabel: "чем агентство" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-headline font-extrabold text-4xl md:text-5xl text-[#005bbf] mb-1">
                  {item.value}
                </p>
                <p className="font-headline font-bold text-base text-[#191c23]">
                  {item.label}
                </p>
                <p className="text-sm text-[#414754]">{item.sublabel}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Что вы получите (features) ── */}
      <section id="features" className="relative z-10 py-20 bg-[#f2f3fd]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-headline font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
              Что вы получите
            </h2>
            <p className="text-lg text-[#414754] max-w-lg mx-auto">
              Полный набор для запуска рекламы в Яндекс.Директе
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[1.5rem] shadow p-8 hover:-translate-y-2 transition-transform duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${iconBg(f.color)} flex items-center justify-center mb-5`}
                >
                  <f.Icon className={`w-6 h-6 ${iconColor(f.color)}`} />
                </div>
                <h3 className="font-headline font-bold text-xl mb-2 text-[#191c23]">
                  {f.title}
                </h3>
                <p className="text-[#414754] leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Как это работает (two columns) ── */}
      <section id="how" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — steps */}
          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-full border-2 border-[#005bbf] text-[#005bbf] flex items-center justify-center font-headline font-bold text-sm shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#191c23] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[#414754] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — title + report preview card */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-headline font-extrabold text-3xl md:text-5xl tracking-tight mb-8"
            >
              Три шага до первых клиентов
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[2rem] bg-white border border-[#c1c6d6]/30 shadow-xl overflow-hidden"
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3 bg-[#f2f3fd] border-b border-[#c1c6d6]/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-[#414754] border border-[#c1c6d6]/30 max-w-sm">
                    klivvo.ru/report/пекарня
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#191c23]">
                    Пекарня &laquo;Хлебница&raquo;
                  </h3>
                  <p className="text-xs text-[#414754] mt-0.5">
                    Пекарня &middot; Уфа &middot; от 80&#8381;
                  </p>
                </div>
                <hr className="border-[#c1c6d6]/30" />
                <div>
                  <p className="text-xs font-semibold text-[#414754] mb-2">
                    Горячие запросы
                  </p>
                  <div className="space-y-1.5">
                    {[
                      { kw: "торт на заказ уфа", vol: "5 100/мес" },
                      { kw: "купить торт уфа", vol: "3 200/мес" },
                      { kw: "пекарня с доставкой", vol: "900/мес" },
                    ].map((item) => (
                      <div
                        key={item.kw}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#f2f3fd] border border-[#c1c6d6]/30"
                      >
                        <span className="text-xs font-medium text-[#191c23]">
                          {item.kw}
                        </span>
                        <span className="text-xs text-[#414754]">
                          {item.vol}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Бюджет", value: "35K₽" },
                    { label: "Клики", value: "~1 000" },
                    { label: "CPC", value: "~35₽" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg bg-[#005bbf]/5 p-2.5 text-center"
                    >
                      <p className="text-[10px] text-[#414754]">{m.label}</p>
                      <p className="text-sm font-bold text-[#005bbf]">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="relative z-10 py-20 px-6 bg-[#f9f9ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-[#191c23] mb-3">Выберите свой план</h2>
            <p className="text-[#414754] max-w-xl mx-auto">В 5-10 раз дешевле агентства. Тот же результат.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Бесплатно */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="bg-white rounded-[1.5rem] p-8 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] border border-[#c1c6d6]/20 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="font-headline font-bold text-xl text-[#191c23] mb-1">Бесплатно</h3>
              <p className="text-sm text-[#414754] mb-4">За регистрацию по email</p>
              <div className="mb-6">
                <span className="font-headline font-extrabold text-4xl text-[#005bbf]">0 ₽</span>
              </div>
              <ul className="space-y-3 text-sm text-[#414754] mb-8">
                {["Урезанный отчёт", "5 ключевиков", "1 объявление", "Общая стратегия"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-[#006d36] mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToTop}
                className="w-full h-12 rounded-xl border-2 border-[#005bbf] text-[#005bbf] font-headline font-bold text-sm hover:bg-[#005bbf]/5 transition-colors"
              >
                Попробовать
              </button>
            </motion.div>

            {/* Старт */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[1.5rem] p-8 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] border border-[#c1c6d6]/20 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-headline font-bold text-xl text-[#191c23] mb-1">Старт</h3>
              <p className="text-sm text-[#414754] mb-4">Для бюджета до 30к</p>
              <div className="mb-6">
                <span className="font-headline font-extrabold text-4xl text-[#005bbf]">1 900 ₽</span>
                <span className="text-[#414754] text-sm ml-1">/ мес</span>
              </div>
              <ul className="space-y-3 text-sm text-[#414754] mb-8">
                {["Полный отчёт с CPC и объёмами", "5+ готовых объявлений", "Минус-слова", "Прогноз бюджета", "Обновление раз в месяц"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-[#006d36] mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToTop}
                className="w-full h-12 rounded-xl border-2 border-[#005bbf] text-[#005bbf] font-headline font-bold text-sm hover:bg-[#005bbf]/5 transition-colors"
              >
                Выбрать
              </button>
            </motion.div>

            {/* Бизнес */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative bg-white rounded-[1.5rem] p-8 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] border-2 border-[#005bbf] hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6bfe9c] text-[#005228] text-xs font-bold px-4 py-1 rounded-full">
                Популярный
              </div>
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-headline font-bold text-xl text-[#191c23] mb-1">Бизнес</h3>
              <p className="text-sm text-[#414754] mb-4">Для бюджета до 100к</p>
              <div className="mb-6">
                <span className="font-headline font-extrabold text-4xl text-[#005bbf]">3 900 ₽</span>
                <span className="text-[#414754] text-sm ml-1">/ мес</span>
              </div>
              <ul className="space-y-3 text-sm text-[#414754] mb-8">
                {["Всё из Старта +", "Еженедельный мониторинг", "Алерты на email", "Сезонные обновления объявлений", "Дашборд в личном кабинете"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-[#006d36] mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToTop}
                className="w-full h-12 rounded-xl text-white font-headline font-bold text-sm transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
              >
                Выбрать
              </button>
            </motion.div>

            {/* Агентство */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[1.5rem] p-8 shadow-[0px_24px_48px_rgba(25,28,35,0.06)] border border-[#c1c6d6]/20 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-headline font-bold text-xl text-[#191c23] mb-1">Агентство</h3>
              <p className="text-sm text-[#414754] mb-4">До 10 клиентов</p>
              <div className="mb-6">
                <span className="font-headline font-extrabold text-4xl text-[#005bbf]">9 900 ₽</span>
                <span className="text-[#414754] text-sm ml-1">/ мес</span>
              </div>
              <ul className="space-y-3 text-sm text-[#414754] mb-8">
                {["Всё из Бизнеса +", "White-label PDF", "API доступ", "Мульти-аккаунт"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-[#006d36] mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToTop}
                className="w-full h-12 rounded-xl border-2 border-[#005bbf] text-[#005bbf] font-headline font-bold text-sm hover:bg-[#005bbf]/5 transition-colors"
              >
                Связаться
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection />

      {/* ── Сравнение с агентством ── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-[#191c23] mb-3">
              Сравните сами
            </h2>
            <p className="text-[#414754] max-w-xl mx-auto">
              Почему предприниматели выбирают Klivvo вместо агентства
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Агентство */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-8 border border-[#c1c6d6]/20 opacity-75"
            >
              <h3 className="font-headline font-bold text-xl text-[#414754] mb-6 text-center">
                Агентство
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Стоимость", value: "20–50 тыс. ₽/мес" },
                  { label: "Скорость", value: "3–5 дней" },
                  { label: "Отчёты", value: "PDF раз в месяц" },
                  { label: "Ключевики", value: "20–30 штук" },
                  { label: "Объявления", value: "3–5 штук" },
                  { label: "Минус-слова", value: "15–20 штук" },
                  { label: "Мониторинг", value: "Раз в неделю" },
                  { label: "Прозрачность", value: "Непонятно что делают" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#e6e8f2] last:border-0">
                    <span className="text-sm text-[#414754]">{row.label}</span>
                    <span className="flex items-center gap-2 text-sm text-[#414754]">
                      <span className="text-red-500">✕</span>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Klivvo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-8 border-2 border-[#005bbf] relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6bfe9c] text-[#005228] text-xs font-bold px-4 py-1 rounded-full">
                Выгоднее
              </div>
              <h3 className="font-headline font-bold text-xl text-[#005bbf] mb-6 text-center">
                Klivvo
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Стоимость", value: "от 1 900 ₽/мес" },
                  { label: "Скорость", value: "2 минуты" },
                  { label: "Отчёты", value: "Дашборд 24/7" },
                  { label: "Ключевики", value: "50+ штук" },
                  { label: "Объявления", value: "5+ с вариациями" },
                  { label: "Минус-слова", value: "50+ штук" },
                  { label: "Мониторинг", value: "Ежедневно" },
                  { label: "Прозрачность", value: "Всё видно в кабинете" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#e6e8f2] last:border-0">
                    <span className="text-sm text-[#191c23] font-medium">{row.label}</span>
                    <span className="flex items-center gap-2 text-sm font-semibold text-[#006d36]">
                      <span className="text-[#006d36]">✓</span>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden px-8 py-16 md:py-20 text-center"
          style={{
            background: "linear-gradient(135deg, #005bbf, #1a73e8)",
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute bottom-[-40px] left-[-40px] w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-headline font-extrabold text-3xl md:text-5xl text-white mb-4">
              Начните получать клиентов из Директа сегодня
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Вставьте ссылку на свой сайт — план будет готов через пару минут
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 h-14 px-10 rounded-xl bg-white text-[#005bbf] font-headline font-bold text-base shadow-lg hover:shadow-xl transition-shadow"
            >
              Попробовать
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
