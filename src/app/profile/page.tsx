
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  UserRound,
  Pencil,
  LogOut,
  LoaderCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");

      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <LoaderCircle
          className="animate-spin text-[#078b43]"
          size={32}
        />
      </main>
    );
  }

  // User is not signed in
  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-[#dfe8df] bg-white p-7 text-center">
          <UserRound
            className="mx-auto mb-3 text-[#078b43]"
            size={40}
          />

          <h1 className="text-xl font-bold text-gray-800">
            প্রোফাইল দেখতে সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য দেখতে লগইন করুন।
          </p>

          <Link
            href="/signin"
            className="mt-5 inline-flex rounded-lg bg-[#078b43] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#067538]"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  // Profile page
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-5">
          <h1 className="text-2xl font-bold text-[#263329]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* User summary */}
        <section className="flex flex-col gap-4 rounded-xl border border-[#dfe8df] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "প্রোফাইল"}
                width={56}
                height={56}
                unoptimized
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#e7f3e9] text-[#078b43]">
                <UserRound size={28} />
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate font-semibold text-[#263329]">
                {user.name || "ব্যবহারকারী"}
              </h2>

              <p className="truncate text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {signingOut ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <LogOut size={16} />
            )}

            {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </section>

        {/* Account information */}
        <section className="mt-5 rounded-xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:p-6">
          <h2 className="mb-5 font-semibold text-[#263329]">
            অ্যাকাউন্টের তথ্য
          </h2>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-gray-600">নাম</p>

              <p className="rounded-lg border border-[#e1e9e1] px-3 py-3 text-sm text-gray-800">
                {user.name || "নাম দেওয়া হয়নি"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-600">ইমেইল</p>

              <p className="break-all rounded-lg border border-[#e1e9e1] px-3 py-3 text-sm text-gray-800">
                {user.email}
              </p>
            </div>

            <Link
              href="/profile/update"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#078b43] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067538]"
            >
              <Pencil size={16} />
              প্রোফাইল আপডেট করুন
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

