import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FaBoxOpen,
  FaImage,
  FaVideo,
  FaMoneyBill,
  FaPlus,
  FaXmark,
} from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const AddProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);

    setImages(newImages);
    setImagePreview(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    if (images.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Images Required",
        text: "Please upload at least one product image.",
        confirmButtonColor: "#062746",
      });

      return;
    }

    try {
      Swal.fire({
        title: "Uploading Images & Adding Product...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Upload all selected images to ImgBB concurrently
      const uploadPromises = images.map((imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);
        const imgbbApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
        return axios.post(imgbbApi, formData);
      });

      const uploadResponses = await Promise.all(uploadPromises);
      const uploadedImageUrls = uploadResponses.map((res) => res.data.data.url);

      const product = {
        productName: form.productName.value,
        description: form.description.value,
        category: form.category.value,
        price: Number(form.price.value),
        availableQuantity: Number(form.availableQuantity.value),
        minimumOrder: Number(form.minimumOrder.value),
        images: uploadedImageUrls,
        demoVideo: form.demoVideo.value,
        paymentOptions: form.paymentOptions.value,
        showOnHome: form.showOnHome.checked,
        createdBy: user?.email,
      };

      const res = await axiosSecure.post("/products", product);

      if (res.data.insertedId) {
        form.reset();
        setImages([]);
        setImagePreview([]);

        Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "The product has been added successfully.",
          confirmButtonColor: "#062746",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Product",
        text:
          error.response?.data?.message ||
          "Something went wrong while uploading images or saving the product.",
        confirmButtonColor: "#062746",
      });
    }
  };

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
              Add Product.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              Create a new product and define its pricing, inventory, payment
              options and homepage visibility.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / MANAGER / PRODUCTS
          </p>
        </div>
      </div>

      {/* ================= FORM ================= */}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5 xl:grid-cols-3">
          {/* ================= BASIC INFORMATION ================= */}

          <div className="rounded-3xl border border-secondary/10 bg-white p-6 xl:col-span-2">
            <div className="flex items-center gap-4 border-b border-secondary/10 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
                <FaBoxOpen size={17} />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Product Information
                </p>

                <h2 className="mt-1 text-2xl font-bold text-secondary">
                  Basic details
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {/* PRODUCT NAME */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Product Name
                </label>

                <input
                  name="productName"
                  type="text"
                  placeholder="e.g. Premium Cotton Shirt"
                  required
                  className="w-full rounded-xl border border-secondary/10 bg-white px-4 py-3 text-sm text-secondary outline-none transition placeholder:text-secondary/25 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Product Description
                </label>

                <textarea
                  name="description"
                  rows="5"
                  placeholder="Describe the product, material, features..."
                  required
                  className="w-full resize-none rounded-xl border border-secondary/10 bg-white px-4 py-3 text-sm text-secondary outline-none transition placeholder:text-secondary/25 focus:border-primary focus:ring-4 focus:ring-primary/10"
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
                    required
                    className="w-full rounded-xl border border-secondary/10 bg-white px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="">Select Category</option>
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

                  <div className="relative">
                    <FaMoneyBill
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30"
                      size={14}
                    />

                    <input
                      name="price"
                      type="number"
                      min="0"
                      placeholder="0"
                      required
                      className="w-full rounded-xl border border-secondary/10 bg-white py-3 pl-10 pr-4 text-sm text-secondary outline-none transition placeholder:text-secondary/25 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= INVENTORY ================= */}

          <div className="rounded-3xl border border-secondary/10 bg-white p-6">
            <div className="flex items-center gap-4 border-b border-secondary/10 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
                <FaBoxOpen size={17} />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Inventory
                </p>

                <h2 className="mt-1 text-2xl font-bold text-secondary">
                  Stock details
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {/* AVAILABLE QUANTITY */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Available Quantity
                </label>

                <input
                  name="availableQuantity"
                  type="number"
                  min="0"
                  placeholder="e.g. 500"
                  required
                  className="w-full rounded-xl border border-secondary/10 px-4 py-3 text-sm outline-none transition placeholder:text-secondary/25 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>

              {/* MINIMUM ORDER */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Minimum Order Quantity
                </label>

                <input
                  name="minimumOrder"
                  type="number"
                  min="1"
                  placeholder="e.g. 10"
                  required
                  className="w-full rounded-xl border border-secondary/10 px-4 py-3 text-sm outline-none transition placeholder:text-secondary/25 focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>
          </div>

          {/* ================= IMAGES ================= */}

          <div className="rounded-3xl border border-secondary/10 bg-white p-6 xl:col-span-2">
            <div className="flex items-center gap-4 border-b border-secondary/10 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
                <FaImage size={17} />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Product Media
                </p>

                <h2 className="mt-1 text-2xl font-bold text-secondary">
                  Product images
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-secondary/10 bg-[#f8faf8] px-5 py-8 text-center transition hover:border-primary/50 hover:bg-primary/5">
                <FaImage className="text-2xl text-secondary/25" />

                <p className="mt-3 text-sm font-bold text-secondary">
                  Upload product images
                </p>

                <p className="mt-1 text-xs text-secondary/35">
                  Select multiple images for your product
                </p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* IMAGE PREVIEW */}

              {imagePreview.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {imagePreview.map((image, index) => (
                    <div
                      key={image}
                      className="group relative overflow-hidden rounded-2xl border border-secondary/10"
                    >
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="h-28 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/80 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
                      >
                        <FaXmark size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= PAYMENT ================= */}

          <div className="rounded-3xl border border-secondary/10 bg-white p-6">
            <div className="flex items-center gap-4 border-b border-secondary/10 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
                <FaMoneyBill size={17} />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Payment
                </p>

                <h2 className="mt-1 text-2xl font-bold text-secondary">
                  Payment option
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                Payment Method
              </label>

              <select
                name="paymentOptions"
                required
                className="w-full rounded-xl border border-secondary/10 bg-white px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              >
                <option value="">Select Payment Method</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="PayFirst">PayFirst</option>
              </select>
            </div>

            {/* SHOW ON HOME */}

            <label className="mt-6 flex cursor-pointer items-center justify-between rounded-2xl bg-[#f8faf8] p-4">
              <div>
                <p className="text-sm font-bold text-secondary">
                  Show on Home Page
                </p>

                <p className="mt-1 text-xs text-secondary/35">
                  Display this product on the homepage.
                </p>
              </div>

              <input
                name="showOnHome"
                type="checkbox"
                className="toggle toggle-primary"
              />
            </label>
          </div>

          {/* ================= VIDEO ================= */}

          <div className="rounded-3xl border border-secondary/10 bg-white p-6 xl:col-span-2">
            <div className="flex items-center gap-4 border-b border-secondary/10 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
                <FaVideo size={17} />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Product Media
                </p>

                <h2 className="mt-1 text-2xl font-bold text-secondary">
                  Demo video
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                Demo Video Link
              </label>

              <input
                name="demoVideo"
                type="url"
                placeholder="https://youtube.com/..."
                className="w-full rounded-xl border border-secondary/10 px-4 py-3 text-sm outline-none transition placeholder:text-secondary/25 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />

              <p className="mt-2 text-xs text-secondary/30">
                Optional. Add a YouTube or other video demonstration link.
              </p>
            </div>
          </div>
        </div>

        {/* ================= SUBMIT ================= */}

        <div className="mt-5 flex flex-col justify-between gap-4 rounded-3xl border border-secondary/10 bg-secondary p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
              Ready to publish
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              Create this product?
            </h2>

            <p className="mt-1 text-xs text-white/35">
              The product will be available in the manager product list.
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-secondary transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
          >
            <FaPlus size={13} />
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
