import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useContext, useState } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import toast from "react-hot-toast";
import { motion as _motion } from "framer-motion";
import { User, Mail, Lock, Image as ImageIcon, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const { createUser, setUser, updateProfileUser, handleGoogleLogin } = useContext(AuthContextUser);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handelRegister = (e) => {
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

    createUser(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Account created! Welcome to CareerPath.");
        
        updateProfileUser({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const onGoogleSuccess = (credentialResponse) => {
    try {
      handleGoogleLogin(credentialResponse);
      toast.success("Identity Created. Synchronization Success.");
      navigate("/");
    } catch (err) {
      toast.error("Handshake Error: Failed to Generate Identity.");
    }
  };

  const onGoogleError = () => {
    toast.error("Auth System: Connection Terminated.");
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
                <span>Identification Node</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight text-white leading-tight">
                Join <span className="text-[#22D3EE] italic">CareerPath</span>
              </h1>
              <p className="text-[#9CA3AF] font-bold uppercase text-[10px] tracking-[0.4em]">Register your node via Email or Google</p>
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
                    <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
                    <input
                      type="text"
                      name="photo"
                      required
                      className="input-premium pl-16 pr-8 py-6 uppercase tracking-widest text-[10px]"
                      placeholder="https://image.url"
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
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.5em]"><span className="bg-[#1F2937] px-8 text-gray-600">Or register with</span></div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="scale-110 hover:scale-125 transition-transform duration-500 bg-white p-1 rounded-xl shadow-2xl">
                <GoogleLogin
                  onSuccess={onGoogleSuccess}
                  onError={onGoogleError}
                  theme="filled_black"
                  shape="pill"
                  size="large"
                  text="signup_with"
                  width="100%"
                />
              </div>
            </div>

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
