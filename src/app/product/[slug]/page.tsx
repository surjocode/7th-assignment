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

function ProductLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="min-h-72 animate-pulse rounded-2xl bg-gray-200 sm:min-h-96" />

        <div className="space-y-5">
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-16 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-40 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}

async function ProductPageContent({ params }: ProductPageProps) {
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
  } catch (error) {
    console.error("Failed to load product:", error);

    throw new Error(
      "পণ্যের তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailsView product={product} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}
