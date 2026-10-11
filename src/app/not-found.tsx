
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-gradient-to-b from-red-50 via-white to-rose-50 px-4 py-16">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-rose-100/70 blur-3xl" />

      <div className="relative mx-auto w-full max-w-xl text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-red-100 bg-white text-red-500 shadow-lg shadow-red-100/60">
          <SearchX size={38} strokeWidth={1.7} />
        </div>

        {/* 404 Number */}
        <h1 className="bg-gradient-to-r from-red-600 via-rose-500 to-red-400 bg-clip-text text-8xl font-black tracking-tight text-transparent sm:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে,
          ঠিকানা পরিবর্তন হয়েছে অথবা পেজটি আর উপলব্ধ নেই।
        </p>

        {/* Error Badge */}
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          Page Not Found
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <Home size={18} />
            হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <ArrowLeft size={18} />
            হোম পেজে ফিরে যান
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-400">
          BazarDor · বাজার দর
        </p>
      </div>
    </main>
  );
};

export default NotFound;
