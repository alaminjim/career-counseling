import { Link } from "react-router-dom";
import { motion as _motion } from "framer-motion";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col items-center justify-center p-8 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[160px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[160px] animate-pulse delay-[2000ms] pointer-events-none"></div>

      <_motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="text-center relative z-10 space-y-12"
      >
        <div className="relative inline-block mb-12">
          <_motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -2, 2, 0]
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="drop-shadow-[0_0_50px_rgba(79,70,229,0.3)]"
          >
            <AlertTriangle className="text-[#22D3EE] mx-auto" size={140} strokeWidth={1} />
          </_motion.div>
          <span className="text-[16rem] font-black text-indigo-500/10 absolute inset-0 -z-10 select-none tracking-tighter -translate-y-16">404</span>
        </div>

        <div className="space-y-8">
          <h2 className="text-6xl md:text-[6rem] font-black text-white tracking-[0.05em] uppercase leading-none">
            Node <br />
            <span className="text-indigo-400 italic">Failure</span>
          </h2>
          <p className="text-[#9CA3AF] font-bold max-w-lg mx-auto leading-relaxed text-xl italic uppercase tracking-widest px-4">
            The strategic career node you are attempting to access has shifted or been decommissioned.
          </p>
        </div>

        <div className="pt-12 flex justify-center">
          <Link 
            to="/" 
            className="btn-cta px-16 py-6 text-lg flex items-center gap-4 bg-[#1F2937] hover:bg-[#111827] border border-[#374151] rounded-[2rem] shadow-2xl"
          >
            <Home size={22} className="text-[#22D3EE]" /> 
            <span>Return to Core Hub</span>
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-3 text-indigo-500" />
          </Link>
        </div>
      </_motion.div>

      <footer className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.8em] text-gray-600 opacity-80">
        CareerPath Strategic Error Protocol • Node 404 • Active
      </footer>
    </div>
  );
};

export default ErrorPage;
