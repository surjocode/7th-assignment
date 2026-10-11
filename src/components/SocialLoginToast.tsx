
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function SocialLoginToast() {
  const searchParams = useSearchParams();
  const { data: session, isPending } = authClient.useSession();

  const authStatus = searchParams.get("auth");

  useEffect(() => {
    if (authStatus === "error") {
      sessionStorage.removeItem("social-login-pending");
      toast.error("সোশ্যাল লগইন সম্পন্ন হয়নি। আবার চেষ্টা করুন.");
      window.history.replaceState({}, "", "/signin");
      return;
    }

    if (authStatus !== "success" || isPending) {
      return;
    }

    if (!session?.user) {
      return;
    }

    const provider = sessionStorage.getItem(
      "social-login-pending"
    );

    if (provider !== "google" && provider !== "github") {
      return;
    }

    sessionStorage.removeItem("social-login-pending");

    toast.success(
      provider === "google"
        ? "Google দিয়ে সফলভাবে সাইন ইন হয়েছে!"
        : "GitHub দিয়ে সফলভাবে সাইন ইন হয়েছে!"
    );

    window.history.replaceState({}, "", "/");
  }, [authStatus, isPending, session]);

  return null;
}
