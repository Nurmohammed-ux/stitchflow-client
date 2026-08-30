import { NavLink } from "react-router";
import {
  FaChartPie,
  FaClipboardList,
  FaBoxOpen,
  FaTruck,
  FaUsers,
  FaArrowRightFromBracket,
  FaBars,
  FaXmark,
  FaRegUser,
  FaPlus,
  FaClock,
} from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading/Loading";

const buyerItems = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: FaChartPie,
  },
  {
    title: "My Orders",
    path: "/dashboard/my-orders",
    icon: FaClipboardList,
  },
  {
    title: "Track Order",
    path: "/dashboard/track-order",
    icon: FaTruck,
  },
];

const managerItems = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: FaChartPie,
  },
  {
    title: "Add Product",
    path: "/dashboard/add-product",
    icon: FaPlus,
  },
  {
    title: "Manage Products",
    path: "/dashboard/manage-products",
    icon: FaBoxOpen,
  },
  {
    title: "Pending Orders",
    path: "/dashboard/pending-orders",
    icon: FaClock,
  },
  {
    title: "Approved Orders",
    path: "/dashboard/approved-orders",
    icon: FaCheckCircle,
  },
];

const adminItems = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: FaChartPie,
  },
  {
    title: "Manage Users",
    path: "/dashboard/manage-users",
    icon: FaUsers,
  },
  {
    title: "All Products",
    path: "/dashboard/all-products",
    icon: FaBoxOpen,
  },
  {
    title: "All Orders",
    path: "/dashboard/all-orders",
    icon: FaClipboardList,
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getNavClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-primary text-secondary shadow-sm"
        : "text-secondary/50 hover:bg-primary/10 hover:text-secondary"
    }`;

  const closeSidebar = () => setOpen(false);

  const navItems =
    role === "admin"
      ? adminItems
      : role === "manager"
        ? managerItems
        : buyerItems;

  const roleLabel =
    role === "admin"
      ? "Administrator"
      : role === "manager"
        ? "Production Manager"
        : "Buyer";

  if (roleLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}

      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-secondary/10 bg-white px-5 py-4 lg:hidden">
        <NavLink
          to="/"
          onClick={closeSidebar}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-sm font-bold text-primary">
            <img src={logo} alt="StitchFlow" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-secondary">
              Stitch<span className="text-primary">Flow</span>
            </h1>
          </div>
        </NavLink>

        <button
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-secondary"
          aria-label="Open dashboard menu"
        >
          <FaBars size={16} />
        </button>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}

      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-secondary/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-secondary/10 bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ================= LOGO ================= */}

        <div className="flex h-24 items-center justify-between border-b border-secondary/10 px-7">
          <NavLink
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary font-bold text-primary shadow-lg shadow-secondary/10">
              <img src={logo} alt="StitchFlow" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-secondary">
                Stitch<span className="text-primary">Flow</span>
              </h1>

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-secondary/30">
                Production System
              </p>
            </div>
          </NavLink>

          <button
            onClick={closeSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-secondary/40 hover:bg-secondary/5 hover:text-secondary lg:hidden"
            aria-label="Close dashboard menu"
          >
            <FaXmark />
          </button>
        </div>

        {/* ================= WORKSPACE ================= */}

        <div className="border-b border-secondary/10 px-6 py-5">
          <div className="rounded-2xl bg-[#f8faf8] p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-secondary/30">
              Workspace
            </p>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-secondary">
                SF
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-secondary">
                  StitchFlow Factory
                </p>

                <p className="text-xs text-secondary/40">{roleLabel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div>
            <p className="mb-3 px-3 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-secondary/30">
              {role === "admin"
                ? "Administration"
                : role === "manager"
                  ? "Management"
                  : "Main Menu"}
            </p>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    onClick={closeSidebar}
                    className={getNavClass}
                  >
                    <Icon
                      size={15}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />

                    <span>{item.title}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* ================= ACCOUNT ================= */}

          <div className="mt-8">
            <p className="mb-3 px-3 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-secondary/30">
              Account
            </p>

            <nav className="space-y-1">
              <NavLink
                to="/dashboard/profile"
                onClick={closeSidebar}
                className={getNavClass}
              >
                <FaRegUser size={15} />

                <span>My Profile</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* ================= USER / LOGOUT ================= */}

        <div className="border-t border-secondary/10 p-5">
          <div className="flex items-center gap-3 rounded-2xl bg-secondary p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-secondary">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user?.displayName || "User"}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <FaRegUser />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white">
                {user?.displayName || "User"}
              </p>

              <p className="truncate text-[10px] text-white/40">
                {user?.email}
              </p>
            </div>

            <button
              onClick={handleLogOut}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-primary hover:text-secondary"
              title="Logout"
            >
              <FaArrowRightFromBracket size={13} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
