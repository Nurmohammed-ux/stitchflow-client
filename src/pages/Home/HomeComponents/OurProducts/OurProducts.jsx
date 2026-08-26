import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import { FaArrowUpRightFromSquare, FaBoxOpen } from "react-icons/fa6";
import { Link } from "react-router";
import ProductCard from "../../../../components/ProductCard/ProductCard";

const OurProducts = () => {
  const axios = useAxios();
  const { data: products = [] } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const res = await axios.get("/products/our-products?limit=6");
      return res.data;
    },
  });
  return (
    <section className="relative overflow-hidden bg-[#f8faf8] py-24 md:py-32">
      {/* Decorative Blueprint Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#062746 1px, transparent 1px),
            linear-gradient(90deg, #062746 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative Circle */}
      <div className="pointer-events-none absolute -right-40 top-20 h-125 w-125 rounded-full border border-secondary/5" />
      <div className="pointer-events-none absolute -right-20 top-40 h-75 w-75 rounded-full border border-primary/10" />

      <div className="relative px-5 md:px-15 lg:px-25">
        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
                Our Products
              </span>

              <span className="hidden h-px w-20 bg-primary/60 sm:block" />
            </div>

            <h2 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-7xl">
              Built for your,
              <span className="ml-3 text-primary">next collection.</span>
            </h2>

            <p className="mt-7 text-base leading-relaxed text-secondary/50 md:text-lg">
              Explore production-ready garments manufactured for brands,
              retailers and businesses. Choose a product and see its
              specifications, availability and ordering options.
            </p>
            {/* Section Code */}
            <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30 mt-6">
              SF / PRODUCTS / 002
            </p>
          </div>
        </div>

        {/* ================= PRODUCT GRID ================= */}

        {products.length > 0 ? (
          <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-20 flex min-h-80 items-center justify-center rounded-4xl border border-secondary/10 bg-white">
            <div className="text-center">
              <FaBoxOpen className="mx-auto text-4xl text-secondary/20" />

              <p className="mt-4 text-sm font-semibold text-secondary/50">
                No products available
              </p>
            </div>
          </div>
        )}

        {/* ================= BOTTOM ================= */}

        <div className="mt-16 flex flex-col gap-6 border-t border-secondary/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary/30">
              Production catalog
            </p>

            <p className="mt-2 text-sm text-secondary/50">
              Discover more products from the StitchFlow catalog.
            </p>
          </div>

          <Link
            to="/all-products"
            className="group flex w-fit items-center gap-3 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b355c] hover:shadow-xl hover:shadow-secondary/10"
          >
            View All Products
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover:rotate-45">
              <FaArrowUpRightFromSquare size={11} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
