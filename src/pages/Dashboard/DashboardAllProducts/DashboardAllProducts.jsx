import { useState } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import { FaHouse } from "react-icons/fa6";

const DashboardAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const {
    data: responseData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  // Safely extract the array whether it's wrapped under .products or sent directly
  const products = Array.isArray(responseData)
    ? responseData
    : responseData.products || [];


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#062746",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/products/${id}`);
      await refetch();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Product has been deleted.",
        confirmButtonColor: "#062746",
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong.",
        confirmButtonColor: "#062746",
      });
    }
  };


  const handleHomeToggle = async (product) => {
  try {
    // 1. Send the patch request to your backend route
    const res = await axiosSecure.patch(`/products/home/${product._id}`, {
      showOnHome: !product.showOnHome,
    });

    if (res.data.modifiedCount > 0 || res.data.acknowledged) {
      // 2. Instantly refresh UI via React Query
      await refetch();

      // 3. Show success toast notification
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: product.showOnHome ? "Removed from Home" : "Added to Home",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Action Failed",
      text: "Could not update home status.",
      confirmButtonColor: "#062746",
    });
  }
};

  // 1. Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(search.toLowerCase()),
  );

  // 2. Pagination Calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Reset to page 1 whenever the search query changes
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] p-5 md:p-8 lg:p-10">
      {/* ================= HEADER ================= */}

      <div>
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Product Management
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-secondary md:text-6xl">
              All Products
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-secondary/50 md:text-base">
              Manage products, update product visibility and control what
              appears on the StitchFlow home page.
            </p>
          </div>

          <div className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / PRODUCTS / ADMIN
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="w-full rounded-2xl border border-secondary/10 bg-white py-4 pl-11 pr-5 text-sm text-secondary outline-none transition-all placeholder:text-secondary/30 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="rounded-2xl bg-secondary px-5 py-3 text-sm text-white">
          <span className="font-bold text-primary">
            {filteredProducts.length}
          </span>{" "}
          Products
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="mt-6 overflow-hidden rounded-3xl border border-secondary/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5">
            <thead>
              <tr className="border-b border-secondary/10 bg-[#f8faf8] text-left">
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Product
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Price
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Category
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Created By
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Home
                </th>

                <th className="px-6 py-5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-secondary/5 transition-colors hover:bg-[#f8faf8]"
                >
                  {/* Product */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.images?.[0]}
                        alt={product.productName}
                        className="h-14 w-14 rounded-xl object-cover"
                      />

                      <div>
                        <p className="font-bold text-secondary">
                          {product.productName}
                        </p>

                        <p className="mt-1 max-w-xs truncate text-xs text-secondary/40">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-5">
                    <span className="font-bold text-secondary">
                      ৳{product.price}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-secondary/5 px-3 py-1.5 text-xs font-semibold text-secondary/60">
                      {product.category}
                    </span>
                  </td>

                  {/* Created By */}
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-secondary">
                      {product.createdBy?.name || "Manager"}
                    </p>

                    <p className="text-xs text-secondary/40">
                      {product.createdBy?.email || product.managerEmail}
                    </p>
                  </td>

                  {/* Home Toggle */}
                  <td className="px-6 py-5">
                    <button
                      onClick={() => handleHomeToggle(product)}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                        product.showOnHome
                          ? "bg-primary text-secondary"
                          : "bg-secondary/5 text-secondary/30 hover:bg-primary/20"
                      }`}
                      title={
                        product.showOnHome ? "Remove from Home" : "Show on Home"
                      }
                    >
                      <FaHouse size={14} />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition-all hover:bg-primary hover:text-secondary"
                        title="Update Product"
                      >
                        <FaEdit size={14} />
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-400 transition-all hover:bg-red-500 hover:text-white"
                        title="Delete Product"
                      >
                        <FaTrash size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="px-6 py-20 text-center">
            <p className="text-lg font-bold text-secondary">
              No products found
            </p>

            <p className="mt-2 text-sm text-secondary/40">
              Try searching with another product name.
            </p>
          </div>
        )}

        {/* ================= PAGINATION CONTROLS ================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-secondary/10 bg-[#f8faf8] px-6 py-4">
            <p className="text-xs text-secondary/50">
              Showing{" "}
              <span className="font-bold text-secondary">{startIndex + 1}</span>{" "}
              to{" "}
              <span className="font-bold text-secondary">
                {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-secondary">
                {filteredProducts.length}
              </span>{" "}
              results
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-secondary/10 bg-white px-4 py-2 text-xs font-semibold text-secondary transition-all disabled:opacity-40 hover:bg-secondary/5"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-9 w-9 rounded-xl text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? "bg-primary text-secondary shadow-sm"
                        : "border border-secondary/10 bg-white text-secondary/60 hover:bg-secondary/5"
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
                className="rounded-xl border border-secondary/10 bg-white px-4 py-2 text-xs font-semibold text-secondary transition-all disabled:opacity-40 hover:bg-secondary/5"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAllProducts;
