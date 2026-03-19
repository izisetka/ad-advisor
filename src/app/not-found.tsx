"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <span className="font-headline font-extrabold text-[8rem] md:text-[12rem] leading-none text-[#005bbf]/10">
            404
          </span>
        </div>

        <h1 className="font-headline font-extrabold text-3xl md:text-4xl text-[#191c23] mb-3">
          Страница не найдена
        </h1>
        <p className="text-[#414754] text-lg mb-8 max-w-md mx-auto">
          Такой страницы не существует. Возможно, она была перемещена или удалена.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 h-12 px-8 rounded-xl text-white font-headline font-bold text-sm transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </motion.div>
    </div>
  );
}
