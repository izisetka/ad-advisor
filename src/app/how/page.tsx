"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Search,
  FileText,
  BarChart3,
  Target,
  Rocket,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const steps = [
  {
    num: "01",
    Icon: Globe,
    title: "Вставьте ссылку на сайт",
    desc: "Просто скопируйте URL вашего сайта и вставьте в поле ввода. Наша система автоматически откроет сайт, прочитает содержимое и определит тип вашего бизнеса.",
    preview: "klivvo.ru — Поле ввода URL",
  },
  {
    num: "02",
    Icon: Search,
    title: "ИИ определяет ваш бизнес",
    desc: "Искусственный интеллект анализирует текст, услуги, цены и определяет нишу, город и целевую аудиторию. Это занимает несколько секунд.",
    preview: "Анализ: Пекарня, Уфа, от 80\u20BD",
  },
  {
    num: "03",
    Icon: Target,
    title: "Подбор ключевых слов",
    desc: "Система подбирает горячие, тёплые и широкие запросы для вашей ниши. Каждое ключевое слово сопровождается данными о частотности и стоимости клика.",
    preview: "42 ключевых слова в 3 группах",
  },
  {
    num: "04",
    Icon: FileText,
    title: "Генерация объявлений",
    desc: "ИИ пишет 4-6 готовых объявлений для Яндекс.Директа с заголовками, описаниями и быстрыми ссылками. Всё можно копировать одним кликом.",
    preview: "5 готовых объявлений",
  },
  {
    num: "05",
    Icon: BarChart3,
    title: "Расчёт бюджета",
    desc: "Получите три варианта бюджета: минимальный, оптимальный и агрессивный. Для каждого — прогноз кликов и заявок в месяц.",
    preview: "3 варианта: 15K / 35K / 70K",
  },
  {
    num: "06",
    Icon: Rocket,
    title: "Получите готовый план",
    desc: "Скачайте полный отчёт с ключевыми словами, минус-словами, объявлениями, бюджетом и стратегией. Настройте рекламу самостоятельно и экономьте на агентстве.",
    preview: "Полный PDF-отчёт",
  },
];

const faqItems = [
  {
    q: "Нужен ли опыт в рекламе?",
    a: "Нет. Klivvo создан для предпринимателей без опыта в рекламе. Вы получаете готовые тексты объявлений и инструкции, которые можно просто скопировать в Яндекс.Директ.",
  },
  {
    q: "Сколько времени занимает анализ?",
    a: "Обычно 1-2 минуты. Система автоматически сканирует ваш сайт, анализирует рынок и генерирует полный отчёт.",
  },
  {
    q: "Вы сами настраиваете рекламу?",
    a: "Нет. Мы даём вам готовый план — ключевые слова, тексты объявлений, минус-слова и рекомендации по бюджету. Вы настраиваете кампанию самостоятельно по нашим инструкциям.",
  },
  {
    q: "Чем вы лучше агентства?",
    a: "В 5-10 раз дешевле при том же результате. Агентство берёт от 20 000\u20BD/мес за настройку. Klivvo даёт тот же план за 1 900\u20BD. А для первого отчёта — бесплатно.",
  },
  {
    q: "Какие данные вы используете?",
    a: "Реальные данные из Яндекс.Директ API: частотность запросов, стоимость клика, уровень конкуренции. Никаких выдуманных цифр.",
  },
  {
    q: "Можно ли отменить подписку?",
    a: "Да, в любой момент. Нет долгосрочных контрактов. Отмена в один клик в личном кабинете.",
  },
  {
    q: "Для каких бизнесов это подходит?",
    a: "Для любого локального бизнеса: пекарни, салоны красоты, ремонт, доставка еды, юридические услуги, стоматологии и т.д. Если ваши клиенты ищут вас в Яндексе — Klivvo поможет.",
  },
];

const navLinks = [
  { label: "Возможности", href: "/#features" },
  { label: "Как это работает", href: "/how" },
  { label: "Цены", href: "/#pricing" },
];

export default function HowPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
                className={`text-sm font-medium transition-colors ${
                  link.href === "/how"
                    ? "text-[#005bbf] border-b-2 border-[#005bbf] pb-0.5"
                    : "text-[#414754] hover:text-[#005bbf]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="hidden sm:inline-flex text-sm font-medium text-[#414754] hover:text-[#005bbf] transition-colors"
            >
              Войти
            </Link>
            <Link
              href="/auth"
              className="hidden sm:inline-flex h-10 px-6 rounded-lg text-sm font-semibold text-white items-center"
              style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
            >
              Начать
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

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
            <Link
              href="/auth"
              className="block text-sm font-medium text-[#005bbf]"
              onClick={() => setMobileOpen(false)}
            >
              Войти
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-headline font-extrabold text-4xl md:text-6xl tracking-tight mb-4"
          >
            Как это работает
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-[#414754] max-w-2xl mx-auto"
          >
            От ссылки на сайт до готового плана рекламы — 6 простых шагов
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex items-center gap-4 md:w-auto shrink-0">
                  <div className="w-12 h-12 rounded-full border-2 border-[#005bbf] text-[#005bbf] flex items-center justify-center font-headline font-bold text-sm shrink-0">
                    {step.num}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#005bbf]/5 flex items-center justify-center shrink-0">
                    <step.Icon className="w-6 h-6 text-[#005bbf]" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-headline font-bold text-xl text-[#191c23] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#414754] leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  {/* Preview card */}
                  <div className="rounded-xl bg-[#f2f3fd] border border-[#c1c6d6]/30 px-4 py-3 inline-flex items-center gap-2 text-sm text-[#414754]">
                    <div className="w-2 h-2 rounded-full bg-[#005bbf]" />
                    {step.preview}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 px-6 bg-[#f2f3fd] py-20">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline font-extrabold text-3xl md:text-4xl text-center mb-12"
          >
            Частые вопросы
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

      {/* CTA */}
      <section className="py-20 px-6">
        <div
          className="max-w-4xl mx-auto rounded-[3rem] px-8 py-16 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
        >
          <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute bottom-[-40px] left-[-40px] w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-white mb-4">
              Готовы попробовать?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Первый отчёт бесплатно. Регистрация за 30 секунд.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 h-14 px-10 rounded-xl bg-white text-[#005bbf] font-headline font-bold text-base shadow-lg hover:shadow-xl transition-shadow"
            >
              Начать бесплатно
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-[#c1c6d6]/30 py-8 px-6">
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
            <Link href="/dashboard" className="hover:text-[#005bbf] transition-colors">
              Личный кабинет
            </Link>
          </div>
          <p className="text-sm text-[#414754]">&copy; 2026 Klivvo</p>
        </div>
      </footer>
    </div>
  );
}
