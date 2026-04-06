import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import toast from "react-hot-toast";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { LogOut, User, Menu, X, ChevronDown, Briefcase } from "lucide-react";

const NavBar = () => {
  const { user, userSignOut } = useContext(AuthContextUser);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handelSignOut = () => {
    userSignOut()
      .then(() => {
        toast.success("Identity Disconnected");
        setIsMobileMenuOpen(false);
      })
      .catch((err) => {
        toast.error("Logout Protocols Failed", err);
      });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Career", path: "/career" },
  ];

  if (user) {
    navLinks.push({ name: "My Profile", path: "/profile" });
  }

  const activeLinkStyle =
    "text-indigo-400 font-black nav-link-active pb-1 transition-all duration-300";
  const normalLinkStyle =
    "text-gray-400 font-bold hover:text-white transition-all duration-300 uppercase text-[11px] tracking-widest";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3 glass-nav shadow-2xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-900/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <Briefcase size={22} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            Career<span className="text-indigo-500">Path</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? activeLinkStyle : normalLinkStyle
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="h-6 w-[1px] bg-gray-800 mx-2"></div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-3 cursor-pointer group p-1 pr-3 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
              >
                <div className="avatar shadow-xl shadow-black/20">
                  <div className="w-10 h-10 rounded-full ring-2 ring-indigo-500/20 transition-all duration-500 group-hover:ring-indigo-500/50">
                    <img
                      src={
                        user?.photoURL ||
                        "https://ui-avatars.com/api/?name=" + user?.displayName
                      }
                      alt="Profile"
                    />
                  </div>
                </div>
                <div className="hidden xl:block">
                  <p className="text-sm font-bold text-white leading-tight">
                    {user?.displayName}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-[#22D3EE] font-black">
                    Pro Analyst
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className="text-gray-500 transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-[#1F2937] rounded-2xl w-64 border border-[#374151] overflow-hidden"
              >
                <li className="p-4 border-b border-[#374151] mb-1">
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1 leading-none">
                    Security Node
                  </p>
                  <p className="text-xs font-bold text-gray-300 truncate">
                    {user?.email}
                  </p>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-3 hover:bg-[#374151] rounded-xl transition-all text-gray-300 font-bold group"
                  >
                    <User
                      size={18}
                      className="text-indigo-400 group-hover:scale-110 transition-transform"
                    />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handelSignOut}
                    className="flex items-center gap-3 p-3 w-full text-left hover:bg-rose-500/10 rounded-xl transition-all text-rose-500 font-bold mt-1 group"
                  >
                    <LogOut
                      size={18}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="text-gray-400 font-black hover:text-white transition-colors text-xs uppercase tracking-widest"
              >
                Sign In
              </Link>
              <Link to="/register" className="btn-cta text-xs px-8 py-3.5">
                Join Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-3 text-white bg-[#1F2937] hover:bg-[#374151] rounded-xl transition-all border border-[#374151]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <_motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden fixed inset-x-4 top-24 z-50 bg-[#111827]/95 backdrop-blur-2xl rounded-[2rem] border border-[#374151] overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-6">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-indigo-500/10 text-indigo-400 p-5 rounded-2xl font-black flex items-center justify-between"
                          : "text-gray-400 p-5 rounded-2xl font-bold block hover:bg-white/5"
                      }
                    >
                      <span>{link.name}</span>
                      {link.path === window.location.pathname && (
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_#4F46E5]"></div>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#374151]">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 px-4">
                      <img
                        className="w-12 h-12 rounded-full border-2 border-indigo-500/20"
                        src={user?.photoURL}
                        alt=""
                      />
                      <div>
                        <p className="font-black text-white text-sm">
                          {user?.displayName}
                        </p>
                        <p className="text-xs text-gray-500 font-bold">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handelSignOut}
                      className="w-full py-5 text-center text-rose-500 font-black bg-rose-500/10 rounded-2xl uppercase tracking-widest text-xs"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-5 text-center text-gray-400 font-black hover:bg-white/5 rounded-2xl uppercase tracking-widest text-xs"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-5 text-center bg-[#16A34A] text-white font-black rounded-2xl shadow-xl shadow-green-900/20 uppercase tracking-widest text-xs"
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </_motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
