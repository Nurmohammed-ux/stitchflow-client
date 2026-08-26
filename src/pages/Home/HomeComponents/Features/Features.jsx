import {
  FaClipboardList,
  FaChartLine,
  FaBoxes,
  FaCheckDouble,
  FaTruck,
  FaUsersCog,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const features = [
  {
    number: "01",
    title: "Order Management",
    description:
      "Keep buyer orders, quantities, styles, prices, deadlines and production status organized in one place.",
    icon: FaClipboardList,
    size: "large",
  },
  {
    number: "02",
    title: "Production Tracking",
    description:
      "See exactly how much has been completed across cutting, sewing and finishing.",
    icon: FaChartLine,
    size: "small",
  },
  {
    number: "03",
    title: "Inventory Control",
    description:
      "Monitor fabrics, accessories, stock levels and material usage before production gets interrupted.",
    icon: FaBoxes,
    size: "small",
  },
  {
    number: "04",
    title: "Quality Control",
    description:
      "Track inspections, defects and rework so quality problems are identified before shipment.",
    icon: FaCheckDouble,
    size: "small",
  },
  {
    number: "05",
    title: "Shipment Management",
    description:
      "Keep delivery deadlines, completed orders and shipment status visible to your entire team.",
    icon: FaTruck,
    size: "large",
  },
  {
    number: "06",
    title: "Team & Roles",
    description:
      "Give managers, merchandisers, supervisors and inventory teams the access they need.",
    icon: FaUsersCog,
    size: "small",
  },
];

const Features = () => {
  return (
    <div className="bg-[#f8faf8] py-24 md:py-32 mt-6">
      <div className="px-5  md:px-15 lg:px-25">
        {/* ================= HEADER ================= */}

        <div className="">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/50">
              Everything connected
            </span>
            <span className="hidden h-px w-20 bg-primary/60 sm:block" />
          </div>

          <div>
            <h2 className="text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-7xl mt-6">
              The <span className="text-primary">tools</span> your factory
              needs.
            </h2>

            <p className="mt-7 text-base leading-relaxed text-secondary/50 md:text-lg">
              From the first buyer order to final shipment, StitchFlow gives
              every team the tools they need to keep production moving.
            </p>
          </div>
          <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / FEATURES / 004
          </p>
        </div>

        {/* ================= FEATURE GRID ================= */}

        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-4xl
                  border
                  border-[#062746]/10
                  bg-white
                  p-7
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-[#85AD20]/60
                  hover:shadow-xl
                  hover:shadow-[#062746]/5
                  ${
                    feature.size === "large" ? "lg:col-span-2" : "lg:col-span-1"
                  }
                `}
              >
                {/* Number */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#062746]/25">
                    {feature.number}
                  </span>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-[#062746]/5
                      text-[#062746]
                      transition-all
                      duration-500
                      group-hover:rotate-6
                      group-hover:bg-[#85AD20]
                    "
                  >
                    <Icon size={18} />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-16">
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#062746] md:text-3xl">
                    {feature.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#062746]/50 md:text-base">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom line */}
                <div className="mt-10 flex items-center justify-between border-t border-[#062746]/10 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#062746]/30">
                    Explore feature
                  </span>

                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary
                    group-hover:text-secondary"
                  >
                    <FaArrowUpRightFromSquare size={11} />
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-secondary /5 transition-transform duration-700 group-hover:scale-150
                  "
                />
              </article>
            );
          })}
        </div>

        {/* ================= BOTTOM MESSAGE ================= */}

        <div className="mt-20 border-t border-[#062746]/10 pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-4xl text-2xl font-medium leading-tight tracking-[-0.03em] text-[#062746] md:text-3xl">
              One platform for your orders, production, inventory and delivery.
            </p>

            <button
              className="
                group
                flex
                w-fit
                items-center
                gap-3
                rounded-full
                bg-[#062746]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                transition-all
                hover:bg-[#0b355c]
              "
            >
              Explore StitchFlow
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
    </div>
  );
};

export default Features;
