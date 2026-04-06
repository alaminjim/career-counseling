import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useContext, useState } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import toast from "react-hot-toast";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, X, KeyRound, ShieldCheck } from "lucide-react";
import Footer from "../Footer/Footer";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  
  const { createLoginUser, setUser, handleGoogleLogin, resetPassword } = useContext(AuthContextUser);
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
        toast.error("Invalid credentials.");
      });
  };

  const onGoogleSuccess = (credentialResponse) => {
    try {
      handleGoogleLogin(credentialResponse);
      toast.success("Identity Verified. Access Granted.");
      navigate(location?.state?.from || "/");
    } catch (err) {
      toast.error("Protocol Error: Identity Verification Failed.");
    }
  };

  const onGoogleError = () => {
    toast.error("Auth System: Connection Terminated.");
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
    <div className="min-h-screen bg-[#0B1020] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

        <_motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg relative z-10"
        >
          <div className="bg-[#1F2937] rounded-[3.5rem] p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden border border-[#374151]">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                <ShieldCheck size={14} />
                <span>Secure Access</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight text-white leading-tight">
                Welcome <span className="text-[#22D3EE] italic">Back</span>
              </h1>
              <p className="text-[#9CA3AF] font-bold uppercase text-[10px] tracking-[0.4em]">Sign in to your account</p>
            </div>

            <form onSubmit={handelLogIn} className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-6">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-premium pl-16 pr-8 py-6 uppercase tracking-widest text-[10px]"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Password</label>
                  <button 
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[10px] font-black uppercase tracking-widest text-[#22D3EE] hover:text-[#22D3EE]/80 transition-colors cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="input-premium pl-16 pr-20 py-6 uppercase tracking-widest text-[10px]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button className="btn-cta w-full py-6 text-lg hover:scale-[1.01] shadow-2xl shadow-green-900/40 mt-6">
                Sign In
              </button>
            </form>

            <div className="relative my-16">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#374151]"></span></div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.5em]"><span className="bg-[#1F2937] px-8 text-gray-600">Or continue with</span></div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="scale-110 hover:scale-125 transition-transform duration-500 bg-white p-1 rounded-xl shadow-2xl">
                <GoogleLogin
                  onSuccess={onGoogleSuccess}
                  onError={onGoogleError}
                  theme="filled_black"
                  shape="pill"
                  size="large"
                  text="continue_with"
                  width="100%"
                />
              </div>
            </div>

            <p className="text-center mt-16 text-[10px] font-black text-gray-500 uppercase tracking-widest">
              New here? <Link to="/register" className="text-[#22D3EE] hover:text-[#22D3EE]/80 transition-colors border-b border-[#22D3EE]/20 pb-0.5 ml-2">Create Identity</Link>
            </p>
          </div>
        </_motion.div>
      </main>

      {/* Identity Recovery Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0B1020]/60 backdrop-blur-xl">
            <_motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1F2937] rounded-[3.5rem] p-12 md:p-16 max-w-lg w-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative border border-[#374151]"
            >
              <button 
                onClick={() => setShowForgotModal(false)}
                className="absolute top-12 right-12 p-3 text-gray-600 hover:text-white hover:bg-white/5 rounded-2xl transition-all cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="w-20 h-20 bg-indigo-500/10 text-indigo-400 rounded-3xl flex items-center justify-center mb-10 border border-indigo-500/20 shadow-2xl">
                <KeyRound size={40} />
              </div>
              
              <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Reset Password</h3>
              <p className="text-[#9CA3AF] font-bold mb-12 text-lg leading-relaxed">
                Enter your email to receive a password reset link.
              </p>

              <form onSubmit={handlePasswordReset} className="space-y-10">
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="input-premium pl-16 pr-8 py-6 uppercase tracking-widest text-[10px]"
                    placeholder="your.email@example.com"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isResetting}
                  className="btn-cta w-full py-6 uppercase tracking-[0.2em] disabled:opacity-50 text-[11px]"
                >
                  {isResetting ? <span className="loading loading-spinner loading-md"></span> : "Send Reset Link"}
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
