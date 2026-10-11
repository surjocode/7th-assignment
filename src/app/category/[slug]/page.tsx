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

function CategoryLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-gray-200" />

      <div className="mb-8 space-y-3">
        <div className="h-9 w-64 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-80 max-w-full animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="mb-4 h-36 animate-pulse rounded-xl bg-gray-200" />
            <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mb-3 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
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
  } catch (error) {
    console.error("Failed to load category:", error);
    notFound();
  }

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="transition-colors hover:text-[#078b43]">
            হোম
          </Link>

          <span aria-hidden="true">/</span>

          <span className="font-medium text-[#078b43]">{category.nameBn}</span>
        </nav>

        <section className="mb-8 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {category.icon} {category.nameBn}
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <section className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-14 text-center">
            <div className="mb-3 text-4xl" aria-hidden="true">
              🛒
            </div>

            <h2 className="text-lg font-bold text-gray-800">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              পরে আবার চেষ্টা করো অথবা সব পণ্য দেখে নাও।
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex rounded-lg bg-[#078b43] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </Link>
          </section>
        )}
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
