"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Building2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AuthPage() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");

  return (
    <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-headline font-bold text-lg"
          style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
        >
          K
        </div>
        <span className="font-headline font-bold text-xl text-[#191c23]">
          Klivvo
        </span>
      </Link>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-8"
      >
        {/* Toggle */}
        <div className="flex rounded-xl bg-[#f2f3fd] p-1 mb-8">
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === "register"
                ? "bg-white text-[#005bbf] shadow-sm"
                : "text-[#414754]"
            }`}
          >
            Регистрация
          </button>
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === "login"
                ? "bg-white text-[#005bbf] shadow-sm"
                : "text-[#414754]"
            }`}
          >
            Вход
          </button>
        </div>

        <h1 className="font-headline font-bold text-2xl text-[#191c23] mb-6">
          {mode === "register" ? "Создайте аккаунт" : "Войдите в аккаунт"}
        </h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
        >
          {mode === "register" && (
            <>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 bg-[#f2f3fd] border-[#c1c6d6] rounded-xl text-[#191c23]"
                />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
                <Input
                  type="text"
                  placeholder="Название бизнеса"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  className="pl-10 h-12 bg-[#f2f3fd] border-[#c1c6d6] rounded-xl text-[#191c23]"
                />
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 bg-[#f2f3fd] border-[#c1c6d6] rounded-xl text-[#191c23]"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12 bg-[#f2f3fd] border-[#c1c6d6] rounded-xl text-[#191c23]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl text-white font-headline font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
          >
            {mode === "register" ? "Зарегистрироваться" : "Войти"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {mode === "register" && (
          <p className="text-center text-sm text-[#414754] mt-6">
            Регистрация = бесплатный отчёт для вашего бизнеса
          </p>
        )}

        {mode === "login" && (
          <p className="text-center text-sm text-[#414754] mt-6">
            <a href="#" className="text-[#005bbf] hover:underline">
              Забыли пароль?
            </a>
          </p>
        )}
      </motion.div>

      <p className="text-sm text-[#414754] mt-6">
        <Link href="/" className="text-[#005bbf] hover:underline">
          На главную
        </Link>
      </p>
    </div>
  );
}
