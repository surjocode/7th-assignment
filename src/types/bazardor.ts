export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface ProductChange {
  dir: "up" | "down" | "same";
  pct: number;
}

export interface Product {
  id: string | number;
  slug: string;
  nameBn: string;

  category: string;
  categoryNameBn: string;
  categoryIcon: string;

  unit: string;
  image: string;

  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: ProductChange;
}