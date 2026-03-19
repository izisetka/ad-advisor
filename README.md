# Klivvo

**ИИ-советник по контекстной рекламе для Яндекс.Директа**

Вставьте ссылку на сайт — получите ключевые слова, тексты объявлений, минус-слова и прогноз бюджета за 2 минуты. В 5-10 раз дешевле агентства.

![Klivvo Screenshot](./screenshot.png)

## Стек

- **Next.js 16** — React-фреймворк с App Router
- **React 19** — UI-библиотека
- **Tailwind CSS v4** — утилитарные стили
- **Supabase** — база данных и аутентификация
- **Claude API** — генерация отчётов с помощью ИИ
- **Framer Motion** — анимации
- **TypeScript 5** — типизация

## Быстрый старт

```bash
git clone https://github.com/your-org/klivvo.git
cd klivvo
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## ENV переменные

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_claude_api_key
```

## Структура проекта

```
src/
├── app/                  # Страницы (App Router)
│   ├── page.tsx          # Лендинг
│   ├── auth/             # Регистрация / вход
│   ├── dashboard/        # Личный кабинет
│   ├── analyze/          # Форма анализа
│   ├── report/[id]/      # Детальный отчёт
│   ├── blog/             # Блог
│   ├── how/              # Как это работает
│   ├── agency/           # Для агентств
│   ├── contacts/         # Контакты
│   ├── privacy/          # Политика конфиденциальности
│   ├── terms/            # Условия использования
│   └── api/              # API-эндпоинты
├── components/
│   ├── navbar.tsx        # Навигация
│   ├── footer.tsx        # Подвал
│   └── ui/               # UI-компоненты (shadcn)
└── lib/
    ├── ai.ts             # Интеграция с Claude API
    ├── supabase.ts       # Клиент Supabase
    ├── store.ts          # Стейт-менеджмент
    ├── types.ts          # TypeScript типы
    └── utils.ts          # Утилиты
```

## Лицензия

MIT
