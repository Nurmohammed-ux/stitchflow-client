import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCalendar,
  FaLocationDot,
  FaMoneyBillWave,
  FaPhone,
  FaUser,
  FaCircleCheck,
  FaTruck,
  FaClock,
  FaClipboardList,
} from "react-icons/fa6";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const OrderDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  /* ================= ORDER ================= */

  const {
    data: order = {},
    isLoading: orderLoading,
    isError: orderError,
  } = useQuery({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  /* ================= TRACKING ================= */

  const { data: tracking = [], isLoading: trackingLoading } = useQuery({
    queryKey: ["order-tracking", order?.trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/trackings/${order.trackingId}`
      );

      return res.data;
    },
    enabled: !!order?.trackingId,
  });

  if (orderLoading) {
    return <Loading />;
  }

  if (orderError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <div className="rounded-3xl border border-red-100 bg-red-50 px-8 py-6 text-center">
          <h2 className="text-lg font-bold text-red-500">
            Failed to load order
          </h2>

          <p className="mt-2 text-sm text-red-400">
            The order could not be found.
          </p>

          <Link
            to="/dashboard/all-orders"
            className="mt-5 inline-flex rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-white"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-8 lg:px-10">
      {/* ================= HEADER ================= */}

      <div>
        <Link
          to="/dashboard/all-orders"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary/50 transition-colors hover:text-secondary"
        >
          <FaArrowLeft size={12} />
          Back to All Orders
        </Link>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
                Order Details
              </span>

              <span className="hidden h-px w-20 bg-primary/60 sm:block" />
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              Order <span className="text-primary">Overview.</span>
            </h1>

            <p className="mt-4 font-mono text-sm tracking-[0.2em] text-secondary/40">
              {order.trackingId || order._id}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-bold capitalize ${
              order.orderStatus === "approved"
                ? "bg-primary/15 text-secondary"
                : order.orderStatus === "rejected"
                  ? "bg-red-50 text-red-500"
                  : order.orderStatus === "pending-review"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-secondary/5 text-secondary/60"
            }`}
          >
            {order.orderStatus?.replaceAll("-", " ") || "Unknown"}
          </span>
        </div>
      </div>

      {/* ================= PRODUCT + CUSTOMER ================= */}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* PRODUCT */}

        <div className="overflow-hidden rounded-4xl border border-secondary/10 bg-white lg:col-span-2">
          <div className="border-b border-secondary/10 p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-secondary">
                <FaBoxOpen size={16} />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary">
                  Product
                </p>

                <h2 className="text-xl font-bold text-secondary">
                  {order.productTitle}
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-10 p-8 sm:grid-cols-[120px_1fr] lg:pt-12">
            {order.productImage ? (
              <img
                src={order.productImage}
                alt={order.productTitle}
                className="h-30 w-full rounded-2xl object-cover sm:w-30"
              />
            ) : (
              <div className="flex h-30 w-full items-center justify-center rounded-2xl bg-secondary/5 text-secondary/20 sm:w-30">
                <FaBoxOpen size={30} />
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-secondary">
                  Unit Price
                </p>

                <p className="mt-1 text-lg font-bold text-secondary">
                  ৳{Number(order.unitPrice || 0).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-secondary">
                  Quantity
                </p>

                <p className="mt-1 text-lg font-bold text-secondary">
                  {Number(order.quantity || 0).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-secondary">
                  Total Price
                </p>

                <p className="mt-1 text-xl font-bold text-primary">
                  ৳{Number(order.totalPrice || 0).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-secondary">
                  Payment
                </p>

                <span
                  className={`mt-1 inline-block rounded-full py-1 text-sm font-bold capitalize ${
                    order.paymentStatus === "paid"
                      ? "bg-primary/15 text-secondary"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {order.paymentStatus || "Pending"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMER */}

        <div className="rounded-4xl border border-secondary/10 bg-white py-8 px-9">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-secondary">
              <FaUser size={15} />
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary">
                Customer
              </p>

              <h2 className="text-xl font-bold text-secondary">
                Customer Info
              </h2>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary">
                Name
              </p>

              <p className="mt-1 text-sm font-bold text-secondary">
                {order.firstName} {order.lastName}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-secondary">
                Email
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-secondary/60">
                {order.customerEmail}
              </p>
            </div>

            <div className="flex gap-3">
              <FaPhone className="mt-1 text-primary" size={13} />

              <div>
                <p className="text-xs uppercase tracking-wider text-secondary">
                  Contact
                </p>

                <p className="mt-1 text-sm font-semibold text-secondary">
                  {order.contactNumber}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <FaLocationDot className="mt-1 text-primary" size={13} />

              <div>
                <p className="text-xs uppercase tracking-wider text-secondary">
                  Delivery Address
                </p>

                <p className="mt-1 text-sm leading-relaxed text-secondary/60">
                  {order.deliveryAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ORDER INFORMATION ================= */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* ORDER INFO */}

        <div className="rounded-4xl border border-secondary/10 bg-white p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-secondary">
              <FaClipboardList size={15} />
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary">
                Information
              </p>

              <h2 className="text-xl font-bold text-secondary">
                Order Information
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary">
                Order ID
              </p>

              <p className="mt-1 break-all font-mono text-xs font-bold text-secondary">
                {order._id}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-secondary">
                Tracking ID
              </p>

              <p className="mt-1 break-all font-mono text-xs font-bold text-primary">
                {order.trackingId || "Not assigned"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-secondary">
                Payment Method
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm font-bold capitalize text-secondary">
                <FaMoneyBillWave className="text-primary" />
                {order.paymentMethod || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-secondary">
                Order Date
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-secondary/60">
                <FaCalendar className="text-primary" />

                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "—"}
              </p>
            </div>
          </div>

          {order.additionalNotes && (
            <div className="mt-7 border-t border-secondary/10 pt-6">
              <p className="text-xs uppercase tracking-wider text-secondary">
                Additional Notes
              </p>

              <p className="mt-2 rounded-2xl bg-[#f8faf8] p-4 text-sm leading-relaxed text-secondary/60">
                {order.additionalNotes}
              </p>
            </div>
          )}
        </div>

        {/* CURRENT STATUS */}

        <div className="rounded-4xl bg-secondary p-6 text-white">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
            Current Status
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            {order.orderStatus?.replaceAll("-", " ") || "Unknown"}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-white/40">
            This order is currently being processed through the StitchFlow
            production workflow.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-secondary">
              <FaTruck size={16} />
            </div>

            <div>
              <p className="text-xs text-white/30">Tracking ID</p>

              <p className="font-mono text-sm font-bold text-primary">
                {order.trackingId || "Not assigned"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TRACKING ================= */}

      <div className="mt-6 rounded-4xl border border-secondary/10 bg-white p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
              Production Journey
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-secondary md:text-3xl">
              Tracking Timeline
            </h2>
          </div>

          <p className="font-mono text-xs text-secondary">
            {order.trackingId || "NO TRACKING ID"}
          </p>
        </div>

        {trackingLoading ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-md text-primary" />
          </div>
        ) : tracking.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-[#f8faf8] px-6 py-12 text-center">
            <FaClock className="mx-auto text-2xl text-secondary/20" />

            <h3 className="mt-4 font-bold text-secondary">
              No tracking updates yet
            </h3>

            <p className="mt-1 text-sm text-secondary/40">
              Tracking information will appear here when the manager adds an
              update.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            {tracking.map((item, index) => (
              <div
                key={item._id}
                className="relative flex gap-5 pb-10 last:pb-0"
              >
                {/* LINE */}

                {index !== tracking.length - 1 && (
                  <div className="absolute left-5 top-10 h-full w-px bg-secondary/10" />
                )}

                {/* ICON */}

                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    index === tracking.length - 1
                      ? "bg-primary text-secondary"
                      : "bg-secondary/5 text-secondary/40"
                  }`}
                >
                  <FaCircleCheck size={15} />
                </div>

                {/* CONTENT */}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-base font-bold capitalize text-secondary">
                      {item.status?.replaceAll("-", " ")}
                    </h3>

                    <span className="font-mono text-[10px] text-secondary">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "—"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-secondary/50">
                    {item.details}
                  </p>

                  {item.location && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-secondary/40">
                      <FaLocationDot className="text-primary" />
                      {item.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;