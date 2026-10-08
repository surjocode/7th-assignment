import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/bazardor";

interface PriceSectionProps {
  products: Product[];
}

const PriceSection = ({ products }: PriceSectionProps) => {
  // সবচেয়ে বেশি দাম বেড়েছে
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // সবচেয়ে বেশি দাম কমেছে
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="bg-[#f3f8f4] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Price Risers */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-bold text-red-600">▲</span>

            <h2 className="text-lg font-bold text-[#1f2937]">
              আজ দাম বেড়েছে
            </h2>
          </div>

          {risers.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {risers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#6b7280]">
              আজ কোনো পণ্যের দাম বাড়েনি।
            </p>
          )}
        </div>

        {/* Price Fallers */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-bold text-[#008f3c]">▼</span>

            <h2 className="text-lg font-bold text-[#1f2937]">
              আজ দাম কমেছে
            </h2>
          </div>

          {fallers.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fallers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#6b7280]">
              আজ কোনো পণ্যের দাম কমেনি।
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PriceSection;