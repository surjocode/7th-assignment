
const SkeletonCard = () => {
  return (
    <div className="rounded-2xl border border-[#e5eee7] bg-white p-4 shadow-sm">
      {/* Product Header */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 animate-pulse rounded-xl bg-green-100" />

        <div className="flex-1">
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-3 w-16 animate-pulse rounded bg-gray-100" />
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gray-100" />

      {/* Product Price */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
          <div className="mt-3 h-7 w-28 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="h-7 w-16 animate-pulse rounded-full bg-green-50" />
      </div>
    </div>
  );
};

export default SkeletonCard;
