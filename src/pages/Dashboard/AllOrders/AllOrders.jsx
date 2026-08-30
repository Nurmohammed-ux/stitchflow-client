import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FaClipboardList,
  FaMagnifyingGlass,
  FaArrowUpRightFromSquare,
  FaClock,
  FaCircleCheck,
  FaCircleXmark,
  FaMoneyBillWave,
} from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-all-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
    enabled: !!user?.email,
  });

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        order.trackingId?.toLowerCase().includes(searchText) ||
        order.customerEmail?.toLowerCase().includes(searchText) ||
        order.productTitle?.toLowerCase().includes(searchText) ||
        order.firstName?.toLowerCase().includes(searchText) ||
        order.lastName?.toLowerCase().includes(searchText);

      const matchesStatus = status === "all" || order.orderStatus === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "pending-review",
  ).length;

  const approvedOrders = orders.filter(
    (order) => order.orderStatus === "approved",
  ).length;

  const rejectedOrders = orders.filter(
    (order) => order.orderStatus === "rejected",
  ).length;

  const paidOrders = orders.filter(
    (order) => order.paymentStatus === "paid",
  ).length;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <div className="rounded-3xl border border-red-100 bg-red-50 px-8 py-6 text-center">
          <h2 className="text-lg font-bold text-red-500">
            Failed to load orders
          </h2>

          <p className="mt-2 text-sm text-red-400">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-8 lg:px-10">
      {/* ================= HEADER ================= */}

      <div>
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Order Management
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              All <span className="text-primary">Orders.</span>
            </h1>

            <p className="mt-5 text-sm leading-relaxed text-secondary/50 md:text-base">
              View every customer order, monitor approval and payment status,
              and access full order details and tracking history.
            </p>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary/30">
            SF / ORDERS / ADMIN
          </p>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <FaClipboardList className="text-primary" size={18} />

          <p className="mt-5 text-3xl font-bold text-secondary">
            {orders.length}
          </p>

          <p className="mt-1 text-xs uppercase tracking-wider text-secondary/40">
            Total Orders
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <FaClock className="text-primary" size={18} />

          <p className="mt-5 text-3xl font-bold text-secondary">
            {pendingOrders}
          </p>

          <p className="mt-1 text-xs uppercase tracking-wider text-secondary/40">
            Pending
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <FaCircleCheck className="text-primary" size={18} />

          <p className="mt-5 text-3xl font-bold text-secondary">
            {approvedOrders}
          </p>

          <p className="mt-1 text-xs uppercase tracking-wider text-secondary/40">
            Approved
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <FaCircleXmark className="text-red-500" size={18} />

          <p className="mt-5 text-3xl font-bold text-secondary">
            {rejectedOrders}
          </p>

          <p className="mt-1 text-xs uppercase tracking-wider text-secondary/40">
            Rejected
          </p>
        </div>

        <div className="rounded-3xl border border-secondary/10 bg-white p-5">
          <FaMoneyBillWave className="text-primary" size={18} />

          <p className="mt-5 text-3xl font-bold text-secondary">{paidOrders}</p>

          <p className="mt-1 text-xs uppercase tracking-wider text-secondary/40">
            Paid Orders
          </p>
        </div>
      </div>

      {/* ================= FILTERS ================= */}

      <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-secondary/10 bg-white p-5 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <FaMagnifyingGlass
            className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30"
            size={13}
          />

          <input
            type="text"
            placeholder="Search order, customer or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-secondary/10 bg-[#f8faf8] py-3.5 pl-11 pr-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/25 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="relative inline-block">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-secondary/10 bg-[#f8faf8] py-3.5 pl-4 pr-10 text-sm font-semibold text-secondary outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
          >
            <option value="all">All Status</option>
            <option value="pending-review">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="payment-pending">Payment Pending</option>
            <option value="production-ready">Production Ready</option>
            <option value="in-production">In Production</option>
            <option value="completed">Completed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>

          {/* Custom Down Arrow Icon Positioned 10px from the right */}
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-secondary/40">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="mt-6 overflow-hidden rounded-4xl border border-secondary/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-262.5">
            <thead>
              <tr className="border-b border-secondary/10 bg-[#f8faf8]">
                <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                  Order ID
                </th>

                <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                  User
                </th>

                <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                  Product
                </th>

                <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                  Quantity
                </th>

                <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                  Total
                </th>

                <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                  Payment
                </th>

                <th className="px-6 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                  Status
                </th>

                <th className="px-6 py-4 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-secondary/5 transition-colors hover:bg-[#f8faf8]"
                >
                  {/* TRACKING ID */}

                  <td className="px-6 py-5">
                    <p className="font-mono text-xs font-bold text-secondary">
                      {order.trackingId || order._id}
                    </p>

                    <p className="mt-1 text-[10px] text-secondary/30">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </td>

                  {/* USER */}

                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-secondary">
                      {order.firstName} {order.lastName}
                    </p>

                    <p className="mt-1 text-xs text-secondary/40">
                      {order.customerEmail}
                    </p>
                  </td>

                  {/* PRODUCT */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {order.productImage && (
                        <img
                          src={order.productImage}
                          alt={order.productTitle}
                          className="h-11 w-11 rounded-xl object-cover"
                        />
                      )}

                      <p className="max-w-52 truncate text-sm font-semibold text-secondary">
                        {order.productTitle}
                      </p>
                    </div>
                  </td>

                  {/* QUANTITY */}

                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-secondary/60">
                      {order.quantity?.toLocaleString()}
                    </span>
                  </td>

                  {/* TOTAL */}

                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-secondary">
                      ৳{Number(order.totalPrice || 0).toLocaleString()}
                    </span>
                  </td>

                  {/* PAYMENT */}

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                        order.paymentStatus === "paid"
                          ? "bg-primary/15 text-secondary"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {order.paymentStatus || "pending"}
                    </span>
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                        order.orderStatus === "approved"
                          ? "bg-primary/15 text-secondary"
                          : order.orderStatus === "rejected"
                            ? "bg-red-50 text-red-500"
                            : order.orderStatus === "pending-review"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-secondary/5 text-secondary/60"
                      }`}
                    >
                      {order.orderStatus?.replaceAll("-", " ")}
                    </span>
                  </td>

                  {/* ACTION */}

                  <td className="px-6 py-5">
                    <div className="flex justify-end">
                      <Link
                        to={`/dashboard/order-details/${order._id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/5 text-secondary/50 transition-all hover:bg-primary hover:text-secondary"
                        title="View Order"
                      >
                        <FaArrowUpRightFromSquare size={11} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}

        {filteredOrders.length === 0 && (
          <div className="flex min-h-60 flex-col items-center justify-center px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FaClipboardList />
            </div>

            <h3 className="mt-4 font-bold text-secondary">No orders found</h3>

            <p className="mt-1 text-sm text-secondary/40">
              Try changing your search or status filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
