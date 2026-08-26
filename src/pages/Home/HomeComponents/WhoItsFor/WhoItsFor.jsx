import { FaBoxes } from "react-icons/fa";
import {
  FaUserTie,
  FaClipboardList,
  FaIndustry,
  FaCheckDouble,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const audiences = [
  {
    number: "01",
    title: "Factory Managers",
    description:
      "Get a complete view of production, orders, deadlines, inventory and factory performance from one place.",
    icon: FaUserTie,
    size: "large",
  },
  {
    number: "02",
    title: "Merchandising Teams",
    description:
      "Keep buyer orders, quantities, styles and delivery deadlines organized and visible.",
    icon: FaClipboardList,
    size: "small",
  },
  {
    number: "03",
    title: "Production Supervisors",
    description:
      "Monitor cutting, sewing and finishing progress and identify production delays early.",
    icon: FaIndustry,
    size: "small",
  },
  {
    number: "04",
    title: "Inventory Teams",
    description:
      "Know what materials are available, what is being used and when stock needs attention.",
    icon: FaBoxes,
    size: "small",
  },
  {
    number: "05",
    title: "Quality Control",
    description:
      "Track inspections, defects and rework so quality issues don't reach the final shipment.",
    icon: FaCheckDouble,
    size: "large",
  },
];

const WhoItsFor = () => {
  return (
    <section className="bg-[#f8faf8] py-14 md:py-20 mt-6">
      <div className="px-5 md:px-15 lg:px-25">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div>
          {/* Label */}

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
              Who it's for
            </span>

            <span className="hidden h-px w-20 bg-primary/50 sm:block" />
          </div>

          {/* Heading */}

          <h2
            className="
              mt-6
              max-w-6xl
              text-5xl
              font-bold
              leading-[0.92]
              tracking-[-0.055em]
              text-secondary
              md:text-7xl
            "
          >
            Built for the people,
            <br />
            <span className="text-primary">behind every garment.</span>
          </h2>

          {/* Description */}

          <p
            className="mt-7 text-base leading-relaxed text-secondary/50  md:text-lg"
          >
            From factory managers to production supervisors, StitchFlow gives
            every team the information they need to keep production moving.
          </p>

          {/* Section ID */}

          <p
            className="mt-6 font-mono text-[10px] tracking-[0.25em] text-secondary/30
            "
          >
            SF / WHO IT'S FOR / 005
          </p>
        </div>

        {/* =====================================================
            AUDIENCE GRID
        ===================================================== */}

        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = audience.icon;

            return (
              <article
                key={audience.number}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-4xl
                  border
                  border-secondary/10
                  bg-white
                  p-7
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-primary/60
                  hover:shadow-xl
                  hover:shadow-secondary/5

                  ${
                    audience.size === "large"
                      ? "lg:col-span-2"
                      : "lg:col-span-1"
                  }
                `}
              >
                {/* =================================================
                    TOP
                ================================================= */}

                <div className="flex items-start justify-between">
                  {/* Number */}

                  <span
                    className="
                      font-mono
                      text-[10px]
                      tracking-[0.2em]
                      text-secondary/25
                    "
                  >
                    {audience.number}
                  </span>

                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-secondary/5
                      text-secondary
                      transition-all
                      duration-500
                      group-hover:rotate-6
                      group-hover:bg-primary
                      group-hover:text-secondary
                    "
                  >
                    <Icon size={17} />
                  </div>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="mt-16">
                  <h3
                    className="
                      text-2xl
                      font-semibold
                      tracking-[-0.035em]
                      text-secondary
                      md:text-3xl
                    "
                  >
                    {audience.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      max-w-xl
                      text-sm
                      leading-relaxed
                      text-secondary/50
                      md:text-base
                    "
                  >
                    {audience.description}
                  </p>
                </div>

                {/* =================================================
                    BOTTOM
                ================================================= */}

                <div
                  className="
                    mt-10
                    flex
                    items-center
                    justify-between
                    border-t
                    border-secondary/10
                    pt-5
                  "
                >
                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-secondary/30
                    "
                  >
                    Built for your team
                  </span>

                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-secondary
                      text-white
                      transition-all
                      duration-300
                      group-hover:rotate-45
                      group-hover:bg-primary
                      group-hover:text-secondary
                    "
                  >
                    <FaArrowUpRightFromSquare size={10} />
                  </div>
                </div>

                {/* =================================================
                    DECORATIVE CIRCLE
                ================================================= */}

                <div
                  className="
                    absolute
                    -bottom-20
                    -right-20
                    h-40
                    w-40
                    rounded-full
                    bg-primary/5
                    transition-transform
                    duration-700
                    group-hover:scale-150
                  "
                />
              </article>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM MESSAGE
        ===================================================== */}

        <div className="mt-20 border-t border-secondary/10 pt-10">
          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <p
                className="
                  text-2xl
                  font-medium
                  leading-tight
                  tracking-[-0.03em]
                  text-secondary
                  md:text-3xl
                "
              >
                One workspace.
                Every team moving in the same direction.
              </p>
            </div>

            {/* CTA */}

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
                duration-300
                hover:bg-secondary/90
              "
            >
              See how StitchFlow works
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

export default WhoItsFor;
