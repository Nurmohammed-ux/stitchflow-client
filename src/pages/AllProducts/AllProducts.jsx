import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBoxOpen,
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import useAxios from "../../hooks/useAxios";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loading from "../../components/Loading/Loading";

const AllProducts = () => {
  const axios = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  // Fetch products with search & pagination query parameters
  const { data = {}, isLoading } = useQuery({
    queryKey: ["all-products", searchQuery, currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `/products?search=${searchQuery}&page=${currentPage}&limit=${limit}`,
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const products = data.products || [];
  const totalProducts = data.totalProducts || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 on new search
    setSearchQuery(searchTerm);
  };

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

      {/* Decorative Circles */}
      <div className="pointer-events-none absolute -right-40 top-20 h-125 w-125 rounded-full border border-secondary/5" />
      <div className="pointer-events-none absolute -right-20 top-40 h-75 w-75 rounded-full border border-primary/10" />

      <div className="relative px-5 md:px-15 lg:px-25">
        {/* ================= HEADER & SEARCH BAR ================= */}

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
                Complete Catalog
              </span>
              <span className="hidden h-px w-20 bg-primary/60 sm:block" />
            </div>

            <h2 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-7xl">
              All production,
              <span className="ml-3 text-primary">at a glance.</span>
            </h2>

            <p className="mt-7 text-base leading-relaxed text-secondary/50 md:text-lg">
              Browse our full inventory of garments ready for bulk retail
              orders, customization, and streamlined
              <br className="hidden lg:inline" /> production workflows.
            </p>

            <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30 mt-6">
              SF / PRODUCTS / ALL
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full md:w-120 items-center"
          >
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-secondary/30">
                <FaMagnifyingGlass size={16} />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-2xl border border-secondary/10 bg-white py-4 pl-11 pr-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </form>
        </div>

        {/* ================= PRODUCT GRID ================= */}

        {isLoading ? (
          <Loading />
        ) : products.length > 0 ? (
          <>
            <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/10 bg-white text-secondary transition-all hover:border-primary disabled:opacity-30 disabled:hover:border-secondary/10"
                >
                  <FaChevronLeft size={14} />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                        currentPage === pageNum
                          ? "bg-secondary text-white shadow-lg shadow-secondary/10"
                          : "border border-secondary/10 bg-white text-secondary hover:border-primary"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/10 bg-white text-secondary transition-all hover:border-primary disabled:opacity-30 disabled:hover:border-secondary/10"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-20 flex min-h-80 items-center justify-center rounded-4xl border border-secondary/10 bg-white">
            <div className="text-center">
              <FaBoxOpen className="mx-auto text-4xl text-secondary/20" />
              <p className="mt-4 text-sm font-semibold text-secondary/50">
                No matching products found
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
