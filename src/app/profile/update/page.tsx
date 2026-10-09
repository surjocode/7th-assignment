
"use client";

import { useState, } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

type ProfileUpdateFormProps = {
  initialName: string;
  email: string;
};

function ProfileUpdateForm({
  initialName,
  email,
}: ProfileUpdateFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    if (trimmedName.length > 100) {
      toast.error("নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারবে");
      return;
    }

    if (trimmedName === initialName) {
      toast.info("আপনার নামে কোনো পরিবর্তন করা হয়নি");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(
          error.message || "প্রোফাইল আপডেট করা যায়নি"
        );
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <section className="rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#263329]"
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
              disabled={saving}
              placeholder="আপনার নাম লিখুন"
              className="w-full rounded-lg border border-[#dfe8df] bg-transparent px-3 py-3 text-sm text-[#263329] outline-none transition placeholder:text-gray-400 focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#263329]"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-[#e1e9e1] bg-gray-100 px-3 py-3 text-sm text-gray-500 outline-none"
            />

            <p className="mt-2 text-xs text-gray-400">
              এই ফর্ম থেকে ইমেইল পরিবর্তন করা যাবে না।
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#078b43] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067538] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
            ) : (
              <Save size={18} />
            )}

            {saving
              ? "আপডেট হচ্ছে..."
              : "আপডেট সংরক্ষণ করুন"}
          </button>
        </form>
      </section>

      <div className="mt-6 text-center">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#078b43]"
        >
          <ArrowLeft size={16} />
          প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </>
  );
}

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0]">
        <LoaderCircle
          className="animate-spin text-[#078b43]"
          size={32}
        />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-7 text-center">
          <h1 className="text-xl font-bold text-[#263329]">
            সাইন ইন প্রয়োজন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            প্রোফাইল আপডেট করতে আগে সাইন ইন করুন।
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

  return (
    <main className="min-h-[70vh] bg-[#f0f5f0] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#263329]">
            প্রোফাইল আপডেট
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন।
          </p>
        </header>

        <ProfileUpdateForm
          key={session.user.id}
          initialName={session.user.name || ""}
          email={session.user.email || ""}
        />
      </div>
    </main>
  );
}

