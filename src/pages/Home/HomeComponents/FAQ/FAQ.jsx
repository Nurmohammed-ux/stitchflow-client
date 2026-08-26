import { useState } from "react";
import { FaPlus, FaArrowUpRightFromSquare } from "react-icons/fa6";

const faqs = [
  {
    id: 1,
    question: "What is StitchFlow?",
    answer:
      "StitchFlow is a garment order and production management platform that helps factories manage buyer orders, production stages, inventory, quality control and shipment from one connected workspace.",
  },
  {
    id: 2,
    question: "Who can use StitchFlow?",
    answer:
      "StitchFlow is designed for garment factories of different sizes. Factory owners, managers, merchandisers, production supervisors, inventory teams and quality control teams can all use the platform.",
  },
  {
    id: 3,
    question: "Can I track different production stages?",
    answer:
      "Yes. StitchFlow lets you follow an order through important production stages such as cutting, sewing, finishing and quality control so your team can see where each order currently stands.",
  },
  {
    id: 4,
    question: "Can I manage buyer orders?",
    answer:
      "Yes. You can organize buyer information, order quantities, garment styles, production requirements, deadlines and order status in one place.",
  },
  {
    id: 5,
    question: "Can StitchFlow help with inventory management?",
    answer:
      "Yes. The inventory workflow is designed to help teams monitor fabrics, accessories, available stock and material usage so production teams can identify potential shortages earlier.",
  },
  {
    id: 6,
    question: "Can different teams have different roles?",
    answer:
      "Yes. StitchFlow can be structured around different user roles, allowing managers, production teams, merchandisers, inventory staff and other team members to access the information relevant to their responsibilities.",
  },
  {
    id: 7,
    question: "Can I monitor production progress?",
    answer:
      "Yes. Production progress can be monitored across different stages, giving managers and supervisors a clearer picture of completed work, ongoing production and orders that may need attention.",
  },
  {
    id: 8,
    question: "Can I track quality issues?",
    answer:
      "Yes. Quality control information can be connected with production so teams can record inspections, identify defects and keep track of rework before an order reaches shipment.",
  },
  {
    id: 9,
    question: "Can I track shipment deadlines?",
    answer:
      "Yes. Orders can be monitored through their production lifecycle so teams can keep delivery deadlines and shipment status visible.",
  },
  {
    id: 10,
    question: "Is StitchFlow suitable for a small factory?",
    answer:
      "Yes. StitchFlow can be useful for small and medium-sized garment factories that want to replace scattered spreadsheets and manual updates with a more organized production workflow.",
  },
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(1);

  const toggleFAQ = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-[#f8faf8] py-10">
      <div className="px-5 md:px-15 lg:px-25">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-5 lg:grid-cols-[0.98fr_1.02fr]">
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
                  text-primary/60
                "
              >
                Questions & Answers
              </span>

              <span className="hidden h-px w-20 bg-primary/50 sm:block" />
            </div>

            {/* Heading */}

            <h2
              className="
                mt-6
                text-5xl
                font-bold
                leading-[0.92]
                tracking-[-0.055em]
                text-secondary
                md:text-7xl
              "
            >
              Everything you might,
              <br />
              <span className="text-primary"> want to know.</span>
            </h2>

            {/* Description */}

            <p
              className="
                mt-7
                text-base
                leading-relaxed
                text-secondary/50
                md:text-lg
              "
            >
              Have questions about how StitchFlow fits into your production
              workflow? Find the answers below.
            </p>

            {/* Section ID */}

            <p
              className="
                mt-8
                font-mono
                text-[10px]
                tracking-[0.25em]
                text-secondary/30
              "
            >
              SF / FAQ / 010
            </p>

            {/* Small CTA */}

            <div className="mt-12 hidden lg:block">
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  bg-secondary
                  p-6
                "
              >
                <div
                  className="
                    absolute
                    -right-10
                    -top-10
                    h-32
                    w-32
                    rounded-full
                    bg-primary/20
                  "
                />

                <p
                  className="
                    relative
                    max-w-xs
                    text-lg
                    font-medium
                    leading-tight
                    text-white
                  "
                >
                  Still have a question about StitchFlow?
                </p>

                <button
                  className="
                    group
                    relative
                    mt-5
                    flex
                    items-center
                    gap-3
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-primary
                  "
                >
                  Talk to us
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
                    <FaArrowUpRightFromSquare size={10} />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* =================================================
              FAQ LIST
          ================================================= */}

          <div className="border-t border-secondary/10">
            {faqs.map((faq) => {
              const isOpen = activeId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`
                    border-b
                    border-secondary/10
                    transition-colors
                    duration-300
                    ${isOpen ? "bg-white" : ""}
                  `}
                >
                  {/* QUESTION */}

                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="
                      flex
                      w-full
                      items-center
                      gap-5
                      px-5
                      py-6
                      text-left
                      md:px-7
                      md:py-7
                    "
                    aria-expanded={isOpen}
                  >
                    {/* Number */}

                    <span
                      className={`
                        shrink-0
                        font-mono
                        text-[10px]
                        tracking-[0.15em]
                        transition-colors
                        duration-300
                        ${isOpen ? "text-primary" : "text-secondary/25"}
                      `}
                    >
                      {String(faq.id).padStart(2, "0")}
                    </span>

                    {/* Question */}

                    <span
                      className={`
                        flex-1
                        text-base
                        font-semibold
                        tracking-[-0.02em]
                        transition-colors
                        duration-300
                        md:text-lg
                        ${isOpen ? "text-secondary" : "text-secondary/70"}
                      `}
                    >
                      {faq.question}
                    </span>

                    {/* Plus */}

                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          isOpen
                            ? "rotate-45 bg-primary text-secondary"
                            : "bg-secondary/5 text-secondary"
                        }
                      `}
                    >
                      <FaPlus size={12} />
                    </span>
                  </button>

                  {/* ANSWER */}

                  <div
                    className={`
                      grid
                      transition-[grid-template-rows]
                      duration-500
                      ease-in-out
                      ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-7 pl-17 pr-12 md:px-7 md:pb-8 md:pl-21 md:pr-20">
                        <p
                          className="
                            max-w-2xl
                            text-sm
                            leading-relaxed
                            text-secondary/50
                            md:text-base
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            MOBILE CTA
        ===================================================== */}

        <div className="mt-12 lg:hidden">
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-secondary
              p-6
            "
          >
            <div
              className="
                absolute
                -right-10
                -top-10
                h-32
                w-32
                rounded-full
                bg-primary/20
              "
            />

            <p
              className="
                relative
                max-w-xs
                text-lg
                font-medium
                leading-tight
                text-white
              "
            >
              Still have a question about StitchFlow?
            </p>

            <button
              className="
                group
                relative
                mt-5
                flex
                items-center
                gap-3
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
                text-primary
              "
            >
              Talk to us
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
                <FaArrowUpRightFromSquare size={10} />
              </span>
            </button>
          </div>
        </div>

        {/* =====================================================
            BOTTOM LINE
        ===================================================== */}

        <div className="mt-16 border-t border-secondary/10 pt-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-secondary/40">
              Simple tools. Connected teams. Better production.
            </p>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-secondary/40
                "
              >
                StitchFlow / FAQ
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
