
import SkeletonCard from "@/components/SkeletonCard";
import { TrendingUp } from "lucide-react";

const Loading = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f3f8f4] via-white to-[#f3f8f4] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 animate-pulse items-center justify-center rounded-xl bg-green-100 text-green-600">
                <TrendingUp size={20} />
              </div>

              <div className="h-5 w-28 animate-pulse rounded-md bg-green-100" />
            </div>

            <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200 sm:w-64" />

            <div className="mt-3 h-4 w-64 max-w-full animate-pulse rounded-md bg-gray-100 sm:w-80" />
          </div>

          {/* Live Status */}
          <div className="flex w-fit items-center gap-2 rounded-full border border-green-100 bg-white px-4 py-2 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>

            <span className="text-xs font-medium text-gray-600">
              বাজার দর লোড হচ্ছে...
            </span>
          </div>
        </div>

        {/* Summary Skeletons */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 h-4 w-28 animate-pulse rounded bg-gray-100" />
              <div className="h-7 w-36 max-w-full animate-pulse rounded-md bg-gray-200" />
              <div className="mt-3 h-3 w-24 animate-pulse rounded bg-gray-100" />
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="h-6 w-36 animate-pulse rounded-md bg-gray-200" />
            <div className="mt-2 h-3 w-48 max-w-full animate-pulse rounded bg-gray-100" />
          </div>

          <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
        </div>

        {/* Product Skeleton Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <SkeletonCard />
            </div>
          ))}
        </div>

        {/* Bottom Loading Indicator */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 pb-6">
          <span className="loading loading-spinner loading-md text-green-600" />

          <p className="text-sm text-gray-500">
            সর্বশেষ বাজার দর সংগ্রহ করা হচ্ছে
          </p>
        </div>
      </div>
    </main>
  );
};

export default Loading;
