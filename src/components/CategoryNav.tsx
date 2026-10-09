"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: number | string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryNavProps {
  categories: Category[];
}

export default function CategoryNav({
  categories,
}: CategoryNavProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <nav
      aria-label="পণ্যের বিভাগ"
      className="-mx-3 flex items-center gap-1 overflow-x-auto border-t border-gray-100 px-3 py-2 sm:mx-0 sm:justify-center sm:gap-2 sm:px-0 md:gap-4 lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* Home */}
      <Link
        href="/"
        aria-current={isHome ? "page" : undefined}
        className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
          isHome
            ? "bg-green-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-green-50 hover:text-green-700"
        }`}
      >
        <span aria-hidden="true">🏠</span>
        <span>হোম</span>
      </Link>

      {/* Dynamic Categories */}
      {categories.map((category) => {
        const href = `/category/${category.slug}`;

        const isActive =
          pathname === href ||
          pathname.startsWith(`${href}/`);

        return (
          <Link
            key={category.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
              isActive
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            <span aria-hidden="true">{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
}