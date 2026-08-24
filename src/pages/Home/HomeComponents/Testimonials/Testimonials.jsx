import { FaQuoteLeft, FaArrowRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  A11y,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow"; // 1. Import coverflow style
import { useEffect, useState } from "react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="overflow-hidden bg-[#f8faf8] py-24 md:py-32 mt-6">
      {/* Custom CSS overrides for Swiper Pagination bullets to use primary color */}
      <style>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 2rem !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: var(--color-secondary, #1e293b);
          opacity: 0.2;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          background-color: var(--color-primary, #10b981) !important;
        }
      `}</style>

      <div className="px-5 md:px-15 lg:px-25">
        {/* HEADER SECTION */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">
                What teams say
              </span>
              <span className="hidden h-px w-20 bg-primary/50 sm:block" />
            </div>

            <h2 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-7xl">
              Built to keep,
              <br className="inline lg:hidden" />
              <span className="text-primary">teams moving.</span>
            </h2>

            <p className="mt-7 text-base leading-relaxed text-secondary/50 md:text-lg">
              See how production teams can use StitchFlow to bring orders,
              people and production into one workflow.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / TESTIMONIALS / 006
          </p>
        </div>

        {/* SWIPER SECTION */}
        <div className="relative mt-16">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, A11y, EffectCoverflow]}
            effect={"coverflow"} 
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            speed={700}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".testimonial-next",
              prevEl: ".testimonial-prev",
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 3,
                centeredSlides: false,
              },
            }}
            className="overflow-visible!"
          >
            {Array.isArray(testimonials) &&
              testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
          </Swiper>

          {/* NAVIGATION BUTTONS */}
          <div className="mt-10 flex items-center justify-between">
            <div className="h-10" />

            <div className="flex items-center gap-2">
              <button
                className="testimonial-prev flex h-11 w-11 items-center justify-center rounded-full border border-secondary/10 bg-white text-secondary transition-all hover:border-secondary hover:bg-secondary hover:text-white"
                aria-label="Previous testimonial"
              >
                <FaArrowRight className="rotate-180" size={13} />
              </button>

              <button
                className="testimonial-next flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-secondary"
                aria-label="Next testimonial"
              >
                <FaArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   TESTIMONIAL CARD
========================================================= */
const TestimonialCard = ({ testimonial }) => {
  return (
    <article className="group relative h-full min-h-107.5 overflow-hidden rounded-4xl border border-secondary/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-secondary/5">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-secondary">
          <FaQuoteLeft size={16} />
        </div>

        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} size={11} className="text-primary" />
          ))}
        </div>
      </div>

      <p className="mt-12 text-lg font-medium leading-relaxed tracking-[-0.02em] text-secondary">
        "{testimonial.quote}"
      </p>

      <div className="mt-8 flex items-center gap-4">
        <div>
          <p className="text-3xl font-bold tracking-[-0.04em] text-primary">
            {testimonial.metric}
          </p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-secondary/35">
            {testimonial.metricLabel}
          </p>
        </div>
      </div>

      <div className="absolute bottom-7 left-7 right-7 flex items-center gap-3 border-t border-secondary/10 pt-5">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-11 w-11 rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
        <div>
          <h3 className="text-sm font-bold text-secondary">
            {testimonial.name}
          </h3>
          <p className="mt-0.5 text-[10px] text-secondary/40">
            {testimonial.role}
          </p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
            {testimonial.company}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary/5 transition-transform duration-700 group-hover:scale-125" />
    </article>
  );
};

export default Testimonials;
