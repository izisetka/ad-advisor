"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFadeIn } from "@/components/ui/blur-fade-in";
import { WordFadeIn } from "@/components/ui/word-fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Marquee } from "@/components/ui/marquee";

const placeholderDomains = [
  "пекарня-хлебница.рф",
  "salon-laki.ru",
  "edavezde.ru",
  "remont-ufa.ru",
];

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
    <span className="text-slate-400 pointer-events-none select-none">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

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
      <div className="relative rounded-2xl p-2.5 bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
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
              className="pl-11 h-12 bg-slate-50 border-slate-200 text-base text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500/30 relative z-[2] placeholder:text-slate-400"
            />
          </div>
          <ShimmerButton
            onClick={onSubmit}
            disabled={isSubmitting}
            shimmerColor="rgba(255,255,255,0.2)"
            background="linear-gradient(135deg, #6366f1, #8b5cf6)"
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

const useCases = [
  {
    emoji: "\u{1F3EA}",
    title: "Владелец бизнеса",
    quote: "Хочу клиентов из интернета, но не знаю с чего начать",
    description:
      "Получите готовый план рекламы: ключевые слова, тексты объявлений и бюджет. Останется только запустить в Яндекс.Директе.",
  },
  {
    emoji: "\u{1F4B0}",
    title: "Экономный предприниматель",
    quote: "Агентство берёт 50 тысяч, а я хочу разобраться сам",
    description:
      "Мы подберём рекламу бесплатно. Вы получите тот же план, что готовят в агентствах, и сможете запустить рекламу сами.",
  },
  {
    emoji: "\u{1F680}",
    title: "Начинающий",
    quote: "Первый бизнес, первая реклама — боюсь слить бюджет",
    description:
      "Минус-слова отсекут ненужные показы, прогноз бюджета покажет реальные цифры. Вы запустите рекламу без страха.",
  },
];

const navLinks = [
  { label: "Возможности", href: "#features" },
  { label: "Как это работает", href: "#how" },
  { label: "Отчёт", href: "#report" },
  { label: "Для кого", href: "#for-whom" },
];

const features = [
  {
    icon: "🎯",
    title: "Ключевые слова",
    description: "Подберём запросы по которым ищут ваши клиенты",
  },
  {
    icon: "✍️",
    title: "Готовые объявления",
    description:
      "Напишем тексты объявлений, останется скопировать в Директ",
  },
  {
    icon: "🚫",
    title: "Минус-слова",
    description: "Исключим мусорные запросы чтобы не сливать бюджет",
  },
  {
    icon: "💰",
    title: "Прогноз бюджета",
    description: "Покажем сколько тратить и сколько клиентов ждать",
  },
];

const steps = [
  {
    num: "01",
    title: "Вставьте ссылку",
    desc: "Скопируйте адрес вашего сайта и вставьте в поле",
  },
  {
    num: "02",
    title: "Мы всё изучим",
    desc: "Посмотрим ваш сайт, определим нишу, город и услуги",
  },
  {
    num: "03",
    title: "Получите план",
    desc: "Готовый отчёт с ключевиками, объявлениями и бюджетом",
  },
];

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
    <div className="relative min-h-screen bg-white text-slate-900">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-100/50 blur-[120px]" />
        <div className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-violet-100/40 blur-[120px]" />
        <DotPattern className="opacity-30 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/25">
            РП
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            РекламаПлан
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector(link.href)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <ShimmerButton
          onClick={scrollToTop}
          shimmerColor="rgba(255,255,255,0.2)"
          background="linear-gradient(135deg, #6366f1, #8b5cf6)"
          borderRadius="8px"
          className="h-9 px-5 text-xs font-semibold"
        >
          Попробовать
        </ShimmerButton>
      </nav>

      {/* Hero — two columns */}
      <section className="relative z-10 px-6 pt-16 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <BlurFadeIn delay={0}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5">
                <span className="text-sm">&#9889;</span>
                <span className="text-sm font-medium text-indigo-700">
                  Результат за 2 минуты
                </span>
              </div>
            </BlurFadeIn>

            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight mb-6 leading-[1.1]">
              <WordFadeIn
                words="Узнай, какую рекламу запускать"
                delay={0.08}
                className="text-slate-900"
              />
            </h1>

            <BlurFadeIn delay={0.2}>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg">
                Вставьте ссылку на свой сайт — мы подберём ключевые слова,
                напишем объявления и рассчитаем бюджет для Яндекс.Директа
              </p>
            </BlurFadeIn>

            <BlurFadeIn delay={0.3}>
              <UrlInput
                url={url}
                setUrl={setUrl}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </BlurFadeIn>

            <BlurFadeIn delay={0.4}>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs text-slate-400">
                {[
                  "Ключевые слова",
                  "Тексты объявлений",
                  "Минус-слова",
                  "Бюджет",
                ].map((item) => (
                  <span key={item}>
                    <span className="text-indigo-500">&#10003;</span> {item}
                  </span>
                ))}
              </div>
            </BlurFadeIn>
          </div>

          {/* Right — dashboard preview */}
          <BlurFadeIn delay={0.4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 overflow-hidden"
              style={{
                transform: "perspective(1000px) rotateY(-5deg)",
              }}
            >
              <BorderBeam
                size={120}
                duration={8}
                colorFrom="#6366f1"
                colorTo="#8b5cf6"
              />
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-slate-400 border border-slate-200 max-w-sm">
                    рекламаплан.рф/report/пекарня
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Пекарня &laquo;Хлебница&raquo;
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Пекарня &middot; Уфа &middot; от 80&#8381;
                  </p>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">
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
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-orange-50 border border-orange-200/50"
                      >
                        <span className="text-xs font-medium text-slate-700">
                          {item.kw}
                        </span>
                        <span className="text-xs text-slate-400">
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
                      className="rounded-lg bg-indigo-50 p-2.5 text-center"
                    >
                      <p className="text-[10px] text-slate-400">{m.label}</p>
                      <p className="text-sm font-bold text-indigo-600">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </BlurFadeIn>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />
      </div>

      {/* Features — Что вы получите */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <WordFadeIn
            words="Что вы получите"
            delay={0.08}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-slate-900"
          />
          <BlurFadeIn delay={0.2}>
            <p className="text-slate-500 max-w-lg mx-auto">
              Полный набор для запуска рекламы в Яндекс.Директе
            </p>
          </BlurFadeIn>
        </div>

        <BlurFadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </BlurFadeIn>
      </section>

      {/* Gradient divider */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />
      </div>

      {/* How it works — two columns */}
      <section id="how" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <BlurFadeIn delay={0.1}>
            <AnimatedGradientText
              speed={1.5}
              colorFrom="#6366f1"
              colorTo="#8b5cf6"
              className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            >
              Как это работает
            </AnimatedGradientText>
          </BlurFadeIn>
          <BlurFadeIn delay={0.2}>
            <p className="text-slate-500 max-w-lg mx-auto">
              Три простых шага — и у вас готовый план рекламы
            </p>
          </BlurFadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — steps */}
          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-5"
              >
                <div className="text-5xl font-bold text-indigo-100 leading-none select-none shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — report preview */}
          <BlurFadeIn delay={0.3}>
            <motion.div
              id="report"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden"
            >
              <BorderBeam
                size={120}
                duration={8}
                colorFrom="#6366f1"
                colorTo="#8b5cf6"
              />
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-slate-400 border border-slate-200 max-w-sm">
                    рекламаплан.рф/report/пекарня-хлебница
                  </div>
                </div>
              </div>

              {/* Report content */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Пекарня &laquo;Хлебница&raquo;
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Пекарня &middot; Уфа &middot; от 80&#8381;
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-500 border border-slate-200">
                    рекламный план
                  </span>
                </div>

                <hr className="border-slate-100" />

                {/* Keywords preview */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-slate-700">
                    Горячие ключевые слова
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        kw: "торт на заказ уфа",
                        vol: "~5 100/мес",
                        cpc: "~35₽",
                      },
                      {
                        kw: "купить торт уфа",
                        vol: "~3 200/мес",
                        cpc: "~28₽",
                      },
                      {
                        kw: "пекарня с доставкой уфа",
                        vol: "~900/мес",
                        cpc: "~25₽",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.kw}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200/50"
                      >
                        <span className="text-sm font-medium text-slate-700">
                          {item.kw}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{item.vol}</span>
                          <span className="font-semibold text-orange-600">
                            {item.cpc}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Ad preview */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-slate-700">
                    Готовое объявление
                  </h4>
                  <div className="rounded-lg border border-indigo-200/50 bg-indigo-50/50 p-4">
                    <p className="text-indigo-700 font-semibold text-sm">
                      Торты на заказ в Уфе — от 1 200&#8381;
                    </p>
                    <p className="text-slate-600 text-sm mt-1">
                      Свежая выпечка каждый день. Торты, пирожные, хлеб.
                      Доставка по Уфе. Закажите!
                    </p>
                  </div>
                </div>

                {/* Budget preview */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Минимум",
                      amount: "15 000₽/мес",
                      clicks: "~420 кликов",
                    },
                    {
                      label: "Оптимально",
                      amount: "35 000₽/мес",
                      clicks: "~1 000 кликов",
                    },
                    {
                      label: "Агрессивно",
                      amount: "70 000₽/мес",
                      clicks: "~2 100 кликов",
                    },
                  ].map((b, i) => (
                    <motion.div
                      key={b.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className={`rounded-lg p-3 text-center ${i === 1 ? "bg-indigo-50 border-2 border-indigo-300" : "bg-slate-50 border border-slate-200"}`}
                    >
                      <p className="text-xs text-slate-500 mb-1">{b.label}</p>
                      <p
                        className={`text-lg font-bold ${i === 1 ? "text-indigo-600" : "text-slate-700"}`}
                      >
                        {b.amount}
                      </p>
                      <p className="text-xs text-slate-400">{b.clicks}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </BlurFadeIn>
        </div>
      </section>

      {/* Marquee */}
      <section className="relative z-10 py-12 overflow-hidden">
        <div className="text-center mb-6">
          <BlurFadeIn delay={0.1}>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              Что входит в план
            </p>
          </BlurFadeIn>
        </div>
        <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem]">
          {[
            "Ключевые слова",
            "Минус-слова",
            "Тексты объявлений",
            "Прогноз бюджета",
            "Конкуренты в выдаче",
            "Стоимость клика",
            "Конверсия",
            "ROI прогноз",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {item}
            </div>
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:35s] [--gap:1rem] mt-3"
        >
          {[
            "Горячие запросы",
            "Тёплые запросы",
            "Широкие запросы",
            "Стратегия продвижения",
            "Анализ ниши",
            "Прогноз клиентов",
            "Сезонность",
            "Рекомендации",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:border-violet-200 hover:text-violet-600 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {item}
            </div>
          ))}
        </Marquee>
      </section>

      {/* Gradient divider */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
      </div>

      {/* For whom */}
      <section
        id="for-whom"
        className="relative z-10 max-w-6xl mx-auto px-6 py-20"
      >
        <div className="text-center mb-12">
          <WordFadeIn
            words="Для кого это"
            delay={0.08}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-slate-900"
          />
          <BlurFadeIn delay={0.2}>
            <p className="text-slate-500 max-w-lg mx-auto">
              Если вы хотите клиентов из интернета — этот инструмент для вас
            </p>
          </BlurFadeIn>
        </div>

        <BlurFadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <MagicCard
                  className="rounded-2xl p-6 border border-slate-100 shadow-sm cursor-default h-full flex flex-col"
                  gradientColor="#E2E8F0"
                  gradientOpacity={0.5}
                  gradientFrom="#6366f1"
                  gradientTo="#8b5cf6"
                >
                  <div className="text-3xl mb-3">{uc.emoji}</div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">
                    {uc.title}
                  </h3>
                  <p className="text-sm text-indigo-600 font-medium mb-3 italic">
                    &laquo;{uc.quote}&raquo;
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {uc.description}
                  </p>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </BlurFadeIn>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-2xl mx-auto text-center px-6">
          <BlurFadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Готовы узнать, какую рекламу запускать?
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              Вставьте ссылку на свой сайт — план будет готов через пару минут
            </p>
            <ShineBorder
              shineColor={["#ffffff", "#c7d2fe", "#ffffff"]}
              borderWidth={2}
              duration={8}
              className="inline-flex rounded-xl"
            >
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-indigo-600 font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                Попробовать
                <ArrowRight className="w-4 h-4" />
              </button>
            </ShineBorder>
          </BlurFadeIn>
        </div>
      </section>

      {/* Footer — multi-column */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Column 1 — Logo */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/25">
                  РП
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900">
                  РекламаПлан
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                ИИ-советник по контекстной рекламе для малого бизнеса
              </p>
            </div>

            {/* Column 2 — Product */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">
                Продукт
              </h4>
              <ul className="space-y-2">
                {navLinks.slice(0, 3).map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .querySelector(link.href)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-sm text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Contacts */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">
                Контакты
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://t.me/reklamaplan"
                    className="text-sm text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@reklamaplan.ru"
                    className="text-sm text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <p className="text-center text-sm text-slate-400">
              &copy; 2026 РекламаПлан
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
