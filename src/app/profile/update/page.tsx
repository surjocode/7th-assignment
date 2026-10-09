
"use client";

import { useEffect, useState, } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session?.user]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <LoaderCircle className="animate-spin text-[#078b43]" size={32} />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4">
        <div className="rounded-xl border border-[#dfe8df] bg-white p-6 text-center">
          <p className="text-gray-700">
            প্রোফাইল আপডেট করতে আগে সাইন ইন করুন।
          </p>
          <Link
            href="/signin"
            className="mt-4 inline-block rounded-lg bg-[#078b43] px-5 py-2.5 text-sm font-semibold text-white"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/profile"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-[#078b43]"
        >
          <ArrowLeft size={17} />
          প্রোফাইলে ফিরে যান
        </Link>

        <section className="rounded-xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:p-7">
          <h1 className="text-2xl font-bold text-[#263329]">
            প্রোফাইল আপডেট
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                className="w-full rounded-lg border border-[#dfe8df] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                value={session.user.email}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-[#e1e9e1] bg-gray-100 px-3 py-3 text-sm text-gray-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                এই ফর্ম থেকে ইমেইল পরিবর্তন করা যাবে না।
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#078b43] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067538] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? "আপডেট হচ্ছে..." : "আপডেট সংরক্ষণ করুন"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}