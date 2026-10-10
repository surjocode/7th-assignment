
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  ChevronDown,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

function UserMenuContent() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
      </div>
    );
  }

  const user = session?.user;

  if (user) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
          aria-label="User menu"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100"
        >
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name || "User"}
              className="h-9 w-9 rounded-full border border-gray-200 object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
              <UserRound size={20} />
            </div>
          )}

          <span className="max-w-28 truncate text-sm font-medium text-gray-800">
            {user.name || "User"}
          </span>

          <ChevronDown
            size={15}
            className={`text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setIsOpen(false)}
            />

            <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {user.name || "User"}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <UserRound size={17} />
                আমার প্রোফাইল
              </Link>

              <Link
                href="/profile/update"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <Settings size={17} />
                প্রোফাইল আপডেট
              </Link>

              <div className="my-1 border-t border-gray-100" />

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
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={17} />
                সাইন আউট
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/signin"
        aria-current={pathname === "/signin" ? "page" : undefined}
        className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
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
        className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
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

export default function UserMenu() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2">
          <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-200" />
        </div>
      }
    >
      <UserMenuContent />
    </Suspense>
  );
}