import Link from "next/link";
import { notFound } from "next/navigation";

import { getProduct, getProducts } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
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

const ProductPage = async ({
  params,
}: ProductPageProps) => {
  const { slug } = await params;

  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const unitBn = getUnitBn(product.unit);

  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <Link
          href="/"
          className="mb-5 inline-flex items-center text-sm font-medium text-[#008f3c] hover:underline"
        >
          ← সব পণ্যে ফিরে যান
        </Link>

        {/* Product Card */}
        <div className="rounded-2xl border border-[#e2e8e4] bg-white p-5 sm:p-7">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#f3f8f4] text-4xl">
              {product.image}
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#1f2937] sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unitBn}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {product.categoryNameBn}
              </p>
            </div>
          </div>

          {/* Current Price */}
          <div className="mt-7 rounded-xl bg-[#f3f8f4] p-5">
            <p className="text-sm text-gray-500">
              আজকের বাজার দর
            </p>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-bold text-[#1f2937]">
                ৳{product.today.toLocaleString("bn-BD")}
              </span>

              <span className="pb-1 text-sm text-gray-500">
                / {unitBn}
              </span>
            </div>

            <div className="mt-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  isUp
                    ? "bg-red-50 text-red-600"
                    : isDown
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {isUp
                  ? "▲"
                  : isDown
                    ? "▼"
                    : "—"}{" "}
                {product.change.pct.toLocaleString("bn-BD")}%
              </span>
            </div>
          </div>

          {/* Price History */}
          <div className="mt-6">
            <h2 className="text-base font-bold text-[#1f2937]">
              দামের ইতিহাস
            </h2>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-gray-100 p-3">
                <p className="text-xs text-gray-500">
                  আজ
                </p>
                <p className="mt-1 font-bold text-gray-800">
                  ৳{product.today.toLocaleString("bn-BD")}
                </p>
              </div>

              <div className="rounded-lg border border-gray-100 p-3">
                <p className="text-xs text-gray-500">
                  গতকাল
                </p>
                <p className="mt-1 font-bold text-gray-800">
                  ৳{product.yesterday.toLocaleString("bn-BD")}
                </p>
              </div>

              <div className="rounded-lg border border-gray-100 p-3">
                <p className="text-xs text-gray-500">
                  গত সপ্তাহ
                </p>
                <p className="mt-1 font-bold text-gray-800">
                  ৳{product.lastWeek.toLocaleString("bn-BD")}
                </p>
              </div>

              <div className="rounded-lg border border-gray-100 p-3">
                <p className="text-xs text-gray-500">
                  গত মাস
                </p>
                <p className="mt-1 font-bold text-gray-800">
                  ৳{product.lastMonth.toLocaleString("bn-BD")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;