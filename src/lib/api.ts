const BASE_URL =
  "https://api.abcz.workers.dev/api/bazardor";

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

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Categories

export async function getCategories() {
  return fetchAPI<Category[]>("/categories");
}

export async function getCategory(slug: string) {
  return fetchAPI<Category>(
    `/categories/${encodeURIComponent(slug)}`
  );
}

// Products

export async function getProducts() {
  return fetchAPI<Product[]>("/products");
}

export async function getProductsByCategory(
  category: string
) {
  return fetchAPI<Product[]>(
    `/products?category=${encodeURIComponent(category)}`
  );
}

export async function getProduct(id: string) {
  return fetchAPI<Product>(
    `/products/${encodeURIComponent(id)}`
  );
}