import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBoxOpen,
  FaCreditCard,
  FaLocationDot,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      productTitle: "",
      price: "",
      firstName: "",
      lastName: "",
      quantity: "",
      orderPrice: 0,
      contactNumber: "",
      deliveryAddress: "",
      additionalNotes: "",
      paymentMethod: "",
    },
  });

  /* =========================================================
     FETCH PRODUCT
  ========================================================= */

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking-product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  /* =========================================================
     AUTO FILL PRODUCT INFORMATION
  ========================================================= */

  useEffect(() => {
    if (product) {
      setValue("productTitle", product.productName);
      setValue("price", product.price);

      if (product.paymentOptions?.length > 0) {
        setValue("paymentMethod", product.paymentOptions[0]);
      }
    }
  }, [product, setValue]);

  /* =========================================================
     WATCH QUANTITY
  ========================================================= */

  const quantity = Number(watch("quantity")) || 0;

  const orderPrice = product ? quantity * Number(product.price) : 0;

  /* =========================================================
     SUBMIT BOOKING
  ========================================================= */

  const handleBooking = async (data) => {
    const result = await Swal.fire({
      title: "Confirm Your Order?",
      text: `You are placing an order for ${Number(data.quantity)} units of ${product.productName}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Place Order",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#062746",
      cancelButtonColor: "#d33",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const bookingData = {
        productId: product._id,
        quantity: Number(data.quantity),
        customerEmail: user?.email || "",

        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),

        contactNumber: data.contactNumber.trim(),
        deliveryAddress: data.deliveryAddress.trim(),

        additionalNotes: data.additionalNotes?.trim() || "",

        paymentMethod: data.paymentMethod,
      };

      Swal.fire({
        title: "Submitting Order...",
        text: "Please wait while we submit your order.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axiosSecure.post("/orders", bookingData);

      console.log("Order response:", res.data);

      // IMPORTANT: backend returns success, orderId and trackingId
      if (res.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Order Submitted!",
          html: `
          <p>${res.data.message}</p>
          <p class="mt-3">
            <strong>Tracking ID:</strong><br/>
            ${res.data.trackingId}
          </p>
        `,
          confirmButtonText: "View My Orders",
          confirmButtonColor: "#062746",
        });
        
        navigate("/dashboard/my-orders");
      }
    } catch (error) {
      console.error("Booking failed:", error);

      const message =
        error.response?.data?.message ||
        "Something went wrong while submitting your order.";

      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: message,
        confirmButtonColor: "#062746",
      });
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return <Loading />;
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError || !product) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#f8faf8] px-5">
        <div className="text-center">
          <FaBoxOpen className="mx-auto text-5xl text-secondary/20" />

          <h2 className="mt-5 text-3xl font-bold text-secondary">
            Product not found
          </h2>

          <p className="mt-3 text-secondary/50">
            We couldn't find the product you're trying to book.
          </p>

          <Link
            to="/all-products"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary hover:text-secondary"
          >
            <FaArrowLeft size={11} />
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8faf8] py-14 md:py-20">
      {/* =====================================================
          BLUEPRINT GRID
      ====================================================== */}

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
        {/* =====================================================
            BACK
        ====================================================== */}

        <Link
          to={`/products/${product._id}`}
          className="group mb-10 inline-flex items-center gap-3 text-sm font-semibold text-secondary/50 transition-colors hover:text-secondary"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary/10 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-secondary">
            <FaArrowLeft size={10} />
          </span>
          Back to Product
        </Link>

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
              Product Booking
            </span>

            <span className="hidden h-px w-20 bg-primary/60 sm:block" />
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-7xl">
            Book your
            <span className="ml-3 text-primary">order.</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-secondary/45 md:text-lg">
            Complete the information below to place your order with StitchFlow.
          </p>

          <p className="mt-5 font-mono text-[10px] tracking-[0.25em] text-secondary/25">
            SF / BOOKING / 001
          </p>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* ===================================================
              FORM
          ==================================================== */}

          <form
            onSubmit={handleSubmit(handleBooking)}
            className="rounded-4xl border border-secondary/10 bg-white p-6 md:p-10"
          >
            {/* =================================================
                CUSTOMER INFORMATION
            ================================================== */}

            <div>
              <SectionHeading
                number="01"
                title="Customer Information"
                icon={<FaUser size={13} />}
              />

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {/* First Name */}

                <FormInput
                  label="First Name"
                  placeholder="Your first name"
                  defaultValue={
                    user?.displayName ? user.displayName.split(" ")[0] : ""
                  }
                  error={errors.firstName?.message}
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />

                {/* Last Name */}

                <FormInput
                  label="Last Name"
                  placeholder="Your last name"
                  defaultValue={
                    user?.displayName
                      ? user.displayName.split(" ").slice(-1)[0]
                      : ""
                  }
                  error={errors.lastName?.message}
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
              </div>

              {/* Email */}

              <div className="mt-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50">
                  Email
                </label>

                <input
                  value={user?.email || ""}
                  readOnly
                  className="w-full cursor-not-allowed rounded-2xl border border-secondary/10 bg-[#f8faf8] px-5 py-4 text-sm text-secondary/60 outline-none"
                />

                <p className="mt-2 text-[11px] text-secondary/30">
                  Your account email is automatically connected to this order.
                </p>
              </div>

              {/* Contact */}

              <div className="mt-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50">
                  Contact Number
                </label>

                <div className="relative">
                  <FaPhone
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary/25"
                    size={13}
                  />

                  <input
                    type="tel"
                    placeholder="017XXXXXXXX"
                    className={`w-full rounded-2xl border ${
                      errors.contactNumber
                        ? "border-red-400"
                        : "border-secondary/10"
                    } bg-white py-4 pl-12 pr-5 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10`}
                    {...register("contactNumber", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^(?:\+?88)?01[3-9]\d{8}$/,
                        message: "Enter a valid Bangladesh phone number",
                      },
                    })}
                  />
                </div>

                {errors.contactNumber && (
                  <ErrorMessage message={errors.contactNumber.message} />
                )}
              </div>
            </div>

            {/* =================================================
                PRODUCT INFORMATION
            ================================================== */}

            <div className="mt-12 border-t border-secondary/10 pt-10">
              <SectionHeading
                number="02"
                title="Order Information"
                icon={<FaBoxOpen size={13} />}
              />

              {/* Product */}

              <div className="mt-7">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50">
                  Product
                </label>

                <input
                  {...register("productTitle")}
                  readOnly
                  className="w-full cursor-not-allowed rounded-2xl border border-secondary/10 bg-[#f8faf8] px-5 py-4 text-sm font-semibold text-secondary outline-none"
                />
              </div>

              {/* Price + Quantity */}

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {/* Price */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50">
                    Unit Price
                  </label>

                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-secondary/30">
                      ৳
                    </span>

                    <input
                      {...register("price")}
                      value={product.price}
                      readOnly
                      className="w-full cursor-not-allowed rounded-2xl border border-secondary/10 bg-[#f8faf8] py-4 pl-10 pr-5 text-sm font-bold text-secondary outline-none"
                    />
                  </div>
                </div>

                {/* Quantity */}

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50">
                    Order Quantity
                  </label>

                  <input
                    type="number"
                    min={product.minimumOrder}
                    max={product.availableQuantity}
                    placeholder={`Min. ${product.minimumOrder}`}
                    className={`w-full rounded-2xl border ${
                      errors.quantity ? "border-red-400" : "border-secondary/10"
                    } bg-white px-5 py-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10`}
                    {...register("quantity", {
                      required: "Order quantity is required",
                      valueAsNumber: true,
                      min: {
                        value: product.minimumOrder,
                        message: `Minimum order is ${product.minimumOrder} units`,
                      },
                      max: {
                        value: product.availableQuantity,
                        message: `Only ${product.availableQuantity} units are available`,
                      },
                    })}
                  />

                  {errors.quantity && (
                    <ErrorMessage message={errors.quantity.message} />
                  )}

                  {!errors.quantity && (
                    <p className="mt-2 text-[11px] text-secondary/30">
                      Minimum: {product.minimumOrder} · Available:{" "}
                      {product.availableQuantity}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Price */}

              <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-secondary/40">
                      Total Order Price
                    </p>

                    <p className="mt-1 text-xs text-secondary/30">
                      {quantity || 0} × ৳{product.price}
                    </p>
                  </div>

                  <p className="text-3xl font-bold tracking-tight text-secondary">
                    ৳{orderPrice.toLocaleString()}
                  </p>
                </div>

                <input
                  type="hidden"
                  {...register("orderPrice")}
                  value={orderPrice}
                  readOnly
                />
              </div>
            </div>

            {/* =================================================
                DELIVERY
            ================================================== */}

            <div className="mt-12 border-t border-secondary/10 pt-10">
              <SectionHeading
                number="03"
                title="Delivery Information"
                icon={<FaLocationDot size={13} />}
              />

              <div className="mt-7">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50">
                  Delivery Address
                </label>

                <textarea
                  rows="4"
                  placeholder="Enter your complete delivery address"
                  className={`w-full resize-none rounded-2xl border ${
                    errors.deliveryAddress
                      ? "border-red-400"
                      : "border-secondary/10"
                  } bg-white px-5 py-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10`}
                  {...register("deliveryAddress", {
                    required: "Delivery address is required",
                    minLength: {
                      value: 10,
                      message: "Please enter a complete address",
                    },
                  })}
                />

                {errors.deliveryAddress && (
                  <ErrorMessage message={errors.deliveryAddress.message} />
                )}
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50">
                  Additional Notes / Instructions
                </label>

                <textarea
                  rows="4"
                  placeholder="Any special instructions for your order?"
                  className="w-full resize-none rounded-2xl border border-secondary/10 bg-white px-5 py-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  {...register("additionalNotes")}
                />
              </div>
            </div>

            {/* =================================================
                PAYMENT
            ================================================== */}

            <div className="mt-12 border-t border-secondary/10 pt-10">
              <SectionHeading
                number="04"
                title="Payment Method"
                icon={<FaCreditCard size={13} />}
              />

              <div className="mt-7 grid gap-3">
                {product.paymentOptions?.map((payment) => (
                  <label
                    key={payment}
                    className="group flex cursor-pointer items-center justify-between rounded-2xl border border-secondary/10 bg-white p-5 transition-all hover:border-primary"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/5 text-secondary transition-all group-hover:bg-primary">
                        <FaCreditCard size={14} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-secondary">
                          {payment}
                        </p>

                        <p className="mt-1 text-xs text-secondary/35">
                          {payment.toLowerCase().includes("cash")
                            ? "Pay when your order is delivered."
                            : "Secure online payment."}
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      value={payment}
                      className="h-4 w-4 accent-[#85AD20]"
                      {...register("paymentMethod", {
                        required: "Please select a payment method",
                      })}
                    />
                  </label>
                ))}
              </div>

              {errors.paymentMethod && (
                <ErrorMessage message={errors.paymentMethod.message} />
              )}
            </div>

            {/* =================================================
                SUBMIT
            ================================================== */}

            <div className="mt-10 border-t border-secondary/10 pt-8">
              <button
                type="submit"
                disabled={isSubmitting || quantity <= 0}
                className="group flex w-full items-center justify-between rounded-2xl bg-secondary px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#0b355c] hover:shadow-xl hover:shadow-secondary/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <span>
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover:translate-x-1">
                  <FaArrowRight size={11} />
                </span>
              </button>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-secondary/30">
                By confirming this booking, you agree to the order details and
                payment terms selected above.
              </p>
            </div>
          </form>

          {/* ===================================================
              ORDER SUMMARY
          ==================================================== */}

          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <div className="overflow-hidden rounded-4xl border border-secondary/10 bg-secondary text-white">
              {/* Product Image */}

              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={
                    product.images?.[0] ||
                    "https://placehold.co/800x600?text=StitchFlow"
                  }
                  alt={product.productName}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full bg-primary px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Summary */}

              <div className="p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Order Summary
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  {product.productName}
                </h2>

                <div className="mt-7 space-y-4 border-t border-white/10 pt-5">
                  <SummaryRow
                    label="Unit Price"
                    value={`৳${product.price?.toLocaleString()}`}
                  />

                  <SummaryRow
                    label="Quantity"
                    value={`${quantity || 0} units`}
                  />

                  <SummaryRow
                    label="Minimum Order"
                    value={`${product.minimumOrder} units`}
                  />

                  <SummaryRow
                    label="Payment"
                    value={watch("paymentMethod") || "Not selected"}
                  />
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex items-end justify-between">
                    <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                      Total
                    </span>

                    <span className="text-3xl font-bold text-primary">
                      ৳{orderPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Available */}

                <div className="mt-6 flex items-center gap-2 text-xs text-white/40">
                  <FaCheckCircle className="text-primary" size={12} />
                  {product.availableQuantity?.toLocaleString()} units available
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   SECTION HEADING
========================================================= */

const SectionHeading = ({ number, title, icon }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary">
        {icon}
      </div>

      <div>
        <p className="font-mono text-[9px] tracking-[0.2em] text-secondary/25">
          {number}
        </p>

        <h2 className="text-xl font-bold tracking-tight text-secondary">
          {title}
        </h2>
      </div>
    </div>
  );
};

/* =========================================================
   FORM INPUT
========================================================= */

const FormInput = ({ label, placeholder, error, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className={`w-full rounded-2xl border ${
          error ? "border-red-400" : "border-secondary/10"
        } bg-white px-5 py-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10`}
        {...props}
      />

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

/* =========================================================
   ERROR
========================================================= */

const ErrorMessage = ({ message }) => {
  return <p className="mt-2 text-[11px] font-medium text-red-500">{message}</p>;
};

/* =========================================================
   SUMMARY ROW
========================================================= */

const SummaryRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-white/40">{label}</span>

      <span className="max-w-45 truncate text-right text-xs font-semibold text-white/80">
        {value}
      </span>
    </div>
  );
};

export default Booking;
