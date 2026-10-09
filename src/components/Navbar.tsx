import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import CurrentDate from "@/components/CurrentDate";
import CategoryNav from "@/components/CategoryNav";
import UserMenu from "@/components/UserMenu";

import { getCategories } from "@/lib/api";

interface Category {
  id: number | string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  let categories: Category[] = [];

  try {
    categories = await getCategories();
  } catch (error) {
    console.error(
      "Failed to fetch navbar categories:",
      error
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
        {/* Top Navbar */}
        <div className="flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-20">
          {/* Logo and Date */}
          <Link
            href="/"
            aria-label="বাজার দর হোম পেজ"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-50 sm:h-12 sm:w-12">
              <Image
                src="/Stack.png"
                alt="বাজার দর"
                width={48}
                height={48}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold tracking-tight text-gray-900 sm:text-lg md:text-xl">
                বাজার <span className="text-[rgb(86,243,7)]">দর</span>
              </h1>

              <div className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                <CurrentDate />
              </div>
            </div>
          </Link>

          {/* Authentication */}
          <div className="flex shrink-0 items-center gap-2">
            <UserMenu />
          </div>
        </div>

        {/* Category Navigation */}
        <Suspense
          fallback={
            <nav
              aria-label="পণ্যের বিভাগ"
              className="flex min-h-12 items-center justify-center border-t border-gray-100 px-3 py-2"
            >
              <span className="text-sm text-gray-500">
                বিভাগ লোড হচ্ছে...
              </span>
            </nav>
          }
        >
          <CategoryNav categories={categories} />
        </Suspense>
      </div>

      {/* Bottom Accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-green-600 via-emerald-400 to-lime-400" />
    </header>
  );
};

export default Navbar;