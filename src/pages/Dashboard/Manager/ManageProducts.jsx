import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaBoxOpen,
  FaMagnifyingGlass,
  FaPen,
  FaTrash,
  FaXmark,
} from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manager-products", user?.email, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products/manager?email=${user.email}&search=${search}`,
      );

      return res.data;
    },
    enabled: !!user?.email,
  });

  // ================= UPDATE =================

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedProduct = {
      productName: form.productName.value.trim(),
      description: form.description.value.trim(),
      category: form.category.value,
      price: Number(form.price.value),
      availableQuantity: Number(form.availableQuantity.value),
      minimumOrder: Number(form.minimumOrder.value),

      images: form.images.value
        .split(",")
        .map((image) => image.trim())
        .filter(Boolean),

      demoVideo: form.demoVideo.value.trim(),

      paymentOptions: form.paymentOptions.value,
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
          text: "No changes were made to this product.",
          confirmButtonColor: "#062746",
        });
      }
    } catch (error) {
      console.error(error);

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
      cancelButtonColor: "#062746",
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
          text: "Product has been deleted successfully.",
          confirmButtonColor: "#062746",
        });
      }
    } catch (error) {
      console.error(error);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
      {/* ================= HEADER ================= */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Product Management
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              Manage Products.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              View, search, update and manage the garment products you have
              created in StitchFlow.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / MANAGER / PRODUCTS
          </p>
        </div>
      </div>

      {/* ================= SEARCH + COUNT ================= */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <FaMagnifyingGlass
            size={13}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or category..."
            className="w-full rounded-2xl border border-secondary/10 bg-white py-4 pl-11 pr-5 text-sm text-secondary outline-none transition placeholder:text-secondary/25 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="rounded-2xl bg-secondary px-5 py-3 text-sm text-white">
          <span className="font-bold text-primary">{products.length}</span>{" "}
          Products
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-secondary/10 bg-[#f8faf8] text-left">
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Image
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Name
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Price
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Payment Mode
                </th>

                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Stock
                </th>

                <th className="px-6 py-5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-secondary/5 transition-colors hover:bg-[#f8faf8]"
                >
                  {/* IMAGE */}

                  <td className="px-6 py-5">
                    <img
                      src={product.images?.[0]}
                      alt={product.productName}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                  </td>

                  {/* NAME */}

                  <td className="px-6 py-5">
                    <p className="font-bold text-secondary">
                      {product.productName}
                    </p>

                    <p className="mt-1 text-xs text-secondary/40">
                      {product.category}
                    </p>
                  </td>

                  {/* PRICE */}

                  <td className="px-6 py-5">
                    <span className="font-bold text-secondary">
                      ৳{Number(product.price || 0).toLocaleString()}
                    </span>
                  </td>

                  {/* PAYMENT */}

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-secondary">
                      {Array.isArray(product.paymentOptions)
                        ? product.paymentOptions.join(", ")
                        : product.paymentOptions || "N/A"}
                    </span>
                  </td>

                  {/* STOCK */}

                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-secondary">
                      {product.availableQuantity || 0}
                    </p>

                    <p className="mt-1 text-[10px] text-secondary/35">
                      MOQ: {product.minimumOrder || 0}
                    </p>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowModal(true);
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition-all hover:bg-primary hover:text-secondary"
                        title="Update Product"
                      >
                        <FaPen size={12} />
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                        title="Delete Product"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}

        {products.length === 0 && (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/5 text-secondary/25">
              <FaBoxOpen />
            </div>

            <h3 className="mt-4 text-lg font-bold text-secondary">
              No products found
            </h3>

            <p className="mt-2 text-sm text-secondary/40">
              Create a product or try another search.
            </p>
          </div>
        )}
      </div>

      {/* ================= UPDATE MODAL ================= */}

      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* HEADER */}

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
                onClick={() => {
                  setShowModal(false);
                  setSelectedProduct(null);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition hover:bg-secondary hover:text-white"
              >
                <FaXmark />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleUpdate} className="space-y-5 p-6">
              {/* PRODUCT NAME */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Product Name
                </label>

                <input
                  name="productName"
                  defaultValue={selectedProduct.productName}
                  required
                  className="w-full rounded-xl border border-secondary/10 px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
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
                  className="w-full resize-none rounded-xl border border-secondary/10 px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
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
                    className="w-full rounded-xl border border-secondary/10 bg-white px-4 py-3 text-sm text-secondary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
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
                    className="w-full rounded-xl border border-secondary/10 px-4 py-3 text-sm text-secondary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
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
                    className="w-full rounded-xl border border-secondary/10 px-4 py-3 text-sm text-secondary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                    Minimum Order Quantity
                  </label>

                  <input
                    name="minimumOrder"
                    type="number"
                    min="1"
                    defaultValue={selectedProduct.minimumOrder}
                    required
                    className="w-full rounded-xl border border-secondary/10 px-4 py-3 text-sm text-secondary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
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
                  className="w-full rounded-xl border border-secondary/10 px-4 py-3 text-sm text-secondary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />

                <p className="mt-2 text-xs text-secondary/30">
                  Separate multiple image URLs with commas.
                </p>
              </div>

              {/* VIDEO */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Demo Video
                </label>

                <input
                  name="demoVideo"
                  type="url"
                  defaultValue={selectedProduct.demoVideo || ""}
                  placeholder="https://youtube.com/..."
                  className="w-full rounded-xl border border-secondary/10 px-4 py-3 text-sm text-secondary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              {/* PAYMENT */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Payment Mode
                </label>

                <select
                  name="paymentOptions"
                  defaultValue={
                    Array.isArray(selectedProduct.paymentOptions)
                      ? selectedProduct.paymentOptions[0]
                      : selectedProduct.paymentOptions || "Cash on Delivery"
                  }
                  className="w-full rounded-xl border border-secondary/10 bg-white px-4 py-3 text-sm text-secondary outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>

                  <option value="PayFirst">PayFirst</option>
                </select>
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-secondary/10 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedProduct(null);
                  }}
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

export default ManageProducts;
