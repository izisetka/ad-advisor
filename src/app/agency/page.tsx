"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Code, Globe, Calculator } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const advantages = [
  {
    icon: Globe,
    title: "White-label",
    description:
      "Отчёты с вашим логотипом и брендом. Клиенты видят только вашу компанию — Klivvo остаётся за кулисами.",
  },
  {
    icon: Code,
    title: "API доступ",
    description:
      "Интегрируйте анализ в свои системы. REST API с документацией и примерами. Автоматизируйте рутину.",
  },
  {
    icon: Users,
    title: "Мульти-аккаунт",
    description:
      "До 10 клиентских аккаунтов в одной панели. Отдельные отчёты, единый биллинг, полный контроль.",
  },
];

export default function AgencyPage() {
  const [clients, setClients] = useState(5);

  const hoursPerClient = 3;
  const hoursSaved = clients * hoursPerClient;
  const minutesWithKlivvo = clients * 2;

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191c23]">
      <Navbar currentPage="/agency" />

      {/* Hero */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#6bfe9c] text-[#005228] px-4 py-1.5 text-sm font-semibold mb-6"
          >
            Для агентств и фрилансеров
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-headline font-extrabold text-4xl md:text-6xl tracking-tight mb-6 leading-[1.1]"
          >
            Автоматизируйте работу с клиентами
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-[#414754] mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Вместо 3 часов на анализ каждого клиента — 2 минуты.
            Подготовьте медиаплан, отчёт и стратегию за время одного кофе.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 h-14 px-10 rounded-xl text-white font-headline font-bold text-base transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
            >
              Начать с 9 900 руб./мес
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 px-6 bg-[#f2f3fd]">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-headline font-extrabold text-3xl md:text-4xl text-center mb-12"
          >
            Три преимущества для вашего агентства
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-8 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#005bbf]/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-[#005bbf]" />
                </div>
                <h3 className="font-headline font-bold text-xl mb-2 text-[#191c23]">
                  {item.title}
                </h3>
                <p className="text-[#414754] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#005bbf]/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-[#005bbf]" />
              </div>
              <h2 className="font-headline font-bold text-2xl text-[#191c23]">
                Калькулятор экономии
              </h2>
            </div>

            <p className="text-[#414754] mb-6">
              Сколько клиентов вы ведёте?
            </p>

            <div className="mb-8">
              <input
                type="range"
                min={1}
                max={50}
                value={clients}
                onChange={(e) => setClients(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-[#e6e8f2] cursor-pointer accent-[#005bbf]"
              />
              <div className="flex justify-between text-xs text-[#414754] mt-2">
                <span>1 клиент</span>
                <span className="font-headline font-bold text-lg text-[#005bbf]">
                  {clients}
                </span>
                <span>50 клиентов</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-[1.5rem] bg-red-50 border border-red-200 p-5 text-center">
                <p className="text-xs text-red-700 mb-1">Без Klivvo</p>
                <p className="font-headline font-bold text-2xl text-red-600">
                  {hoursSaved} ч
                </p>
                <p className="text-xs text-red-500 mt-1">в месяц на анализ</p>
              </div>
              <div className="rounded-[1.5rem] bg-[#006d36]/5 border border-[#006d36]/20 p-5 text-center">
                <p className="text-xs text-[#006d36] mb-1">С Klivvo</p>
                <p className="font-headline font-bold text-2xl text-[#006d36]">
                  {minutesWithKlivvo} мин
                </p>
                <p className="text-xs text-[#006d36]/70 mt-1">на всех клиентов</p>
              </div>
              <div className="rounded-[1.5rem] bg-[#005bbf]/5 border border-[#005bbf]/20 p-5 text-center">
                <p className="text-xs text-[#005bbf] mb-1">Экономия</p>
                <p className="font-headline font-bold text-2xl text-[#005bbf]">
                  {Math.round((1 - minutesWithKlivvo / 60 / hoursSaved) * 100)}%
                </p>
                <p className="text-xs text-[#414754] mt-1">вашего времени</p>
              </div>
            </div>
          </motion.div>
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
              Готовы масштабировать агентство?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Начните экономить время уже сегодня. Первый анализ бесплатно.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 h-14 px-10 rounded-xl bg-white text-[#005bbf] font-headline font-bold text-base shadow-lg hover:shadow-xl transition-shadow"
            >
              Начать с 9 900 руб./мес
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
