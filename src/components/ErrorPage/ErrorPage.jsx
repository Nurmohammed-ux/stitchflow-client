import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  FaTriangleExclamation,
  FaArrowUpRightFromSquare,
  FaRotateLeft,
} from "react-icons/fa6";

const ErrorPage = () => {
  const location = useLocation();
  const [seconds, setSeconds] = useState(10);

  // Dynamic countdown effect for redirection or auto-refresh feel
  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  // Text split into characters/words for staggered letter-by-letter appearance
  const titlePart1 = "Page lost ";
  const titlePart2 = "in transit.";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8faf8] py-24 md:py-32">
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

      {/* Decorative Pulse Circles matching site vibes */}
      <div className="pointer-events-none absolute -right-40 top-20 h-125 w-125 rounded-full border border-secondary/5 animate-pulse" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-75 w-75 rounded-full border border-primary/10" />

      <div className="relative w-full px-5 md:px-15 lg:px-25 max-w-5xl mx-auto">
        {/* Main Error Container Card */}
        <article className="group relative overflow-hidden rounded-4xl border border-[#062746]/10 bg-white p-8 md:p-14 shadow-xl shadow-[#062746]/5 transition-all duration-500">
          {/* Top Identifier Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono text-base tracking-[0.2em] text-[#062746]/40 uppercase font-bold">
                SYSTEM EXCEPTION // 404_NOT_FOUND
              </span>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-600 transition-all duration-500 group-hover:rotate-12 group-hover:bg-red-500 group-hover:text-white">
              <FaTriangleExclamation size={20} />
            </div>
          </div>

          {/* Dynamic Content Section with Letter-by-Letter Animation */}
          <div className="mt-14">
            <h2 className="text-4xl font-bold tracking-[-0.055em] text-[#062746] md:text-6xl flex flex-wrap">
              {/* First Part: Page lost */}
              <span className="inline-flex overflow-hidden">
                {titlePart1.split("").map((char, index) => (
                  <span
                    key={`p1-${index}`}
                    className="inline-block animate-[fadeInLetter_0.4s_ease-out_forwards] opacity-0"
                    style={{ animationDelay: `${index * 0.04}s` }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>

              {/* Second Part: in transit. (styled with primary color) */}
              <span className="inline-flex overflow-hidden text-primary ml-2 md:ml-4">
                {titlePart2.split("").map((char, index) => (
                  <span
                    key={`p2-${index}`}
                    className="inline-block animate-[fadeInLetter_0.4s_ease-out_forwards] opacity-0"
                    style={{
                      animationDelay: `${(titlePart1.length + index) * 0.04}s`,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#062746]/60 md:text-lg">
              The requested route{" "}
              <code className="rounded-lg bg-[#062746]/5 px-2.5 py-1 font-mono text-sm font-semibold text-secondary">
                {location.pathname}
              </code>{" "}
              does not exist or has been shifted within the production pipeline.
            </p>
          </div>

          {/* Dynamic Interactive Stats / Notice Box */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 rounded-2xl border border-[#062746]/10 bg-[#f8faf8] p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#062746]/40">
                Diagnostic Status
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-secondary">
                Endpoint unreachable or invalid parameter.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#062746]/40">
                Automatic Sync
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-primary">
                Retrying secure handshake in {seconds}s...
              </p>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#062746]/10 pt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#062746]/30">
              SF / SYSTEM / ERROR_HANDLER
            </span>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => window.location.reload()}
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-2xl border border-[#062746]/10 bg-white px-6 py-3.5 text-sm font-semibold text-secondary transition-all hover:border-primary hover:bg-[#062746]/5"
              >
                <FaRotateLeft size={14} />
                Refresh State
              </button>

              <Link
                to="/"
                className="group/btn flex flex-1 sm:flex-none items-center justify-center gap-3 rounded-2xl bg-[#062746] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#0b355c]"
              >
                Return to Home
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover/btn:rotate-45">
                  <FaArrowUpRightFromSquare size={11} />
                </span>
              </Link>
            </div>
          </div>

          {/* Decorative Corner Hover Background Effect */}
          <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-secondary/5 transition-transform duration-700 group-hover:scale-150 pointer-events-none" />
        </article>
      </div>

      {/* Tailwind Keyframe Animation Injection */}
      <style>{`
        @keyframes fadeInLetter {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ErrorPage;
