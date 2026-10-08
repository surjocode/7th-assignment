import SkeletonCard from "@/components/SkeletonCard";

const Loading = () => {
  return (
    <main className="min-h-screen bg-[#f3f8f4] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-5">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-3 w-48 animate-pulse rounded bg-gray-100" />
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;