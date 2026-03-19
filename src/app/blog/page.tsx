'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { CalendarDays, ArrowRight } from 'lucide-react';

const articles = [
  {
    title: 'Как настроить Яндекс.Директ за вечер — пошаговая инструкция',
    date: '15 марта 2026',
    preview:
      'Подробная инструкция для новичков: от регистрации аккаунта до запуска первой рекламной кампании. Разбираем каждый шаг с примерами и скриншотами.',
  },
  {
    title: '5 ошибок которые сливают 50% бюджета в Директе',
    date: '12 марта 2026',
    preview:
      'Разбираем самые частые ошибки в настройке Яндекс.Директа: от широких ключевых слов до отсутствия минус-слов. Проверьте свою кампанию.',
  },
  {
    title: 'Минус-слова: полный гайд для новичков',
    date: '8 марта 2026',
    preview:
      'Что такое минус-слова, зачем они нужны и как их правильно подобрать. Список из 100+ универсальных минус-слов для любого бизнеса.',
  },
  {
    title: 'Сколько стоит реклама в Яндексе в 2026 году',
    date: '3 марта 2026',
    preview:
      'Актуальные цены на клик в разных нишах: от стоматологии до доставки еды. Сколько нужно вложить, чтобы получить первых клиентов.',
  },
  {
    title: 'Агентство vs самостоятельная настройка — что выбрать',
    date: '27 февраля 2026',
    preview:
      'Честное сравнение: когда стоит нанять агентство, а когда можно справиться самому. Считаем реальную экономию и разбираем подводные камни.',
  },
  {
    title: 'Как написать объявление которое кликают',
    date: '22 февраля 2026',
    preview:
      'Формулы продающих заголовков, секреты описания и примеры объявлений с высоким CTR для разных ниш.',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f9f9ff]">
      <Navbar />

      {/* Hero section */}
      <section className="pt-20 pb-12 px-6 text-center">
        <motion.h1
          className="font-headline font-bold text-4xl md:text-5xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Блог Klivvo
        </motion.h1>
        <motion.p
          className="text-lg text-[#414754] max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Советы по контекстной рекламе для малого бизнеса
        </motion.p>
      </section>

      {/* Cards section */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-6 hover:-translate-y-1 transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h2 className="font-headline font-bold text-xl mb-3">
                {article.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#414754] mb-3">
                <CalendarDays className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <p className="text-[#414754] text-sm leading-relaxed mb-4 line-clamp-3">
                {article.preview}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-[#005bbf] font-medium text-sm hover:underline"
              >
                Читать
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
