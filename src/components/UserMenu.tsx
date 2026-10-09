"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex gap-2">
        <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
            pathname === "/profile"
              ? "bg-green-600 text-white"
              : "border border-gray-200 text-gray-700 hover:bg-green-50"
          }`}
        >
          {session.user.name || "আমার প্রোফাইল"}
        </Link>

        <button
          type="button"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  window.location.href = "/";
                },
              },
            });
          }}
          className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        aria-current={pathname === "/signin" ? "page" : undefined}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          pathname === "/signin"
            ? "bg-green-600 text-white shadow-sm"
            : "border border-green-600 bg-white text-green-700 hover:bg-green-50"
        }`}
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        aria-current={pathname === "/signup" ? "page" : undefined}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
          pathname === "/signup"
            ? "bg-green-600 text-white shadow-sm"
            : "border border-green-600 bg-white text-green-700 hover:bg-green-50"
        }`}
      >
        সাইন আপ
      </Link>
    </div>
  );
}