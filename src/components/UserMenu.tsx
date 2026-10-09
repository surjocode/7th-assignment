
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, UserRound, LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      setIsOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Link
          href="/signin"
          className="rounded-md px-2 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100 sm:px-3 sm:py-2 sm:text-sm"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-md bg-green-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-green-700 sm:px-4 sm:py-2 sm:text-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const displayName = user.name || "ব্যবহারকারী";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={displayName}
            width={36}
            height={36}
            unoptimized
            className="h-9 w-9 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
            {initial}
          </span>
        )}

        <span className="hidden max-w-28 truncate text-sm font-medium text-gray-800 sm:block">
          {displayName}
        </span>

        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white p-2 shadow-lg sm:w-72"
          >
            <div className="border-b border-gray-100 px-3 py-3">
              <p className="truncate text-sm font-semibold text-gray-900">
                {displayName}
              </p>

              <p className="mt-1 truncate text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <Link
              href="/profile/update"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              <UserRound size={17} />
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-60"
            >
              <LogOut size={17} />
              {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

