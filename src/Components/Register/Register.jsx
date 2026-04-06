import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import toast from "react-hot-toast";
import { motion as _motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const { handleGoogleLogin } = useContext(AuthContextUser);
  const navigate = useNavigate();

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
    toast.error("External Auth Service Down. Try later.");
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
          className="w-full max-w-lg relative z-10"
        >
          <div className="bg-[#1F2937] rounded-[3.5rem] p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden border border-[#374151]">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                <ShieldCheck size={14} />
                <span>Identification Node</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight text-white leading-tight">
                Create <span className="text-emerald-400 italic">Identity</span>
              </h1>
              <p className="text-[#9CA3AF] font-bold uppercase text-[10px] tracking-[0.4em]">Register your node via Google</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-12 py-10">
              <div className="scale-125 hover:scale-150 transition-transform duration-500 bg-white p-2 rounded-xl shadow-2xl">
                <GoogleLogin
                  onSuccess={onGoogleSuccess}
                  onError={onGoogleError}
                  theme="filled_blue"
                  shape="pill"
                  size="large"
                  text="signup_with"
                  width="100%"
                />
              </div>
              
              <div className="space-y-4 text-center">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] leading-relaxed">
                   Synchronize your global profile <br /> instantly using OAuth 2.0.
                </p>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-[#374151]">
              <div className="flex items-center justify-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/5 py-4 rounded-2xl border border-emerald-500/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                Privacy Protocol: Secure Transmission
              </div>
            </div>
          </div>
        </_motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
