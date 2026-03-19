export interface Keyword {
  text: string;
  volume: string;
  cpc: string;
  competition: "низкая" | "средняя" | "высокая";
}

export interface KeywordGroup {
  label: string;
  keywords: Keyword[];
}

export interface AdCopy {
  title: string;
  description: string;
  targetKeywords: string[];
}

export interface BudgetTier {
  amount: string;
  clicks: string;
  clients: string;
}

export interface AdReport {
  id: string;
  url: string;
  createdAt: string;
  business: {
    name: string;
    description: string;
    niche: string;
    city: string;
    services: string[];
    priceRange: string;
  };
  keywords: {
    hot: KeywordGroup;
    warm: KeywordGroup;
    broad: KeywordGroup;
  };
  negativeKeywords: string[];
  ads: AdCopy[];
  budget: {
    minimum: BudgetTier;
    optimal: BudgetTier;
    aggressive: BudgetTier;
  };
  competitors: string;
  strategy: string;
}
