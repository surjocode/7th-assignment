import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/bazardor";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#d9e2dc] bg-[#f3f8f4] py-10 text-center">
        <p className="text-sm text-[#6b7280]">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;