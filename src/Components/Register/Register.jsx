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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
        <_motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 border border-neutral/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="text-center space-y-2 mb-10">
              <h1 className="text-4xl font-black tracking-tight font-display text-neutral">
                Join <span className="text-primary">CareerPath</span>
              </h1>
              <p className="text-neutral/50 font-medium italic">Begin your professional transformation</p>
            </div>

            <form onSubmit={handelRegister} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral/70 ml-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium"
                      placeholder="Alex Johnson"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral/70 ml-2">Photo URL</label>
                  <div className="relative">
                    <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                    <input
                      type="text"
                      name="photo"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none font-medium"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

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
                <label className="text-sm font-bold text-neutral/70 ml-2">Password</label>
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/30 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-[10px] text-neutral/40 px-2 font-medium"> Must contain uppercase, lowercase, and at least 6 characters.</p>
              </div>

              <div className="flex items-center gap-3 px-2 py-2">
                <input type="checkbox" required className="checkbox checkbox-primary checkbox-sm rounded-md" />
                <span className="text-xs font-bold text-neutral/50">I agree to the <Link className="text-primary hover:underline">Terms of Service</Link></span>
              </div>

              <button className="w-full btn-premium py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 group mt-4">
                Create Account <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral/5"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-neutral/30 font-bold tracking-widest">Fast Registration</span></div>
            </div>

            <button
              onClick={handelGoogle}
              className="w-full py-4 border-2 border-neutral/5 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-neutral/5 transition-all text-neutral"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Quick Join with Google
            </button>

            <p className="text-center mt-8 text-sm font-bold text-neutral/40">
              Already a member? <Link to="/login" className="text-primary hover:underline underline-offset-4">Sign in here</Link>
            </p>
          </div>
        </_motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
