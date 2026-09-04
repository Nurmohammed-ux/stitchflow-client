import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  FaLocationDot,
  FaCircleCheck,
  FaClock,
  FaBoxOpen,
  FaTruck,
  FaScissors,
  FaShirt,
  FaClipboardCheck,
  FaBox,
  FaTriangleExclamation,
} from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const TrackOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { orderId } = useParams();

  // =========================
  // FETCH ORDER TRACKING
  // =========================

  const {
    data: trackingData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["order-tracking", orderId],

    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}/tracking`);
      return res.data;
    },

    enabled: !!orderId,
  });

  const order = trackingData?.order || null;
  const trackingLogs = trackingData?.trackingLogs || [];

  // =========================
  // STATUS ICON
  // =========================

  const getStatusIcon = (status) => {
    const icons = {
      pending: FaClock,
      "pending-review": FaClock,

      approved: FaCircleCheck,
      "payment-confirmed": FaCircleCheck,

      "cutting-completed": FaScissors,
      "sewing-started": FaShirt,
      finishing: FaBoxOpen,
      "qc-checked": FaClipboardCheck,

      packed: FaBox,

      shipped: FaTruck,
      "out-for-delivery": FaTruck,

      delivered: FaCircleCheck,
    };

    return icons[status?.toLowerCase()] || FaClock;
  };

  // =========================
  // FORMAT STATUS
  // =========================

  const formatStatus = (status) => {
    if (!status) return "Tracking Update";

    return status
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // FORMAT TIME
  // =========================

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================
  // GET LATEST TRACKING
  // =========================

  const latestTracking =
    trackingLogs.length > 0 ? trackingLogs[trackingLogs.length - 1] : null;

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return <Loading />;
  }

  // =========================
  // ERROR
  // =========================

  if (isError) {
    return (
      <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
              Production Tracking
            </span>

            <span className="hidden h-px w-20 bg-primary/60 sm:block" />
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
            Track your order.
          </h1>
        </div>

        <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-500">
            <FaTriangleExclamation />
          </div>

          <h2 className="mt-5 text-xl font-bold text-red-600">
            Unable to load tracking
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-red-500/70">
            {error?.response?.data?.message ||
              "We couldn't load the tracking information for this order."}
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ORDER NOT FOUND
  // =========================

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="rounded-3xl border border-secondary/10 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
              <FaBox />
            </div>

            <h2 className="mt-5 text-xl font-bold text-secondary">
              Order not found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-secondary/40">
              We couldn't find this order or you don't have permission to view
              it.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Production Tracking
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              Track your order.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              Follow every production and delivery milestone of your order from
              cutting to final delivery.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary">
            SF / TRACK / ORDER
          </p>
        </div>
      </div>

      {/* =========================
          ORDER HEADER
      ========================= */}

      <div className="rounded-3xl border border-secondary/10 bg-secondary p-6 md:p-8">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          {/* PRODUCT */}

          <div className="flex items-center gap-5">
            {order.productImage ? (
              <img
                src={order.productImage}
                alt={order.productTitle}
                className="h-20 w-20 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                <FaBox size={22} />
              </div>
            )}

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                Order
              </p>

              <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                {order.productTitle}
              </h2>

              <p className="mt-2 font-mono text-[10px] text-white/40">
                {order.trackingId}
              </p>
            </div>
          </div>

          {/* CURRENT STATUS */}

          <div className="flex items-center gap-3 self-start rounded-full bg-primary/10 px-5 py-3 lg:self-center">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />

            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary/70">
                Current Status
              </p>

              <p className="mt-0.5 text-sm font-bold text-white">
                {formatStatus(latestTracking?.status || order.orderStatus)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          ORDER INFO
      ========================= */}

      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary">
            Tracking ID
          </p>

          <p className="mt-2 break-all font-mono text-xs font-bold text-secondary">
            {order.trackingId || "—"}
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary">
            Quantity
          </p>

          <p className="mt-2 text-lg font-bold text-secondary">
            {order.quantity ?? "—"}
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary">
            Payment
          </p>

          <p className="mt-2 text-sm font-bold capitalize text-secondary">
            {order.paymentStatus || "—"}
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary">
            Order Date
          </p>

          <p className="mt-2 text-sm font-bold text-secondary">
            {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      {/* =========================
          NO TRACKING HISTORY
      ========================= */}

      {trackingLogs.length === 0 && (
        <div className="mt-5 rounded-3xl border border-secondary/10 bg-white p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
            <FaClock />
          </div>

          <h2 className="mt-5 text-xl font-bold text-secondary">
            Tracking has not started yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-secondary/40">
            Your order has been received, but no production tracking updates are
            available yet.
          </p>
        </div>
      )}

      {/* =========================
          TIMELINE
      ========================= */}

      {trackingLogs.length > 0 && (
        <div className="mt-5 rounded-3xl border border-secondary/10 bg-white p-6 md:p-8">
          {/* SECTION HEADER */}

          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary">
                Production history
              </p>

              <h2 className="mt-2 text-2xl font-bold text-secondary">
                Order timeline
              </h2>
            </div>

            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/25">
              {trackingLogs.length} Updates
            </p>
          </div>

          {/* TIMELINE */}

          <div>
            {trackingLogs.map((tracking, index) => {
              const Icon = getStatusIcon(tracking.status);

              const isLast = index === trackingLogs.length - 1;

              return (
                <div
                  key={tracking._id || `${tracking.status}-${index}`}
                  className="relative flex gap-5"
                >
                  {/* TIMELINE LINE */}

                  {!isLast && (
                    <div className="absolute left-4.75 top-10 h-[calc(100%-10px)] w-px bg-secondary/10" />
                  )}

                  {/* ICON */}

                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                      isLast
                        ? "bg-primary text-secondary shadow-lg shadow-primary/20"
                        : "bg-secondary text-white"
                    }`}
                  >
                    <Icon size={14} />
                  </div>

                  {/* CONTENT */}

                  <div
                    className={`min-w-0 flex-1 ${isLast ? "pb-2" : "pb-10"}`}
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      {/* STATUS */}

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-base font-bold text-secondary">
                            {formatStatus(tracking.status)}
                          </h3>

                          {isLast && (
                            <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-primary">
                              Current
                            </span>
                          )}
                        </div>

                        {/* LOCATION */}

                        {tracking.location && (
                          <div className="mt-2 flex items-center gap-2 text-xs text-secondary/40">
                            <FaLocationDot size={10} />

                            <span>{tracking.location}</span>
                          </div>
                        )}
                      </div>

                      {/* DATE */}

                      <div className="shrink-0 sm:text-right">
                        <p className="font-mono text-[10px] font-semibold text-secondary/40">
                          {formatDate(tracking.dateTime || tracking.createdAt)}
                        </p>

                        <p className="mt-1 font-mono text-[9px] text-secondary/25">
                          {formatTime(tracking.dateTime || tracking.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* DETAILS */}

                    {tracking.details && (
                      <div
                        className={`mt-4 rounded-2xl p-4 ${
                          isLast
                            ? "bg-primary/5 border border-primary/10"
                            : "bg-[#f8faf8]"
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-secondary/55">
                          {tracking.details}
                        </p>
                      </div>
                    )}

                    {/* NOTE */}

                    {tracking.note && (
                      <div className="mt-4 rounded-2xl bg-[#f8faf8] p-4">
                        <p className="text-sm leading-relaxed text-secondary/55">
                          {tracking.note}
                        </p>
                      </div>
                    )}

                    {/* IMAGE */}

                    {tracking.image && (
                      <div className="mt-4">
                        <img
                          src={tracking.image}
                          alt={formatStatus(tracking.status)}
                          className="max-h-72 rounded-2xl object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================
          READ ONLY NOTICE
      ========================= */}

      <div className="mt-5 flex items-center gap-3 rounded-3xl border border-secondary/10 bg-white p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary/5 text-secondary">
          <FaCircleCheck size={14} />
        </div>

        <div>
          <p className="text-sm font-bold text-secondary">
            Tracking information is read-only
          </p>

          <p className="mt-0.5 text-xs text-secondary/40">
            Production and delivery updates can only be managed by authorized
            StitchFlow staff.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
