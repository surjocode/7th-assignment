
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

export interface Market {
  id?: string | number;
  name?: string;
  market?: string;
  marketName?: string;
  division?: string;
  district?: string;
  min?: number;
  max?: number;
  avg?: number;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  averagePrice?: number;
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

export interface ProductDetails extends Product {
  description?: string;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  averagePrice?: number;
  markets?: Market[];
}

// ==================== API Helper ====================

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

  return (await response.json()) as T;
}

// ==================== Categories ====================

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

// ==================== Products ====================

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

// ==================== Single Product ====================

export async function getProduct(
  id: string | number,
): Promise<ProductDetails> {
  return fetchAPI<ProductDetails>(
    `/products/${encodeURIComponent(String(id))}`,
  );
}

// ==================== Product By Slug ====================

export async function getProductBySlug(
  slug: string,
): Promise<ProductDetails | undefined> {
  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === slug,
  );

  if (!product) {
    return undefined;
  }

  const details = await getProduct(product.id);

  return details;
}

