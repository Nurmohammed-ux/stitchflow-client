import { useState } from "react";
import { Link } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { FaArrowRight, FaEye, FaEyeSlash, FaCamera } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const selectedPhoto = useWatch({ control, name: "photo" });

  const photoPreview = selectedPhoto?.[0]
    ? URL.createObjectURL(selectedPhoto[0])
    : null;

  const onSubmit = (data) => {
    console.log(data);

    // data.photo[0] -> selected image
    // data.name
    // data.email
    // data.password
  };

  const handleGoogleLogin = () => {
    // Add your Google auth integration logic here (e.g., Firebase, NextAuth, etc.)
    console.log("Google login clicked");
  };

  return (
    <div>
      {/* ================= HEADER ================= */}

      <div>
        <p className="flex items-center gap-3 font-bold uppercase tracking-[0.25em]">
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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
        {/* ================= PROFILE IMAGE ================= */}

        <div className="flex justify-start">
          <label
            htmlFor="photo"
            className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-secondary/15 bg-white transition-all duration-300 hover:border-primary hover:bg-primary/5"
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-secondary/30 transition-colors group-hover:text-primary">
                <FaCamera size={22} />
                <span className="text-[9px] font-bold uppercase tracking-[0.15em]">
                  Photo
                </span>
              </div>
            )}

            {/* Hover overlay */}

            {photoPreview && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <FaCamera className="text-white" size={20} />
              </div>
            )}
          </label>

          <input
            id="photo"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            {...register("photo", {
              required: "Profile image is required",
              validate: {
                fileType: (files) =>
                  ["image/jpeg", "image/png", "image/webp"].includes(
                    files?.[0]?.type,
                  ) || "Only JPG, PNG or WEBP images are allowed",

                fileSize: (files) =>
                  !files?.[0] ||
                  files[0].size <= 2 * 1024 * 1024 ||
                  "Image must be less than 2MB",
              },
            })}
          />
        </div>

        {errors.photo && (
          <p className="text-center text-xs font-medium text-red-500">
            {errors.photo.message}
          </p>
        )}

        <p className="text-left text-sm text-secondary/30">
          Upload a profile photo · Max 2MB
        </p>

        {/* ================= NAME ================= */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-secondary/50"
          >
            Full Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Your full name"
            className="w-full rounded-2xl border border-secondary/10 bg-white px-5 py-4 text-sm text-secondary outline-none transition-all placeholder:text-secondary/20 focus:border-primary focus:ring-4 focus:ring-primary/10"
            {...register("name", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />

          {errors.name && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* ================= EMAIL ================= */}

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

        {/* ================= PASSWORD ================= */}

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
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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

        {/* ================= SUBMIT ================= */}

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

export default Register;
