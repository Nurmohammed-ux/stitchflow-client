import {
  FaArrowUp,
  FaArrowDown,
  FaBoxes,
  FaClipboardList,
  FaTshirt,
  FaTruck,
  FaCheckCircle,
  FaEllipsisH,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const productionData = [
  { month: "Jan", value: 52 },
  { month: "Feb", value: 61 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 72 },
  { month: "May", value: 67 },
  { month: "Jun", value: 84 },
  { month: "Jul", value: 76 },
  { month: "Aug", value: 91 },
];

const orders = [
  {
    id: "#SF-2048",
    buyer: "Urban Threads",
    product: "Polo Shirt",
    quantity: "5,000",
    progress: 82,
    status: "In Production",
  },
  {
    id: "#SF-2047",
    buyer: "Northline Apparel",
    product: "Denim Jacket",
    quantity: "3,200",
    progress: 64,
    status: "In Production",
  },
  {
    id: "#SF-2046",
    buyer: "Mode Studio",
    product: "Basic Tee",
    quantity: "7,500",
    progress: 100,
    status: "Completed",
  },
];

const DashboardShowcase = () => {
  return (
    <section className="bg-base-100 py-24 md:py-32">
      <div className="px-5 md:px-15 lg:px-25">
        {/* ================= HEADER ================= */}

        <div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/50">
              Inside StitchFlow
            </span>

            <span className="hidden h-px w-20 bg-primary/60 sm:block" />
          </div>

          <div>
            <h2 className="mt-6 text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-7xl">
              Your entire factory,
              <br className="lg:hidden inline" />{" "}
              <span className="text-primary">One view.</span>
            </h2>

            <p className="mt-7 text-base leading-relaxed text-secondary/50 md:text-lg">
              See orders, production progress, inventory and delivery status
              from one simple dashboard. No spreadsheets. No guessing.
            </p>
          </div>

          <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / DASHBOARD / 003
          </p>
        </div>

        {/* ================= DASHBOARD ================= */}

        <div className="mt-20">
          {/* Browser */}
          <div
            className="
              overflow-hidden
              rounded-4xl
              border
              border-secondary/10
              bg-secondary/5
              shadow-xl
              shadow-secondary/5
            "
          >
            {/* Browser Header */}
            <div
              className="
                flex
                h-14
                items-center
                justify-between
                border-b
                border-secondary/10
                bg-white
                px-5
                md:px-7
              "
            >
              {/* Browser dots */}
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-secondary/10" />
                <span className="h-3 w-3 rounded-full bg-secondary/10" />
                <span className="h-3 w-3 rounded-full bg-secondary/10" />
              </div>

              {/* URL */}
              <div
                className="
                  hidden
                  rounded-full
                  bg-secondary/5
                  px-6
                  py-2
                  text-[10px]
                  font-medium
                  text-secondary/30
                  md:block
                "
              >
                app.stitchflow.com/dashboard
              </div>

              {/* Profile */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-secondary">
                A
              </div>
            </div>

            {/* ================= APP ================= */}

            <div className="grid lg:grid-cols-[210px_1fr]">
              {/* Sidebar */}
              <aside className="hidden bg-secondary p-5 lg:block">
                {/* Logo */}
                <div className="mb-10 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <span className="font-bold text-secondary">S</span>
                  </div>

                  <span className="font-bold text-white">StitchFlow</span>
                </div>

                {/* Navigation */}
                <div className="space-y-1">
                  <DashboardNav label="Dashboard" active />

                  <DashboardNav label="Orders" />

                  <DashboardNav label="Production" />

                  <DashboardNav label="Inventory" />

                  <DashboardNav label="Quality Control" />

                  <DashboardNav label="Shipments" />
                </div>

                {/* Workspace */}
                <div className="mt-20 border-t border-white/10 pt-5">
                  <p className="px-3 text-[9px] uppercase tracking-[0.2em] text-white/25">
                    Workspace
                  </p>

                  <p className="mt-3 px-3 text-xs text-white/40">
                    Dhaka Factory
                  </p>
                </div>
              </aside>

              {/* Main Dashboard */}
              <main className="bg-secondary/5 p-5 md:p-7">
                {/* Heading */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs font-medium text-secondary/40">
                      Sunday, August 23, 2026
                    </p>

                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-secondary">
                      Good morning, Admin
                    </h3>
                  </div>

                  <button
                    className="
                      flex
                      w-fit
                      items-center
                      gap-2
                      rounded-full
                      bg-secondary
                      px-4
                      py-2.5
                      text-xs
                      font-semibold
                      text-white
                      transition-all
                      hover:bg-secondary/90
                    "
                  >
                    <span className="text-primary">+</span>
                    New Order
                  </button>
                </div>

                {/* ================= STATS ================= */}

                <div className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
                  <StatCard
                    icon={<FaClipboardList />}
                    label="Active Orders"
                    value="128"
                    change="+12.4%"
                    positive
                  />

                  <StatCard
                    icon={<FaTshirt />}
                    label="In Production"
                    value="84"
                    change="+8.2%"
                    positive
                  />

                  <StatCard
                    icon={<FaBoxes />}
                    label="Inventory Items"
                    value="2,481"
                    change="-3.1%"
                  />

                  <StatCard
                    icon={<FaTruck />}
                    label="Ready to Ship"
                    value="24"
                    change="+6.8%"
                    positive
                  />
                </div>

                {/* ================= CHART ================= */}

                <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
                  {/* Production Chart */}
                  <div
                    className="
                      rounded-4xl
                      border
                      border-secondary/10
                      bg-white
                      p-5
                      md:p-6
                    "
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-secondary/40">
                          Production output
                        </p>

                        <div className="mt-1 flex items-end gap-3">
                          <span className="text-3xl font-bold text-secondary">
                            18,420
                          </span>

                          <span className="mb-1 flex items-center gap-1 text-xs font-bold text-primary">
                            <FaArrowUp size={9} />
                            18.4%
                          </span>
                        </div>
                      </div>

                      <button className="text-secondary/30">
                        <FaEllipsisH />
                      </button>
                    </div>

                    {/* Chart */}
                    <div className="mt-8 flex h-44 items-end gap-2 md:gap-4">
                      {productionData.map((item) => (
                        <div
                          key={item.month}
                          className="group flex h-full flex-1 flex-col justify-end"
                        >
                          <div className="relative flex flex-1 items-end">
                            <div
                              className="
                                w-full
                                rounded-t-lg
                                bg-primary/20
                                transition-all
                                duration-300
                                group-hover:bg-primary
                              "
                              style={{
                                height: `${item.value}%`,
                              }}
                            />
                          </div>

                          <span className="mt-2 text-center text-[9px] text-secondary/30">
                            {item.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Order */}
                  <div
                    className="
                      rounded-4xl
                      bg-secondary
                      p-5
                      text-white
                      md:p-6
                    "
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-white/40">Current order</p>

                        <h4 className="mt-1 text-lg font-bold">#SF-2048</h4>
                      </div>

                      <span className="rounded-full bg-primary/15 px-3 py-1.5 text-[10px] font-bold text-primary">
                        ON TRACK
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mt-8">
                      <div className="flex justify-between">
                        <span className="text-xs text-white/40">
                          Polo Shirt
                        </span>

                        <span className="text-xs font-bold text-primary">
                          76%
                        </span>
                      </div>

                      <div className="mt-3 h-2 rounded-full bg-white/10">
                        <div className="h-full w-[76%] rounded-full bg-primary" />
                      </div>
                    </div>

                    {/* Stages */}
                    <div className="mt-8 space-y-4">
                      <ProgressStage label="Cutting" value="100%" complete />

                      <ProgressStage label="Sewing" value="82%" complete />

                      <ProgressStage label="Finishing" value="45%" />

                      <ProgressStage label="Quality" value="—" />
                    </div>
                  </div>
                </div>

                {/* ================= ORDERS ================= */}

                <div
                  className="
                    mt-5
                    rounded-4xl
                    border
                    border-secondary/10
                    bg-white
                    p-5
                    md:p-6
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-secondary/40">Recent orders</p>

                      <h4 className="mt-1 text-lg font-bold text-secondary">
                        Production overview
                      </h4>
                    </div>

                    <button className="text-xs font-semibold text-secondary underline underline-offset-4">
                      View all
                    </button>
                  </div>

                  {/* Table */}
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-162.5 text-left">
                      <thead>
                        <tr className="border-b border-secondary/10 text-[9px] uppercase tracking-[0.15em] text-secondary/30">
                          <th className="pb-3">Order</th>
                          <th className="pb-3">Buyer</th>
                          <th className="pb-3">Product</th>
                          <th className="pb-3">Quantity</th>
                          <th className="pb-3">Progress</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-b border-secondary/5 last:border-0"
                          >
                            <td className="py-4 text-xs font-bold text-secondary">
                              {order.id}
                            </td>

                            <td className="py-4 text-xs text-secondary/50">
                              {order.buyer}
                            </td>

                            <td className="py-4 text-xs font-medium text-secondary">
                              {order.product}
                            </td>

                            <td className="py-4 text-xs text-secondary/50">
                              {order.quantity}
                            </td>

                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 w-20 rounded-full bg-secondary/10">
                                  <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                      width: `${order.progress}%`,
                                    }}
                                  />
                                </div>

                                <span className="text-[10px] font-bold text-secondary">
                                  {order.progress}%
                                </span>
                              </div>
                            </td>

                            <td className="py-4">
                              <span
                                className={`
                                  rounded-full
                                  px-2.5
                                  py-1
                                  text-[9px]
                                  font-bold
                                  ${
                                    order.status === "Completed"
                                      ? "bg-primary/15 text-secondary"
                                      : "bg-secondary/5 text-secondary"
                                  }
                                `}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM MESSAGE ================= */}

        <div className="mt-20 border-t border-secondary/10 pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-4xl text-2xl font-medium leading-tight tracking-[-0.03em] text-secondary md:text-3xl">
              Everything your production team needs, visible at a glance.
            </p>

            <button
              className="
                group
                flex
                w-fit
                items-center
                gap-3
                rounded-full
                bg-secondary
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                transition-all
                hover:bg-secondary/90
              "
            >
              Explore Dashboard
              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-secondary
                  transition-transform
                  duration-300
                  group-hover:rotate-45
                "
              >
                <FaArrowUpRightFromSquare size={11} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================
   DASHBOARD NAV
========================================= */

const DashboardNav = ({ label, active = false }) => {
  return (
    <div
      className={`
        rounded-xl
        px-3
        py-2.5
        text-xs
        font-semibold
        ${active ? "bg-white/10 text-white" : "text-white/40"}
      `}
    >
      {label}
    </div>
  );
};

/* =========================================
   STAT CARD
========================================= */

const StatCard = ({ icon, label, value, change, positive }) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-secondary/10
        bg-white
        p-4
        md:p-5
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/5 text-secondary">
          {icon}
        </div>

        <span
          className={`
            flex
            items-center
            gap-1
            text-[9px]
            font-bold
            ${positive ? "text-primary" : "text-red-400"}
          `}
        >
          {positive ? <FaArrowUp size={7} /> : <FaArrowDown size={7} />}

          {change}
        </span>
      </div>

      <p className="mt-5 text-2xl font-bold tracking-tight text-secondary">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-secondary/40">{label}</p>
    </div>
  );
};

/* =========================================
   PROGRESS STAGE
========================================= */

const ProgressStage = ({ label, value, complete = false }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          ${
            complete
              ? "bg-primary text-secondary"
              : "border border-white/15 text-white/20"
          }
        `}
      >
        {complete && <FaCheckCircle size={9} />}
      </div>

      <span className="flex-1 text-xs text-white/50">{label}</span>

      <span className="text-xs font-bold text-white">{value}</span>
    </div>
  );
};

export default DashboardShowcase;
