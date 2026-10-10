import Link from "next/link";
import type { Market, ProductDetails } from "@/lib/api";

interface ProductDetailsViewProps {
  product: ProductDetails;
}

type UnknownRecord = Record<string, unknown>;

const formatPrice = (price: unknown): string => {
  if (typeof price !== "number" || !Number.isFinite(price)) {
    return "তথ্য নেই";
  }

  return price.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
};

const formatMoney = (price: unknown): string => {
  if (typeof price !== "number" || !Number.isFinite(price)) {
    return "তথ্য নেই";
  }

  return `৳ ${formatPrice(price)}`;
};

function getText(record: UnknownRecord, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.trim() !== "") {
      return value;
    }

    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return undefined;
}

function getNumber(record: UnknownRecord, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return undefined;
}

function getUnitBn(unit?: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
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

  if (!unit) return "একক";

  return units[unit.toLowerCase()] ?? unit;
}

function getMarketName(market: Market): string {
  const record = market as UnknownRecord;

  return (
    getText(record, [
      "name",
      "marketName",
      "market",
      "nameBn",
      "title",
      "bazaar",
      "location",
    ]) ?? "বাজারের নাম নেই"
  );
}

function getMarketMin(market: Market): number | undefined {
  return getNumber(market as UnknownRecord, [
    "minPrice",
    "min",
    "minimumPrice",
    "lowestPrice",
    "priceMin",
  ]);
}

function getMarketMax(market: Market): number | undefined {
  return getNumber(market as UnknownRecord, [
    "maxPrice",
    "max",
    "maximumPrice",
    "highestPrice",
    "priceMax",
  ]);
}

function getMarketAverage(market: Market): number | undefined {
  return getNumber(market as UnknownRecord, [
    "avgPrice",
    "averagePrice",
    "avg",
    "average",
    "priceAvg",
    "meanPrice",
    "middlePrice",
  ]);
}

function getMarkets(product: ProductDetails): Market[] {
  const record = product as unknown as UnknownRecord;

  const keys = [
    "markets",
    "marketPrices",
    "marketData",
    "priceByMarket",
    "regionalPrices",
    "areas",
    "locations",
  ];

  for (const key of keys) {
    if (Array.isArray(record[key])) {
      return record[key] as Market[];
    }
  }

  for (const nestedKey of ["data", "result", "details"]) {
    const nested = record[nestedKey];

    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      const nestedRecord = nested as UnknownRecord;

      for (const key of keys) {
        if (Array.isArray(nestedRecord[key])) {
          return nestedRecord[key] as Market[];
        }
      }
    }
  }

  return [];
}

function isImageUrl(value: string): boolean {
  return (
    value.startsWith("https://") ||
    value.startsWith("http://") ||
    value.startsWith("/")
  );
}

function SummaryCard({
  title,
  price,
  description,
  color,
}: {
  title: string;
  price: number | undefined;
  description: string;
  color: "green" | "red" | "dark";
}) {
  const colors = {
    green: "text-[#008F3C]",
    red: "text-red-500",
    dark: "text-[#17251C]",
  };

  return (
    <div className="min-w-0 rounded-xl border border-[#E1EAE3] bg-[#FAFCFA] p-3 transition duration-200 hover:border-[#B8DCC2] hover:shadow-sm sm:p-4">
      <p className="text-xs font-medium text-[#718078]">{title}</p>

      <p
        className={`mt-2 break-words text-lg font-bold sm:text-xl ${colors[color]}`}
      >
        {formatMoney(price)}
      </p>

      <p className="mt-1 text-[11px] leading-5 text-[#7B877F]">{description}</p>
    </div>
  );
}

export default function ProductDetailsView({
  product,
}: ProductDetailsViewProps) {
  const unitBn = getUnitBn(product.unit);
  const change = product.change;
  const direction = change?.dir ?? "same";

  const percentage =
    typeof change?.pct === "number" && Number.isFinite(change.pct)
      ? Math.abs(change.pct)
      : undefined;

  const isUp = direction === "up";
  const isDown = direction === "down";

  const changeStyle = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-[#008F3C]"
      : "bg-gray-100 text-gray-600";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  const changeDescription = isUp
    ? "গতকালের তুলনায় আজ দাম বেড়েছে"
    : isDown
      ? "গতকালের তুলনায় আজ দাম কমেছে"
      : "দাম অপরিবর্তিত";

  const historicalPrices = [
    product.today,
    product.yesterday,
    product.lastWeek,
    product.lastMonth,
  ].filter(
    (price): price is number =>
      typeof price === "number" && Number.isFinite(price),
  );

  const historicalMin =
    historicalPrices.length > 0 ? Math.min(...historicalPrices) : undefined;

  const historicalMax =
    historicalPrices.length > 0 ? Math.max(...historicalPrices) : undefined;

  const historicalAverage =
    historicalPrices.length > 0
      ? historicalPrices.reduce((sum, price) => sum + price, 0) /
        historicalPrices.length
      : undefined;

  const markets = getMarkets(product);
  const productRecord = product as unknown as UnknownRecord;

  const apiMin = getNumber(productRecord, ["minPrice", "minimumPrice"]);

  const apiMax = getNumber(productRecord, ["maxPrice", "maximumPrice"]);

  const apiAverage = getNumber(productRecord, ["avgPrice", "averagePrice"]);

  const summaryMin = apiMin ?? historicalMin;
  const summaryMax = apiMax ?? historicalMax;
  const summaryAverage = apiAverage ?? historicalAverage;

  const hasMarketPrices = markets.some(
    (market) =>
      getMarketMin(market) !== undefined ||
      getMarketMax(market) !== undefined ||
      getMarketAverage(market) !== undefined,
  );

  const imageValue = typeof product.image === "string" ? product.image : "";

  const categoryIcon = product.categoryIcon || "🛒";

  return (
    <main className="min-h-screen bg-[#F0F6F1] px-3 py-4 sm:px-5 sm:py-6">
      <div className="mx-auto max-w-5xl space-y-4">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-[#718078]"
        >
          <Link href="/" className="transition hover:text-[#008F3C]">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-[#008F3C]"
          >
            {product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="font-semibold text-[#26352B]">{product.nameBn}</span>
        </nav>
        {/* Compact product information card */}

        {/* Compact product information card */}
        <section className="rounded-xl border border-[#E2EBE4] bg-white px-3 py-3 shadow-sm sm:px-4">
          <div className="flex items-center justify-between gap-3">
            {/* Product image and information */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F0F6F1] text-2xl sm:h-14 sm:w-14">
                {isImageUrl(imageValue) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageValue}
                    alt={product.nameBn}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{imageValue || categoryIcon}</span>
                )}
              </div>

              <div className="min-w-0">
                <h1 className="break-words text-base font-bold leading-6 text-[#25342A] sm:text-lg">
                  {product.nameBn}
                </h1>

                <p className="mt-0.5 text-[10px] text-[#718078] sm:text-xs">
                  {product.categoryNameBn} · প্রতি {unitBn}
                </p>

                <p className="mt-1 text-[9px] leading-4 text-[#344238] sm:text-xs">
                  {typeof product.yesterday === "number" &&
                  product.today < product.yesterday
                    ? `আজ দাম কমেছে ৳ ${formatPrice(product.yesterday - product.today)}`
                    : typeof product.yesterday === "number" &&
                        product.today > product.yesterday
                      ? `আজ দাম বেড়েছে ৳ ${formatPrice(product.today - product.yesterday)}`
                      : "আজ দাম অপরিবর্তিত"}
                </p>
              </div>
            </div>

            {/* Current price */}
            <div className="min-w-[96px] shrink-0 rounded-xl bg-[#F3F7F3] px-3 py-3 text-center sm:min-w-[120px]">
              <p className="text-[10px] font-medium text-[#718078]">
                আজকের দাম
              </p>

              <p className="mt-1 text-xl font-extrabold leading-6 text-[#25342A] sm:text-2xl">
                {formatPrice(product.today)}
              </p>

              <p className="mt-1 text-[10px] text-[#718078]">টাকা / {unitBn}</p>

              <span
                className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold ${changeStyle}`}
              >
                {changeIcon}{" "}
                {percentage === undefined
                  ? "তথ্য নেই"
                  : `${formatPrice(percentage)}%`}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#E2EBE4] bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-base font-bold text-[#26352B]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard
              title="সর্বনিম্ন দাম"
              price={summaryMin}
              description={
                apiMin !== undefined
                  ? "API-তে দেওয়া সর্বনিম্ন দাম"
                  : "সবচেয়ে কম দামের বাজার"
              }
              color="green"
            />

            <SummaryCard
              title="সর্বোচ্চ দাম"
              price={summaryMax}
              description={
                apiMax !== undefined
                  ? "API-তে দেওয়া সর্বোচ্চ দাম"
                  : "সবচেয়ে বেশি দামের বাজার"
              }
              color="red"
            />

            <SummaryCard
              title="গড় দাম"
              price={summaryAverage}
              description={
                apiAverage !== undefined
                  ? "API-তে দেওয়া গড় দাম"
                  : "প্রতি কেজি-এর হিসাবে"
              }
              color="dark"
            />
          </div>
        </section>
        {/* Market prices table */}
        <section className="overflow-hidden rounded-xl border border-[#E2EBE4] bg-white shadow-sm">
          <div className="px-4 pb-4 pt-5 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-bold text-[#26352B]">
                বাজারভিত্তিক আজকের দাম
              </h2>

              {markets.length > 0 && (
                <span className="rounded-full bg-[#EAF5EC] px-3 py-1 text-xs font-semibold text-[#008F3C]">
                  {markets.length.toLocaleString("bn-BD")}টি এলাকা
                </span>
              )}
            </div>
          </div>

          {markets.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-y border-[#E7EDE8] bg-[#F8FAF8] text-[#718078]">
                      <th className="px-4 py-3 font-semibold">বাজার</th>
                      <th className="px-4 py-3 font-semibold">বিভাগ </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        সর্বনিম্ন
                      </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        সর্বাধিক
                      </th>
                      <th className="px-4 py-3 text-right font-semibold">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => {
                      const record = market as UnknownRecord;
                      const marketName = getMarketName(market);

                      const division = getText(record, [
                        "division",
                        "divisionName",
                        "divisionBn",
                      ]);

                      const district = getText(record, [
                        "district",
                        "districtName",
                        "districtBn",
                      ]);

                      const location = [division, district]
                        .filter((value): value is string => Boolean(value))
                        .filter((value, i, array) => array.indexOf(value) === i)
                        .join(" / ");

                      const min = getMarketMin(market);
                      const max = getMarketMax(market);
                      const actualAverage = getMarketAverage(market);

                      const estimatedAverage =
                        actualAverage === undefined &&
                        min !== undefined &&
                        max !== undefined
                          ? (min + max) / 2
                          : undefined;

                      const displayedAverage =
                        actualAverage ?? estimatedAverage;

                      return (
                        <tr
                          key={`${marketName}-${index}`}
                          className={`border-b border-[#E3EAE4] text-[#344238] last:border-b-0 ${
                            index % 2 === 0 ? "bg-white" : "bg-[#F1F6F2]"
                          }`}
                        >
                          <td className="px-4 py-4 font-medium">
                            {marketName}
                          </td>

                          <td className="px-4 py-4">
                            {location || "তথ্য নেই"}
                          </td>

                          <td className="px-4 py-4 text-right font-semibold text-[#008F3C]">
                            {formatMoney(min)}
                          </td>

                          <td className="px-4 py-4 text-right font-semibold text-red-500">
                            {formatMoney(max)}
                          </td>

                          <td className="px-4 py-3 text-right">
                            {displayedAverage !== undefined ? (
                              <>
                                <p className="font-semibold text-[#26352B]">
                                  {formatMoney(displayedAverage)}
                                </p>

                                {actualAverage === undefined && (
                                  <p className="mt-1 text-[9px] leading-4 text-[#718078]">
                                    আনুমানিক মধ্যবর্তী দাম
                                  </p>
                                )}
                              </>
                            ) : (
                              <span className="text-[#718078]">তথ্য নেই</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {!hasMarketPrices && (
                <div className="border-t border-[#E7EDE8] bg-[#FFFBEB] px-4 py-3">
                  <p className="text-xs leading-5 text-[#92400E]">
                    API-তে বাজারভিত্তিক দামের তথ্য সম্পূর্ণ নয়। আনুমানিক
                    মধ্যবর্তী দাম প্রকৃত গড় দামের বিকল্প নয়।
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="border-t border-[#E7EDE8] px-4 py-10 text-center sm:px-8">
              <div className="text-4xl" aria-hidden="true">
                📊
              </div>

              <p className="mt-3 text-sm font-bold text-[#344238]">
                বাজারভিত্তিক তথ্য পাওয়া যায়নি
              </p>

              <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-[#718078]">
                API response-এ বাজারের তালিকা পাওয়া যায়নি। API-তে বাজারভিত্তিক
                তথ্য থাকতে হবে। শুধু frontend-এর কোড পরিবর্তন করে অনুপস্থিত তথ্য
                তৈরি করা সম্ভব নয়।
              </p>
            </div>
          )}
        </section>
        {/* Price history */}
        <section className="rounded-xl border border-[#E2EBE4] bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-base font-bold text-[#26352B]">
            আগের দামের ইতিহাস
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { title: "আজকের দাম", price: product.today },
              { title: "গতকালের দাম", price: product.yesterday },
              { title: "গত সপ্তাহের দাম", price: product.lastWeek },
              { title: "গত মাসের দাম", price: product.lastMonth },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`rounded-xl border p-3 sm:p-4 ${
                  index === 0
                    ? "border-[#B8DEC3] bg-[#EAF5EC]"
                    : "border-[#E2EBE4] bg-[#FAFCFA]"
                }`}
              >
                <p className="text-[11px] text-[#718078]">{item.title}</p>

                <p
                  className={`mt-2 break-words text-base font-bold sm:text-lg ${
                    index === 0 ? "text-[#008F3C]" : "text-[#26352B]"
                  }`}
                >
                  {formatMoney(item.price)}
                </p>

                <p className="mt-1 text-[10px] text-[#7B877F]">
                  প্রতি {unitBn}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Back link */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[#DCE6DE] bg-white px-4 py-3 text-xs font-semibold text-[#344238] transition hover:border-[#008F3C] hover:text-[#008F3C]"
          >
            <span aria-hidden="true">←</span>
            সব পণ্যে ফিরে যান
          </Link>

          <p className="text-[10px] leading-5 text-[#718078]">
            দাম সময় ও বাজারভেদে পরিবর্তিত হতে পারে।
          </p>
        </div>
      </div>
    </main>
  );
}
