import Link from "next/link";

const footerLinks = {
  product: [
    { label: "Возможности", href: "/#features" },
    { label: "Как это работает", href: "/how" },
    { label: "Цены", href: "/#pricing" },
  ],
  resources: [
    { label: "Войти", href: "/auth" },
    { label: "Личный кабинет", href: "/dashboard" },
    { label: "Для агентств", href: "/agency" },
  ],
  legal: [
    { label: "Условия использования", href: "/terms" },
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Контакты", href: "/contacts" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-10 bg-slate-50 border-t border-[#c1c6d6]/30 py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo column */}
          <div>
            <Link href="/" className="font-headline font-bold text-xl text-[#191c23] block mb-3">
              Klivvo
            </Link>
            <p className="text-sm text-[#414754] leading-relaxed">
              ИИ-советник по контекстной рекламе для малого бизнеса
            </p>
          </div>

          {/* Продукт */}
          <div>
            <h4 className="text-sm font-headline font-bold text-[#191c23] mb-4">
              Продукт
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#414754] hover:text-blue-500 hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ресурсы */}
          <div>
            <h4 className="text-sm font-headline font-bold text-[#191c23] mb-4">
              Ресурсы
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#414754] hover:text-blue-500 hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Юридическая */}
          <div>
            <h4 className="text-sm font-headline font-bold text-[#191c23] mb-4">
              Юридическая
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#414754] hover:text-blue-500 hover:translate-x-1 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#c1c6d6]/30 pt-6">
          <p className="text-center text-sm text-[#414754]">
            &copy; 2026 Klivvo
          </p>
        </div>
      </div>
    </footer>
  );
}
