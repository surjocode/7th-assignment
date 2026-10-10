
import { Suspense } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatPrice = (price?: number | null): string => {
  if (
    price === undefined ||
    price === null ||
    !Number.isFinite(price)
  ) {
    return "তথ্য নেই";
  }

  return price.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
};

const formatMoney = (price?: number | null): string => {
  if (
    price === undefined ||
    price === null ||
    !Number.isFinite(price)
  ) {
    return "তথ্য নেই";
  }

  return `৳${formatPrice(price)}`;
};

const getUnitBn = (unit: string): string => {
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
  const colors = {
    green: "text-[#008F3C]",
    red: "text-red-500",
    dark: "text-[#17251C]",
  };

  return (
    <div className="rounded-2xl border border-[#DFE8E1] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm font-medium text-[#718078]">
        {title}
      </p>

      <p
        className={`mt-3 text-2xl font-bold tracking-tight sm:text-3xl ${colors[color]}`}
      >
        {formatMoney(price)}
      </p>

      <p className="mt-2 text-xs leading-5 text-[#7B877F]">
        {description}
      </p>
    </div>
  );
}

function PriceHistoryCard({
  title,
  price,
  description,
  active = false,
}: {
  title: string;
  price: number;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? "border-[#B8DEC3] bg-[#EAF5EC]"
          : "border-[#DFE8E1] bg-white"
      }`}
    >
      <p className="text-sm text-[#718078]">{title}</p>

      <p
        className={`mt-2 text-xl font-bold ${
          active ? "text-[#008F3C]" : "text-[#17251C]"
        }`}
      >
        {formatMoney(price)}
      </p>

      <p className="mt-2 text-xs text-[#7B877F]">
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
        <div className="h-52 rounded-2xl bg-white" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 rounded-2xl bg-white"
            />
          ))}
        </div>

        <div className="h-56 rounded-2xl bg-white" />
      </div>
    </main>
  );
}

async function ProductDetails({
  params,
}: ProductPageProps) {
  // Check the Better Auth session.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const { slug } = await params;

  let products: Product[];

  try {
    products = await getProducts();
  } catch {
    throw new Error(
      "পণ্যের তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }

  const product = products.find(
    (item) => item.slug === slug,
  );

  if (!product) {
    notFound();
  }

  const unitBn = getUnitBn(product.unit);

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeColor = isUp
    ? "text-red-600 bg-red-50"
    : isDown
      ? "text-[#008F3C] bg-[#E8F5EC]"
      : "text-gray-600 bg-gray-100";

  const changeLabel = isUp
    ? "দাম বেড়েছে"
    : isDown
      ? "দাম কমেছে"
      : "দাম অপরিবর্তিত";

  // Historical prices supplied by the API.
  const history = [
    {
      title: "আজকের দাম",
      price: product.today,
      description: "বর্তমান বাজারদর",
    },
    {
      title: "গতকালের দাম",
      price: product.yesterday,
      description: "এক দিন আগে",
    },
    {
      title: "গত সপ্তাহের দাম",
      price: product.lastWeek,
      description: "সাত দিন আগে",
    },
    {
      title: "গত মাসের দাম",
      price: product.lastMonth,
      description: "এক মাস আগের দাম",
    },
  ];

  // These values are derived only from the available price history.
  // They are historical comparisons, not market-wide min/max/average.
  const historicalPrices = [
    product.today,
    product.yesterday,
    product.lastWeek,
    product.lastMonth,
  ].filter(
    (price) =>
      typeof price === "number" &&
      Number.isFinite(price),
  );

  const historicalMin =
    historicalPrices.length > 0
      ? Math.min(...historicalPrices)
      : undefined;

  const historicalMax =
    historicalPrices.length > 0
      ? Math.max(...historicalPrices)
      : undefined;

  const historicalAverage =
    historicalPrices.length > 0
      ? historicalPrices.reduce(
          (sum, price) => sum + price,
          0,
        ) / historicalPrices.length
      : undefined;

  return (
    <main className="min-h-screen bg-[#F3F8F4] px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#718078]"
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

        {/* Product header */}
        <section className="rounded-2xl border border-[#DFE8E1] bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#EFF7F0] text-5xl sm:h-24 sm:w-24 sm:text-6xl">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#E8F5EC] px-3 py-1 text-xs font-semibold text-[#008F3C]">
                    {product.categoryNameBn}
                  </span>

                  <span className="rounded-full bg-[#F2F4F2] px-3 py-1 text-xs text-[#66736A]">
                    প্রতি {unitBn}
                  </span>
                </div>

                <h1 className="text-2xl font-bold leading-snug text-[#17251C] sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#718078]">
                  {product.nameBn}-এর আজকের দাম ও আগের
                  দামের তুলনা দেখুন।
                </p>

                <span
                  className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${changeColor}`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}
                  {changeLabel}
                  {" "}
                  {formatPrice(Math.abs(product.change.pct))}%
                </span>
              </div>
            </div>

            {/* Today's price */}
            <div className="rounded-2xl bg-[#F0F7F1] p-5 sm:min-w-52 sm:text-center">
              <p className="text-sm font-medium text-[#718078]">
                আজকের দাম
              </p>

              <p className="mt-1 text-xs text-[#718078]">
                প্রতি {unitBn}
              </p>

              <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#008F3C] sm:text-4xl">
                {formatMoney(product.today)}
              </p>
            </div>
          </div>
        </section>

        {/* Price history */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#17251C]">
              দামের ইতিহাস
            </h2>

            <p className="mt-1 text-sm text-[#718078]">
              বিভিন্ন সময়ে {product.nameBn}-এর দাম
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {history.map((item) => (
              <PriceHistoryCard
                key={item.title}
                title={item.title}
                price={item.price}
                description={item.description}
                active={item.title === "আজকের দাম"}
              />
            ))}
          </div>
        </section>

        {/* Historical summary */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#17251C]">
              দামের সারসংক্ষেপ
            </h2>

            <p className="mt-1 text-sm text-[#718078]">
              API থেকে পাওয়া চারটি সময়ের দামের ভিত্তিতে
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <PriceSummaryCard
              title="সর্বনিম্ন দাম"
              price={historicalMin}
              description="প্রদর্শিত সময়গুলোর মধ্যে সর্বনিম্ন"
              color="green"
            />

            <PriceSummaryCard
              title="সর্বোচ্চ দাম"
              price={historicalMax}
              description="প্রদর্শিত সময়গুলোর মধ্যে সর্বোচ্চ"
              color="red"
            />

            <PriceSummaryCard
              title="গড় দাম"
              price={historicalAverage}
              description="চারটি সময়ের পাওয়া দামের গড়"
              color="dark"
            />
          </div>

          <p className="mt-3 text-xs leading-5 text-[#718078]">
            দ্রষ্টব্য: এই সারসংক্ষেপটি আজ, গতকাল, গত সপ্তাহ
            ও গত মাসের দামের ভিত্তিতে। এটি বিভিন্ন বাজারের
            প্রকৃত সর্বনিম্ন, সর্বোচ্চ বা গড় দাম নয়।
          </p>
        </section>

        {/* Back navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-[#DCE6DE] bg-white px-4 py-3 text-sm font-semibold text-[#344238] transition hover:border-[#008F3C] hover:text-[#008F3C]"
          >
            <span aria-hidden="true">←</span>
            সব পণ্যে ফিরে যান
          </Link>

          <p className="text-xs leading-5 text-[#718078]">
            দাম সময় ও বাজারভেদে পরিবর্তিত হতে পারে।
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage({
  params,
}: ProductPageProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}