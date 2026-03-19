"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Возможности", href: "/#features" },
  { label: "Как это работает", href: "/how" },
  { label: "Цены", href: "/#pricing" },
  { label: "Войти", href: "/auth" },
];

export default function Navbar({ currentPage }: { currentPage?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (!currentPage) return false;
    if (href.startsWith("/#")) return currentPage === "/";
    return currentPage === href;
  }

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("/#") && currentPage === "/") {
      e.preventDefault();
      const el = document.querySelector(href.replace("/", ""));
      el?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-[#c1c6d6]/30">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">
        <Link
          href="/"
          className="font-headline font-bold text-xl tracking-tight text-[#191c23] flex items-center gap-2"
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-headline font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #005bbf, #1a73e8)" }}
          >
            K
          </span>
          Klivvo
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
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
              onClick={(e) => {
                handleAnchorClick(e, link.href);
                setMobileOpen(false);
              }}
              className={`block text-sm font-medium ${
                isActive(link.href) ? "text-[#005bbf]" : "text-[#414754]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth"
            className="block text-sm font-semibold text-[#005bbf]"
            onClick={() => setMobileOpen(false)}
          >
            Начать
          </Link>
        </div>
      )}
    </nav>
  );
}
