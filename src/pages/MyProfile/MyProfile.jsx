import {
  FaArrowRightFromBracket,
  FaEnvelope,
  FaPhone,
  FaRegUser,
  FaShieldHalved,
  FaCalendarDays,
  FaCircleCheck,
} from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import Loading from "../../components/Loading/Loading";


const Profile = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  if (roleLoading) {
    return <Loading />;
  }

  const roleLabel =
    role === "admin"
      ? "Administrator"
      : role === "manager"
        ? "Production Manager"
        : "Buyer";

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-BD", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="min-h-screen bg-[#f8faf8] px-5 py-8 md:px-10 lg:px-12">
      {/* ================= HEADER ================= */}

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-primary" />

          <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">
            Account
          </span>

          <span className="hidden h-px w-20 bg-primary/60 sm:block" />
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.055em] text-secondary md:text-6xl">
              My Profile.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-secondary/45 md:text-base">
              Manage your StitchFlow account information and view your profile
              details.
            </p>
          </div>

          <p className="font-mono text-[10px] tracking-[0.25em] text-secondary/30">
            SF / ACCOUNT / PROFILE
          </p>
        </div>
      </div>

      {/* ================= PROFILE HERO ================= */}

      <div className="overflow-hidden rounded-3xl border border-secondary/10 bg-secondary">
        <div className="relative p-6 md:p-8 lg:p-10">
          {/* Decorative circles */}

          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full border border-primary/10" />

          <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full border border-primary/10" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* PROFILE IMAGE */}

            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-primary text-3xl font-bold text-secondary shadow-xl shadow-black/10">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user?.displayName || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaRegUser />
              )}
            </div>

            {/* NAME */}

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                Account Profile
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                {user?.displayName || "User"}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60">
                  {roleLabel}
                </span>

                <span className="flex items-center gap-1.5 text-xs text-primary">
                  <FaCircleCheck size={11} />
                  Active Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= INFORMATION ================= */}

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* PERSONAL INFORMATION */}

        <div className="rounded-3xl border border-secondary/10 bg-white p-6 lg:col-span-2 md:p-8">
          <div className="mb-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
              Personal Information
            </p>

            <h2 className="mt-2 text-2xl font-bold text-secondary">
              Account details
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* NAME */}

            <InfoCard
              icon={FaRegUser}
              label="Full Name"
              value={user?.displayName || "Not provided"}
            />

            {/* EMAIL */}

            <InfoCard
              icon={FaEnvelope}
              label="Email Address"
              value={user?.email || "Not provided"}
            />

            {/* PHONE */}

            <InfoCard
              icon={FaPhone}
              label="Phone Number"
              value={user?.phoneNumber || "Not provided"}
            />

            {/* ROLE */}

            <InfoCard
              icon={FaShieldHalved}
              label="Account Role"
              value={roleLabel}
            />

            {/* JOINED */}

            <InfoCard
              icon={FaCalendarDays}
              label="Member Since"
              value={joinedDate}
            />

            {/* EMAIL VERIFIED */}

            <InfoCard
              icon={FaCircleCheck}
              label="Email Verification"
              value={user?.emailVerified ? "Verified" : "Not verified"}
            />
          </div>
        </div>

        {/* ACCOUNT STATUS */}

        <div className="rounded-3xl border border-secondary/10 bg-white p-6 md:p-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
            Account
          </p>

          <h2 className="mt-2 text-2xl font-bold text-secondary">
            Account status
          </h2>

          <div className="mt-7 rounded-2xl bg-[#f8faf8] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-secondary">
                <FaShieldHalved size={15} />
              </div>

              <div>
                <p className="text-sm font-bold text-secondary">{roleLabel}</p>

                <p className="mt-1 text-xs text-secondary/40">
                  StitchFlow account
                </p>
              </div>
            </div>

            <div className="my-5 h-px bg-secondary/10" />

            <div className="flex items-center justify-between">
              <span className="text-xs text-secondary/40">Account status</span>

              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Active
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-secondary/40">Email status</span>

              <span className="text-xs font-semibold text-secondary">
                {user?.emailVerified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LOGOUT ================= */}

      <div className="mt-5 rounded-3xl border border-red-100 bg-white p-6 md:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-red-400">
              Session
            </p>

            <h2 className="mt-2 text-xl font-bold text-secondary">
              Sign out of StitchFlow
            </h2>

            <p className="mt-1 text-sm text-secondary/40">
              You can sign back in anytime using your account credentials.
            </p>
          </div>

          <button
            onClick={handleLogOut}
            className="flex items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-bold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <FaArrowRightFromBracket size={14} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="group rounded-2xl border border-secondary/10 bg-[#f8faf8] p-4 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-secondary shadow-sm transition-all duration-300 group-hover:bg-primary">
          <Icon size={13} />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-secondary/30">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-secondary">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
