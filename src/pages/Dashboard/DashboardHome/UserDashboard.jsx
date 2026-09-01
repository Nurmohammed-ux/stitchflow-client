import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaClipboardList,
  FaClock,
  FaCircleCheck,
  FaCircleXmark,
  FaTruck,
  FaMoneyBillTrendUp,
  FaBoxOpen,
  FaArrowRight,
  FaLocationDot,
} from "react-icons/fa6";
import { Link } from "react-router";

import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import TrackingModal from "../../../components/TrackingModal/TrackingModal";

const BuyerOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [viewTrackingId, setViewTrackingId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["buyer-dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/buyer-stats?email=${user.email}`,
      );

      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/orders/my-orders?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-3xl border border-red-200 bg-red-50 px-8 py-6 text-center">
          <h2 className="text-lg font-bold text-red-600">
            Failed to load dashboard
          </h2>

          <p className="mt-2 text-sm text-red-500">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {};

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders || 0,
      icon: FaClipboardList,
      description: "Orders placed by you",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders || 0,
      icon: FaClock,
      description: "Waiting for approval",
    },
    {
      title: "Approved Orders",
      value: stats.approvedOrders || 0,
      icon: FaCircleCheck,
      description: "Orders approved",
    },
    {
      title: "Total Spent",
      value: `৳${Number(stats.totalSpent || 0).toLocaleString()}`,
      icon: FaMoneyBillTrendUp,
      description: "Total order value",
    },
  ];

  const orderStatusData = data?.orderStatus || [];
  const recentOrders = data?.recentOrders || [];

  // Transform raw orders into monthly aggregates for the AreaChart
  const monthlyOrdersMap = orders.reduce((acc, order) => {
    if (!order.createdAt) return acc;
    const monthName = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });
    acc[monthName] = (acc[monthName] || 0) + 1;
    return acc;
  }, {});

  const formattedChartData = Object.keys(monthlyOrdersMap).map((month) => ({
    month,
    orders: monthlyOrdersMap[month],
  }));

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
              Welcome back.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              Keep track of your orders, production progress, payments and
              deliveries from one place.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / BUYER / OVERVIEW
          </p>
        </div>
      </div>

      {/* ================= STAT CARDS ================= */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary">
                  <Icon size={17} />
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/25">
                  Account
                </span>
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-secondary/40">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary">
                {card.value}
              </h2>

              <p className="mt-2 text-xs text-secondary/35">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* ================= ORDER ACTIVITY + PAYMENT ================= */}

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {/* ORDER ACTIVITY */}

        <div className="rounded-3xl border border-secondary/10 bg-secondary p-6 text-white lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                Your Orders
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Order activity
              </h2>
            </div>

            <FaClipboardList className="text-primary/60" size={24} />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatusBox
              icon={FaClock}
              label="Pending"
              value={stats.pendingOrders}
            />

            <StatusBox
              icon={FaCircleCheck}
              label="Approved"
              value={stats.approvedOrders}
            />

            <StatusBox
              icon={FaCircleXmark}
              label="Rejected"
              value={stats.rejectedOrders}
            />

            <StatusBox
              icon={FaTruck}
              label="Delivered"
              value={stats.completedOrders}
            />
          </div>
        </div>

        {/* PAYMENT */}

        <div className="rounded-3xl border border-secondary/10 bg-white p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary">
            Payments
          </p>

          <h2 className="mt-2 text-2xl font-bold text-secondary">
            Payment overview
          </h2>

          <div className="mt-7 space-y-5">
            <PaymentRow
              label="Paid orders"
              value={stats.paidOrders || 0}
              total={stats.totalOrders || 0}
            />

            <PaymentRow
              label="Pending payment"
              value={stats.unpaidOrders || 0}
              total={stats.totalOrders || 0}
            />
          </div>
        </div>
      </div>

      {/* ================= CHARTS ================= */}

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {/* MONTHLY ORDERS */}

        <div className="rounded-3xl border border-secondary/10 bg-white p-6 xl:col-span-2">
          <div className="mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">
              Purchase history
            </p>

            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Orders over time
            </h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedChartData}>
                <defs>
                  <linearGradient
                    id="buyerOrdersGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#85AD20" stopOpacity={0.3} />

                    <stop offset="100%" stopColor="#85AD20" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#06274680",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#06274680",
                  }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#85AD20"
                  strokeWidth={3}
                  fill="url(#buyerOrdersGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ORDER DISTRIBUTION */}

        <div className="rounded-3xl border border-secondary/10 bg-white p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
            Orders
          </p>

          <h2 className="mt-2 text-2xl font-bold text-secondary">
            Order status
          </h2>

          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {orderStatusData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        ["#85AD20", "#062746", "#f59e0b", "#ef4444"][index % 4]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {orderStatusData.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between text-sm"
              >
                <span className="capitalize text-secondary/50">
                  {item.status?.replaceAll("-", " ")}
                </span>

                <span className="font-bold text-secondary">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= ACTIVE ORDER ================= */}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* CURRENT PRODUCTION */}

        <div className="rounded-3xl border border-secondary/10 bg-secondary p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                Production
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Current order progress
              </h2>
            </div>

            <FaBoxOpen className="text-primary/60" size={24} />
          </div>

          {data?.activeOrder ? (
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    {data.activeOrder.productTitle}
                  </p>

                  <p className="mt-1 font-mono text-[10px] text-white/35">
                    {data.activeOrder.trackingId}
                  </p>
                </div>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold capitalize text-primary">
                  {data.activeOrder.productionStage?.replaceAll("-", " ")}
                </span>
              </div>

              <div className="mt-7">
                <div className="flex justify-between text-xs text-white/40">
                  <span>Production progress</span>

                  <span>{data.activeOrder.progress || 0}%</span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{
                      width: `${data.activeOrder.progress || 0}%`,
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => setViewTrackingId(data.activeOrder.trackingId)}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-secondary transition hover:gap-3"
              >
                Track order
                <FaArrowRight size={11} />
              </button>
            </div>
          ) : (
            <div className="py-10 text-center">
              <FaTruck className="mx-auto text-2xl text-white/20" />

              <p className="mt-3 text-sm text-white/35">
                No active order right now.
              </p>

              <Link
                to="/products"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-secondary"
              >
                Browse products
                <FaArrowRight size={11} />
              </Link>
            </div>
          )}
        </div>

        {/* LATEST TRACKING */}

        <div className="rounded-3xl border border-secondary/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                Tracking
              </p>

              <h2 className="mt-2 text-2xl font-bold text-secondary">
                Latest update
              </h2>
            </div>

            <FaLocationDot className="text-primary" size={21} />
          </div>

          {data?.latestTracking ? (
            <div className="mt-7 rounded-2xl bg-[#f8faf8] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                  <FaTruck size={14} />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-secondary">
                    {data.latestTracking.status}
                  </p>

                  <p className="mt-1 text-sm text-secondary/45">
                    {data.latestTracking.details ||
                      data.latestTracking.note ||
                      "Your order has been updated."}
                  </p>

                  {data.latestTracking.location && (
                    <p className="mt-3 flex items-center gap-2 text-xs text-secondary/35">
                      <FaLocationDot size={10} />

                      {data.latestTracking.location}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 border-t border-secondary/10 pt-4">
                <p className="font-mono text-[9px] uppercase tracking-widest text-secondary/30">
                  Tracking ID
                </p>

                <p className="mt-1 font-mono text-xs font-bold text-secondary">
                  {data.latestTracking.trackingId}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex min-h-48 items-center justify-center">
              <p className="text-sm text-secondary/30">
                No tracking updates yet.
              </p>
            </div>
          )}

          <Link
            to="/dashboard/track-order"
            className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-secondary transition hover:text-primary"
          >
            View tracking
            <FaArrowRight size={10} />
          </Link>
        </div>
      </div>

      {/* ================= RECENT ORDERS ================= */}

      <div className="mt-5 overflow-hidden rounded-3xl border border-secondary/10 bg-white">
        <div className="flex items-center justify-between border-b border-secondary/10 p-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
              Latest activity
            </p>

            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Recent orders
            </h2>
          </div>

          <Link
            to="/dashboard/my-orders"
            className="rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary hover:text-secondary"
          >
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-190">
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
                  Amount
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-secondary/5 transition hover:bg-primary/5"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-secondary/60">
                      {order.trackingId || order._id}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {order.productImage ? (
                        <img
                          src={order.productImage}
                          alt={order.productTitle}
                          className="h-10 w-10 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/5">
                          <FaBoxOpen size={14} className="text-secondary/30" />
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-semibold text-secondary">
                          {order.productTitle}
                        </p>

                        <p className="text-xs text-secondary/35">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-secondary/60">
                    {order.quantity}
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-secondary">
                    ৳{Number(order.totalPrice || 0).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold capitalize text-secondary">
                      {order.orderStatus?.replaceAll("-", " ") || "pending"}
                    </span>
                  </td>
                </tr>
              ))}

              {!recentOrders.length && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-sm text-secondary/30"
                  >
                    You haven't placed any orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {viewTrackingId && (
        <TrackingModal
          trackingId={viewTrackingId}
          onClose={() => setViewTrackingId(null)}
        />
      )}
    </div>
  );
};

/* ================= STATUS BOX ================= */

const StatusBox = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <Icon className="text-primary" size={18} />

      <p className="mt-4 text-2xl font-bold">{value || 0}</p>

      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/30">
        {label}
      </p>
    </div>
  );
};

/* ================= PAYMENT ROW ================= */

const PaymentRow = ({ label, value, total }) => {
  const percentage = total
    ? Math.min(100, Math.round((value / total) * 100))
    : 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-secondary/60">{label}</span>

        <span className="font-bold text-secondary">{value}</span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary/5">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-2 text-[10px] text-secondary/30">
        {percentage}% of all orders
      </p>
    </div>
  );
};

export default BuyerOverview;
