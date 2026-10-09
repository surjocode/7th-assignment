import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-12 border-t-4 border-[#078b43] bg-[#17221b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-2xl font-extrabold tracking-tight"
            >
              Bazar<span className="text-[#8edb67]">Dor</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-7 text-gray-300">
              প্রতিদিনের বাজারদর জানুন সহজে। বিভিন্ন পণ্যের
              দাম তুলনা করুন এবং সঠিক সিদ্ধান্ত নিন।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">
              প্রয়োজনীয় লিংক
            </h3>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-[#8edb67]"
                >
                  হোম
                </Link>
              </li>
              <li>
                <Link
                  href="/category/chal"
                  className="transition hover:text-[#8edb67]"
                >
                  চাল
                </Link>
              </li>
              <li>
                <Link
                  href="/category/shobji"
                  className="transition hover:text-[#8edb67]"
                >
                  শাকসবজি
                </Link>
              </li>
              <li>
                <Link
                  href="/category/mach"
                  className="transition hover:text-[#8edb67]"
                >
                  মাছ
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">
              আমাদের সম্পর্কে
            </h3>

            <p className="text-sm leading-7 text-gray-300">
              BazarDor-এর লক্ষ্য হলো বাজারের পণ্যের দাম
              সম্পর্কে স্বচ্ছ ধারণা দিয়ে ক্রেতাদের
              সচেতন সিদ্ধান্ত নিতে সহায়তা করা।
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-4 text-base font-bold text-white">
              কেন BazarDor?
            </h3>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>✓ সহজে বাজারদর দেখা</li>
              <li>✓ পণ্যের দাম তুলনা</li>
              <li>✓ ব্যবহারবান্ধব ডিজাইন</li>
              <li>✓ মোবাইল ও কম্পিউটারে ব্যবহারযোগ্য</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 border-t border-white/15 pt-5">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs leading-6 text-gray-400 sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} BazarDor। সর্বস্বত্ব সংরক্ষিত।
            </p>

            <p>
              সঠিক বাজারদর, সচেতন ক্রেতা
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;