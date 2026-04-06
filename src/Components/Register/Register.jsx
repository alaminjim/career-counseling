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
        toast.success("Account created successfully!");
        
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

  const handelGoogle = () => {
    createUserGoogle()
      .then((result) => {
        setUser(result.user);
        navigate("/");
        toast.success("Google Login successful!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-b1 flex flex-col selection:bg-primary/20 selection:text-primary">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
        <_motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl relative z-10"
        >
          <div className="glass-card rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            
            <div className="text-center space-y-3 mb-12">
              <h1 className="text-5xl font-black tracking-tighter text-white">
                Join <span className="text-primary italic">CareerPath</span>
              </h1>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Initialize Professional Profile</p>
            </div>

            <form onSubmit={handelRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full pl-14 pr-6 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all outline-none font-bold text-white placeholder:text-slate-700"
                      placeholder="Alex Johnson"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Photo URL</label>
                  <div className="relative group">
                    <Image className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      type="text"
                      name="photo"
                      required
                      className="w-full pl-14 pr-6 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all outline-none font-bold text-white placeholder:text-slate-700"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Professional Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-14 pr-6 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all outline-none font-bold text-white placeholder:text-slate-700"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="w-full pl-14 pr-14 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all outline-none font-bold text-white placeholder:text-slate-700"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex items-center gap-2 px-2">
                  <ShieldCheck size={12} className="text-primary" />
                  <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest"> 
                    Mixed case Requirement • 6+ Characters
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-2 py-4">
                <input type="checkbox" required className="checkbox checkbox-primary border-white/10 bg-white/5 rounded-lg" />
                <span className="text-xs font-bold text-slate-500">I accept the <Link className="text-primary hover:text-white transition-all underline underline-offset-4 decoration-primary/30">Executive User Agreement</Link></span>
              </div>

              <button className="w-full btn-premium py-5 rounded-2xl text-lg font-black uppercase tracking-widest flex items-center justify-center gap-3 group mt-6">
                Initialize Profile <ArrowRight size={22} className="transition-transform group-hover:translate-x-2" />
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.4em]"><span className="bg-[#1e293b] px-6 text-slate-600">Quick onboarding</span></div>
            </div>

            <button
              onClick={handelGoogle}
              className="w-full py-5 border border-white/5 rounded-2xl flex items-center justify-center gap-4 font-black uppercase tracking-widest hover:bg-white/5 transition-all text-slate-400 hover:text-white cursor-pointer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Gateway
            </button>

            <p className="text-center mt-12 text-sm font-bold text-slate-500 uppercase tracking-widest">
              Existing Executive? <Link to="/login" className="text-primary hover:text-white transition-colors border-b border-primary/20 pb-0.5 ml-2">Authenticate SSO</Link>
            </p>
          </div>
        </_motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
