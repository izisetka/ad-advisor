import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const manrope = Manrope({
  variable: "--font-headline",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Klivvo — ИИ-советник по рекламе",
  description:
    "Узнайте, какую рекламу запускать. Ключевые слова, тексты объявлений, прогноз бюджета за 2 минуты.",
  metadataBase: new URL("https://klivvo.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Klivvo — ИИ-советник по рекламе для Яндекс.Директа",
    description:
      "Вставьте ссылку на сайт — получите ключевые слова, объявления и бюджет за 2 минуты. В 5-10 раз дешевле агентства.",
    url: "https://klivvo.ru",
    siteName: "Klivvo",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klivvo — ИИ-советник по рекламе",
    description:
      "Вставьте ссылку на сайт — получите ключевые слова, объявления и бюджет за 2 минуты.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${manrope.variable} antialiased font-body`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
