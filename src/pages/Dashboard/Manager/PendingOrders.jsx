import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaClock,
  FaCheck,
  FaXmark,
  FaEye,
  FaClipboardList,
  FaBoxOpen,
  FaUser,
  FaCalendarDays,
} from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ================= FETCH ALL PENDING ORDERS =================

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pending-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/orders/manager?orderStatus=pending-review",
      );

      return res.data;
    },
    enabled: !!user?.email,
  });

  // ================= APPROVE ORDER =================

  const handleApprove = async (order) => {
    const result = await Swal.fire({
      title: "Approve Order?",
      text: "This order will be approved and moved to production.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#85AD20",
      cancelButtonColor: "#062746",
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Approving Order...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axiosSecure.patch(`/orders/${order._id}`, {
        orderStatus: "approved",
        paymentStatus: "ready-for-payment",
      });

      if (res.data.success || res.data.result?.modifiedCount > 0) {
        await refetch();

        if (selectedOrder?._id === order._id) {
          setShowModal(false);
          setSelectedOrder(null);
        }

        Swal.fire({
          icon: "success",
          title: "Order Approved!",
          text: "The order is now ready for production.",
          confirmButtonColor: "#062746",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Approval Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while approving the order.",
        confirmButtonColor: "#062746",
      });
    }
  };

  // ================= REJECT ORDER =================

  const handleReject = async (order) => {
    const result = await Swal.fire({
      title: "Reject Order?",
      text: "This order will be rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#062746",
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Rejecting Order...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axiosSecure.patch(`/orders/${order._id}`, {
        orderStatus: "rejected",
      });

      if (res.data.modifiedCount > 0) {
        await refetch();

        if (selectedOrder?._id === order._id) {
          setShowModal(false);
          setSelectedOrder(null);
        }

        Swal.fire({
          icon: "success",
          title: "Order Rejected",
          text: "The order has been rejected successfully.",
          confirmButtonColor: "#062746",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Reject Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong while rejecting the order.",
        confirmButtonColor: "#062746",
      });
    }
  };

  // ================= LOADING =================

  if (isLoading) {
    return <Loading />;
  }

  // ================= ERROR =================

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-3xl border border-red-200 bg-red-50 px-8 py-6 text-center">
          <h2 className="text-lg font-bold text-red-600">
            Failed to load orders
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
      {/* ================= HEADER ================= */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Order Management
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              Pending Orders.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              Review incoming customer orders and approve or reject them before
              they move into the production workflow.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / MANAGER / ORDERS
          </p>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Pending Orders */}
        <div className="group rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary">
              <FaClipboardList size={17} />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/25">
              Current
            </span>
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-secondary/40">
            Pending Orders
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary">
            {orders.length}
          </h2>
          <p className="mt-2 text-xs text-secondary/35">
            Orders waiting for approval
          </p>
        </div>

        {/* Card 2: Action Required (Inverted Dark Theme) */}
        <div className="group rounded-3xl border border-secondary/10 bg-secondary p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary">
              <FaClock size={17} />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
              Action
            </span>
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-white/40">
            Action Required
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            {orders.length}
          </h2>
          <p className="mt-2 text-xs text-white/35">
            Review these orders before production
          </p>
        </div>

        {/* Card 3: Workflow Status */}
        <div className="group hidden rounded-3xl border border-secondary/10 bg-white p-6 sm:block transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5">
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary">
              <FaBoxOpen size={17} />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/25">
              Status
            </span>
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-secondary/40">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary">
            Ready
          </h2>
          <p className="mt-2 text-xs text-secondary/35">
            Approved orders move to production
          </p>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-white">
        {/* TABLE HEADER */}

        <div className="flex flex-col justify-between gap-4 border-b border-secondary/10 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
              Incoming requests
            </p>

            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Orders awaiting approval
            </h2>
          </div>

          <div className="rounded-full bg-primary/10 px-4 py-2">
            <span className="text-xs font-bold text-secondary">
              {orders.length} Pending
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-250">
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
                  Order Date
                </th>

                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest text-secondary/30">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-secondary/5 transition hover:bg-primary/5"
                >
                  {/* ORDER ID */}

                  <td className="px-6 py-5">
                    <span className="font-mono text-xs text-secondary/60">
                      {order.trackingId || order._id}
                    </span>
                  </td>

                  {/* USER */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-secondary">
                        <FaUser size={13} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-secondary">
                          {order.firstName} {order.lastName}
                        </p>

                        <p className="text-xs text-secondary/35">
                          {order.customerEmail}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* PRODUCT */}

                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-secondary">
                      {order.productTitle}
                    </p>

                    {order.category && (
                      <p className="mt-1 text-xs text-secondary/35">
                        {order.category}
                      </p>
                    )}
                  </td>

                  {/* QUANTITY */}

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-secondary/5 px-3 py-1 text-xs font-bold text-secondary">
                      {order.quantity || 0} Units
                    </span>
                  </td>

                  {/* DATE */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-secondary/50">
                      <FaCalendarDays size={12} className="text-secondary/30" />

                      {order.orderDate || order.createdAt
                        ? new Date(
                            order.orderDate || order.createdAt,
                          ).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-3">
                      {/* VIEW */}

                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowModal(true);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/5 text-secondary transition hover:bg-secondary hover:text-white"
                        title="View Order"
                      >
                        <FaEye size={14} />
                      </button>

                      {/* APPROVE */}

                      <button
                        onClick={() => handleApprove(order)}
                        className="flex h-9 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-secondary transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
                        title="Approve Order"
                      >
                        <FaCheck size={12} />

                        <span className="hidden lg:inline">Approve</span>
                      </button>

                      {/* REJECT */}

                      <button
                        onClick={() => handleReject(order)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                        title="Reject Order"
                      >
                        <FaXmark size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* EMPTY STATE */}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-secondary">
                        <FaClipboardList size={25} />
                      </div>

                      <h3 className="mt-5 text-lg font-bold text-secondary">
                        No pending orders
                      </h3>

                      <p className="mt-2 text-sm text-secondary/40">
                        All incoming orders have been reviewed. New orders will
                        appear here automatically.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= ORDER DETAILS MODAL ================= */}

      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-secondary/10 bg-white px-6 py-5">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                  Order Details
                </p>

                <h2 className="mt-2 text-2xl font-bold text-secondary">
                  Review Order
                </h2>

                <p className="mt-1 font-mono text-[10px] text-secondary/35">
                  {selectedOrder.trackingId || selectedOrder._id}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedOrder(null);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition hover:bg-secondary hover:text-white"
              >
                <FaXmark />
              </button>
            </div>

            <div className="space-y-8 p-6">
              {/* CUSTOMER */}

              <section>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Customer
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <InfoItem
                    label="Name"
                    value={`${selectedOrder.firstName || ""} ${
                      selectedOrder.lastName || ""
                    }`}
                  />

                  <InfoItem label="Email" value={selectedOrder.customerEmail} />

                  <InfoItem
                    label="Phone"
                    value={selectedOrder.phone || "Not provided"}
                  />

                  <InfoItem
                    label="Order Date"
                    value={
                      selectedOrder.orderDate || selectedOrder.createdAt
                        ? new Date(
                            selectedOrder.orderDate || selectedOrder.createdAt,
                          ).toLocaleString()
                        : "N/A"
                    }
                  />
                </div>
              </section>

              {/* PRODUCT */}

              <section className="border-t border-secondary/10 pt-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Product Information
                </p>

                <div className="mt-4 rounded-2xl bg-[#f8faf8] p-5">
                  <div className="flex items-start gap-4">
                    {selectedOrder.productImage && (
                      <img
                        src={selectedOrder.productImage}
                        alt={selectedOrder.productTitle}
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                    )}

                    <div>
                      <h3 className="font-bold text-secondary">
                        {selectedOrder.productTitle}
                      </h3>

                      <p className="mt-1 text-sm text-secondary/40">
                        Quantity: {selectedOrder.quantity || 0}
                      </p>

                      {selectedOrder.category && (
                        <p className="mt-1 text-xs text-secondary/35">
                          {selectedOrder.category}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* PAYMENT */}

              <section className="border-t border-secondary/10 pt-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                  Payment
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <InfoItem
                    label="Total Amount"
                    value={`৳${Number(
                      selectedOrder.totalPrice || 0,
                    ).toLocaleString()}`}
                  />

                  <InfoItem
                    label="Payment Method"
                    value={selectedOrder.paymentMethod || "N/A"}
                  />

                  <InfoItem
                    label="Payment Status"
                    value={selectedOrder.paymentStatus || "Pending"}
                  />

                  <InfoItem
                    label="Order Status"
                    value={selectedOrder.orderStatus}
                  />
                </div>
              </section>

              {/* ACTIONS */}

              <div className="flex flex-col gap-3 border-t border-secondary/10 pt-6 sm:flex-row sm:justify-end">
                <button
                  onClick={() => handleReject(selectedOrder)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-bold text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  <FaXmark />
                  Reject Order
                </button>

                <button
                  onClick={() => handleApprove(selectedOrder)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-secondary transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <FaCheck />
                  Approve Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-secondary/10 bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-secondary/30">
        {label}
      </p>

      <p className="mt-2 wrap-break-word text-sm font-semibold text-secondary">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default PendingOrders;
