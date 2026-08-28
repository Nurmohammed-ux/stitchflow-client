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
  FaUsers,
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillTrendUp,
  FaClock,
  FaCircleCheck,
  FaCircleXmark,
  FaTruck,
} from "react-icons/fa6";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const AdminOverview = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard/admin-stats?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loading />
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
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: FaUsers,
      description: "Registered users",
    },
    {
      title: "Total Products",
      value: stats.totalProducts || 0,
      icon: FaBoxOpen,
      description: "Products in system",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders || 0,
      icon: FaClipboardList,
      description: "All customer orders",
    },
    {
      title: "Revenue",
      value: `৳${Number(stats.totalRevenue || 0).toLocaleString()}`,
      icon: FaMoneyBillTrendUp,
      description: "From paid orders",
    },
  ];

  const orderStatusData = data?.orderStatus || [];

  const userRoleData = Object.entries(data?.usersByRole || {}).map(
    ([role, count]) => ({
      role,
      count,
    }),
  );

  const monthlyOrders = data?.monthlyOrders || [];

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
      {/* HEADER */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Administration
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              Factory Overview.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              Monitor users, products, orders, payments and production activity
              across your entire StitchFlow workspace.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / ADMIN / OVERVIEW
          </p>
        </div>
      </div>

      {/* STAT CARDS */}

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
                  Live
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

      {/* ORDER STATUS */}

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <div className="rounded-3xl border border-secondary/10 bg-secondary p-6 text-white lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                Orders
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Order activity
              </h2>
            </div>

            <FaClipboardList className="text-primary/60" size={24} />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              label="Completed"
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
            Payment status
          </h2>

          <div className="mt-7 space-y-5">
            <PaymentRow
              label="Paid orders"
              value={stats.paidOrders || 0}
              total={stats.totalOrders || 0}
            />

            <PaymentRow
              label="Unpaid orders"
              value={stats.unpaidOrders || 0}
              total={stats.totalOrders || 0}
            />
          </div>
        </div>
      </div>

      {/* CHARTS */}

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {/* MONTHLY ORDERS */}

        <div className="rounded-3xl border border-secondary/10 bg-white p-6 xl:col-span-2">
          <div className="mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-secondary">
              Production demand
            </p>

            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Orders over time
            </h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyOrders}>
                <defs>
                  <linearGradient
                    id="ordersGradient"
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
                  fill="url(#ordersGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* USERS */}

        <div className="rounded-3xl border border-secondary/10 bg-white p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
            Users
          </p>

          <h2 className="mt-2 text-2xl font-bold text-secondary">User roles</h2>

          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoleData}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {userRoleData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={["#85AD20", "#062746", "#94a3b8"][index % 3]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {userRoleData.map((item) => (
              <div
                key={item.role}
                className="flex items-center justify-between text-sm"
              >
                <span className="capitalize text-secondary/50">
                  {item.role}
                </span>

                <span className="font-bold text-secondary">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ORDER STATUS CHART */}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-secondary/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
                Operations
              </p>

              <h2 className="mt-2 text-2xl font-bold text-secondary">
                Order distribution
              </h2>
            </div>
          </div>

          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {orderStatusData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        ["#85AD20", "#062746", "#f59e0b", "#ef4444", "#64748b"][
                          index % 5
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TRACKING */}

        <div className="rounded-3xl border border-secondary/10 bg-secondary p-6 text-white">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
            Production tracking
          </p>

          <h2 className="mt-2 text-2xl font-bold">Tracking activity</h2>

          <div className="mt-7 space-y-4">
            {(data?.recentTrackings || []).map((tracking) => (
              <div
                key={tracking._id}
                className="flex items-center justify-between border-b border-white/10 pb-4"
              >
                <div>
                  <p className="text-sm font-semibold">{tracking.status}</p>

                  <p className="mt-1 text-xs text-white/35">
                    {tracking.details}
                  </p>
                </div>

                <span className="font-mono text-[9px] text-primary">
                  {tracking.trackingId}
                </span>
              </div>
            ))}

            {!data?.recentTrackings?.length && (
              <p className="py-8 text-center text-sm text-white/30">
                No tracking activity yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}

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
            to="/dashboard/all-orders"
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
                  Customer
                </th>

                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-secondary/30">
                  Product
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
              {(data?.recentOrders || []).map((order) => (
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
                    <p className="text-sm font-semibold text-secondary">
                      {order.firstName} {order.lastName}
                    </p>

                    <p className="text-xs text-secondary/35">
                      {order.customerEmail}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-secondary/60">
                    {order.productTitle}
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-secondary">
                    ৳{Number(order.totalPrice || 0).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold capitalize text-secondary">
                      {order.orderStatus?.replaceAll("-", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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

const PaymentRow = ({ label, value, total }) => {
  const percentage = total ? Math.round((value / total) * 100) : 0;

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

export default AdminOverview;
