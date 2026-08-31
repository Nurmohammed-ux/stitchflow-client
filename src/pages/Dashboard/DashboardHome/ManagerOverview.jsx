import { useQuery } from "@tanstack/react-query";
import {
  FaBoxOpen,
  FaClock,
  FaClipboardList,
  FaArrowRight,
} from "react-icons/fa6";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";

const ManagerOverview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: dashboard = {}, isLoading } = useQuery({
    queryKey: ["manager-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/dashboard");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const stats = [
    {
      title: "Total Products",
      value: dashboard.totalProducts || 0,
      icon: FaBoxOpen,
      text: "Products in system",
    },
    {
      title: "Pending Orders",
      value: dashboard.pendingOrders || 0,
      icon: FaClock,
      text: "Waiting for approval",
    },
    {
      title: "Approved Orders",
      value: dashboard.approvedOrders || 0,
      icon: FaCheckCircle,
      text: "Ready for production",
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders || 0,
      icon: FaClipboardList,
      text: "All customer orders",
    },
  ];

  const chartData = [
    {
      name: "Pending",
      value: dashboard.pendingOrders || 0,
    },
    {
      name: "Approved",
      value: dashboard.approvedOrders || 0,
    },
    {
      name: "Rejected",
      value: dashboard.rejectedOrders || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf8] py-8 md:px-10 lg:px-12">
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Production Overview
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              Manager Dashboard
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-secondary/45 md:text-base">
              Monitor products, orders and production activity.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / MANAGER / OVERVIEW
          </p>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary">
                  <Icon size={17} />
                </div>

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/25">
                  Live
                </span>
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.15em] text-secondary/40">
                {stat.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-secondary/35">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* ================= ORDER CHART ================= */}

        <div className="rounded-3xl border border-secondary/10 bg-white p-6 shadow-sm lg:col-span-1">
          <div className="mb-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
              Order Status
            </p>

            <h2 className="mt-1 text-xl font-bold text-secondary">
              Orders Overview
            </h2>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={55}
                  paddingAngle={3}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        index === 0
                          ? "#f59e0b"
                          : index === 1
                            ? "#85AD20"
                            : "#ef4444"
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-secondary/50">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Pending
              </span>

              <span className="font-bold text-secondary">
                {dashboard.pendingOrders || 0}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-secondary/50">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                Approved
              </span>

              <span className="font-bold text-secondary">
                {dashboard.approvedOrders || 0}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-secondary/50">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                Rejected
              </span>

              <span className="font-bold text-secondary">
                {dashboard.rejectedOrders || 0}
              </span>
            </div>
          </div>
        </div>

        {/* ================= RECENT ORDERS ================= */}

        <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-secondary/10 p-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                Recent Activity
              </p>

              <h2 className="mt-1 text-xl font-bold text-secondary">
                Recent Orders
              </h2>
            </div>

            <Link
              to="/dashboard/pending-orders"
              className="group flex items-center gap-2 text-sm font-bold text-secondary transition hover:text-primary"
            >
              View All
              <FaArrowRight
                size={11}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5">
              <thead className="bg-[#f8faf8]">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                    Product
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-secondary/40">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-secondary/10">
                {dashboard.recentOrders?.map((order) => (
                  <tr
                    key={order._id}
                    className="transition-colors hover:bg-[#f8faf8]"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-secondary">
                        {order.productTitle}
                      </p>

                      <p className="mt-1 text-xs text-secondary/30">
                        {order.trackingId}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-secondary">
                        {order.firstName} {order.lastName}
                      </p>

                      <p className="text-xs text-secondary/40">
                        {order.customerEmail}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-secondary">
                      {order.quantity}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          order.orderStatus === "approved"
                            ? "bg-primary/20 text-secondary"
                            : order.orderStatus === "rejected"
                              ? "bg-red-50 text-red-500"
                              : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}

                {!dashboard.recentOrders?.length && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-12 text-center text-sm text-secondary/30"
                    >
                      No recent orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {/* Card 1: Add New Product (Dark Theme Variant) */}
        <Link
          to="/dashboard/add-product"
          className="group rounded-3xl bg-secondary p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:border hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary">
            <FaBoxOpen size={17} />
          </div>

          <h3 className="mt-8 text-lg font-bold">Add New Product</h3>

          <p className="mt-1 text-sm text-white/40">
            Create a new garment product.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-bold text-primary">
            Add Product
            <FaArrowRight
              size={10}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>

        {/* Card 2: Pending Orders */}
        <Link
          to="/dashboard/pending-orders"
          className="group rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary">
            <FaClock size={17} />
          </div>

          <h3 className="mt-8 text-lg font-bold text-secondary">
            Pending Orders
          </h3>

          <p className="mt-1 text-sm text-secondary/40">
            Review customer orders waiting for approval.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-bold text-secondary">
            Review Orders
            <FaArrowRight
              size={10}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>

        {/* Card 3: Production Orders */}
        <Link
          to="/dashboard/approved-orders"
          className="group rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-secondary">
            <FaCheckCircle size={17} />
          </div>

          <h3 className="mt-8 text-lg font-bold text-secondary">
            Production Orders
          </h3>

          <p className="mt-1 text-sm text-secondary/40">
            Manage approved orders and tracking updates.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-bold text-secondary">
            Manage Production
            <FaArrowRight
              size={10}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ManagerOverview;
