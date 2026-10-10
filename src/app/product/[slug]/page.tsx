
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import type { ProductDetails } from "@/lib/api";

import ProductDetailsView from "./ProductDetailsView";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-[#F0F6F1] px-3 py-5 sm:px-5">
      <div className="mx-auto max-w-5xl animate-pulse space-y-4">
        <div className="h-4 w-40 rounded bg-[#DDE7DF]" />
        <div className="h-28 rounded-xl bg-white" />
        <div className="h-40 rounded-xl bg-white" />
        <div className="h-64 rounded-xl bg-white" />
      </div>
    </main>
  );
}

async function ProductPageContent({
  params,
}: ProductPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const { slug } = await params;

  let product: ProductDetails | undefined;

  try {
    product = await getProductBySlug(slug);
  } catch {
    throw new Error(
      "পণ্যের তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailsView product={product} />;
}

export default function ProductPage({
  params,
}: ProductPageProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}
