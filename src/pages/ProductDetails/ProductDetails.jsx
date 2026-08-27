import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaBoxOpen,
  FaCreditCard,
  FaPlay,
} from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure"
import Loading from "../../components/Loading/Loading"
import { FaShoppingBag } from "react-icons/fa";


const ProductDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [activeImage, setActiveImage] = useState(0);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !product) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#f8faf8] px-5">
        <div className="text-center">
          <FaBoxOpen className="mx-auto text-5xl text-secondary/20" />

          <h2 className="mt-5 text-3xl font-bold text-secondary">
            Product not found
          </h2>

          <p className="mt-3 text-secondary/50">
            The product you're looking for doesn't exist or has been removed.
          </p>

          <Link
            to="/all-products"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary hover:text-secondary"
          >
            <FaArrowLeft size={12} />
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  const images = product.images || [];
  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager";
  const canOrder = user && !isAdmin && !isManager;

  const paymentOptions = product.paymentOptions || [];

  return (
    <section className="relative overflow-hidden bg-[#f8faf8] py-16 md:py-24">
      {/* ================= BLUEPRINT GRID ================= */}

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

      {/* Decorative circles */}

      <div className="pointer-events-none absolute -right-40 top-20 h-125 w-125 rounded-full border border-secondary/5" />

      <div className="pointer-events-none absolute -right-20 top-40 h-75 w-75 rounded-full border border-primary/10" />

      <div className="relative px-5 md:px-15 lg:px-25">
        {/* ================= BACK ================= */}

        <Link
          to="/all-products"
          className="group mb-10 inline-flex items-center gap-3 text-sm font-semibold text-secondary/50 transition-colors hover:text-secondary"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary/10 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-secondary">
            <FaArrowLeft size={10} />
          </span>
          Back to Products
        </Link>

        {/* ================= PRODUCT ================= */}

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* =====================================================
              LEFT — PRODUCT MEDIA
          ====================================================== */}

          <div>
            {/* Main Image */}

            <div className="group relative aspect-4/3 overflow-hidden rounded-4xl border border-secondary/10 bg-[#eef2eb]">
              {images.length > 0 ? (
                <img
                  src={images[activeImage]}
                  alt={product.productName}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <FaBoxOpen className="text-7xl text-secondary/10" />
                </div>
              )}

              {/* Category */}

              <div className="absolute left-6 top-6 rounded-full bg-primary px-4 py-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                  {product.category}
                </span>
              </div>

              {/* Product code */}

              <div className="absolute right-6 top-6 rounded-full bg-white/90 px-4 py-2 backdrop-blur">
                <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-secondary/50">
                  SF / PRODUCT
                </span>
              </div>

              {/* Image arrows */}

              {images.length > 1 && (
                <div className="absolute bottom-6 right-6 flex gap-2">
                  <button
                    onClick={() =>
                      setActiveImage(
                        activeImage === 0 ? images.length - 1 : activeImage - 1,
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-secondary backdrop-blur transition-all hover:bg-primary"
                    aria-label="Previous image"
                  >
                    <FaArrowLeft size={11} />
                  </button>

                  <button
                    onClick={() =>
                      setActiveImage(
                        activeImage === images.length - 1 ? 0 : activeImage + 1,
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary transition-all hover:bg-white"
                    aria-label="Next image"
                  >
                    <FaArrowRight size={11} />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnails */}

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square overflow-hidden rounded-2xl border-2 transition-all ${
                      activeImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.productName} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Demo Video */}

            {product.demoVideo && (
              <a
                href={product.demoVideo}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex items-center justify-between rounded-2xl border border-secondary/10 bg-white px-5 py-4 text-sm font-semibold text-secondary transition-all hover:border-primary"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-secondary">
                    <FaPlay size={11} />
                  </span>
                  Watch production demo
                </span>

                <FaArrowUpRightFromSquare
                  size={12}
                  className="text-secondary/30"
                />
              </a>
            )}
          </div>

          {/* =====================================================
              RIGHT — PRODUCT INFORMATION
          ====================================================== */}

          <div className="lg:pt-5">
            {/* Label */}

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
                Product Details
              </span>

              <span className="hidden h-px w-20 bg-primary/60 sm:block" />
            </div>

            {/* Title */}

            <h1 className="mt-6 text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-6xl">
              {product.productName}
            </h1>

            {/* Description */}

            <p className="mt-7 text-base leading-relaxed text-secondary/50 md:text-lg">
              {product.description}
            </p>

            {/* Price */}

            <div className="mt-8 border-y border-secondary/10 py-7">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">
                Unit Price
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight text-secondary">
                  ৳{product.price?.toLocaleString()}
                </span>

                <span className="text-sm text-secondary/60">/ unit</span>
              </div>
            </div>

            {/* Stats */}

            <div className="mt-7 grid grid-cols-2 gap-3">
              <InfoBox
                label="Available Quantity"
                value={`${product.availableQuantity?.toLocaleString()} units`}
              />

              <InfoBox
                label="Minimum Order"
                value={`${product.minimumOrder?.toLocaleString()} units`}
              />

              <InfoBox label="Category" value={product.category} />

              <InfoBox
                label="Availability"
                value={
                  product.availableQuantity > 0 ? "In Stock" : "Out of Stock"
                }
                success={product.availableQuantity > 0}
              />
            </div>

            {/* Payment Options */}

            <div className="mt-7 rounded-3xl border border-secondary/10 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <FaCreditCard size={14} />
                </div>

                <div>
                  <p className="text-sm font-bold text-secondary">
                    Payment Options
                  </p>

                  <p className="text-xs text-secondary/40">
                    Available payment methods
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {paymentOptions.length > 0 ? (
                  paymentOptions.map((payment) => (
                    <span
                      key={payment}
                      className="rounded-full bg-[#f8faf8] px-4 py-2 text-xs font-semibold text-secondary"
                    >
                      {payment}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-secondary/40">
                    Payment information unavailable
                  </span>
                )}
              </div>
            </div>

            {/* ================= ORDER BUTTON ================= */}

            <div className="mt-7">
              {canOrder ? (
                <Link
                  to={`/booking/${product._id}`}
                  className="group flex w-full items-center justify-between rounded-2xl bg-secondary px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#0b355c] hover:shadow-xl hover:shadow-secondary/10"
                >
                  <span className="flex items-center gap-3">
                    <FaShoppingBag size={14} />
                    Order / Book Product
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45">
                    <FaArrowUpRightFromSquare size={11} />
                  </span>
                </Link>
              ) : !user ? (
                <div>
                  <Link
                    to="/login"
                    className="group flex w-full items-center justify-between rounded-2xl bg-secondary px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0b355c]"
                  >
                    <span>Login to Order</span>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-secondary">
                      <FaArrowUpRightFromSquare size={11} />
                    </span>
                  </Link>

                  <p className="mt-3 text-center text-xs text-secondary/35">
                    You need to be logged in to place an order.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-secondary/10 bg-secondary/5 px-5 py-4">
                  <p className="text-sm font-semibold text-secondary">
                    Ordering unavailable
                  </p>

                  <p className="mt-1 text-xs text-secondary/40">
                    Admin and Manager accounts cannot place product orders.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= PRODUCT INFORMATION ================= */}

        <div className="mt-20 border-t border-secondary/10 pt-12">
          <div className="grid gap-10 md:grid-cols-3">
            <InfoSection
              number="01"
              title="Production"
              description="This product is manufactured through StitchFlow's connected production workflow."
            />

            <InfoSection
              number="02"
              title="Quality"
              description="Production can be tracked through cutting, sewing, finishing and quality control."
            />

            <InfoSection
              number="03"
              title="Delivery"
              description="Once completed, the order can move through packing and shipment tracking."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   INFO BOX
========================================================= */

const InfoBox = ({ label, value, success = false }) => {
  return (
    <div className="rounded-2xl border border-secondary/10 bg-white p-5">
      <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-secondary">
        {label}
      </p>

      <p
        className={`mt-2 text-sm font-bold ${
          success ? "text-primary" : "text-secondary"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   INFO SECTION
========================================================= */

const InfoSection = ({ number, title, description }) => {
  return (
    <div className="border-t border-secondary/10 pt-5">
      <span className="font-mono text-[10px] tracking-[0.2em] text-secondary/25">
        {number}
      </span>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-secondary">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-secondary/45">
        {description}
      </p>
    </div>
  );
};

export default ProductDetails;
