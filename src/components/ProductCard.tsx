import Link from "next/link";

import type { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
}

const getUnitBn = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    g: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    ml: "মিলিলিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    packet: "প্যাকেট",
    bottle: "বোতল",
  };

  return units[unit.toLowerCase()] || unit;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const unitBn = getUnitBn(product.unit);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#008f3c]/30 hover:shadow-sm"
    >
      {/* Top */}
      <div className="flex items-center gap-2">
        {/* Icon */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f3f8f4] text-lg">
          {product.image}
        </div>

        {/* Name */}
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-gray-800">
            {product.nameBn}
          </h3>

          <p className="text-[10px] text-gray-500">প্রতি {unitBn}</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 flex items-end justify-between">
        {/* Price */}
        <div>
          <p className="text-[10px] text-gray-500">আজকের দাম</p>

          <p className="text-base font-bold leading-tight text-gray-800">
            ৳{product.today.toLocaleString("bn-BD")}
            <span className="ml-1 text-[10px] font-normal text-gray-500">
              / {unitBn}
            </span>
          </p>
        </div>

        {/* Change */}
        <span
          className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {product.change.pct.toLocaleString("bn-BD")}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
