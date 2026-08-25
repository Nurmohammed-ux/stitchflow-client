import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // data.email
    // data.password
  };

  const handleGoogleLogin = () => {
    // Add your Google auth integration logic here
    console.log("Google login clicked");
  };

  return (
    <div>
      {/* ================= HEADER ================= */}

      <div>
        <p className="font-bold uppercase tracking-[0.25em] flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/50">
            Welcome back
          </span>
          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tighter text-secondary sm:text-5xl">
          Sign in to <span className="text-primary">StitchFlow.</span>
        </h2>

        <p className="mt-4 text-lg text-secondary/45">
          Continue managing your production workflow.
        </p>
      </div>

      {/* ================= FORM ================= */}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
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
            type="email"
            placeholder="you@company.com"
            className="w-full rounded-2xl border border-secondary/10 bg-white px-5 py-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />

          {errors.email && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-[0.15em] text-secondary/50"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-secondary/10 bg-white px-5 py-4 pr-12 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
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

          {errors.password && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-secondary px-5 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b355c] hover:shadow-xl hover:shadow-secondary/10"
        >
          Sign In
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-secondary transition-transform duration-300 group-hover:translate-x-1">
            <FaArrowRight size={10} />
          </span>
        </button>
      </form>

      {/* ================= REGISTER ================= */}

      <div className="mt-8 text-center">
        <p className="text-sm text-secondary/40">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 font-bold text-secondary transition-colors hover:text-primary"
          >
            Create one
          </Link>
        </p>
      </div>

      {/* ================= DIVIDER ================= */}

      <div className="mt-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-secondary/10" />

        <span className="font-mono text-xs tracking-[0.2em] text-secondary/40">
          SECURE ACCESS
        </span>

        <span className="h-px flex-1 bg-secondary/10" />
      </div>

      {/* ================= GOOGLE LOGIN BUTTON ================= */}

      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-secondary/10 bg-white px-5 py-4 text-sm font-bold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg hover:shadow-secondary/5"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
