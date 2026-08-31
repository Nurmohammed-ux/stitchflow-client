import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { FaArrowLeft, FaHouse, FaLock, FaShieldHalved } from "react-icons/fa6";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8faf8] px-5 py-10">
      {/* ================= BLUEPRINT BACKGROUND ================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(#062746 1px, transparent 1px),
            linear-gradient(90deg, #062746 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* ================= DECORATIVE CIRCLES ================= */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-secondary/10"
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-primary/30"
      />

      {/* ================= CONTENT ================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="relative z-10 w-full max-w-3xl"
      >
        <div className="overflow-hidden rounded-4xl border border-secondary/10 bg-white shadow-2xl shadow-secondary/5">
          {/* ================= TOP ================= */}

          <div className="relative overflow-hidden bg-secondary px-6 py-10 text-white md:px-10 md:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="h-2 w-2 rounded-full bg-primary"
                />

                <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  Access Restricted
                </span>

                <span className="hidden h-px w-20 bg-primary/50 sm:block" />
              </div>

              <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <motion.p
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.2,
                      duration: 0.5,
                    }}
                    className="text-8xl font-bold leading-none tracking-[-0.08em] text-red-600 md:text-9xl"
                  >
                    403
                  </motion.p>

                  <h1 className="mt-5 text-3xl text-primary font-bold tracking-[-0.04em] md:text-5xl">
                    Access denied.
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
                    You don't have permission to access this area of StitchFlow.
                    This page may be restricted to a different account role.
                  </p>
                </div>

                {/* ================= ANIMATED LOCK ================= */}

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 md:flex"
                >
                  <motion.div
                    animate={{
                      rotate: [0, -6, 6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-secondary"
                  >
                    <FaLock size={25} />
                  </motion.div>
                </motion.div>
              </div>

              <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">
                SF / SECURITY / FORBIDDEN
              </p>
            </div>
          </div>

          {/* ================= BOTTOM ================= */}

          <div className="p-6 md:p-10">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.5,
              }}
              className="flex items-start gap-4 rounded-2xl bg-[#f8faf8] p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-secondary">
                <FaShieldHalved size={17} />
              </div>

              <div>
                <h2 className="font-bold text-secondary">
                  Protected dashboard route
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-secondary/40">
                  Return to your dashboard or go back to the previous page.
                </p>
              </div>
            </motion.div>

            {/* ================= BUTTONS ================= */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 rounded-xl border border-secondary/10 px-6 py-3.5 text-sm font-bold text-secondary transition hover:bg-secondary/5"
              >
                <FaArrowLeft size={12} />
                Go Back
              </motion.button>

              <motion.div
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary hover:text-secondary"
                >
                  <FaHouse size={12} />
                  Dashboard Home
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Forbidden;
