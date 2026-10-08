import Image from "next/image";
import Link from "next/link";

import CurrentDate from "./CurrentDate";

const Hero = () => {
  return (
    <section className="bg-[#f3f8f4] px-3 py-4 sm:px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-5 sm:px-7 sm:py-15 lg:px-15">
        {/* Left Content */}
        <div className="max-w-2xl">
          {/* Date */}
          <div className="mb-2 inline-flex rounded-full bg-[#e8f5ec] px-3 py-1 text-xs font-medium text-[#16803d]">
            <CurrentDate />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-
            <br className="hidden sm:block" />
            সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <Link
            href="#products"
            className="mt-4 inline-block rounded-md bg-[#008f3c] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#007a33] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative hidden h-32 w-44 shrink-0 sm:block md:h-36 md:w-52">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্যের ঝুড়ি"
            fill
            priority
            className="object-contain"
          />
        </div>
        
      </div>
    </section>
  );
};

export default Hero;