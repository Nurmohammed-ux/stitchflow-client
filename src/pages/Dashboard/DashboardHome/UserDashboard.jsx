import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaBoxOpen,
  FaClock,
  FaTruck,
  FaClipboardList,
} from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

const UserDashboard = () => {
  // Replace these with API data later
  const stats = [
    {
      label: "Total Orders",
      value: "24",
      icon: FaClipboardList,
      description: "All orders placed",
    },
    {
      label: "Pending",
      value: "04",
      icon: FaClock,
      description: "Waiting for approval",
    },
    {
      label: "In Production",
      value: "08",
      icon: FaBoxOpen,
      description: "Currently processing",
    },
    {
      label: "Completed",
      value: "12",
      icon: FaCheckCircle,
      description: "Successfully delivered",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-2026-001",
      product: "Premium Cotton T-Shirt",
      quantity: 500,
      status: "In Production",
      payment: "Paid",
      date: "Aug 24, 2026",
    },
    {
      id: "ORD-2026-002",
      product: "Classic Denim Jacket",
      quantity: 250,
      status: "Pending",
      payment: "Pending",
      date: "Aug 22, 2026",
    },
    {
      id: "ORD-2026-003",
      product: "Slim Fit Chino Pant",
      quantity: 300,
      status: "Shipped",
      payment: "Paid",
      date: "Aug 18, 2026",
    },
  ];

  const getStatusClass = (status) => {
    if (status === "Completed" || status === "Shipped") {
      return "bg-primary/15 text-secondary";
    }

    if (status === "In Production") {
      return "bg-secondary text-white";
    }

    if (status === "Pending") {
      return "bg-secondary/5 text-secondary/60";
    }

    return "bg-secondary/5 text-secondary";
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-8 lg:px-10">
      <div className=" max-w-7xl">
        {/* =========================================================
            HEADER
        ========================================================= */}

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60">
                Buyer Dashboard
              </span>

              <span className="hidden h-px w-16 bg-primary/50 sm:block" />
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-secondary md:text-6xl">
              Production at a glance.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              Keep track of your orders, production progress and deliveries
              from one place.
            </p>

            <p className="mt-4 font-mono text-[9px] tracking-[0.25em] text-secondary/25">
              SF / DASHBOARD / BUYER / 001
            </p>
          </div>

          <Link
            to="/all-products"
            className="group flex w-fit items-center gap-3 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b355c] hover:shadow-lg"
          >
            Browse Products

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover:translate-x-1">
              <FaArrowRight size={10} />
            </span>
          </Link>
        </div>

        {/* =========================================================
            STAT CARDS
        ========================================================= */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/5 text-secondary transition-all duration-500 group-hover:bg-primary group-hover:text-secondary">
                    <Icon size={17} />
                  </div>

                  <span className="font-mono text-[9px] tracking-[0.2em] text-secondary/20">
                    LIVE
                  </span>
                </div>

                <div className="mt-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/35">
                    {stat.label}
                  </p>

                  <div className="mt-2 flex items-end gap-3">
                    <span className="text-4xl font-bold tracking-tighter text-secondary">
                      {stat.value}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-secondary/35">
                    {stat.description}
                  </p>
                </div>

                <div className="absolute -bottom-12 -right-12 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-700 group-hover:scale-150" />
              </div>
            );
          })}
        </div>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* =======================================================
              RECENT ORDERS
          ======================================================= */}

          <section className="overflow-hidden rounded-4xl border border-secondary/10 bg-white">
            <div className="flex flex-col gap-4 border-b border-secondary/10 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/35">
                    Activity
                  </span>
                </div>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-secondary">
                  Recent orders
                </h2>
              </div>

              <Link
                to="/dashboard/my-orders"
                className="group flex items-center gap-2 text-xs font-bold text-secondary/50 transition-colors hover:text-secondary"
              >
                View all

                <FaArrowRight
                  size={10}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Desktop table */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary/10">
                    <th className="px-7 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                      Order
                    </th>

                    <th className="px-5 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                      Product
                    </th>

                    <th className="px-5 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                      Quantity
                    </th>

                    <th className="px-5 py-4 text-left font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                      Status
                    </th>

                    <th className="px-7 py-4 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="group border-b border-secondary/5 transition-colors hover:bg-[#f8faf8]"
                    >
                      <td className="px-7 py-5">
                        <p className="font-mono text-xs font-bold text-secondary">
                          {order.id}
                        </p>

                        <p className="mt-1 text-[10px] text-secondary/30">
                          {order.date}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-sm font-semibold text-secondary">
                          {order.product}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <span className="text-sm text-secondary/60">
                          {order.quantity}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-7 py-5 text-right">
                        <Link
                          to={`/dashboard/track-order/${order.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary/5 text-secondary/50 transition-all hover:bg-primary hover:text-secondary"
                        >
                          <FaArrowUpRightFromSquare size={11} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}

            <div className="divide-y divide-secondary/5 md:hidden">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] font-bold text-secondary">
                        {order.id}
                      </p>

                      <p className="mt-1 text-[10px] text-secondary/30">
                        {order.date}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-secondary">
                    {order.product}
                  </h3>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-secondary/40">
                      Quantity:{" "}
                      <span className="font-bold text-secondary">
                        {order.quantity}
                      </span>
                    </p>

                    <Link
                      to={`/dashboard/track-order/${order.id}`}
                      className="flex items-center gap-2 text-xs font-bold text-secondary"
                    >
                      Track
                      <FaArrowRight size={9} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =======================================================
              PRODUCTION STATUS
          ======================================================= */}

          <section className="relative overflow-hidden rounded-4xl bg-secondary p-7 text-white">
            {/* Blueprint grid */}

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />

                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-primary">
                  Current production
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em]">
                Premium Cotton T-Shirt
              </h2>

              <p className="mt-3 text-sm text-white/40">
                Order #ORD-2026-001
              </p>

              {/* Progress */}

              <div className="mt-10">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Production progress
                    </p>

                    <p className="mt-2 text-4xl font-bold tracking-tighter text-primary">
                      72%
                    </p>
                  </div>

                  <FaTruck className="mb-2 text-primary" size={20} />
                </div>

                <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[72%] rounded-full bg-primary" />
                </div>
              </div>

              {/* Timeline */}

              <div className="mt-10 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary">
                    <FaCheckCircle size={12} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Order Approved
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      Completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary">
                    <FaCheckCircle size={12} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Cutting Completed
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      Completed
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-primary">
                      Sewing Started
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      Currently processing
                    </p>
                  </div>
                </div>
              </div>

              {/* Track button */}

              <Link
                to="/dashboard/track-order/ORD-2026-001"
                className="group mt-10 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold transition-all hover:border-primary hover:bg-primary hover:text-secondary"
              >
                Track this order

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover:rotate-45">
                  <FaArrowUpRightFromSquare size={10} />
                </span>
              </Link>
            </div>

            {/* Decorative circle */}

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full border border-primary/10" />

            <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full border border-primary/10" />
          </section>
        </div>

        {/* =========================================================
            QUICK ACTIONS
        ========================================================= */}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            to="/all-products"
            className="group flex items-center justify-between rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                Explore
              </p>

              <h3 className="mt-2 text-lg font-bold text-secondary">
                Browse Products
              </h3>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-all group-hover:bg-primary group-hover:text-secondary">
              <FaArrowRight size={11} />
            </span>
          </Link>

          <Link
            to="/dashboard/my-orders"
            className="group flex items-center justify-between rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                Orders
              </p>

              <h3 className="mt-2 text-lg font-bold text-secondary">
                View My Orders
              </h3>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-all group-hover:bg-primary group-hover:text-secondary">
              <FaArrowRight size={11} />
            </span>
          </Link>

          <Link
            to="/dashboard/profile"
            className="group flex items-center justify-between rounded-3xl border border-secondary/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                Account
              </p>

              <h3 className="mt-2 text-lg font-bold text-secondary">
                Manage Profile
              </h3>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition-all group-hover:bg-primary group-hover:text-secondary">
              <FaArrowRight size={11} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;