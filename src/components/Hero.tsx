
import Image from "next/image";
import Link from "next/link";
import CurrentDate from "./CurrentDate";

const Hero = () => {
  return (
    <section className="bg-[#f3f8f4] px-3 py-5 sm:px-5 sm:py-7">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-6 overflow-hidden rounded-2xl border border-gray-200/80 bg-white px-5 py-8 shadow-sm transition-shadow duration-300 hover:shadow-md sm:flex-row sm:gap-8 sm:px-8 sm:py-12 lg:px-14 lg:py-14">
        {/* Left Content */}
        <div className="w-full max-w-2xl">
          {/* Date */}
          <div className="mb-4 inline-flex items-center rounded-full border border-green-100 bg-[#e8f5ec] px-3 py-1.5 text-xs font-medium text-[#16803d]">
            <CurrentDate />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-extrabold leading-snug tracking-tight text-gray-800 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক
            এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <Link
            href="#products"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#008f3c] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#007a33] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Existing Hero Image — unchanged */}
        <div className="relative h-28 w-36 shrink-0 sm:h-36 sm:w-44 md:h-60 md:w-52 lg:h-64 lg:w-66">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্যের ঝুড়ি"
            fill
            priority
            sizes="(max-width: 780px) 144px, (max-width: 1024px) 250px, 300px"
            className="object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;