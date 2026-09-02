import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FaClipboardList,
  FaEye,
  FaTruck,
  FaXmark,
  FaClock,
  FaCircleCheck,
  FaCircleXmark,
  FaBoxOpen,
} from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import TrackingModal from "../../../components/TrackingModal/TrackingModal";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewTrackingId, setViewTrackingId] = useState(null);

  // ================= GET MY ORDERS =================

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-orders", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders/my-orders?email=${user.email}`,
      );

      return res.data;
    },

    enabled: !!user?.email,
  });

  console.log(orders);
  // ================= LOADING =================

  if (isLoading) {
    return <Loading />;
  }

  // ================= ERROR =================

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#f8faf8] px-5">
        <div className="rounded-3xl border border-red-200 bg-red-50 px-8 py-8 text-center">
          <FaCircleXmark className="mx-auto text-3xl text-red-400" />

          <h2 className="mt-4 text-lg font-bold text-red-600">
            Failed to load orders
          </h2>

          <p className="mt-2 text-sm text-red-500">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  // ================= STATUS =================

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-primary/15 text-secondary";

      case "pending-review":
      case "pending":
        return "bg-amber-100 text-amber-700";

      case "rejected":
        return "bg-red-100 text-red-600";

      case "completed":
        return "bg-emerald-100 text-emerald-700";

      default:
        return "bg-secondary/5 text-secondary/50";
    }
  };

  const getStatusLabel = (status) => {
    if (!status) return "Unknown";

    return status.replaceAll("-", " ");
  };

  const handlePayment = async (order) => {
    const orderInfo = {
      orderName: order.productTitle,
      orderId: order._id,
      customerEmail: order.customerEmail,
      cost: order.totalPrice,
      trackingId: order.trackingId,
    };

    const res = await axiosSecure.post(`/payment-checkout-session`, orderInfo);

    // console.log(res.data.url);

    window.location.assign(res.data.url);
  };

  // ================= PAGE =================

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
      {/* ================= HEADER ================= */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Buyer Workspace
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              My Orders.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              View your orders, check payment status, monitor production
              progress and track your products from one place.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / BUYER / ORDERS
          </p>
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={FaClipboardList}
          label="Total Orders"
          value={orders.length}
          description="All your orders"
        />

        <SummaryCard
          icon={FaClock}
          label="Pending"
          value={
            orders.filter(
              (order) =>
                order.orderStatus === "pending" ||
                order.orderStatus === "pending-review",
            ).length
          }
          description="Waiting for approval"
        />

        <SummaryCard
          icon={FaCircleCheck}
          label="Approved"
          value={
            orders.filter((order) => order.orderStatus === "approved").length
          }
          description="Approved orders"
        />

        <SummaryCard
          icon={FaTruck}
          label="In Production"
          value={
            orders.filter((order) => order.productionStage === "in-production")
              .length
          }
          description="Production started"
        />
      </div>

      {/* ================= ORDERS TABLE ================= */}

      <div className="mt-8 overflow-hidden rounded-3xl border border-secondary/10 bg-white">
        {/* TABLE HEADER */}

        <div className="flex flex-col justify-between gap-4 border-b border-secondary/10 p-6 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
              Order History
            </p>

            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Your orders
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-secondary/5 px-4 py-2">
            <FaClipboardList size={11} className="text-secondary/40" />

            <span className="font-mono text-[10px] text-secondary/40">
              {orders.length} ORDER{orders.length !== 1 ? "S" : ""}
            </span>
          </div>
        </div>

        {/* EMPTY STATE */}

        {orders.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/5 text-secondary/20">
              <FaBoxOpen size={25} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-secondary">
              No orders yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-secondary/40">
              You haven't placed any orders yet. Browse our products and place
              your first order.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-secondary px-5 py-3 text-xs font-bold text-white transition hover:bg-primary hover:text-secondary"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-237.5">
              {/* TABLE HEAD */}

              <thead>
                <tr className="border-b border-secondary/10 text-left">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                    Order
                  </th>

                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                    Product
                  </th>

                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                    Status
                  </th>

                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-secondary/5 transition hover:bg-primary/5"
                  >
                    {/* ORDER */}

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-mono text-xs font-bold text-secondary/70">
                          {order.trackingId || order._id}
                        </p>

                        <p className="mt-1 text-[10px] text-secondary/30">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                                "en-BD",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "—"}
                        </p>
                      </div>
                    </td>

                    {/* PRODUCT */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-secondary/5">
                          {order.productImage ? (
                            <img
                              src={order.productImage}
                              alt={order.productTitle}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-secondary/20">
                              <FaBoxOpen size={15} />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-bold text-secondary">
                            {order.productTitle}
                          </p>

                          <p className="mt-1 text-xs text-secondary/35">
                            ৳{Number(order.unitPrice || 0).toLocaleString()} /
                            unit
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* QUANTITY */}

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-secondary/5 px-3 py-1.5 font-mono text-xs font-bold text-secondary">
                        {order.quantity}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-[10px] font-bold capitalize ${getStatusStyle(
                          order.orderStatus,
                        )}`}
                      >
                        {getStatusLabel(order.orderStatus)}
                      </span>
                    </td>

                    {/* PAYMENT */}

                    {/* PAYMENT */}
                    <td className="px-6 py-5">
                      {order.paymentStatus === "paid" ? (
                        <span className="text-green-600 bg-green-200 py-1 px-3 rounded-full font-medium text-[10px]">
                          Paid
                        </span>
                      ) : order.orderStatus === "pending-review" ||
                        order.orderStatus === "pending" ? (
                        <span className="text-amber-700 bg-amber-100 py-1 px-3 rounded-full font-medium text-[10px]">
                          Pending
                        </span>
                      ) : order.orderStatus === "approved" ? (
                        <button
                          onClick={() => handlePayment(order)}
                          className="btn btn-xs btn-primary text-[10px] text-secondary border-0 rounded-full px-2 py-3"
                        >
                          Ready for payment
                        </button>
                      ) : (
                        <span className="text-secondary/40 text-xs">—</span>
                      )}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition hover:bg-secondary hover:text-white"
                          title="View order"
                        >
                          <FaEye size={13} />
                        </button>

                        {/* TRACK */}

                        {order.trackingId && (
                          <button
                            type="button"
                            onClick={() => setViewTrackingId(order.trackingId)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-secondary transition hover:bg-primary"
                            title="Track order"
                          >
                            <FaTruck size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= ORDER DETAILS MODAL ================= */}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onTrack={() => {
            setSelectedOrder(null);

            if (selectedOrder.trackingId) {
              setViewTrackingId(selectedOrder.trackingId);
            }
          }}
        />
      )}

      {/* ================= TRACKING MODAL ================= */}

      {viewTrackingId && (
        <TrackingModal
          trackingId={viewTrackingId}
          onClose={() => setViewTrackingId(null)}
        />
      )}
    </div>
  );
};

// ============================================================
// SUMMARY CARD
// ============================================================

const SummaryCard = ({ icon: Icon, label, value, description }) => {
  return (
    <div className="group rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-primary">
          <Icon size={17} />
        </div>

        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/25">
          Live
        </span>
      </div>

      <p className="mt-7 text-xs font-bold uppercase tracking-[0.15em] text-secondary/40">
        {label}
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary">
        {value}
      </h2>

      <p className="mt-2 text-xs text-secondary/35">{description}</p>
    </div>
  );
};

// ============================================================
// ORDER DETAILS MODAL
// ============================================================

const OrderDetailsModal = ({ order, onClose, onTrack }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/40 px-5 py-8 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >
        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-secondary/10 bg-white px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
                Order Details
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-secondary">
              {order.productTitle}
            </h2>

            <p className="mt-1 font-mono text-[10px] text-secondary/35">
              {order.trackingId || order._id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5 text-secondary/40 transition hover:bg-secondary hover:text-white"
          >
            <FaXmark size={15} />
          </button>
        </div>

        {/* BODY */}

        <div className="p-6">
          {/* PRODUCT */}

          <div className="flex flex-col gap-5 rounded-3xl bg-[#f8faf8] p-5 sm:flex-row">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-white">
              {order.productImage && (
                <img
                  src={order.productImage}
                  alt={order.productTitle}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                Product
              </p>

              <h3 className="mt-2 text-xl font-bold text-secondary">
                {order.productTitle}
              </h3>

              <p className="mt-2 text-sm text-secondary/45">
                Quantity:{" "}
                <span className="font-bold text-secondary">
                  {order.quantity}
                </span>
              </p>

              <p className="mt-1 text-sm text-secondary/45">
                Unit price:{" "}
                <span className="font-bold text-secondary">
                  ৳{Number(order.unitPrice || 0).toLocaleString()}
                </span>
              </p>

              <p className="mt-1 text-sm text-secondary/45">
                Total:{" "}
                <span className="font-bold text-secondary">
                  ৳{Number(order.totalPrice || 0).toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          {/* INFORMATION */}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoItem
              label="Order Status"
              value={getDisplayValue(order.orderStatus)}
            />

            <InfoItem
              label="Payment Status"
              value={getDisplayValue(order.paymentStatus)}
            />

            <InfoItem
              label="Payment Method"
              value={order.paymentMethod || "—"}
            />

            <InfoItem
              label="Order Date"
              value={
                order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "—"
              }
            />

            <InfoItem label="Contact" value={order.contactNumber || "—"} />

            <InfoItem
              label="Production Stage"
              value={getDisplayValue(order.productionStage)}
            />
          </div>

          {/* DELIVERY */}

          <div className="mt-4 rounded-2xl border border-secondary/10 p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
              Delivery Address
            </p>

            <p className="mt-3 text-sm leading-relaxed text-secondary/60">
              {order.deliveryAddress || "No delivery address provided"}
            </p>
          </div>

          {/* NOTES */}

          {order.additionalNotes && (
            <div className="mt-4 rounded-2xl border border-secondary/10 p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                Additional Notes
              </p>

              <p className="mt-3 text-sm leading-relaxed text-secondary/60">
                {order.additionalNotes}
              </p>
            </div>
          )}

          {/* ACTIONS */}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {order.trackingId && (
              <button
                type="button"
                onClick={onTrack}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary px-5 py-3 text-xs font-bold text-white transition hover:bg-primary hover:text-secondary"
              >
                <FaTruck size={12} />
                View Tracking
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-secondary/10 px-5 py-3 text-xs font-bold text-secondary/50 transition hover:bg-secondary/5 hover:text-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// INFO ITEM
// ============================================================

const InfoItem = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-secondary/10 bg-white p-4">
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold capitalize text-secondary/70">
        {value}
      </p>
    </div>
  );
};

// ============================================================
// DISPLAY VALUE
// ============================================================

const getDisplayValue = (value) => {
  if (!value) return "—";

  return value.replaceAll("-", " ");
};

export default MyOrders;
