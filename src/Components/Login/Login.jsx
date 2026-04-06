import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useContext, useState } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import toast from "react-hot-toast";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, X, KeyRound, ShieldCheck } from "lucide-react";
import Footer from "../Footer/Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  
  const { createLoginUser, setUser, createUserGoogle, resetPassword } = useContext(AuthContextUser);
  const location = useLocation();
  const navigate = useNavigate();

  const handelLogIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    createLoginUser(email, password)
      .then((result) => {
        setUser(result.user);
        navigate(location?.state?.from || "/");
        toast.success("Welcome back! Authentication successful.");
      })
      .catch((err) => {
        toast.error("Invalid credentials. Please verify your access tokens.");
      });
  };

  const handelGoogle = () => {
    createUserGoogle()
      .then((result) => {
        setUser(result.user);
        navigate(location?.state?.from || "/");
        toast.success("Google Authentication successful!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Security email required for recovery.");
      return;
    }
    
    setIsResetting(true);
    resetPassword(resetEmail)
      .then(() => {
        toast.success("Identity recovery link dispatched! Check your mail node.");
        setShowForgotModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsResetting(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <_motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg relative z-10"
        >
          {/* Subtle Decorative Background shape */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>

          <div className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl shadow-indigo-100/20 relative overflow-hidden border border-gray-50">
            <div className="text-center space-y-4 mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">
                <ShieldCheck size={14} />
                <span>Security Protocol Active</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight text-gray-900 leading-tight">
                Welcome <span className="text-indigo-600 italic">Back</span>
              </h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em]">Initialize Session Access</p>
            </div>

            <form onSubmit={handelLogIn} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-4">Mail Protocol</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-premium pl-16 py-5 text-gray-900 font-bold shadow-inner"
                    placeholder="official@corporation.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Secure Token</label>
                  <button 
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    Recover?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="input-premium pl-16 pr-16 py-5 text-gray-900 font-bold shadow-inner"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl text-xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-xl shadow-indigo-100 active:scale-95 mt-12 group">
                Authorize <ArrowRight size={24} className="transition-transform group-hover:translate-x-2" />
              </button>
            </form>

            <div className="relative my-14">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.5em]"><span className="bg-white px-8 text-gray-300">Alternate Gateway</span></div>
            </div>

            <button
              onClick={handelGoogle}
              className="w-full py-5 border-2 border-gray-50 rounded-2xl flex items-center justify-center gap-4 font-black uppercase tracking-widest hover:bg-gray-50 transition-all text-gray-500 hover:text-gray-900 cursor-pointer shadow-sm group"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google SSO Access
            </button>

            <p className="text-center mt-14 text-xs font-bold text-gray-400 uppercase tracking-widest">
              New Strategist? <Link to="/register" className="text-indigo-600 hover:text-indigo-800 transition-colors border-b-2 border-indigo-50 pb-0.5 ml-2">Initialize Profile</Link>
            </p>
          </div>
        </_motion.div>
      </main>

      {/* Identity Recovery Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/40 backdrop-blur-3xl">
            <_motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[3.5rem] p-10 md:p-14 max-w-lg w-full shadow-[0_40px_100px_-20px_rgba(79,70,229,0.2)] relative border border-indigo-50"
            >
              <button 
                onClick={() => setShowForgotModal(false)}
                className="absolute top-10 right-10 p-3 text-gray-300 hover:text-indigo-600 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center mb-10 border border-indigo-100 shadow-xl shadow-indigo-100/10">
                <KeyRound size={40} />
              </div>
              
              <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Identity Recovery</h3>
              <p className="text-gray-500 font-bold mb-10 text-lg leading-relaxed">
                Provide your secure email to receive an authentication bypass link.
              </p>

              <form onSubmit={handlePasswordReset} className="space-y-8">
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="input-premium pl-16 py-5 text-gray-900 font-bold shadow-inner"
                    placeholder="recovery@secure.com"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isResetting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] disabled:opacity-50 transition-all shadow-xl shadow-indigo-100 active:scale-95 text-sm"
                >
                  {isResetting ? <span className="loading loading-spinner loading-md"></span> : "Dispatch Recovery Log"}
                </button>
              </form>
            </_motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Login;

