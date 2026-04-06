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
        toast.success("Logged out successfully");
      })
      .catch((err) => {
        toast.error(err.message);
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

  const activeLinkStyle = "text-primary font-bold border-b-2 border-primary pb-1 transition-all duration-300";
  const normalLinkStyle = "text-neutral/80 font-medium hover:text-primary transition-all duration-300";

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-3 glass-nav shadow-md" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform duration-300">
            <Briefcase size={22} />
          </div>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight">
            Career<span className="text-primary font-display">Path</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? activeLinkStyle : normalLinkStyle)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="h-6 w-[1px] bg-neutral/10 mx-2"></div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer group">
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 transition-all duration-300 group-hover:scale-105">
                    <img src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.displayName} alt="Profile" />
                  </div>
                </div>
                <div className="hidden xl:block">
                  <p className="text-sm font-semibold leading-tight">{user?.displayName}</p>
                  <p className="text-xs text-neutral/60">Professional Account</p>
                </div>
                <ChevronDown size={16} className="text-neutral/40 transition-transform duration-300 group-hover:translate-y-0.5" />
              </div>
              <ul tabIndex={0} className="dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-base-200 rounded-2xl w-52 border border-neutral/20 overflow-hidden">
                <li className="p-3 border-b border-neutral/20 mb-1">
                  <p className="text-xs font-bold uppercase text-neutral/40">Account Info</p>
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-xl transition-colors text-neutral font-medium">
                    <User size={18} className="text-primary" /> My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handelSignOut} className="flex items-center gap-3 p-3 w-full text-left hover:bg-error/5 rounded-xl transition-colors text-error font-medium mt-1">
                    <LogOut size={18} /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn-premium">
              Log In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-neutral hover:bg-neutral/5 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <_motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-base-100 border-b border-neutral/20 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => (isActive ? "text-primary font-bold text-lg block" : "text-neutral/80 font-medium text-lg block")}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-neutral/5">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="" />
                      <div>
                        <p className="font-bold">{user?.displayName}</p>
                        <p className="text-xs text-neutral/60">{user?.email}</p>
                      </div>
                    </div>
                    <button onClick={handelSignOut} className="w-full btn btn-error btn-outline rounded-xl">Sign Out</button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full btn-premium block text-center">Log In</Link>
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
