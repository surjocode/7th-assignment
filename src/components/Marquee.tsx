import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";

const Marquee = async () => {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch marquee products:", error);
  }

  if (!products.length) {
    return null;
  }

  // প্রথম 8টি product
  const tickerProducts = products.slice(0, 8);

  // Infinite scrolling-এর জন্য data duplicate
  const marqueeProducts = [
    ...tickerProducts,
    ...tickerProducts,
  ];

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-gray-950 text-white">
      <div className="flex h-9 items-center sm:h-10">
        {/* Label */}
        <div className="shrink-0 bg-green-600 px-3 text-xs font-semibold sm:px-4 sm:text-sm">
          বাজার দর
        </div>

        {/* Marquee */}
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-6 whitespace-nowrap px-4">
            {marqueeProducts.map((product, index) => {
              const change = product.change?.pct ?? 0;

              const isUp =
                product.change?.dir === "up";

              const isDown =
                product.change?.dir === "down";

              const formattedPrice =
                product.today.toLocaleString("bn-BD");

              const formattedChange =
                Math.abs(change).toLocaleString(
                  "bn-BD",
                  {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }
                );

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="flex items-center gap-1.5 text-xs sm:text-sm"
                >
                  {/* Product Icon */}
                  <span className="text-base">
                    {product.categoryIcon || "🛒"}
                  </span>

                  {/* Product Name */}
                  <span className="font-medium text-gray-200">
                    {product.nameBn}
                  </span>

                  {/* Price */}
                  <span className="font-semibold text-white">
                    {formattedPrice} টাকা
                  </span>

                  {/* Unit */}
                  <span className="text-gray-400">
                    / {product.unit}
                  </span>

                  {/* Up */}
                  {isUp && (
                    <span className="font-medium text-green-400">
                      ▲ {formattedChange}%
                    </span>
                  )}

                  {/* Down */}
                  {isDown && (
                    <span className="font-medium text-red-400">
                      ▼ {formattedChange}%
                    </span>
                  )}

                  {/* Same */}
                  {!isUp && !isDown && (
                    <span className="font-medium text-gray-400">
                      — ০.০%
                    </span>
                  )}

                  {/* Separator */}
                  <span className="ml-3 text-gray-600">
                    •
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 35s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;