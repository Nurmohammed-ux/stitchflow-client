import { Outlet, Link } from "react-router";
import {
  FaArrowUpRightFromSquare,
  FaCheck,
  FaScissors,
  FaTruck,
} from "react-icons/fa6";
import { FaTshirt } from "react-icons/fa";
import logo from "../assets/logo.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8faf8] container mx-auto">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ================= LEFT BRAND PANEL ================= */}

        <div className="relative hidden overflow-hidden bg-secondary lg:block">
          {/* Blueprint Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
              `,
              backgroundSize: "70px 70px",
            }}
          />

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -right-20 top-20 h-75 w-75 rounded-full border border-primary/20" />

          {/* Content */}
          <div className="relative z-10 flex min-h-screen flex-col p-8 xl:p-12">
            {/* ================= LOGO ================= */}

            <Link
              to="/"
              className="flex w-fit items-center gap-3 text-2xl font-bold tracking-[-0.04em] text-white"
            >
              <img
                src={logo}
                className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary text-secondary"
                alt="Logo"
              />
            </Link>

            {/* ================= CENTER CONTENT ================= */}

            <div className="my-auto max-w-xl">
              {/* Label */}
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />

                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  Production connected
                </span>

                <span className="h-px w-16 bg-primary/40" />
              </div>

              {/* Heading */}
              <h1 className="mt-7 text-5xl font-bold leading-[0.9] tracking-[-0.06em] text-white xl:text-7xl">
                Your factory.
                <br />
                <span className="text-primary">One flow.</span>
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-lg text-base leading-relaxed text-white/45">
                Manage orders, production, inventory and shipments from one
                connected workspace built for garment factories.
              </p>

              {/* ================= MINI WORKFLOW ================= */}

              <div className="mt-12 grid max-w-lg grid-cols-3 gap-3">
                <MiniStage icon={<FaScissors size={14} />} label="CUTTING" />
                <MiniStage icon={<FaTshirt size={14} />} label="SEWING" />
                <MiniStage icon={<FaTruck size={14} />} label="SHIPMENT" />
              </div>

              {/* ================= TRUST POINTS ================= */}

              <div className="mt-10 space-y-3">
                <TrustPoint text="Connected production workflow" />
                <TrustPoint text="Centralized order management" />
                <TrustPoint text="Real-time production visibility" />
              </div>
            </div>

            {/* ================= BOTTOM ================= */}

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/20">
                SF / AUTH / 001
              </span>

              <span className="font-mono text-[10px] tracking-[0.2em] text-white/20">
                BUILT FOR PRODUCTION
              </span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT AUTH AREA ================= */}

        <div className="flex min-h-screen flex-col">
          {/* Mobile Logo */}
          <div className="p-6 lg:hidden md:ml-33">
            <Link
              to="/"
              className="flex w-fit items-center gap-3 text-2xl font-bold tracking-[-0.04em] text-white"
            >
              <img
                src={logo}
                className="flex h-25 w-25 items-center justify-center rounded-xl bg-primary text-secondary"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Form Container */}
          <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-10 lg:px-16">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          {/* Bottom */}
          <div className="px-6 pb-6 text-center sm:px-10 lg:px-16 xl:px-24">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-secondary/25">
              © {new Date().getFullYear()} StitchFlow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= MINI STAGE ================= */

const MiniStage = ({ icon, label }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5">
      <div className="flex items-center justify-between">
        <span className="text-primary">{icon}</span>

        <FaArrowUpRightFromSquare size={9} className="text-white/20" />
      </div>

      <p className="mt-5 font-mono text-[9px] font-bold tracking-[0.2em] text-white/35">
        {label}
      </p>
    </div>
  );
};

/* ================= TRUST POINT ================= */

const TrustPoint = ({ text }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
        <FaCheck size={8} />
      </span>

      <span className="text-xs text-white/35">{text}</span>
    </div>
  );
};

export default AuthLayout;
