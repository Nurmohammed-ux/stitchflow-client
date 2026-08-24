import { FaArrowUpRightFromSquare, FaCheck, FaIndustry } from "react-icons/fa6";

const FinalCTA = () => {
  const points = [
    "Connect your production workflow",
    "Keep every team on the same page",
    "Track orders from start to shipment",
  ];

  return (
    <div className="bg-[#f8faf8] px-5 py-10 md:px-15 md:py-15 lg:px-25">
      <div
        className="
          relative
          overflow-hidden
          rounded-[2.5rem]
          bg-secondary
          px-6
          py-16
          md:px-12
          md:py-20
          lg:px-20
          lg:py-24
        "
      >
        {/* =====================================================
            DECORATIVE ELEMENTS
        ===================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-96
            w-96
            rounded-full
            border
            border-primary/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-40
            -left-40
            h-96
            w-96
            rounded-full
            bg-primary/5
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-20
            top-20
            hidden
            h-3
            w-3
            rounded-full
            bg-primary
            lg:block
          "
        />

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="relative z-10 grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          {/* LEFT */}

          <div>
            {/* Label */}

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
                Ready to move forward
              </span>

              <span className="hidden h-px w-20 bg-primary/40 sm:block" />
            </div>

            {/* Heading */}

            <h2
              className="
                mt-7
                max-w-5xl
                text-5xl
                font-bold
                leading-[0.9]
                tracking-[-0.06em]
                text-white
                md:text-7xl
                lg:text-8xl
              "
            >
              Bring your production,
              <br />
              <span className="text-primary">into one flow.</span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-8
                text-base
                leading-relaxed
                text-white/50
                md:text-lg
              "
            >
              Connect orders, production, inventory and teams with one workspace
              built for modern garment factories.
            </p>

            {/* =================================================
                CTA BUTTONS
            ================================================= */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-3
                  rounded-full
                  bg-primary
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-secondary
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  hover:shadow-primary/20
                "
              >
                Get Started with StitchFlow
                <span
                  className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-secondary
                    text-white
                    transition-transform
                    duration-300
                    group-hover:rotate-45
                  "
                >
                  <FaArrowUpRightFromSquare size={10} />
                </span>
              </button>

              <button
                className="
                  flex
                  w-fit
                  items-center
                  rounded-full
                  border
                  border-white/15
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white/80
                  transition-all
                  duration-300
                  hover:border-primary/50
                  hover:text-primary
                "
              >
                Explore Features
              </button>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="lg:pb-2">
            {/* Factory Icon */}

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-primary
                text-secondary
              "
            >
              <FaIndustry size={21} />
            </div>

            {/* Small heading */}

            <p
              className="
                mt-6
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-white/30
              "
            >
              Why StitchFlow
            </p>

            {/* Points */}

            <div className="mt-5 space-y-4">
              {points.map((point) => (
                <div
                  key={point}
                  className="
                    flex
                    items-center
                    gap-3
                    border-b
                    border-white/10
                    pb-4
                  "
                >
                  <span
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      text-primary
                    "
                  >
                    <FaCheck size={9} />
                  </span>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-white/65
                    "
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM META
        ===================================================== */}

        <div
          className="
            relative
            z-10
            mt-16
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            pt-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <span
            className="
              font-mono
              text-[10px]
              tracking-[0.25em]
              text-white/25
            "
          >
            SF / FINAL CTA / 008
          </span>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-white/30
              "
            >
              Orders / Production / Inventory / Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
