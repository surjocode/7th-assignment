const SkeletonCard = () => {
  return (
    <div className="rounded-xl border border-[#e2e8e4] bg-white p-3">
      {/* Top */}
      <div className="flex items-center gap-2">
        {/* Icon */}
        <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />

        {/* Name */}
        <div className="flex-1">
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-2 w-12 animate-pulse rounded bg-gray-100" />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 flex items-end justify-between">
        {/* Price */}
        <div>
          <div className="h-2 w-16 animate-pulse rounded bg-gray-100" />

          <div className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Change */}
        <div className="h-5 w-12 animate-pulse rounded-full bg-gray-100" />
      </div>
    </div>
  );
};

export default SkeletonCard;