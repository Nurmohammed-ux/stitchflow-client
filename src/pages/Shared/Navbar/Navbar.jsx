import { Link, NavLink } from "react-router";
import logo from "../../../assets/logo.png";
import useAuth from "../../../hooks/useAuth";

const getLinkClass = ({ isActive }) =>
  `px-4 py-2 text-[15px] font-semibold rounded-full transition-all duration-200 ${
    isActive
      ? "bg-primary text-white shadow-sm"
      : "text-gray-600 hover:text-primary hover:bg-primary/5"
  }`;

const Navbar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <NavLink to="/" className={getLinkClass}>
        Home
      </NavLink>

      <NavLink to="/all-products" className={getLinkClass}>
        All Products
      </NavLink>

      <NavLink to="/about-us" className={getLinkClass}>
        About Us
      </NavLink>

      <NavLink to="/contact" className={getLinkClass}>
        Contact
      </NavLink>
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="navbar min-h-20 lg:px-6">
        {/* Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className="group flex items-center p-0 bg-transparent border-0 shadow-none hover:bg-transparent focus:outline-none"
          >
            <img
              src={logo}
              alt="StitchFlow"
              className="
                h-20 w-20
                object-contain
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <nav className="flex items-center gap-1">{links}</nav>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-3">
          {/* Login or Logout */}
          {user ? (
            <button onClick={handleSignOut} className="hidden sm:inline-flex bg-primary/10 px-5 py-2.5 rounded-full text-base font-semibold text-primary transition-colors duration-300 ease-in-out hover:bg-secondary hover:text-white">
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-flex bg-primary/10 px-5 py-2.5 rounded-full text-base font-semibold text-primary transition-colors duration-300 ease-in-out hover:bg-secondary hover:text-white"
            >
              Login
            </Link>
          )}

          {/* CTA */}
          <Link
            to="/dashboard"
            className="
              inline-flex items-center justify-center
              px-5 py-2.5
              rounded-full
              bg-primary
              text-white
              text-sm font-semibold
              shadow-sm
              transition-all duration-200
              hover:bg-[#0b355c]
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            Get Started
          </Link>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <button
              tabIndex={0}
              className="
                flex items-center justify-center
                h-10 w-10
                rounded-xl
                border border-gray-200
                hover:border-secondary
                bg-white
                text-primary
                hover:text-secondary
                hover:bg-gray-50
              "
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={-1}
              className="
                dropdown-content
                mt-3
                w-56
                rounded-2xl
                border border-gray-100
                bg-white
                p-3
                shadow-xl
              "
            >
              <div className="flex flex-col gap-1">{links}</div>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
