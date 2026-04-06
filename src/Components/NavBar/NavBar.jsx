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

  const activeLinkStyle = "text-primary font-bold nav-link-active pb-1 transition-all duration-300";
  const normalLinkStyle = "text-slate-200/70 font-medium hover:text-primary transition-all duration-300";

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-3 glass-nav shadow-2xl" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-primary-content shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <Briefcase size={24} />
          </div>
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-white">
            Career<span className="text-primary">Path</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
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

          <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center gap-3 cursor-pointer group p-1 pr-3 rounded-full hover:bg-white/5 transition-all">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-b1 transition-all duration-500 group-hover:ring-primary">
                    <img src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.displayName} alt="Profile" />
                  </div>
                </div>
                <div className="hidden xl:block">
                  <p className="text-sm font-bold text-white leading-tight">{user?.displayName}</p>
                  <p className="text-[10px] uppercase tracking-widest text-primary font-black">Pro Member</p>
                </div>
                <ChevronDown size={16} className="text-white/40 transition-transform duration-300 group-hover:translate-y-0.5" />
              </div>
              <ul tabIndex={0} className="dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-[#1e293b] rounded-2xl w-60 border border-white/5 overflow-hidden backdrop-blur-xl">
                <li className="p-4 border-b border-white/5 mb-2">
                  <p className="text-[10px] font-black uppercase text-white/30 tracking-tighter mb-1">Authenticated Account</p>
                  <p className="text-xs font-medium text-slate-200 truncate">{user?.email}</p>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all text-slate-200 font-semibold group">
                    <User size={18} className="text-primary group-hover:scale-110 transition-transform" /> 
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handelSignOut} className="flex items-center gap-3 p-3 w-full text-left hover:bg-red-500/10 rounded-xl transition-all text-red-400 font-semibold mt-1 group">
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn-premium">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-3 text-white bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <_motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden fixed inset-x-4 top-24 z-50 glass-nav rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-6">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => (isActive ? "bg-primary/10 text-primary p-4 rounded-xl font-bold flex items-center justify-between" : "text-white/70 p-4 rounded-xl font-medium block hover:bg-white/5")}
                    >
                      <span>{link.name}</span>
                      {link.path === window.location.pathname && <div className="w-2 h-2 bg-primary rounded-full blur-[2px]"></div>}
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
