export default function Loading() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-sm sm:px-6 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 animate-pulse items-center justify-center rounded-xl bg-emerald-100">
              <div className="h-5 w-5 rounded-md bg-emerald-300" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-36 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          <div className="hidden h-10 w-32 animate-pulse rounded-xl bg-emerald-100 sm:block" />
        </header>

        <section
          className="flex flex-col items-center py-12 text-center sm:py-16"
          role="status"
          aria-live="polite"
        >
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 3h2l2.4 11.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
                <circle cx="10" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
              </svg>
            </div>
          </div>

          <h1 className="mt-6 text-xl font-bold text-gray-800 sm:text-2xl">
            বাজার দর লোড হচ্ছে...
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
            আপনার জন্য নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম সংগ্রহ করা হচ্ছে।
            অনুগ্রহ করে একটু অপেক্ষা করুন।
          </p>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-600" />
          </div>
        </section>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-6 w-40 animate-pulse rounded-lg bg-gray-200 sm:w-52" />
            <div className="h-3 w-52 animate-pulse rounded bg-gray-100 sm:w-64" />
          </div>

          <div className="h-9 w-24 animate-pulse rounded-xl bg-emerald-100" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-shadow sm:p-5"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 animate-pulse rounded-2xl bg-emerald-50 sm:h-20 sm:w-20" />

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-emerald-50/70 p-4">
                <div className="h-3 w-20 animate-pulse rounded bg-emerald-100" />
                <div className="mt-3 h-7 w-32 animate-pulse rounded-lg bg-emerald-100" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                <div className="h-9 w-24 animate-pulse rounded-xl bg-emerald-100" />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          বাজার দর · BazarDor
        </p>
      </div>
    </main>
  );
}
