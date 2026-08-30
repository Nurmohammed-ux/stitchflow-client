import {
  FaIndustry,
  FaAward,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
  FaGlobe,
} from "react-icons/fa";

const aboutCards = [
  {
    number: "01",
    title: "State-of-the-Art Production",
    description:
      "Our facilities integrate advanced automated workflows with skilled craftsmanship to execute bulk custom orders with flawless precision.",
    icon: FaIndustry,
    size: "large",
  },
  {
    number: "02",
    title: "15+ Years Experience",
    description:
      "Decades of collective apparel manufacturing expertise backing every single garment we produce.",
    icon: FaAward,
    size: "small",
  },
  {
    number: "03",
    title: "100% Quality Assured",
    description:
      "Rigorous multi-stage inspections ensuring flawless standards from sampling to final shipment.",
    icon: FaShieldAlt,
    size: "small",
  },
  {
    number: "04",
    title: "Sustainable & Ethical",
    description:
      "Committed to responsible material sourcing, fair labor practices, and eco-friendly factory operations.",
    icon: FaGlobe,
    size: "small",
  },
  {
    number: "05",
    title: "Client Partnership",
    description:
      "We work collaboratively from initial concept sampling to final delivery, ensuring total transparency at every milestone.",
    icon: FaHandshake,
    size: "large",
  },
  {
    number: "06",
    title: "Expert Team",
    description:
      "Dedicated merchandisers, supervisors, and logistics personnel managing your workflows seamlessly.",
    icon: FaUsers,
    size: "small",
  },
];

const AboutUs = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8faf8] py-24 md:py-32">
      {/* Decorative Blueprint Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#062746 1px, transparent 1px),
            linear-gradient(90deg, #062746 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative Circles */}
      <div className="pointer-events-none absolute -right-40 top-20 h-125 w-125 rounded-full border border-secondary/5" />
      <div className="pointer-events-none absolute -right-20 top-40 h-75 w-75 rounded-full border border-primary/10" />

      <div className="relative px-5 md:px-15 lg:px-25">
        {/* ================= HEADER ================= */}
        <div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
              Company Profile
            </span>
            <span className="hidden h-px w-20 bg-primary/60 sm:block" />
          </div>

          <div>
            <h2 className="mt-6 text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-7xl">
              Engineered for quality,
              <br className="lg:hidden inline" />
              <span className="text-primary">built on trust.</span>
            </h2>

            <p className="mt-7 text-base leading-relaxed text-secondary/50 md:text-lg">
              We specialize in precision apparel manufacturing, bridging the gap
              between modern design and large-scale industrial production with
              uncompromising standards.
            </p>
          </div>

          <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / ABOUT / OVERVIEW
          </p>
        </div>

        {/* ================= CARDS GRID ================= */}
        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aboutCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.number}
                className={`group relative overflow-hidden rounded-4xl border border-[#062746]/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-[#062746]/5 ${card.size === "large" ? "lg:col-span-2" : "lg:col-span-1"}`}
              >
                {/* Number & Icon */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#062746]/25">
                    {card.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#062746]/5 text-[#062746] transition-all duration-500 group-hover:rotate-6 group-hover:bg-primary">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Content */}
                <div className="mt-16">
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#062746] md:text-3xl">
                    {card.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#062746]/50 md:text-base">
                    {card.description}
                  </p>
                </div>

                {/* Bottom line */}
                <div className="mt-10 flex items-center justify-between border-t border-[#062746]/10 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#062746]/30">
                    StitchFlow Standards
                  </span>

                  <span className="h-2 w-2 rounded-full bg-primary/40 transition-colors group-hover:bg-primary" />
                </div>

                {/* Decorative corner background effect */}
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-secondary/5 transition-transform duration-700 group-hover:scale-150" />
              </article>
            );
          })}
        </div>

        {/* ================= BOTTOM MESSAGE ================= */}
        <div className="mt-20 border-t border-[#062746]/10 pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-4xl text-2xl font-medium leading-tight tracking-[-0.03em] text-[#062746] md:text-3xl">
              Partner with a manufacturing leader built for modern apparel
              production.
            </p>

            <div className="rounded-2xl border border-secondary/10 bg-white px-6 py-3.5 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                ISO 9001 Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
