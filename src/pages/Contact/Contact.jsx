import { useState } from "react";
import {
  FaPaperPlane,
  FaEnvelope,
  FaLocationDot,
  FaClock,
} from "react-icons/fa6";
import { FaCheckCircle, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission handler
    setIsSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-[#f8faf8] py-24 md:py-32">
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

      <div className="relative px-5 md:px-15 lg:px-25">
        {/* ================= HEADER ================= */}
        <div className="max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary/70">
              Get in Touch
            </span>
            <span className="hidden h-px w-16 bg-primary/50 sm:block" />
          </div>

          <h2 className="mt-6 text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-secondary md:text-7xl">
            Let's build,
            <span className="text-primary ml-2">together.</span>
          </h2>

          <p className="mt-10 text-base leading-relaxed text-secondary/60 md:text-lg">
            Have questions about production workflows, bulk custom orders, or
            enterprise integration? Reach out to our team and we'll respond
            within 24 hours.
          </p>

          <p className="mt-6 font-mono text-[10px] tracking-[0.25em] text-secondary/25">
            SF / CONTACT / INQUIRIES
          </p>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 items-start">
          {/* LEFT COLUMN: CONTACT INFORMATION CARDS */}
          <div className="space-y-6">
            {/* Contact Card 01 */}
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-secondary/10 bg-white p-8 shadow-xl shadow-secondary/5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-secondary/30">
                  01 // DIRECT LINE
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/5 text-secondary transition-all duration-500 group-hover:rotate-6 group-hover:bg-primary">
                  <FaPhoneAlt size={18} />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold tracking-[-0.035em] text-secondary">
                  Phone Support
                </h3>
                <p className="mt-2 text-sm text-secondary/50">
                  Mon-Fri from 8:00am to 6:00pm EST.
                </p>
                <a
                  href="tel:+18005550199"
                  className="mt-4 inline-block font-mono text-base font-bold text-primary hover:underline"
                >
                  +1 (800) 555-0199
                </a>
              </div>
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-secondary/5 transition-transform duration-700 group-hover:scale-150 pointer-events-none" />
            </div>

            {/* Contact Card 02 */}
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-secondary/10 bg-white p-8 shadow-xl shadow-secondary/5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-secondary/30">
                  02 // ELECTRONIC MAIL
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/5 text-secondary transition-all duration-500 group-hover:rotate-6 group-hover:bg-primary">
                  <FaEnvelope size={18} />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold tracking-[-0.035em] text-secondary">
                  Email Inquiries
                </h3>
                <p className="mt-2 text-sm text-secondary/50">
                  For corporate contracts, production data, and support.
                </p>
                <a
                  href="mailto:support@stitchflow.com"
                  className="mt-4 inline-block font-mono text-base font-bold text-primary hover:underline"
                >
                  support@stitchflow.com
                </a>
              </div>
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-secondary/5 transition-transform duration-700 group-hover:scale-150 pointer-events-none" />
            </div>

            {/* Contact Card 03 */}
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-secondary/10 bg-white p-8 shadow-xl shadow-secondary/5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-secondary/30">
                  03 // HEADQUARTERS
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/5 text-secondary transition-all duration-500 group-hover:rotate-6 group-hover:bg-primary">
                  <FaLocationDot size={18} />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold tracking-[-0.035em] text-secondary">
                  Production Facility
                </h3>
                <p className="mt-2 text-sm text-secondary/50">
                  742 Textile Row, Suite 400
                  <br />
                  New York, NY 10001, USA
                </p>
              </div>
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-secondary/5 transition-transform duration-700 group-hover:scale-150 pointer-events-none" />
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE FORM CARD */}
          <div className="relative">
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-secondary/10 bg-white p-8 md:p-12 shadow-2xl shadow-secondary/10">
              <div className="flex items-center justify-between border-b border-secondary/10 pb-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                    SECURE TRANSMISSION
                  </span>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-secondary">
                    Send a Message
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/5 text-secondary">
                  <FaClock size={16} />
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-20 text-center animate-[fadeInLetter_0.5s_ease-out_forwards]">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary mb-6">
                    <FaCheckCircle size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-secondary">
                    Transmission Successful
                  </h4>
                  <p className="mt-2 text-sm text-secondary/60 max-w-sm mx-auto">
                    Thank you for reaching out. Our engineering or production
                    team will review your payload and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-8 rounded-full bg-secondary px-8 py-3.5 text-xs font-semibold text-white uppercase tracking-wider transition-all hover:bg-[#0b355c]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-secondary/60 mb-2">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full rounded-2xl border border-secondary/15 bg-[#f8faf8] px-5 py-4 text-sm text-secondary placeholder:text-secondary/30 focus:border-primary focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-secondary/60 mb-2">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full rounded-2xl border border-secondary/15 bg-[#f8faf8] px-5 py-4 text-sm text-secondary placeholder:text-secondary/30 focus:border-primary focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-secondary/60 mb-2">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="StitchFlow Apparel"
                        className="w-full rounded-2xl border border-secondary/15 bg-[#f8faf8] px-5 py-4 text-sm text-secondary placeholder:text-secondary/30 focus:border-primary focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-secondary/60 mb-2">
                        Subject / Inquiry Type
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-secondary/15 bg-[#f8faf8] px-5 py-4 text-sm text-secondary focus:border-primary focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="">Select option</option>
                        <option value="bulk">Bulk Production Order</option>
                        <option value="custom">Custom Sampling</option>
                        <option value="software">Platform Demo / Trial</option>
                        <option value="other">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-secondary/60 mb-2">
                      Message Details <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your production requirements or questions..."
                      className="w-full rounded-2xl border border-secondary/15 bg-[#f8faf8] px-5 py-4 text-sm text-secondary placeholder:text-secondary/30 focus:border-primary focus:bg-white focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group/btn flex w-full items-center justify-center gap-3 rounded-full bg-secondary px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0b355c]"
                  >
                    Transmit Message
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover/btn:rotate-45">
                      <FaPaperPlane size={11} />
                    </span>
                  </button>
                </form>
              )}

              {/* Decorative Corner Hover Background Effect */}
              <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-secondary/5 transition-transform duration-700 group-hover:scale-150 pointer-events-none" />
            </div>
          </div>
        </div>
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

export default Contact;
