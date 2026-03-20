export interface Channel {
  name: string;          // 'Яндекс.Директ', 'Яндекс.Карты', 'VK', 'Авито', '2ГИС'
  priority: number;      // 1, 2, 3
  why: string;           // почему этот канал
  budget: string;        // сколько тратить
  expectedResult: string;
  actionItems: string[]; // что конкретно сделать
}

export interface WeekPlan {
  week: number;
  title: string;
  tasks: string[];
}

export interface AdText {
  channel: string;       // 'Яндекс.Директ', 'VK', 'Авито'
  title: string;
  description: string;
  targetAudience: string;
}

export interface MarketingReport {
  id: string;
  url: string;
  createdAt: string;

  // Понимание бизнеса
  business: {
    name: string;
    description: string;
    niche: string;
    city: string;
    services: { name: string; estimatedMargin: string }[];
    strengths: string[];
    weaknesses: string[];
    targetAudience: string;
  };

  // Анализ рынка
  market: {
    demandLevel: string;
    competitorCount: string;
    competitorInsights: string;
    opportunities: string[];
  };

  // Стратегия
  strategy: {
    summary: string;
    focusOn: string;
    avoidWasting: string;
    channels: Channel[];
    monthlyPlan: WeekPlan[];
  };

  // Готовые материалы
  materials: {
    adTexts: AdText[];
    keywords: string[];
    negativeKeywords: string[];
  };

  // Бюджет
  budget: {
    recommended: string;
    expectedClients: string;
    roi: string;
  };
}
