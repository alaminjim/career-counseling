import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useContext, useState } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, X, KeyRound } from "lucide-react";
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
        toast.success("Welcome back! Login successful.");
      })
      .catch((err) => {
        toast.error("Invalid credentials. Please try again.");
      });
  };

  const handelGoogle = () => {
    createUserGoogle()
      .then((result) => {
        setUser(result.user);
        navigate(location?.state?.from || "/");
        toast.success("Google Login successful!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Please enter your email address.");
      return;
    }
    
    setIsResetting(true);
    resetPassword(resetEmail)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-neutral/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="text-center space-y-2 mb-10">
              <h1 className="text-4xl font-black tracking-tight font-display text-neutral">
                Welcome <span className="text-primary">Back</span>
              </h1>
              <p className="text-neutral/50 font-medium italic">Continue your professional journey</p>
            </div>

            <form onSubmit={handelLogIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral/70 ml-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-2">
                  <label className="text-sm font-bold text-neutral/70">Password</label>
                  <button 
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/30 hover:text-primary transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button className="w-full btn-premium py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 group mt-8">
                Sign In <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral/5"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-neutral/30 font-bold tracking-widest">Or continue with</span></div>
            </div>

            <button
              onClick={handelGoogle}
              className="w-full py-4 border-2 border-neutral/5 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-neutral/5 transition-all text-neutral cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Account
            </button>

            <p className="text-center mt-8 text-sm font-bold text-neutral/40">
              New here? <Link to="/register" className="text-primary hover:underline underline-offset-4">Create an account</Link>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 p-2 text-neutral/40 hover:text-neutral hover:bg-neutral/5 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <KeyRound size={32} />
              </div>
              
              <h3 className="text-2xl font-bold font-display mb-2">Reset Password</h3>
              <p className="text-neutral/60 text-sm mb-6">
                Enter the email address associated with your account and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-neutral/10 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium"
                    placeholder="name@company.com"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isResetting}
                  className="w-full btn-premium py-3 rounded-xl disabled:opacity-50"
                >
                  {isResetting ? <span className="loading loading-spinner loading-sm"></span> : "Send Reset Link"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Login;
