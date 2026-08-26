import {
  FaClipboardList,
  FaTshirt,
  FaCheckCircle,
  FaTruck,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Keyboard,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const stages = [
  {
    number: "01",
    title: "Order",
    label: "PLAN",
    description:
      "Bring buyer orders, quantities, styles, prices and delivery deadlines into one organized workspace.",
    icon: FaClipboardList,
    metric: "128",
    metricLabel: "Active Orders",
  },
  {
    number: "02",
    title: "Cutting",
    label: "PREPARE",
    description:
      "Track fabric preparation and cutting quantities while keeping every production target visible.",
    icon: FaScissors,
    metric: "98%",
    metricLabel: "Target Achieved",
  },
  {
    number: "03",
    title: "Sewing",
    label: "PRODUCE",
    description:
      "Monitor sewing-line progress and identify bottlenecks before they affect your delivery schedule.",
    icon: FaTshirt,
    metric: "82%",
    metricLabel: "Production",
  },
  {
    number: "04",
    title: "Finishing",
    label: "COMPLETE",
    description:
      "Keep finishing operations connected with the rest of production and know exactly what remains.",
    icon: FaTshirt,
    metric: "45%",
    metricLabel: "Completed",
  },
  {
    number: "05",
    title: "Quality",
    label: "VERIFY",
    description:
      "Record inspections, defects and rework so quality issues are caught before shipment.",
    icon: FaCheckCircle,
    metric: "96%",
    metricLabel: "Pass Rate",
  },
  {
    number: "06",
    title: "Shipment",
    label: "DELIVER",
    description:
      "Move completed orders toward shipment while keeping deadlines and delivery status visible.",
    icon: FaTruck,
    metric: "24",
    metricLabel: "Ready",
  },
];

const Workflow = () => {
  return (
    <div className="relative mt-6 overflow-hidden bg-secondary text-white">
      {/* =====================================================
          BLUEPRINT GRID
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* =====================================================
          DECORATIVE CIRCLES
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-20
          h-125
          w-125
          rounded-full
          border
          border-white/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          top-40
          h-75
          w-75
          rounded-full
          border
          border-primary/20
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative px-5 py-24 md:px-15 lg:px-25">
        {/* =================================================
            HEADER
        ================================================= */}

        <div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.3em]
                text-primary
              "
            >
              The Production Flow
            </span>

            <span className="hidden h-px w-20 bg-primary sm:block" />
          </div>

          <h2
            className="
              mt-6
              text-5xl
              font-semibold
              leading-[0.9]
              tracking-[-0.055em]
              md:text-7xl
              lg:text-8xl
            "
          >
            Every stage,
            <span className="ml-4 text-primary">One flow.</span>
          </h2>

          <p
            className="
              mt-8
              max-w-3xl
              text-base
              leading-relaxed
              text-white/50
              md:text-lg
            "
          >
            StitchFlow connects every step of garment production, giving your
            team a single source of truth from the first buyer order to final
            shipment.
          </p>

          <p
            className="
              mt-6
              font-mono
              text-xs
              tracking-widest
              text-white/30
            "
          >
            SF / WORKFLOW / 003
          </p>
        </div>

        {/* =================================================
            BLUEPRINT LINE
        ================================================= */}

        <div className="mt-20 hidden items-center gap-4 md:flex">
          <span className="font-mono text-[10px] text-white/30">START</span>

          <div className="relative h-px flex-1 bg-white/15">
            <span
              className="
                absolute
                left-0
                top-1/2
                h-2
                w-2
                -translate-y-1/2
                rounded-full
                bg-primary
              "
            />
          </div>

          <span className="font-mono text-[10px] text-white/30">FINISH</span>
        </div>

        {/* =================================================
            SWIPER
        ================================================= */}
        <div className="relative mt-16">
          <Swiper
            modules={[Navigation, Autoplay, Pagination, A11y, Keyboard]}
            slidesPerView={1}
            spaceBetween={30}
            speed={700}
            loop={true}
            autoplay={true}
            keyboard={{
              enabled: true,
            }}
            navigation={{
              nextEl: ".workflow-next",
              prevEl: ".workflow-prev",
            }}
            pagination={{
              el: ".workflow-pagination",
              clickable: true,
            }}
            className="workflow-swiper"
          >
            {stages.map((stage) => {
              const Icon = stage.icon;

              return (
                <SwiperSlide key={stage.number}>
                  <div
                    className="
              group
              relative
              border-t
              border-white/10
            "
                  >
                    <div
                      className="
                grid
                min-h-85
                gap-6
                py-12
                md:grid-cols-[180px_1fr_220px]
                md:items-center
                lg:grid-cols-[220px_1fr_280px]
              "
                    >
                      {/* NUMBER */}

                      <div className="relative">
                        <span
                          className="
                    block
                    text-7xl
                    font-semibold
                    leading-none
                    tracking-[-0.08em]
                    text-white/8
                    md:text-8xl
                  "
                        >
                          {stage.number}
                        </span>
                      </div>

                      {/* INFORMATION */}

                      <div className="relative">
                        <div className="mb-5 flex items-center gap-4">
                          <div
                            className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/15
                      text-white/50
                      transition-all
                      duration-500
                      group-hover:border-primary
                      group-hover:bg-primary
                      group-hover:text-secondary
                    "
                          >
                            <Icon size={17} />
                          </div>

                          <span
                            className="
                      font-mono
                      text-[10px]
                      tracking-[0.25em]
                      text-primary
                    "
                          >
                            {stage.label}
                          </span>
                        </div>

                        <h3
                          className="
                    text-5xl
                    font-semibold
                    tracking-[-0.04em]
                    transition-transform
                    duration-500
                    group-hover:translate-x-2
                    md:text-7xl
                  "
                        >
                          {stage.title}
                        </h3>

                        <p
                          className="
                    mt-5
                    max-w-lg
                    text-sm
                    leading-relaxed
                    text-white/40
                    md:text-base
                  "
                        >
                          {stage.description}
                        </p>
                      </div>

                      {/* METRIC */}

                      <div
                        className="
                  md:border-l
                  md:border-white/10
                  md:pl-10
                "
                      >
                        <span
                          className="
                    text-4xl
                    font-semibold
                    tracking-[-0.04em]
                    text-primary
                  "
                        >
                          {stage.metric}
                        </span>

                        <p
                          className="
                    mt-2
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-white/30
                  "
                        >
                          {stage.metricLabel}
                        </p>

                        <div className="mt-7 h-px w-full bg-white/10">
                          <div
                            className="
                      h-full
                      w-0
                      bg-primary
                      transition-all
                      duration-700
                      group-hover:w-full
                    "
                          />
                        </div>
                      </div>
                    </div>

                    {/* CORNER */}

                    <div
                      className="
                pointer-events-none
                absolute
                right-0
                top-0
                h-5
                w-5
                border-r
                border-t
                border-transparent
                transition-all
                duration-500
                group-hover:border-primary
              "
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* =====================================================
              CONTROLS
          ===================================================== */}

          <div
            className="mt-8 flex items-center justify-between border-t border-white/10 pt-6"
          >
            {/* PAGINATION */}
            <div className="workflow-pagination" />

            {/* NAVIGATION */}
            <div className="flex items-center gap-2">
              <button
                className="workflow-prev flex h-11 px-5
                  items-center justify-center rounded-full  border border-white/10 text-xs font-mono uppercase tracking-widest text-white/50 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-secondary"
                aria-label="Previous production stage"
              >
                <FaArrowLeft />
              </button>

              <button
                className="workflow-next flex h-11 px-5 items-center justify-center rounded-full bg-primary text-xs font-mono uppercase tracking-widest text-secondary transition-all duration-300 hover:bg-white"
                aria-label="Next production stage"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div
          className="
            mt-14
            grid
            gap-10
            border-t
            border-white/10
            pt-12
            md:grid-cols-[1fr_auto]
            md:items-end
          "
        >
          <div>
            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-primary
              "
            >
              Connected production
            </p>

            <h3
              className="
                mt-4
                text-3xl
                font-medium
                leading-tight
                tracking-[-0.035em]
                text-white
                md:text-5xl
              "
            >
              No more disconnected spreadsheets.
              <br />
              <span className="text-white/30">Just one continuous flow.</span>
            </h3>
          </div>

          <div className="flex items-center gap-3 text-white/30">
            <span className="font-mono text-[10px]">SWIPE TO EXPLORE</span>

            <FaArrowDown size={12} className="animate-bounce text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
