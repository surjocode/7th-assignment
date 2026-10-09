
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import ProductGrid from "@/components/ProductGrid";
import { getCategory, getProductsByCategory } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;

  let category;
  let products;

  try {
    [category, products] = await Promise.all([
      getCategory(slug),
      getProductsByCategory(slug),
    ]);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f0f5f1] px-3 py-5 sm:px-5 sm:py-7">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-3 text-xs text-gray-500"
        >
          <Link href="/" className="hover:text-[#008f3c]">
            হোম
          </Link>

          <span className="mx-2" aria-hidden="true">
            ›
          </span>

          <span className="text-gray-700">{category.nameBn}</span>
        </nav>

        <section className="flex items-center gap-3 rounded-xl border border-[#e2e8e4] bg-white/80 px-4 py-3 sm:px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f5f1] text-2xl">
            {category.icon}
          </div>

          <div>
            <h1 className="text-base font-bold text-gray-800 sm:text-lg">
              {category.nameBn}
            </h1>

            <p className="text-[10px] text-gray-500 sm:text-xs">
              {products.length.toLocaleString("bn-BD")} টি পণ্যের
              আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        <p className="mb-3 mt-4 text-[10px] text-gray-500 sm:text-xs">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
        </p>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}

function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f1] px-4 py-6">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-16 rounded-xl bg-gray-200" />
        <div className="mt-5 h-3 w-32 rounded bg-gray-200" />
        <div className="mt-4 h-10 rounded-xl bg-gray-200" />

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

