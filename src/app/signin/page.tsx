"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, LockKeyhole, LoaderCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(result.error.message || "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে");
      }
    } catch {
      toast.error("সোশ্যাল সাইন ইন করা যায়নি");
    } finally {
      setSocialLoading("");
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f5f1] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>

          <p className="mt-2 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <section className="rounded-2xl border border-[#e2e8e4] bg-white p-5 shadow-sm sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                ইমেইল
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-lg border border-[#dfe8df] bg-[#fbfdfb] py-3 pl-10 pr-10 text-sm text-[#263329] outline-none transition placeholder:text-gray-400 focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-lg border border-[#dfe8df] bg-[#fbfdfb] py-3 pl-10 pr-10 text-sm text-[#263329] outline-none transition placeholder:text-gray-400 focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || socialLoading !== ""}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#008f3c] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#007a33] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <LoaderCircle size={18} className="animate-spin" />}
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={loading || socialLoading !== ""}
              className="flex w-full min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-200 px-2 py-3 text-[11px] font-medium text-gray-700 transition hover:border-[#008f3c] hover:bg-gray-50 disabled:opacity-60 sm:text-xs"
            >
              <FcGoogle className="shrink-0" size={16} />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={loading || socialLoading !== ""}
              className="flex w-full min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-200 px-2 py-3 text-[11px] font-medium text-gray-700 transition hover:border-[#008f3c] hover:bg-gray-50 disabled:opacity-60 sm:text-xs"
            >
              <FaGithub className="shrink-0" size={16} />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#008f3c] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </section>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-[#008f3c]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
