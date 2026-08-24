import { useState } from "react";
import { Link } from "react-router";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <div>
      {/* ================= HEADER ================= */}

      <div>
        <p className="font-bold uppercase tracking-[0.25em] flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/50">
            Create account
          </span>
          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tighter text-secondary sm:text-5xl">
          Start with <span className="text-primary">StitchFlow.</span>
        </h2>

        <p className="mt-4 text-lg text-secondary/45">
          Connect your production workflow in one place.
        </p>
      </div>

      {/* ================= FORM ================= */}

      <form onSubmit={handleRegister} className="mt-10 space-y-5">
        {/* Name */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            required
            className="w-full rounded-2xl border border-secondary/10 bg-white px-5 py-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        {/* Email */}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            className="w-full rounded-2xl border border-secondary/10 bg-white px-5 py-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        {/* Password */}

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              required
              className="w-full rounded-2xl border border-secondary/10 bg-white px-5 py-4 pr-12 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/30 transition-colors hover:text-secondary"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
            </button>
          </div>
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-secondary px-5 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b355c] hover:shadow-xl hover:shadow-secondary/10"
        >
          Create Account
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover:translate-x-1">
            <FaArrowRight size={10} />
          </span>
        </button>
      </form>

      {/* ================= LOGIN ================= */}

      <div className="mt-8 text-center">
        <p className="text-sm text-secondary/40">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-bold text-secondary transition-colors hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* ================= DIVIDER ================= */}

      <div className="mt-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-secondary/10" />

        <span className="font-mono text-xs tracking-[0.2em] text-secondary/40">
          STITCHFLOW ACCESS
        </span>

        <span className="h-px flex-1 bg-secondary/10" />
      </div>
    </div>
  );
};

export default Register;
