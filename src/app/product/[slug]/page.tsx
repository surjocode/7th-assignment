import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";

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

const formatPrice = (price: number) =>
  price.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });

/*
 * UI preview-এর জন্য নমুনা বাজারের ডেটা।
 * প্রকৃত API বাজারের তথ্য না দিলে এগুলো বাস্তব বাজারদর নয়।
 */
const sampleMarkets = [
  {
    name: "সদর বাজার",
    division: "ময়মনসিংহ",
    min: 59,
    max: 66,
    avg: 63,
  },
  {
    name: "নতুন বাজার",
    division: "রাজশাহী",
    min: 60,
    max: 66,
    avg: 63,
  },
  {
    name: "বাজাররোড",
    division: "খুলনা",
    min: 60,
    max: 67,
    avg: 63.5,
  },
  {
    name: "বাজারবাগ বাজার",
    division: "রাজশাহী",
    min: 60,
    max: 68,
    avg: 64,
  },
  {
    name: "চৌর বাজার",
    division: "ময়মনসিংহ",
    min: 60,
    max: 69,
    avg: 64.5,
  },
  {
    name: "আনন্দলী বাজার",
    division: "চট্টগ্রাম",
    min: 61,
    max: 69,
    avg: 65,
  },
  {
    name: "উপশহর বাজার",
    division: "খুলনা",
    min: 62,
    max: 69,
    avg: 65.5,
  },
  {
    name: "বনানী বাজার",
    division: "ঢাকা",
    min: 63,
    max: 70,
    avg: 66,
  },
];

async function ProductDetails({ params }: ProductPageProps) {
  const { slug } = await params;

  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const unitBn = getUnitBn(product.unit);

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const marketMin = Math.min(...sampleMarkets.map((market) => market.min));

  const marketMax = Math.max(...sampleMarkets.map((market) => market.max));

  const marketAverage =
    sampleMarkets.reduce((sum, market) => sum + market.avg, 0) /
    sampleMarkets.length;

  return (
    <main className="min-h-screen bg-[#F3F8F4] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#6B7280]"
        >
          <Link href="/" className="transition hover:text-[#008F3C]">
            হোম
          </Link>

          <span aria-hidden="true">›</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-[#008F3C]"
          >
            {product.categoryNameBn}
          </Link>

          <span aria-hidden="true">›</span>

          <span className="font-medium text-[#1F2937]">{product.nameBn}</span>
        </nav>

        {/* Product header */}
        <section className="flex flex-col justify-between gap-5 rounded-xl border border-[#E2E8E4] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F0F6F1] text-3xl sm:h-16 sm:w-16 sm:text-4xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-bold text-[#1F2937] sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-[#6B7280]">
                প্রতি {unitBn} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-xs text-[#374151]">
                গতকালের তুলনায় আজ দাম{" "}
                <span
                  className={
                    isUp
                      ? "font-semibold text-red-600"
                      : isDown
                        ? "font-semibold text-[#008F3C]"
                        : "font-semibold text-[#6B7280]"
                  }
                >
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                </span>
              </p>
            </div>
          </div>

          {/* Today's price */}
          <div className="flex shrink-0 items-center justify-between gap-5 rounded-xl bg-[#F0F6F1] px-5 py-3 sm:min-w-36 sm:flex-col sm:gap-1 sm:text-center">
            <p className="text-xs text-[#6B7280]">আজকের দাম</p>

            <div>
              <p className="text-2xl font-bold text-[#1F2937]">
                ৳{formatPrice(product.today)}
              </p>

              <p className="text-xs text-[#6B7280]">টাকা / {unitBn}</p>

              <p
                className={`mt-1 text-xs font-semibold ${
                  isUp
                    ? "text-red-600"
                    : isDown
                      ? "text-[#008F3C]"
                      : "text-[#6B7280]"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {formatPrice(product.change.pct)}%
              </p>
            </div>
          </div>
        </section>

        {/* Price comparison */}
        <section className="mt-4 rounded-xl border border-[#E2E8E4] bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-sm font-bold text-[#1F2937] sm:text-base">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E2E8E4] p-4">
              <p className="text-xs text-[#6B7280]">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-xl font-bold text-[#008F3C]">
                ৳{formatPrice(marketMin)}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-[#6B7280]">
                বাজারগুলোর মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8E4] p-4">
              <p className="text-xs text-[#6B7280]">সর্বোচ্চ দাম</p>

              <p className="mt-1 text-xl font-bold text-red-600">
                ৳{formatPrice(marketMax)}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-[#6B7280]">
                বাজারগুলোর মধ্যে সর্বোচ্চ
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8E4] p-4">
              <p className="text-xs text-[#6B7280]">গড় দাম</p>

              <p className="mt-1 text-xl font-bold text-[#008F3C]">
                ৳{formatPrice(marketAverage)}{" "}
                <span className="text-xs font-normal">টাকা</span>
              </p>

              <p className="mt-1 text-xs text-[#6B7280]">
                প্রতি {unitBn}-এর গড় দাম
              </p>
            </div>
          </div>

          {/* Market-wise responsive table */}
          <div className="mt-6">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-[#1F2937] sm:text-base">
                  বাজারভিত্তিক আজকের দাম
                </h2>

                <p className="mt-1 text-xs text-[#6B7280]">
                  বিভিন্ন বাজারের দামের তুলনা
                </p>
              </div>

              <span className="rounded-full bg-[#E8F5EC] px-3 py-1 text-xs font-medium text-[#008F3C]">
                {sampleMarkets.length.toLocaleString("bn-BD")}টি বাজার
              </span>
            </div>

            <div className="mt-3 overflow-x-auto rounded-xl border border-[#E2E8E4]">
              <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                <thead className="bg-[#F8FAF8] text-xs text-[#6B7280]">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      বাজার
                    </th>

                    <th scope="col" className="px-4 py-3 font-medium">
                      বিভাগ
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-medium"
                    >
                      সর্বনিম্ন
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-medium"
                    >
                      সর্বোচ্চ
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3 text-right font-medium"
                    >
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#D9E0DB]">
                  {sampleMarkets.map((market, index) => (
                    <tr
                      key={market.name}
                      className={
                        index % 2 === 0
                          ? "bg-white hover:bg-[#F0F7F1]"
                          : "bg-[#F3F8F4] hover:bg-[#E8F5EC]"
                      }
                    >
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-[#374151]">
                        {market.name}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-[#6B7280]">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right text-[#008F3C]">
                        ৳{formatPrice(market.min)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right text-red-600">
                        ৳{formatPrice(market.max)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-[#1F2937]">
                        ৳{formatPrice(market.avg)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Navigation */}
      </div>
    </main>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#F3F8F4] px-4 py-8">
          <div className="mx-auto max-w-6xl animate-pulse">
            <div className="h-5 w-40 rounded bg-[#E2E8E4]" />
            <div className="mt-5 h-32 rounded-xl border border-[#E2E8E4] bg-white" />
            <div className="mt-4 h-64 rounded-xl border border-[#E2E8E4] bg-white" />
          </div>
        </main>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}
