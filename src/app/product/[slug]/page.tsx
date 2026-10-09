import { Suspense } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface MarketRow {
  name: string;
  division?: string;
  min?: number;
  max?: number;
  avg?: number;
}

interface ProductMarketData {
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  markets?: MarketRow[];
}

const formatPrice = (price?: number | null) => {
  if (price === undefined || price === null || !Number.isFinite(price)) {
    return "তথ্য নেই";
  }

  return price.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
};

const formatMoney = (price?: number | null) => {
  if (price === undefined || price === null || !Number.isFinite(price)) {
    return "তথ্য নেই";
  }

  return `৳${formatPrice(price)}`;
};

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

function PriceSummaryCard({
  title,
  price,
  description,
  color,
}: {
  title: string;
  price?: number;
  description: string;
  color: "green" | "red" | "dark";
}) {
  const priceColor = {
    green: "text-[#008F3C]",
    red: "text-red-500",
    dark: "text-[#17251C]",
  };

  return (
    <div className="rounded-2xl border border-[#DFE8E1] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <p className="text-sm font-medium text-[#718078]">{title}</p>

      <p
        className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${
          priceColor[color]
        }`}
      >
        {formatMoney(price)}
      </p>

      <p className="mt-2 text-xs leading-5 text-[#7B877F]">
        {description}
      </p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-[#F3F8F4] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-pulse space-y-5">
        <div className="h-4 w-48 rounded bg-[#DDE7DF]" />

        <div className="h-40 rounded-2xl bg-white" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-32 rounded-2xl bg-white" />
          ))}
        </div>

        <div className="h-80 rounded-2xl bg-white" />
      </div>
    </main>
  );
}

async function ProductDetails({ params }: ProductPageProps) {
  // Check the Better Auth session before showing product details.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const { slug } = await params;

  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const productData = product as typeof product & ProductMarketData;

  const unitBn = getUnitBn(product.unit);
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  // Only use market information actually provided by the API.
  const markets = productData.markets ?? [];

  const marketMinValues = markets
    .map((market) => market.min)
    .filter((price): price is number => typeof price === "number");

  const marketMaxValues = markets
    .map((market) => market.max)
    .filter((price): price is number => typeof price === "number");

  const marketAvgValues = markets
    .map((market) => market.avg)
    .filter((price): price is number => typeof price === "number");

  const minimumPrice =
    productData.minPrice ??
    (marketMinValues.length > 0
      ? Math.min(...marketMinValues)
      : undefined);

  const maximumPrice =
    productData.maxPrice ??
    (marketMaxValues.length > 0
      ? Math.max(...marketMaxValues)
      : undefined);

  const averagePrice =
    productData.avgPrice ??
    (marketAvgValues.length > 0
      ? marketAvgValues.reduce((sum, price) => sum + price, 0) /
        marketAvgValues.length
      : undefined);

  return (
    <main className="min-h-screen bg-[#F3F8F4] px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#718078]"
        >
          <Link
            href="/"
            className="transition hover:text-[#008F3C]"
          >
            হোম
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-[#008F3C]"
          >
            {product.categoryNameBn}
          </Link>

          <span aria-hidden="true">/</span>

          <span className="font-semibold text-[#17251C]">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="rounded-2xl border border-[#DFE8E1] bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#EFF7F0] text-4xl sm:h-20 sm:w-20 sm:text-5xl">
                {product.image}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#E8F5EC] px-3 py-1 text-xs font-semibold text-[#008F3C]">
                    {product.categoryNameBn}
                  </span>

                  <span className="rounded-full bg-[#F2F4F2] px-3 py-1 text-xs text-[#66736A]">
                    প্রতি {unitBn}
                  </span>
                </div>

                <h1 className="text-xl font-bold leading-snug text-[#17251C] sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#718078]">
                  {product.nameBn} — আজকের দাম ও বাজারদরের তুলনা।
                </p>

                <p className="mt-3 text-sm text-[#526057]">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span
                    className={`font-semibold ${
                      isUp
                        ? "text-green-600"
                        : isDown
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  >
                    {isUp
                      ? "বেড়েছে ▲"
                      : isDown
                        ? "কমেছে ▼"
                        : "অপরিবর্তিত"}
                  </span>
                </p>
              </div>
            </div>

            {/* Today's Price */}
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#F0F7F1] p-4 sm:min-w-48 sm:flex-col sm:items-center sm:justify-center sm:p-6">
              <div>
                <p className="text-sm font-medium text-[#718078]">
                  আজকের দাম
                </p>

                <p className="mt-1 text-xs text-[#718078]">
                  প্রতি {unitBn}
                </p>
              </div>

              <div className="text-right sm:text-center">
                <p className="text-3xl font-extrabold tracking-tight text-[#008F3C] sm:text-4xl">
                  {formatMoney(product.today)}
                </p>

                <span
                  className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                    isUp
                      ? "bg-red-50 text-red-600"
                      : isDown
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {formatPrice(product.change.pct)}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#17251C] sm:text-xl">
              দামের সারসংক্ষেপ
            </h2>

            <p className="mt-1 text-sm text-[#718078]">
              {product.nameBn} — বাজারের দামের সংক্ষিপ্ত বিবরণ
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <PriceSummaryCard
              title="সর্বনিম্ন দাম"
              price={minimumPrice}
              description="বাজারগুলোর মধ্যে সর্বনিম্ন"
              color="green"
            />

            <PriceSummaryCard
              title="সর্বোচ্চ দাম"
              price={maximumPrice}
              description="বাজারগুলোর মধ্যে সর্বোচ্চ"
              color="red"
            />

            <PriceSummaryCard
              title="গড় দাম"
              price={averagePrice}
              description={`প্রতি ${unitBn}-এর গড় বাজারদর`}
              color="dark"
            />
          </div>

          {!markets.length &&
            minimumPrice === undefined &&
            maximumPrice === undefined &&
            averagePrice === undefined && (
              <p className="mt-3 text-xs leading-5 text-[#718078]">
                সর্বনিম্ন, সর্বোচ্চ ও গড় দামের তথ্য বর্তমান API response-এ
                পাওয়া যায়নি।
              </p>
            )}
        </section>

        {/* Market-wise Price Table */}
        <section className="mt-6 rounded-2xl border border-[#DFE8E1] bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#17251C] sm:text-xl">
                বাজারভিত্তিক আজকের দাম
              </h2>

              <p className="mt-1 text-sm text-[#718078]">
                বিভিন্ন বাজারে {product.nameBn}-এর দামের তুলনা
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#E8F5EC] px-3 py-1.5 text-xs font-semibold text-[#008F3C]">
              {markets.length.toLocaleString("bn-BD")}টি বাজার
            </span>
          </div>

          {markets.length > 0 ? (
            <div className="mt-5 overflow-x-auto rounded-xl border border-[#DFE8E1]">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead className="bg-[#F6F9F6] text-xs text-[#718078]">
                  <tr>
                    <th scope="col" className="px-4 py-4 font-semibold">
                      বাজার
                    </th>

                    <th scope="col" className="px-4 py-4 font-semibold">
                      বিভাগ
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-4 text-right font-semibold"
                    >
                      সর্বনিম্ন
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-4 text-right font-semibold"
                    >
                      সর্বোচ্চ
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-4 text-right font-semibold"
                    >
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#DFE8E1]">
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.name}-${index}`}
                      className={`transition-colors hover:bg-[#EAF5EC] ${
                        index % 2 === 0 ? "bg-white" : "bg-[#F4F8F4]"
                      }`}
                    >
                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-[#344238]">
                        {market.name}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-[#718078]">
                        {market.division || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right font-medium text-[#008F3C]">
                        {formatMoney(market.min)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right font-medium text-red-500">
                        {formatMoney(market.max)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right font-bold text-[#17251C]">
                        {formatMoney(market.avg)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-[#D5E2D7] bg-[#F8FAF8] px-5 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F5EC] text-2xl">
                🏪
              </div>

              <h3 className="mt-4 text-base font-bold text-[#344238]">
                বাজারভিত্তিক তথ্য পাওয়া যায়নি
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#718078]">
                বর্তমান API response-এ আলাদা বাজারের দাম পাওয়া যায়নি।
                বাজারভিত্তিক তুলনা দেখাতে API-তে সেই তথ্য থাকতে হবে।
              </p>
            </div>
          )}
        </section>

        {/* Back Navigation */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#DCE6DE] bg-white px-4 py-3 text-sm font-semibold text-[#344238] transition hover:border-[#008F3C] hover:text-[#008F3C]"
          >
            <span aria-hidden="true">←</span>
            সব পণ্যে ফিরে যান
          </Link>

          <p className="text-xs leading-5 text-[#718078]">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}