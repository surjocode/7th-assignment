import Image from "next/image";
import Link from "next/link";
import CurrentDate from "@/components/CurrentDate";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-3 sm:px-5 lg:px-6">

        {/* ================= TOP NAVBAR ================= */}
        <div className="flex min-h-16 items-center justify-between gap-3 py-2 sm:min-h-20">

          {/* ================= LOGO ================= */}
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

              {/* Current Bangla Date */}
              <CurrentDate />
            </div>
          </Link>

          {/* ================= AUTH BUTTONS ================= */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">

            <Link
              href="/signin"
              className="
                rounded-md
                px-2
                py-1.5
                text-xs
                font-medium
                text-gray-700
                transition
                duration-200
                hover:bg-gray-100
                sm:px-3
                sm:py-2
                sm:text-sm
              "
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="
                rounded-md
                bg-green-600
                px-2.5
                py-1.5
                text-xs
                font-medium
                text-white
                shadow-sm
                transition
                duration-200
                hover:bg-green-700
                sm:px-4
                sm:py-2
                sm:text-sm
              "
            >
              সাইন আপ
            </Link>

          </div>
        </div>

        {/* ================= CATEGORY NAVIGATION ================= */}
        <nav
          className="
            -mx-3
            flex
            items-center
            gap-1
            overflow-x-auto
            border-t
            border-gray-100
            px-3
            py-2

            sm:justify-center
            sm:gap-2

            md:gap-4

            lg:gap-6

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >

          {/* Home */}
          <Link
            href="/"
            className="
              shrink-0
              rounded-md
              bg-green-50
              px-2.5
              py-1.5
              text-xs
              font-semibold
              text-green-600
              transition
              duration-200
              hover:bg-green-100
              sm:px-3
              sm:text-sm
            "
          >
            🏠 হোম
          </Link>

          {/* চাল */}
          <Link
            href="/category/chal"
            className="
              shrink-0 rounded-md px-2.5 py-1.5
              text-xs text-gray-600
              transition duration-200
              hover:bg-gray-100 hover:text-green-600
              sm:text-sm
            "
          >
            🍚 চাল
          </Link>

          {/* ডাল */}
          <Link
            href="/category/dal"
            className="
              shrink-0 rounded-md px-2.5 py-1.5
              text-xs text-gray-600
              transition duration-200
              hover:bg-gray-100 hover:text-green-600
              sm:text-sm
            "
          >
            🫘 ডাল
          </Link>

          {/* সবজি */}
          <Link
            href="/category/vegetables"
            className="
              shrink-0 rounded-md px-2.5 py-1.5
              text-xs text-gray-600
              transition duration-200
              hover:bg-gray-100 hover:text-green-600
              sm:text-sm
            "
          >
            🥔 সবজি
          </Link>

          {/* মাছ */}
          <Link
            href="/category/fish"
            className="
              shrink-0 rounded-md px-2.5 py-1.5
              text-xs text-gray-600
              transition duration-200
              hover:bg-gray-100 hover:text-green-600
              sm:text-sm
            "
          >
            🐟 মাছ
          </Link>

          {/* মাংস */}
          <Link
            href="/category/meat"
            className="
              shrink-0 rounded-md px-2.5 py-1.5
              text-xs text-gray-600
              transition duration-200
              hover:bg-gray-100 hover:text-green-600
              sm:text-sm
            "
          >
            🍗 মাংস
          </Link>

          {/* ডিম */}
          <Link
            href="/category/egg"
            className="
              shrink-0 rounded-md px-2.5 py-1.5
              text-xs text-gray-600
              transition duration-200
              hover:bg-gray-100 hover:text-green-600
              sm:text-sm
            "
          >
            🥚 ডিম
          </Link>

          {/* মসলা */}
          <Link
            href="/category/spices"
            className="
              shrink-0 rounded-md px-2.5 py-1.5
              text-xs text-gray-600
              transition duration-200
              hover:bg-gray-100 hover:text-green-600
              sm:text-sm
            "
          >
            🌶️ মসলা
          </Link>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;