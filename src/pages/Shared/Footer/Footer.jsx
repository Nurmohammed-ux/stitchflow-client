import { useState } from "react";
import {
  FaArrowUpRightFromSquare,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";
import logo from "../../../assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000); // Reset after 5 seconds
    }
  };

  const productLinks = [
    "Features",
    "Production Workflow",
    "Dashboard",
    "Analytics",
  ];

  const companyLinks = ["About Us", "Who It's For", "Testimonials", "Contact"];

  const resourceLinks = [
    "FAQ",
    "Documentation",
    "Help Center",
    "Getting Started",
  ];

  return (
    <footer className="bg-secondary text-white">
      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="px-5 py-20 md:px-15 md:py-24 lg:px-25">
        {/* =================================================
            TOP SECTION
        ================================================_ */}

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* =================================================
              BRAND & NEWSLETTER
          ================================================_ */}

          <div className="space-y-8">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3 text-2xl font-bold tracking-[-0.04em]"
            >
              <img
                src={logo}
                className="h-12 w-12 rounded-xl object-contain bg-primary p-1 shadow-md"
                alt="StitchFlow Logo"
              />
              <span>StitchFlow</span>
            </a>

            {/* Description */}
            <p className="max-w-sm text-sm leading-relaxed text-white/45 md:text-base">
              A connected workspace for garment factories to manage orders,
              production, inventory and delivery from one place.
            </p>

            {/* Newsletter Input Form */}
            <div className="max-w-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                Stay updated
              </p>

              {subscribed ? (
                <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-xs font-medium text-primary">
                  ✨ Thank you for subscribing! We'll keep you posted.
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex w-full items-center rounded-full border border-white/10 bg-white/5 p-1.5 transition-all focus-within:border-primary focus-within:bg-white/10"
                >
                  <div className="relative flex flex-1 items-center">
                    <span className="absolute left-3 text-white/30 pointer-events-none flex items-center">
                      <FaEnvelope size={15} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-transparent py-2.5 pl-10 pr-4 text-xs md:text-sm text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-full bg-primary px-5 py-2.5 md:py-3 text-xs md:text-sm font-bold text-white transition-all hover:bg-white hover:text-secondary shrink-0 shadow-md"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                Production / Connected
              </span>
            </div>
          </div>

          {/* =================================================
              PRODUCT
          ================================================_ */}
          <FooterColumn title="Product" links={productLinks} />

          {/* =================================================
              COMPANY
          ================================================_ */}
          <FooterColumn title="Company" links={companyLinks} />

          {/* =================================================
              RESOURCES
          ================================================_ */}
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        {/* =====================================================
            LARGE STATEMENT
        ===================================================== */}

        <div className="mt-20 border-y border-white/10 py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="text-4xl font-bold leading-[0.95] tracking-[-0.055em] text-white md:text-6xl">
              Keep every part of your
              <span className="text-primary"> production moving.</span>
            </h2>

            <span className="shrink-0 font-mono text-[10px] tracking-[0.25em] text-white/20">
              SF / FOOTER / 010
            </span>
          </div>
        </div>

        {/* =====================================================
            SOCIAL + CTA
        ===================================================== */}

        <div className="flex flex-col gap-8 border-b border-white/10 py-8 md:flex-row md:items-center md:justify-between">
          {/* Social */}
          <div className="flex items-center gap-3">
            <SocialButton icon={<FaLinkedinIn size={13} />} label="LinkedIn" />
            <SocialButton icon={<FaInstagram size={13} />} label="Instagram" />
            <SocialButton icon={<FaFacebookF size={13} />} label="Facebook" />
            <SocialButton icon={<FaXTwitter size={13} />} label="X" />
          </div>

          {/* CTA */}
          <button className="group flex w-fit items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-bold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20">
            Get Started
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-white transition-transform duration-300 group-hover:rotate-45">
              <FaArrowUpRightFromSquare size={10} />
            </span>
          </button>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <div className="flex flex-col gap-5 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
            © {new Date().getFullYear()} StitchFlow. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            <a
              href="/privacy"
              className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 transition-colors hover:text-primary"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 transition-colors hover:text-primary"
            >
              Terms
            </a>
            <a
              href="/contact"
              className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25 transition-colors hover:text-primary"
            >
              Contact
            </a>
          </div>

          <p className="font-mono text-[10px] tracking-[0.15em] text-white/15">
            BUILT FOR PRODUCTION
          </p>
        </div>
      </div>
    </footer>
  );
};

/* =========================================================
   FOOTER COLUMN
========================================================= */
const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
        {title}
      </h3>

      <ul className="mt-6 space-y-4">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="group flex w-fit items-center gap-2 text-sm font-medium text-white/45 transition-colors duration-300 hover:text-white"
            >
              {link}
              <FaArrowUpRightFromSquare
                size={8}
                className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* =========================================================
   SOCIAL BUTTON
========================================================= */
const SocialButton = ({ icon, label }) => {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-secondary"
    >
      {icon}
    </a>
  );
};

export default Footer;
