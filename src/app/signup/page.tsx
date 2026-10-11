
"use client";

import { useState, } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  LoaderCircle,
  UserRound,
  Mail,
  LockKeyhole,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] =
    useState<SocialProvider | "">("");

  const inputClass =
    "w-full rounded-lg border border-[#dfe8df] bg-[#fbfdfb] py-3 pl-10 pr-10 text-sm text-[#263329] outline-none transition placeholder:text-gray-400 focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10 disabled:opacity-60";

  const isBusy = loading || socialLoading !== "";

  // Email and password signup
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("কমপক্ষে ২ অক্ষরের নাম লিখুন");
      return;
    }

    if (!email.trim()) {
      toast.error("ইমেইল লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি"
        );
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google and GitHub signup
  const handleSocialSignUp = async (
    provider: SocialProvider
  ) => {
    if (isBusy) return;

    setSocialLoading(provider);

    try {
      // OAuth redirect-এর আগে provider সংরক্ষণ
      sessionStorage.setItem(
        "social-login-pending",
        provider
      );

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/?auth=success",
        errorCallbackURL: "/signup?auth=error",
      });

      if (error) {
        sessionStorage.removeItem("social-login-pending");

        toast.error(
          error.message || "সোশ্যাল সাইন আপ করা যায়নি"
        );

        setSocialLoading("");
      }
    } catch (error) {
      console.error("Social signup error:", error);

      sessionStorage.removeItem("social-login-pending");

      toast.error("সোশ্যাল সাইন আপ করা যায়নি");
      setSocialLoading("");
    }
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#f0f5f0] px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[420px]">
        <header className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#078b43] text-white shadow-sm">
            <UserRound size={25} />
          </div>

          <h1 className="text-2xl font-bold text-[#263329]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </header>

        <section className="rounded-xl border border-[#dfe8df] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-medium text-gray-800"
              >
                আপনার নাম
              </label>

              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: আপনার নাম"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                  disabled={isBusy}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-gray-800"
              >
                ইমেইল
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isBusy}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-gray-800"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  disabled={isBusy}
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "পাসওয়ার্ড লুকান"
                      : "পাসওয়ার্ড দেখুন"
                  }
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-xs font-medium text-gray-800"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="আবার পাসওয়ার্ড লিখুন"
                  autoComplete="new-password"
                  required
                  disabled={isBusy}
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "পাসওয়ার্ড লুকান"
                      : "পাসওয়ার্ড দেখুন"
                  }
                  aria-pressed={showConfirmPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isBusy}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#078b43] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#067538] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
              )}

              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">
              অথবা
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignUp("google")}
              disabled={isBusy}
              className="flex w-full min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-200 px-2 py-3 text-[11px] font-medium text-gray-700 transition hover:border-[#008f3c] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
            >
              {socialLoading === "google" ? (
                <LoaderCircle
                  size={16}
                  className="shrink-0 animate-spin"
                />
              ) : (
                <FcGoogle
                  size={16}
                  className="shrink-0"
                />
              )}

              <span>
                {socialLoading === "google"
                  ? "অপেক্ষা করুন..."
                  : "Google দিয়ে চালিয়ে যান"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignUp("github")}
              disabled={isBusy}
              className="flex w-full min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-gray-200 px-2 py-3 text-[11px] font-medium text-gray-700 transition hover:border-[#008f3c] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
            >
              {socialLoading === "github" ? (
                <LoaderCircle
                  size={16}
                  className="shrink-0 animate-spin"
                />
              ) : (
                <FaGithub
                  size={16}
                  className="shrink-0"
                />
              )}

              <span>
                {socialLoading === "github"
                  ? "অপেক্ষা করুন..."
                  : "GitHub দিয়ে চালিয়ে যান"}
              </span>
            </button>
          </div>

          {/* Signin Link */}
          <p className="mt-4 text-center text-xs text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#078b43] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </section>

        {/* Home Link */}
        <Link
          href="/"
          className="mt-5 flex items-center justify-center gap-1 text-xs text-gray-500 transition hover:text-[#078b43]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
