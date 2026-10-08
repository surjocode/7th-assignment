import Hero from "@/components/Hero";
import PriceSection from "@/components/PriceSection";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";

const Home = async () => {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#f3f8f4]">
      <Hero />

      <PriceSection products={products} />

      <section
        id="products"
        className="px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#1f2937]">
              সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-[#6b7280]">
              মোট ৩৩টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
};

export default Home;