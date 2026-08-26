import {
  FaArrowUp,
  FaChartLine,
  FaClock,
  FaBoxes,
  FaCheckCircle,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const monthlyProduction = [
  { month: "Jan", production: 58, target: 65 },
  { month: "Feb", production: 64, target: 68 },
  { month: "Mar", production: 61, target: 70 },
  { month: "Apr", production: 72, target: 74 },
  { month: "May", production: 78, target: 76 },
  { month: "Jun", production: 84, target: 80 },
  { month: "Jul", production: 88, target: 84 },
  { month: "Aug", production: 94, target: 88 },
];

const Analytics = () => {
  return (
    <section className="bg-base-100 py-14 md:py-15">
      <div className="px-5 md:px-15 lg:px-25">
        {/* ================= HEADER ================= */}

        <div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/50">
              Production intelligence
            </span>

            <span className="hidden h-px w-20 bg-primary/60 sm:block" />
          </div>

          <div>
            <h2 className="mt-6 text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-7xl">
              Turn production data,
              <br className="lg:hidden inline" />{" "}
              <span className="text-primary">into better decisions.</span>
            </h2>

            <p className="mt-7 text-base leading-relaxed text-secondary/50 md:text-lg">
              StitchFlow transforms your factory's daily activity into clear
              insights, helping you understand performance, identify bottlenecks
              and stay ahead of deadlines.
            </p>
          </div>

          <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / ANALYTICS / 007
          </p>
        </div>

        {/* ================= ANALYTICS GRID ================= */}

        <div className="mt-20 grid gap-4 lg:grid-cols-3">
          {/* ================= PRODUCTION OUTPUT ================= */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-4xl
              border
              border-secondary/10
              bg-white
              p-6
              lg:col-span-2
              md:p-8
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-secondary">
                    <FaChartLine size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-secondary/40">
                      Production output
                    </p>

                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-3xl font-bold tracking-tight text-secondary">
                        18,420
                      </span>

                      <span className="flex items-center gap-1 text-xs font-bold text-primary">
                        <FaArrowUp size={8} />
                        18.4%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="rounded-full bg-secondary/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-secondary/40">
                8 Months
              </span>
            </div>

            {/* Chart */}

            <div className="mt-12">
              <div className="relative h-64">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[1, 2, 3, 4, 5].map((line) => (
                    <div
                      key={line}
                      className="border-t border-dashed border-secondary/10"
                    />
                  ))}
                </div>

                {/* Bars */}
                <div className="relative z-10 flex h-full items-end gap-2 md:gap-5">
                  {monthlyProduction.map((item) => (
                    <div
                      key={item.month}
                      className="group/bar flex h-full flex-1 items-end gap-1"
                    >
                      {/* Target */}
                      <div className="relative flex h-full flex-1 items-end">
                        <div
                          className="
                            w-full
                            rounded-t-md
                            bg-secondary/10
                            transition-all
                            duration-500
                            group-hover/bar:bg-secondary/20
                          "
                          style={{
                            height: `${item.target}%`,
                          }}
                        />
                      </div>

                      {/* Production */}
                      <div className="relative flex h-full flex-1 items-end">
                        <div
                          className="
                            w-full
                            rounded-t-md
                            bg-primary
                            transition-all
                            duration-500
                            group-hover/bar:bg-primary/70
                          "
                          style={{
                            height: `${item.production}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Months */}

              <div className="mt-3 flex gap-2 md:gap-5">
                {monthlyProduction.map((item) => (
                  <span
                    key={item.month}
                    className="flex-1 text-center text-[9px] font-medium text-secondary/30"
                  >
                    {item.month}
                  </span>
                ))}
              </div>
            </div>

            {/* Legend */}

            <div className="mt-8 flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />

                <span className="text-[10px] text-secondary/40">
                  Actual production
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary/15" />

                <span className="text-[10px] text-secondary/40">Target</span>
              </div>
            </div>

            {/* Decorative circle */}

            <div
              className="
                absolute
                -bottom-24
                -right-24
                h-48
                w-48
                rounded-full
                bg-primary/5
                transition-transform
                duration-700
                group-hover:scale-125
              "
            />
          </div>

          {/* ================= PERFORMANCE ================= */}

          <div
            className="
              rounded-4xl
              bg-secondary
              p-6
              text-white
              md:p-8
            "
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <FaCheckCircle size={16} />
              </div>

              <div>
                <p className="text-xs text-white/40">Factory performance</p>

                <p className="mt-1 text-lg font-bold">Excellent</p>
              </div>
            </div>

            {/* Score */}

            <div className="mt-10">
              <div className="flex items-end gap-2">
                <span className="text-6xl font-bold tracking-[-0.06em]">
                  92
                </span>

                <span className="mb-2 text-sm text-white/30">/100</span>
              </div>

              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-primary" />
              </div>

              <p className="mt-3 text-xs leading-relaxed text-white/40">
                Your factory is performing above the monthly production target.
              </p>
            </div>

            {/* Metrics */}

            <div className="mt-10 space-y-5">
              <PerformanceMetric
                label="On-time delivery"
                value="96%"
                positive
              />

              <PerformanceMetric
                label="Production efficiency"
                value="91%"
                positive
              />

              <PerformanceMetric
                label="Quality pass rate"
                value="98%"
                positive
              />
            </div>
          </div>
        </div>

        {/* ================= SMALL METRICS ================= */}

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {/* Delivery */}

          <MetricCard
            icon={<FaClock />}
            label="Average production time"
            value="4.8 days"
            change="-12.5%"
            description="Faster than last month"
            positive
          />

          {/* Inventory */}

          <MetricCard
            icon={<FaBoxes />}
            label="Inventory efficiency"
            value="87.4%"
            change="+9.2%"
            description="Better stock utilization"
            positive
          />

          {/* Quality */}

          <MetricCard
            icon={<FaCheckCircle />}
            label="Quality pass rate"
            value="98.2%"
            change="+4.8%"
            description="Highest this quarter"
            positive
          />
        </div>

        {/* ================= INSIGHT ================= */}

        <div
          className="
            mt-20
            border-t
            border-secondary/10
            pt-10
          "
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-primary">
                  INSIGHT / 01
                </span>

                <span className="h-px w-12 bg-secondary/20" />
              </div>

              <p className="mt-4 text-2xl font-medium leading-tight tracking-[-0.03em] text-secondary md:text-3xl">
                Your production efficiency improved by{" "}
                <span className="font-bold text-primary">18.4%</span> this
                month.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-secondary/45">
                StitchFlow helps you understand what is happening across your
                factory before small problems become production delays.
              </p>
            </div>

            <button
              className="
                group
                flex
                w-fit
                shrink-0
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
              View Analytics
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
   PERFORMANCE METRIC
========================================= */

const PerformanceMetric = ({ label, value, positive = false }) => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0">
      <span className="text-xs text-white/40">{label}</span>

      <span
        className={`flex items-center gap-1 text-sm font-bold ${
          positive ? "text-primary" : "text-white"
        }`}
      >
        {positive && <FaArrowUp size={8} />}

        {value}
      </span>
    </div>
  );
};

/* =========================================
   METRIC CARD
========================================= */

const MetricCard = ({ icon, label, value, change, description, positive }) => {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-4xl
        border
        border-secondary/10
        bg-white
        p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-primary/50
        hover:shadow-xl
        hover:shadow-secondary/5
        md:p-7
      "
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/5 text-secondary transition-all duration-300 group-hover:bg-primary">
          {icon}
        </div>

        <span
          className={`
            flex
            items-center
            gap-1
            text-[10px]
            font-bold
            ${positive ? "text-primary" : "text-red-400"}
          `}
        >
          {positive && <FaArrowUp size={8} />}

          {change}
        </span>
      </div>

      <p className="mt-10 text-xs text-secondary/40">{label}</p>

      <div className="mt-1 flex items-end justify-between">
        <p className="text-3xl font-bold tracking-tight text-secondary">
          {value}
        </p>

        <span className="mb-1 text-[9px] text-secondary/30">this month</span>
      </div>

      <p className="mt-3 text-xs text-secondary/40">{description}</p>

      {/* Decorative circle */}

      <div
        className="
          absolute
          -bottom-12
          -right-12
          h-24
          w-24
          rounded-full
          bg-primary/5
          transition-transform
          duration-700
          group-hover:scale-150
        "
      />
    </div>
  );
};

export default Analytics;
