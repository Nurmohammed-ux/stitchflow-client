import { useState } from "react";
import { FaPlay, FaCheckCircle } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// Array of images and unique captions for the slider loop
const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1741176507465-14cf659db0b8?auto=format&fit=crop&w=1200&q=85",
    alt: "Garment production in a modern factory",
    tag: "StitchFlow / Production Floor",
    title: "Every garment.\nEvery stage. Connected.",
  },
  {
    url: "https://i.ibb.co.com/BH04Gqdt/febric-cutting.jpg",
    alt: "Advanced cutting and precision machinery",
    tag: "StitchFlow / Cutting Section",
    title: "Precision cutting.\nMinimum waste.",
  },
  {
    url: "https://i.ibb.co.com/whBRLDML/quality.jpg",
    alt: "Quality control inspection process",
    tag: "StitchFlow / Quality Assurance",
    title: "Rigorous standards.\nZero defects.",
  },
  {
    url: "https://i.ibb.co.com/7JMQn7Lf/packaging.jpg",
    alt: "Finished garments packaging and shipment",
    tag: "StitchFlow / Logistics",
    title: "On-time delivery.\nGlobal reach.",
  },
];

const Hero = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative overflow-hidden bg-[#f8faf8]">
      {/* BACKGROUND GRID */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(#062746 1px, transparent 1px),
            linear-gradient(90deg, #062746 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />
      {/* DECORATIVE CIRCLES */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-100 w-100 rounded-full bg-secondary/5 blur-3xl" />
      {/* HERO CONTENT */}
      <div className="relative px-5 pb-20 pt-16 md:px-15 md:pb-28 md:pt-24 lg:px-25">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary/70">
                Garment Production Management
              </span>
              <span className="hidden h-px w-16 bg-primary/50 sm:block" />
            </div>

            <h1 className="max-w-4xl text-[clamp(3.6rem,7vw,7.5rem)] font-bold leading-[0.84] tracking-[-0.065em] text-secondary">
              Production
              <br />
              <span className="relative inline-block">
                without
                <span className="relative ml-3 inline-block text-primary">
                  chaos.
                  <span className="absolute -bottom-3 left-0 h-1 w-[85%] origin-left bg-primary" />
                </span>
              </span>
            </h1>

            <p className="mt-10 text-base leading-relaxed text-secondary/60 md:text-lg">
              Manage buyer orders, track production, control{" "}
              <br className="inline md:hidden" /> inventory and keep every
              garment moving <br className="inline md:hidden" /> toward its
              deadline — all from one intelligent{" "}
              <br className="inline md:hidden" /> workspace.
            </p>

            <div className="mt-8 flex flex-col md:flex-row md:items-center items-start ml-10 md:ml-0 gap-3">
              <button className="group flex items-center gap-3 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b355c]">
                Start managing production
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover:rotate-45">
                  <FaArrowUpRightFromSquare size={11} />
                </span>
              </button>

              <button className="group flex items-center gap-3 rounded-full border border-secondary/15 bg-white px-6 py-3.5 text-sm font-semibold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/30 ml-8 md:ml-0">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/5 transition-all group-hover:bg-primary">
                  <FaPlay size={9} />
                </span>
                See how it works
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              <TrustPoint text="Order tracking" />
              <TrustPoint text="Production monitoring" />
              <TrustPoint text="Inventory control" />
            </div>

            <p className="mt-10 font-mono text-[10px] tracking-[0.25em] text-secondary/25">
              SF / PRODUCTION / 001
            </p>
          </div>

          {/* RIGHT IMAGE (SWIPER JS CAROUSEL) */}
          <div className="relative mx-auto w-full max-w-80 md:max-w-150 lg:mx-0">
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-secondary/10 bg-secondary shadow-2xl shadow-secondary/15">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                speed={1000}
                onSwiper={setSwiperRef}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full w-full"
              >
                {heroImages.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative aspect-4/4.5 w-full">
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-secondary/80 via-secondary/10 to-transparent" />

                      <div className="absolute bottom-16 left-6 right-6">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white">
                            {img.tag}
                          </span>
                        </div>

                        <h3 className="mt-2 max-w-sm text-xl font-semibold leading-tight text-white md:text-2xl whitespace-pre-line">
                          {img.title}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Interactive Pagination Bullets (Moved to bottom-left to avoid conflict) */}
              <div className="absolute bottom-6 left-6 z-30 flex items-center gap-2">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => swiperRef?.slideToLoop(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? "w-6 bg-primary"
                        : "w-2 bg-white/50 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* FLOATING PRODUCTION CARD */}
            <div className="absolute -left-5 -top-8 md:top-8 w-48 rounded-2xl border border-secondary/10 bg-white p-4 shadow-xl shadow-secondary/10 md:-left-8 md:w-52 z-20">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-secondary/40">
                  Live production
                </span>
                <span className="h-2 w-2 rounded-full bg-primary" />
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold tracking-tight text-secondary">
                    76%
                  </p>
                  <p className="mt-1 text-[10px] text-secondary/40">
                    Order #SF-2048
                  </p>
                </div>
                <FaCheckCircle className="mb-1 text-primary" size={18} />
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary/10">
                <div className="h-full w-[76%] rounded-full bg-primary" />
              </div>
            </div>

            {/* FLOATING UNITS CARD */}
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-primary px-5 py-4 shadow-xl shadow-primary/20 md:-right-8 z-20">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-secondary/50">
                Units produced
              </p>

              <div className="mt-1 flex items-end gap-2">
                <span className="text-3xl font-bold tracking-tight text-secondary">
                  18,420
                </span>
                <span className="mb-1 text-[10px] font-bold text-secondary/60">
                  +18.4%
                </span>
              </div>

              <p className="mt-1 text-[9px] text-secondary/50">This month</p>
            </div>

            {/* ROTATING LABEL */}
            <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-secondary/10 bg-white p-3 shadow-lg md:flex z-20">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary/10">
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-secondary [writing-mode:vertical-rl]">
                  STITCHFLOW
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PROCESS MARQUEE */}
      <div className="relative overflow-hidden border-y border-secondary/10 bg-white">
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-linear-to-r from-white to-transparent md:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-linear-to-l from-white to-transparent md:w-24" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <div className="flex shrink-0 items-center py-5">
            <ProcessItem number="01" title="Orders" />
            <MarqueeArrow />
            <ProcessItem number="02" title="Cutting" />
            <MarqueeArrow />
            <ProcessItem number="03" title="Sewing" />
            <MarqueeArrow />
            <ProcessItem number="04" title="Finishing" />
            <MarqueeArrow />
            <ProcessItem number="05" title="Quality" />
            <MarqueeArrow />
            <ProcessItem number="06" title="Shipment" />
            <MarqueeArrow />
          </div>
          <div className="flex shrink-0 items-center py-5">
            <ProcessItem number="01" title="Orders" />
            <MarqueeArrow />
            <ProcessItem number="02" title="Cutting" />
            <MarqueeArrow />
            <ProcessItem number="03" title="Sewing" />
            <MarqueeArrow />
            <ProcessItem number="04" title="Finishing" />
            <MarqueeArrow />
            <ProcessItem number="05" title="Quality" />
            <MarqueeArrow />
            <ProcessItem number="06" title="Shipment" />
            <MarqueeArrow />
          </div>
        </div>
      </div>
    </div>
  );
};

const TrustPoint = ({ text }) => (
  <div className="flex items-center gap-2">
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
      <FaCheckCircle size={10} />
    </span>
    <span className="text-xs font-medium text-secondary/50">{text}</span>
  </div>
);

const ProcessItem = ({ number, title }) => (
  <div className="flex shrink-0 items-center gap-3 px-6 md:px-8">
    <span className="font-mono text-[9px] tracking-wider text-primary">
      {number}
    </span>
    <span className="text-sm font-bold uppercase tracking-[0.15em] text-secondary">
      {title}
    </span>
  </div>
);

const MarqueeArrow = () => (
  <span className="flex shrink-0 items-center px-4 text-primary/50">→</span>
);

export default Hero;
