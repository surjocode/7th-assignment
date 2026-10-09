
import Image from "next/image";
import Link from "next/link";
import CurrentDate from "@/components/CurrentDate";
import { getCategories } from "@/lib/api";
import UserMenu from "@/components/UserMenu";

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
    console.error("Failed to fetch navbar categories:", error);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-3 sm:px-5 lg:px-6">
        {/* Top Navbar */}
        <div className="flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <Image
              src="/Stack.png"
              alt="বাজার দর"
              width={50}
              height={50}
              priority
              className="h-9 w-9 shrink-0 object-contain sm:h-11 sm:w-11 md:h-12 md:w-12"
            />

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-gray-900 sm:text-lg md:text-xl">
                বাজার দর
              </h1>

              <CurrentDate />
            </div>
          </Link>

          {/* Auth Buttons / User Menu */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <UserMenu />
          </div>
        </div>

        {/* Category Navigation */}
        <nav
          aria-label="পণ্যের বিভাগ"
          className="-mx-3 flex items-center gap-1 overflow-x-auto border-t border-gray-100 px-3 py-2 sm:justify-center sm:gap-2 md:gap-4 lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Home */}
          <Link
            href="/"
            className="shrink-0 rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-semibold text-green-600 transition hover:bg-green-100 sm:px-3 sm:text-sm"
          >
            🏠 হোম
          </Link>

          {/* Dynamic Categories */}
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="shrink-0 rounded-md px-2.5 py-1.5 text-xs text-gray-600 transition hover:bg-gray-100 hover:text-green-600 sm:text-sm"
            >
              {category.icon} {category.nameBn}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

