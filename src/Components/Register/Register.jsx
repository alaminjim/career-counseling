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

  const handelGoogle = () => {
    createUserGoogle()
      .then((result) => {
        setUser(result.user);
        navigate("/");
        toast.success("Google Authentication successful!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <_motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl relative z-10"
        >
          {/* Decorative background shape */}
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>

          <div className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl shadow-indigo-100/20 relative overflow-hidden border border-gray-50">
            <div className="text-center space-y-4 mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">
                <ShieldCheck size={14} />
                <span>Secure Initialization</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight text-gray-900 leading-tight text-nowrap">
                Join <span className="text-indigo-600 italic">CareerPath</span>
              </h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em]">Initialize Professional Profile</p>
            </div>

            <form onSubmit={handelRegister} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-4">Full Identity</label>
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input
                      type="text"
                      name="name"
                      required
                      className="input-premium pl-16 py-5 text-gray-900 font-bold shadow-inner"
                      placeholder="Alex Strategic"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-4">Profile Asset URL</label>
                  <div className="relative group">
                    <Image className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input
                      type="text"
                      name="photo"
                      required
                      className="input-premium pl-16 py-5 text-gray-900 font-bold shadow-inner"
                      placeholder="https://cloud.assets/..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-4">Professional Mail</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-premium pl-16 py-5 text-gray-900 font-bold shadow-inner"
                    placeholder="hq@enterprise.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-4">Secure Token</label>
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
                <div className="flex items-center gap-3 px-4 pt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest"> 
                    Requirement: Mixed Case • 6+ Characters
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-4 py-4">
                <input type="checkbox" required className="w-5 h-5 rounded-lg border-2 border-gray-100 checked:bg-indigo-600 checked:border-indigo-600 transition-all cursor-pointer" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">I accept the <Link className="text-indigo-600 hover:text-indigo-800 transition-all underline underline-offset-4 decoration-indigo-100">User Master Agreement</Link></span>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-2xl text-xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-xl shadow-indigo-100 active:scale-95 group">
                Initialize Profile <ArrowRight size={24} className="transition-transform group-hover:translate-x-2" />
              </button>
            </form>

            <div className="relative my-14">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.5em]"><span className="bg-white px-8 text-gray-300">Alternate Onboarding</span></div>
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
              Existing Executive? <Link to="/login" className="text-indigo-600 hover:text-indigo-800 transition-colors border-b-2 border-indigo-50 pb-0.5 ml-2">Authenticate SSO</Link>
            </p>
          </div>
        </_motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
