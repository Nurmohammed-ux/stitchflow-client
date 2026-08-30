import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaTimes, FaHome } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DashboardAllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 7;

  const { data: productsData = {}, refetch } = useQuery({
    queryKey: ["admin-products", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
  });

  const products = productsData.products || [];

  // ================= UPDATE PRODUCT =================

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedProduct = {
      productName: form.productName.value,
      description: form.description.value,
      category: form.category.value,
      price: Number(form.price.value),
      availableQuantity: Number(form.availableQuantity.value),
      minimumOrder: Number(form.minimumOrder.value),

      images: form.images.value
        .split(",")
        .map((image) => image.trim())
        .filter(Boolean),

      demoVideo: form.demoVideo.value,

      paymentOptions: [form.paymentOptions.value],
      showOnHome: form.showOnHome.checked,
    };

    try {
      Swal.fire({
        title: "Updating Product...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axiosSecure.patch(
        `/products/${selectedProduct._id}`,
        updatedProduct,
      );

      if (res.data.modifiedCount > 0) {
        await refetch();

        setShowModal(false);
        setSelectedProduct(null);

        Swal.fire({
          icon: "success",
          title: "Product Updated!",
          text: "Product information has been updated successfully.",
          confirmButtonColor: "#062746",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "No changes were made to the product.",
          confirmButtonColor: "#062746",
        });
      }
    } catch (error) {
      console.error("Update error:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while updating the product.",
        confirmButtonColor: "#062746",
      });
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/products/${id}`);

      if (res.data.deletedCount > 0) {
        await refetch();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product has been deleted.",
          confirmButtonColor: "#062746",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while deleting the product.",
        confirmButtonColor: "#062746",
      });
    }
  };

  // ================= SHOW ON HOME =================

  const handleHomeToggle = async (product) => {
    try {
      const res = await axiosSecure.patch(`/products/home/${product._id}`, {
        showOnHome: !product.showOnHome,
      });

      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        await refetch();

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
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Could not update homepage visibility.",
        confirmButtonColor: "#062746",
      });
    }
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] p-5 md:p-8">
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Inventory Management
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              All <span className="text-primary">Products.</span>
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-secondary/50 md:text-base">
              Manage your full product collection, configure pricing and
              availability, and control homepage featured items.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary/30">
              SF / PRODUCTS / ADMIN
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-245">
            <thead className="border-b border-secondary/10 bg-[#f8faf8]">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                  Image
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                  Product
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                  Price
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                  Category
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                  Created By
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                  Home
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-secondary/10">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="transition-colors hover:bg-[#f8faf8]"
                >
                  {/* IMAGE */}

                  <td className="px-6 py-4">
                    <img
                      src={product.images?.[0]}
                      alt={product.productName}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                  </td>

                  {/* PRODUCT */}

                  <td className="px-6 py-4">
                    <p className="font-bold text-secondary">
                      {product.productName}
                    </p>

                    <p className="mt-1 max-w-xs truncate text-xs text-secondary/40">
                      {product.description}
                    </p>
                  </td>

                  {/* PRICE */}

                  <td className="px-6 py-4 font-bold text-primary">
                    ৳{product.price}
                  </td>

                  {/* CATEGORY */}

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-secondary/5 px-3 py-1 text-xs font-semibold text-secondary">
                      {product.category}
                    </span>
                  </td>

                  {/* CREATED BY */}

                  <td className="px-6 py-4 text-sm text-secondary/50">
                    {product.createdBy || "Manager"}
                  </td>

                  {/* HOME TOGGLE ICON BUTTON */}

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleHomeToggle(product)}
                      className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                        product.showOnHome
                          ? "bg-primary text-secondary shadow-sm"
                          : "bg-secondary/5 text-secondary/40 hover:bg-primary hover:text-secondary"
                      }`}
                      title={
                        product.showOnHome ? "Remove from Home" : "Show on Home"
                      }
                    >
                      <FaHome size={15} />
                    </button>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowModal(true);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-secondary transition hover:bg-primary hover:text-secondary"
                        title="Update Product"
                      >
                        <FaEdit size={13} />
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                        title="Delete Product"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-16 text-center text-sm text-secondary/40"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= PAGINATION ================= */}

      {productsData.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-xl border border-secondary/10 bg-white px-4 py-2 text-sm font-semibold text-secondary transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: productsData.totalPages }).map((_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`h-9 w-9 rounded-xl text-sm font-bold transition ${
                  page === pageNumber
                    ? "bg-primary text-secondary"
                    : "bg-white text-secondary/50 hover:bg-primary"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={page === productsData.totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-xl border border-secondary/10 bg-white px-4 py-2 text-sm font-semibold text-secondary transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* =====================================================
          UPDATE MODAL
      ===================================================== */}

      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-secondary/10 bg-white px-6 py-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                  Product Management
                </p>

                <h2 className="mt-1 text-2xl font-bold text-secondary">
                  Update Product
                </h2>
              </div>

              <button
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition hover:bg-secondary hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleUpdate} className="space-y-5 p-6">
              {/* NAME */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Product Name
                </label>

                <input
                  name="productName"
                  defaultValue={selectedProduct.productName}
                  required
                  className="w-full rounded-xl border border-secondary/10 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Description
                </label>

                <textarea
                  name="description"
                  defaultValue={selectedProduct.description}
                  rows="4"
                  required
                  className="w-full rounded-xl border border-secondary/10 px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              {/* CATEGORY + PRICE */}

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                    Category
                  </label>

                  <select
                    name="category"
                    defaultValue={selectedProduct.category}
                    className="w-full rounded-xl border border-secondary/10 bg-white px-4 py-3 outline-none focus:border-primary"
                  >
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                    Price
                  </label>

                  <input
                    name="price"
                    type="number"
                    min="0"
                    defaultValue={selectedProduct.price}
                    required
                    className="w-full rounded-xl border border-secondary/10 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* QUANTITY + MOQ */}

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                    Available Quantity
                  </label>

                  <input
                    name="availableQuantity"
                    type="number"
                    min="0"
                    defaultValue={selectedProduct.availableQuantity}
                    required
                    className="w-full rounded-xl border border-secondary/10 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                    Minimum Order
                  </label>

                  <input
                    name="minimumOrder"
                    type="number"
                    min="1"
                    defaultValue={selectedProduct.minimumOrder}
                    required
                    className="w-full rounded-xl border border-secondary/10 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* IMAGES */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Images
                </label>

                <input
                  name="images"
                  defaultValue={selectedProduct.images?.join(", ")}
                  placeholder="Image URL 1, Image URL 2"
                  className="w-full rounded-xl border border-secondary/10 px-4 py-3 outline-none focus:border-primary"
                />

                <p className="mt-2 text-xs text-secondary/30">
                  Separate multiple image URLs with commas.
                </p>
              </div>

              {/* DEMO VIDEO */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Demo Video
                </label>

                <input
                  name="demoVideo"
                  defaultValue={selectedProduct.demoVideo || ""}
                  placeholder="https://youtube.com/..."
                  className="w-full rounded-xl border border-secondary/10 px-4 py-3 outline-none focus:border-primary"
                />
              </div>

              {/* PAYMENT */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Payment Option
                </label>

                <select
                  name="paymentOptions"
                  defaultValue={
                    selectedProduct.paymentOptions?.[0] ||
                    selectedProduct.paymentOptions ||
                    "Cash on Delivery"
                  }
                  className="w-full rounded-xl border border-secondary/10 bg-white px-4 py-3 outline-none focus:border-primary"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="PayFirst">PayFirst</option>
                </select>
              </div>

              {/* SHOW ON HOME */}

              <div className="flex items-center justify-between rounded-xl bg-[#f8faf8] p-4">
                <div>
                  <p className="text-sm font-bold text-secondary">
                    Show on Home Page
                  </p>

                  <p className="mt-1 text-xs text-secondary/40">
                    Display this product in the homepage products section.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="showOnHome"
                  defaultChecked={selectedProduct.showOnHome || false}
                  className="toggle toggle-primary"
                />
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-secondary/10 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-secondary/10 px-5 py-3 text-sm font-bold text-secondary/60 transition hover:bg-secondary/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-secondary px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0b355c]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAllProducts;
