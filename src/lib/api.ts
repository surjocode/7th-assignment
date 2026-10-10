
const BASE_URL = "https://api.abcz.workers.dev/api/bazardor";

export interface Category {
  id: string | number;
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

export interface Market {
  name: string;
  division?: string;
  min?: number;
  max?: number;
  avg?: number;
}

export interface ProductDetails extends Product {
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  markets?: Market[];
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

// Categories
export async function getCategories(): Promise<Category[]> {
  return fetchAPI<Category[]>("/categories");
}

export async function getCategory(
  slug: string,
): Promise<Category> {
  return fetchAPI<Category>(
    `/categories/${encodeURIComponent(slug)}`,
  );
}

// Products
export async function getProducts(): Promise<Product[]> {
  return fetchAPI<Product[]>("/products");
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  return fetchAPI<Product[]>(
    `/products?category=${encodeURIComponent(category)}`,
  );
}

// Single product endpoint accepts an ID.
export async function getProduct(
  id: string | number,
): Promise<Product> {
  return fetchAPI<Product>(
    `/products/${encodeURIComponent(String(id))}`,
  );
}

// Find a product using its slug for /product/[slug].
export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug);
}