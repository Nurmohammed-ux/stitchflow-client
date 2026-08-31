import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaTruck,
  FaPlus,
  FaXmark,
  FaEye,
  FaLocationDot,
  FaClock,
  FaCircleCheck,
  FaBoxOpen,
  FaScissors,
  FaClipboardCheck,
  FaBox,
} from "react-icons/fa6";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import { FaTshirt } from "react-icons/fa";

const trackingStatuses = [
  {
    value: "cutting-completed",
    label: "Cutting Completed",
    icon: FaScissors,
  },
  {
    value: "sewing-started",
    label: "Sewing Started",
    icon: FaTshirt,
  },
  {
    value: "finishing",
    label: "Finishing",
    icon: FaClipboardCheck,
  },
  {
    value: "qc-checked",
    label: "QC Checked",
    icon: FaCircleCheck,
  },
  {
    value: "packed",
    label: "Packed",
    icon: FaBox,
  },
  {
    value: "shipped",
    label: "Shipped",
    icon: FaTruck,
  },
  {
    value: "out-for-delivery",
    label: "Out for Delivery",
    icon: FaTruck,
  },
];

const ApprovedOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [search, setSearch] = useState("");

  const [trackingForm, setTrackingForm] = useState({
    status: "",
    location: "",
    note: "",
    dateTime: "",
  });

  // =========================================================
  // GET APPROVED ORDERS
  // =========================================================

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approved-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/manager?orderStatus=approved");

      return res.data;
    },
    enabled: !!user?.email,
  });

  // =========================================================
  // GET TRACKING FOR SELECTED ORDER
  // =========================================================

  const { data: trackingData = [], isLoading: trackingLoading } = useQuery({
    queryKey: ["order-tracking", selectedOrder?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/trackings/${selectedOrder.trackingId}`,
      );

      return res.data;
    },
    enabled: !!selectedOrder?.trackingId,
  });

  // =========================================================
  // ADD TRACKING MUTATION
  // =========================================================

  const addTrackingMutation = useMutation({
    mutationFn: async (trackingInfo) => {
      const res = await axiosSecure.post("/tracking", trackingInfo);
      return res.data;
    },

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Tracking Added",
        text: "The tracking update has been added successfully.",
        confirmButtonColor: "#85AD20",
      });

      queryClient.invalidateQueries({
        queryKey: ["order-tracking", trackingOrder?._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["approved-orders"],
      });

      setTrackingOrder(null);

      setTrackingForm({
        status: "",
        location: "",
        note: "",
        dateTime: "",
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error?.response?.data?.message || "Failed to add tracking update.",
      });
    },
  });

  // =========================================================
  // HANDLE TRACKING SUBMIT
  // =========================================================

  const handleTrackingSubmit = (e) => {
    e.preventDefault();

    if (
      !trackingForm.status ||
      !trackingForm.location ||
      !trackingForm.dateTime
    ) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Please complete status, location and date/time.",
        confirmButtonColor: "#85AD20",
      });

      return;
    }

    const statusLabel =
      trackingStatuses.find((item) => item.value === trackingForm.status)
        ?.label || trackingForm.status;

    const trackingInfo = {
      orderId: trackingOrder._id,
      trackingId: trackingOrder.trackingId,

      status: trackingForm.status,
      statusLabel,

      location: trackingForm.location,
      details: trackingForm.note,

      dateTime: new Date(trackingForm.dateTime),

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addTrackingMutation.mutate(trackingInfo);
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    return (
      order.trackingId?.toLowerCase().includes(searchText) ||
      order.productTitle?.toLowerCase().includes(searchText) ||
      order.customerEmail?.toLowerCase().includes(searchText) ||
      `${order.firstName} ${order.lastName}`.toLowerCase().includes(searchText)
    );
  });

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return <Loading />;
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-5">
        <div className="rounded-3xl border border-red-200 bg-red-50 px-8 py-7 text-center">
          <h2 className="text-lg font-bold text-red-600">
            Failed to load approved orders
          </h2>

          <p className="mt-2 text-sm text-red-500">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Production Management
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              Approved Orders.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              Manage approved production orders and keep customers updated with
              every stage of the manufacturing process.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / MANAGER / APPROVED
          </p>
        </div>
      </div>

      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon={FaClipboardCheck}
          label="Approved Orders"
          value={orders.length}
          description="Orders ready for production"
        />

        <SummaryCard
          icon={FaTruck}
          label="Tracking Ready"
          value={orders.length}
          description="Orders available for tracking"
        />

        <SummaryCard
          icon={FaBoxOpen}
          label="Production Units"
          value={orders.reduce(
            (total, order) => total + Number(order.quantity || 0),
            0,
          )}
          description="Total ordered units"
        />
      </div>

      {/* =====================================================
          TABLE CARD
      ===================================================== */}

      <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-white">
        {/* TABLE HEADER */}

        <div className="flex flex-col gap-5 border-b border-secondary/10 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
              Production Queue
            </p>

            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Approved Orders
            </h2>
          </div>

          <div className="relative w-full lg:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-xl border border-secondary/10 bg-[#f8faf8] px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary"
            />
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-secondary/10 text-left">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                  Order ID
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                  User
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                  Product
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                  Quantity
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                  Approved Date
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-secondary/5 transition hover:bg-primary/5"
                >
                  {/* ORDER */}

                  <td className="px-6 py-5">
                    <p className="font-mono text-xs font-semibold text-secondary">
                      {order.trackingId || order._id}
                    </p>

                    <span className="mt-1 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-[9px] font-bold uppercase text-secondary">
                      Approved
                    </span>
                  </td>

                  {/* USER */}

                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-secondary">
                      {order.firstName} {order.lastName}
                    </p>

                    <p className="mt-1 text-xs text-secondary/35">
                      {order.customerEmail}
                    </p>
                  </td>

                  {/* PRODUCT */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 overflow-hidden rounded-xl bg-secondary/5">
                        <img
                          src={order.productImage}
                          alt={order.productTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-secondary">
                          {order.productTitle}
                        </p>

                        <p className="text-xs text-secondary/35">
                          ৳{Number(order.unitPrice || 0).toLocaleString()} /
                          unit
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* QUANTITY */}

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-secondary/5 px-3 py-1.5 text-xs font-bold text-secondary">
                      {order.quantity}
                    </span>
                  </td>

                  {/* APPROVED DATE */}

                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-secondary">
                      {order.approvedAt
                        ? new Date(order.approvedAt).toLocaleDateString()
                        : order.updatedAt
                          ? new Date(order.updatedAt).toLocaleDateString()
                          : "—"}
                    </p>

                    <p className="mt-1 text-[10px] text-secondary/30">
                      {order.approvedAt
                        ? new Date(order.approvedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </p>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTrackingOrder(order)}
                        className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-secondary transition hover:shadow-lg hover:shadow-primary/20"
                      >
                        <FaPlus size={11} />
                        Tracking
                      </button>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/5 text-secondary transition hover:bg-secondary hover:text-white"
                        title="View tracking"
                      >
                        <FaEye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY */}

          {!filteredOrders.length && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/5 text-secondary/30">
                <FaClipboardCheck size={22} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-secondary">
                No approved orders found
              </h3>

              <p className="mt-2 text-sm text-secondary/40">
                Approved orders will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          TRACKING MODAL
      ===================================================== */}

      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/40 px-5 py-8 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-secondary/10 p-6">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                  Add Tracking
                </p>

                <h2 className="mt-2 text-2xl font-bold text-secondary">
                  Update Production
                </h2>

                <p className="mt-1 font-mono text-[10px] text-secondary/35">
                  {trackingOrder.trackingId}
                </p>
              </div>

              <button
                onClick={() => setTrackingOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition hover:bg-secondary hover:text-white"
              >
                <FaXmark />
              </button>
            </div>

            {/* ORDER INFO */}

            <div className="m-6 flex items-center gap-4 rounded-2xl bg-[#f8faf8] p-4">
              <img
                src={trackingOrder.productImage}
                alt={trackingOrder.productTitle}
                className="h-14 w-14 rounded-xl object-cover"
              />

              <div>
                <h3 className="font-bold text-secondary">
                  {trackingOrder.productTitle}
                </h3>

                <p className="mt-1 text-xs text-secondary/40">
                  {trackingOrder.firstName} {trackingOrder.lastName}
                  {" • "}
                  {trackingOrder.quantity} units
                </p>
              </div>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleTrackingSubmit}
              className="space-y-5 px-6 pb-6"
            >
              {/* STATUS */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Production Status
                </label>

                <select
                  value={trackingForm.status}
                  onChange={(e) =>
                    setTrackingForm({
                      ...trackingForm,
                      status: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-secondary/10 bg-[#f8faf8] px-4 py-3 text-sm text-secondary outline-none focus:border-primary"
                  required
                >
                  <option value="">Select production status</option>

                  {trackingStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* LOCATION */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Location
                </label>

                <div className="relative">
                  <FaLocationDot
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30"
                    size={14}
                  />

                  <input
                    type="text"
                    value={trackingForm.location}
                    onChange={(e) =>
                      setTrackingForm({
                        ...trackingForm,
                        location: e.target.value,
                      })
                    }
                    placeholder="e.g. Cutting Floor - Unit A"
                    className="w-full rounded-xl border border-secondary/10 bg-[#f8faf8] py-3 pl-10 pr-4 text-sm text-secondary outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* DATE TIME */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Date & Time
                </label>

                <div className="relative">
                  <FaClock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30"
                    size={14}
                  />

                  <input
                    type="datetime-local"
                    value={trackingForm.dateTime}
                    onChange={(e) =>
                      setTrackingForm({
                        ...trackingForm,
                        dateTime: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-secondary/10 bg-[#f8faf8] py-3 pl-10 pr-4 text-sm text-secondary outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* NOTE */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/50">
                  Note
                </label>

                <textarea
                  rows="4"
                  value={trackingForm.note}
                  onChange={(e) =>
                    setTrackingForm({
                      ...trackingForm,
                      note: e.target.value,
                    })
                  }
                  placeholder="Add a production update or note..."
                  className="w-full resize-none rounded-xl border border-secondary/10 bg-[#f8faf8] px-4 py-3 text-sm text-secondary outline-none focus:border-primary"
                />
              </div>

              {/* ACTIONS */}

              <div className="flex justify-end gap-3 border-t border-secondary/10 pt-5">
                <button
                  type="button"
                  onClick={() => setTrackingOrder(null)}
                  className="rounded-xl border border-secondary/10 px-5 py-3 text-sm font-bold text-secondary transition hover:bg-secondary/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={addTrackingMutation.isPending}
                  className="rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {addTrackingMutation.isPending
                    ? "Adding..."
                    : "Add Tracking Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          VIEW TRACKING MODAL
      ===================================================== */}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/40 px-5 py-8 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-secondary/10 p-6">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                  Production Tracking
                </p>

                <h2 className="mt-2 text-2xl font-bold text-secondary">
                  Order Timeline
                </h2>

                <p className="mt-1 font-mono text-[10px] text-secondary/35">
                  {selectedOrder.trackingId}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition hover:bg-secondary hover:text-white"
              >
                <FaXmark />
              </button>
            </div>

            {/* ORDER */}

            <div className="m-6 rounded-2xl bg-secondary p-5 text-white">
              <div className="flex items-center gap-4">
                <img
                  src={selectedOrder.productImage}
                  alt={selectedOrder.productTitle}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div>
                  <h3 className="font-bold">{selectedOrder.productTitle}</h3>

                  <p className="mt-1 text-xs text-white/40">
                    {selectedOrder.firstName} {selectedOrder.lastName}
                    {" • "}
                    {selectedOrder.quantity} units
                  </p>
                </div>
              </div>
            </div>

            {/* TIMELINE */}

            <div className="px-6 pb-8">
              {trackingLoading ? (
                <div className="py-10 text-center">
                  <span className="loading loading-spinner loading-md text-primary" />
                </div>
              ) : !trackingData.length ? (
                <div className="rounded-2xl bg-[#f8faf8] px-6 py-10 text-center">
                  <FaTruck className="mx-auto text-secondary/20" size={30} />

                  <h3 className="mt-4 font-bold text-secondary">
                    No tracking updates
                  </h3>

                  <p className="mt-1 text-sm text-secondary/35">
                    Add the first production update for this order.
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* VERTICAL LINE */}

                  <div className="absolute left-4.75 top-5 bottom-5 w-px bg-secondary/10" />

                  <div className="space-y-7">
                    {trackingData.map((tracking, index) => {
                      const statusInfo = trackingStatuses.find(
                        (item) => item.value === tracking.status,
                      );

                      const Icon = statusInfo?.icon || FaTruck;

                      return (
                        <div
                          key={tracking._id || index}
                          className="relative flex gap-5"
                        >
                          {/* ICON */}

                          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary ring-8 ring-white">
                            <Icon size={14} />
                          </div>

                          {/* CONTENT */}

                          <div className="flex-1 rounded-2xl border border-secondary/10 bg-[#f8faf8] p-4">
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                              <div>
                                <h3 className="text-sm font-bold text-secondary">
                                  {tracking.statusLabel || tracking.status}
                                </h3>

                                <p className="mt-1 flex items-center gap-1 text-xs text-secondary/40">
                                  <FaLocationDot size={10} />
                                  {tracking.location}
                                </p>
                              </div>

                              <span className="font-mono text-[9px] text-secondary/30">
                                {tracking.dateTime
                                  ? new Date(tracking.dateTime).toLocaleString()
                                  : tracking.createdAt
                                    ? new Date(
                                        tracking.createdAt,
                                      ).toLocaleString()
                                    : ""}
                              </span>
                            </div>

                            {tracking.details && (
                              <p className="mt-3 border-t border-secondary/10 pt-3 text-xs leading-relaxed text-secondary/50">
                                {tracking.details}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================
// SUMMARY CARD
// =============================================================

const SummaryCard = ({ icon: Icon, label, value, description }) => {
  return (
    <div className="group rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary">
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

export default ApprovedOrders;
