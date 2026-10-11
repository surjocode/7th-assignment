import { Suspense } from "react";

import Hero from "@/components/Hero";
import PriceSection from "@/components/PriceSection";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";

function HomeLoading() {
  return (
    <main className="min-h-screen bg-[#f3f8f4] p-8">
      <div className="mx-auto max-w-6xl">
        <div className="h-48 animate-pulse rounded-2xl bg-green-200" />
        <h2 className="mt-6 animate-pulse text-xl font-bold text-green-700">
          বাজার দর লোড হচ্ছে...
        </h2>
      </div>
    </main>
  );
}

async function HomeContent() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      <Hero />
      <PriceSection products={products} />

      <section id="products" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-5 text-xl font-bold text-[#1f2937]">সব পণ্য</h2>

          <p className="mb-4 text-sm text-gray-500">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>

          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}
