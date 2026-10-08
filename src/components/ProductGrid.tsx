
"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import type { Product } from "@/types/bazardor";

interface ProductGridProps {
  products: Product[];
}

type SortOption =
  | "default"
  | "price-low"
  | "price-high"
  | "change-high"
  | "change-low"
  | "name";

const ProductGrid = ({ products }: ProductGridProps) => {
  const [sortOption, setSortOption] =
    useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.today - b.today;

      case "price-high":
        return b.today - a.today;

      case "change-high":
        return b.change.pct - a.change.pct;

      case "change-low":
        return a.change.pct - b.change.pct;

      case "name":
        return a.nameBn.localeCompare(b.nameBn, "bn");

      default:
        return 0;
    }
  });

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#E2E8E4] bg-[#F3F8F4] py-10 text-center">
        <p className="text-sm text-[#6B7280]">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sorting */}
      <div className="flex items-center justify-end rounded-xl border border-[#E2E8E4] bg-white px-3 py-2.5 sm:px-4">
        <SortDropdown
          value={sortOption}
          onChange={(value) =>
            setSortOption(value as SortOption)
          }
        />
      </div>

      {/* Product count */}
      <p className="text-xs text-[#6B7280]">
        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

