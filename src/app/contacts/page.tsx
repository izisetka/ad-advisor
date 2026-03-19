"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, User, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191c23]">
      <Navbar currentPage="/contacts" />

      <section className="pt-20 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-headline font-extrabold text-4xl md:text-5xl tracking-tight mb-4"
          >
            Свяжитесь с нами
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-[#414754]"
          >
            Мы всегда рады помочь и ответить на ваши вопросы
          </motion.p>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-6 md:p-8">
              <h2 className="font-headline font-bold text-xl text-[#191c23] mb-6">
                Контактная информация
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#005bbf]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#005bbf]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#191c23]">Email</p>
                    <a
                      href="mailto:hello@klivvo.ru"
                      className="text-sm text-[#005bbf] hover:underline"
                    >
                      hello@klivvo.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#005bbf]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#005bbf]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#191c23]">Адрес</p>
                    <p className="text-sm text-[#414754]">
                      Россия, Москва
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#005bbf]/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#005bbf]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#191c23]">Время ответа</p>
                    <p className="text-sm text-[#414754]">
                      Обычно отвечаем в течение 24 часов
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#005bbf]/5 rounded-[1.5rem] border border-[#005bbf]/10 p-6 md:p-8">
              <h3 className="font-headline font-bold text-lg text-[#191c23] mb-2">
                Для бизнеса и партнёрств
              </h3>
              <p className="text-sm text-[#414754] leading-relaxed">
                Если вы агентство или хотите обсудить интеграцию — напишите нам на{" "}
                <a href="mailto:hello@klivvo.ru" className="text-[#005bbf] hover:underline">
                  hello@klivvo.ru
                </a>{" "}
                с темой &laquo;Партнёрство&raquo;.
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-[1.5rem] shadow-[0px_24px_48px_rgba(25,28,35,0.06)] p-6 md:p-8"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
                >
                  <Send className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-headline font-bold text-xl text-[#191c23] mb-2">
                  Сообщение отправлено
                </h3>
                <p className="text-sm text-[#414754] mb-6">
                  Мы свяжемся с вами в ближайшее время
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="text-sm font-semibold text-[#005bbf] hover:underline"
                >
                  Отправить ещё одно сообщение
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="font-headline font-bold text-xl text-[#191c23] mb-6">
                  Напишите нам
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
                    <Input
                      type="text"
                      placeholder="Ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 h-12 bg-[#f2f3fd] border-[#c1c6d6] rounded-xl text-[#191c23]"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-12 bg-[#f2f3fd] border-[#c1c6d6] rounded-xl text-[#191c23]"
                    />
                  </div>
                  <Textarea
                    placeholder="Ваше сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="bg-[#f2f3fd] border-[#c1c6d6] rounded-xl text-[#191c23] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl text-white font-headline font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
                  >
                    Отправить
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
