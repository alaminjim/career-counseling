import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useContext, useState } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import toast from "react-hot-toast";
import { motion as _motion } from "framer-motion";
import { User, Mail, Lock, Image, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

const Register = () => {
  const { createUser, setUser, updateProfileUser, createUserGoogle } = useContext(AuthContextUser);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handelRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must have 1 uppercase, 1 lowercase, and 6+ characters");
      return;
    }

    try {
      await createUser(email, password);
      // Wait for user or handle verification
      toast.success("Account created! Welcome to CareerPath.");
      
      await updateProfileUser({ displayName: name, photoURL: photo });
      navigate("/");
    } catch (err) {
      toast.error(err.errors?.[0]?.message || err.message);
    }
  };

  const handelGoogle = async () => {
    try {
      await createUserGoogle();
      // authenticateWithRedirect will handle the navigation
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

        <_motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl relative z-10"
        >
          <div className="bg-[#1F2937] rounded-[3.5rem] p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden border border-[#374151]">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                <ShieldCheck size={14} />
                <span>Create Account</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight text-white leading-tight">
                Join <span className="text-[#22D3EE] italic">CareerPath</span>
              </h1>
              <p className="text-[#9CA3AF] font-bold uppercase text-[10px] tracking-[0.4em]">Join the community today</p>
            </div>

            <form onSubmit={handelRegister} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-6">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                    <input
                      type="text"
                      name="name"
                      required
                      className="input-premium pl-16 pr-8 py-6 uppercase tracking-widest text-[10px]"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-6">Photo URL</label>
                  <div className="relative group">
                    <Image className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                    <input
                      type="text"
                      name="photo"
                      required
                      className="input-premium pl-16 pr-8 py-6 uppercase tracking-widest text-[10px]"
                      placeholder="https://cloud.assets/..."
                    />
                  </div>
                </div>
              </div>

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
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-6">Password</label>
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
                <div className="flex items-center gap-3 px-6 pt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[9px] text-[#9CA3AF] font-black uppercase tracking-widest"> 
                    Requirement: Mixed Case • 6+ Characters
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 px-6">
                <input type="checkbox" required className="w-6 h-6 rounded-lg bg-[#111827] border border-[#374151] checked:bg-indigo-600 checked:border-indigo-600 transition-all cursor-pointer accent-indigo-600" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">I accept the <Link className="text-[#22D3EE] hover:text-[#22D3EE]/80 transition-all border-b border-[#22D3EE]/20 pb-0.5 ml-1">Terms and Conditions</Link></span>
              </div>

              <button className="btn-cta w-full py-6 text-lg hover:scale-[1.01] shadow-2xl shadow-green-900/40">
                Sign Up
              </button>
            </form>

            <div className="relative my-16">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#374151]"></span></div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.5em]"><span className="bg-[#1F2937] px-8 text-gray-600">Or sign up with</span></div>
            </div>

            <button
              onClick={handelGoogle}
              className="w-full py-6 bg-[#111827] border border-[#374151] rounded-2xl flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] hover:bg-[#374151] transition-all text-gray-400 hover:text-white cursor-pointer shadow-inner group text-[10px]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-16 text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Already have an account? <Link to="/login" className="text-[#22D3EE] hover:text-[#22D3EE]/80 transition-colors border-b border-[#22D3EE]/20 pb-0.5 ml-2">Sign In</Link>
            </p>
          </div>
        </_motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
