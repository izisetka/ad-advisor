"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  Scan,
  Building2,
  Search,
  PenTool,
  Calculator,
  CheckCircle2,
} from "lucide-react";

const steps = [
  { label: "Открываем сайт...", sublabel: "Загружаем и изучаем страницы", icon: Scan, progress: 15 },
  { label: "Определяем ваш бизнес...", sublabel: "Анализируем нишу и услуги", icon: Building2, progress: 30 },
  { label: "Подбираем ключевые слова...", sublabel: "Ищем запросы ваших клиентов", icon: Search, progress: 50 },
  { label: "Пишем объявления...", sublabel: "Создаём тексты для Директа", icon: PenTool, progress: 70 },
  { label: "Считаем бюджет...", sublabel: "Рассчитываем стоимость и прогноз", icon: Calculator, progress: 90 },
  { label: "Готово!", sublabel: "Ваш рекламный план готов", icon: CheckCircle2, progress: 100 },
];

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleAnalyze() {
    if (!url.trim()) {
      setError("Введите адрес сайта");
      return;
    }
    setError("");
    setLoading(true);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 2) return prev + 1;
        return prev;
      });
    }, 1000);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        throw new Error("Ошибка анализа");
      }

      const data = await res.json();
      setCurrentStep(steps.length - 1);

      setTimeout(() => {
        router.push(`/report/${data.id}`);
      }, 800);
    } catch {
      clearInterval(stepInterval);
      setLoading(false);
      setError("Произошла ошибка. Попробуйте снова.");
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F5F7FA] text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">На главную</span>
        </Link>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-500/25">
            RP
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">РекламаПлан</span>
        </Link>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-blue-600">Рекламный план</span>{" "}
            <span className="text-slate-900">для вашего бизнеса</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Вставьте адрес вашего сайта — мы подготовим план рекламы
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="rounded-2xl p-2.5 bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="вашсайт.рф"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                      className="pl-12 h-14 bg-slate-50 border-slate-200 text-lg text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/30 placeholder:text-slate-400"
                    />
                  </div>
                  <ShimmerButton
                    onClick={handleAnalyze}
                    shimmerColor="rgba(255,255,255,0.2)"
                    background="linear-gradient(135deg, #1A73E8, #1565D8)"
                    borderRadius="12px"
                    className="h-14 px-8 text-sm font-semibold"
                  >
                    <span className="font-semibold flex items-center gap-2">
                      Получить план
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </ShimmerButton>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-3 text-center"
                >
                  {error}
                </motion.p>
              )}

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-400 mb-3">Попробуйте:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["пекарня-хлебница.рф", "salon-laki.ru", "edavezde.ru", "remont-ufa.ru"].map((example) => (
                    <button
                      key={example}
                      onClick={() => setUrl(example)}
                      className="px-4 py-2 rounded-full text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all duration-200"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Radar animation */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-200" />
                  <div className="absolute inset-3 rounded-full border border-blue-100" />
                  <div className="absolute inset-6 rounded-full border border-blue-50" />
                  <div className="absolute inset-0 radar-sweep">
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-lg shadow-blue-500/30" />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-200/50 animate-ping" style={{ animationDuration: "2s" }} />
                </div>
              </div>

              <p className="text-center text-sm text-slate-500 mb-2">
                Анализируем <span className="font-semibold text-slate-900">{url}</span>
              </p>

              {/* Steps */}
              <div className="rounded-2xl p-6 space-y-1 bg-white border border-slate-200 shadow-lg">
                {steps.map((step, i) => {
                  const isActive = i === currentStep;
                  const isDone = i < currentStep;
                  const isPending = i > currentStep;
                  const StepIcon = step.icon;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        isActive ? "bg-blue-50" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isDone
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                            : isActive
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 animate-pulse"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-semibold text-sm transition-colors ${
                            isPending ? "text-slate-400" : "text-slate-900"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-slate-400">{step.sublabel}</p>
                      </div>

                      {isActive && (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      )}

                      {isDone && (
                        <span className="text-xs font-medium text-emerald-500">Готово</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="rounded-full p-1 bg-white border border-slate-200">
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    initial={{ width: "0%" }}
                    animate={{ width: `${steps[currentStep].progress}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
