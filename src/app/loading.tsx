
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 h-8 w-56 animate-pulse rounded-lg bg-gray-200" />

        <div className="mb-8 h-48 animate-pulse rounded-2xl bg-gray-200 sm:h-64" />

        <div className="mb-6 h-6 w-40 animate-pulse rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-4"
            >
              <div className="mb-4 h-36 animate-pulse rounded-xl bg-gray-200" />
              <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="mb-3 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="h-8 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

