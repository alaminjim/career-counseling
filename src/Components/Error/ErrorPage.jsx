import { Link } from "react-router-dom";
import { motion as _motion } from "framer-motion";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-b1 flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-[2000ms] pointer-events-none"></div>

      <_motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center relative z-10 space-y-12"
      >
        <div className="relative inline-block">
          <_motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="drop-shadow-[0_0_50px_rgba(45,212,191,0.3)]"
          >
            <AlertTriangle className="text-primary mx-auto" size={140} strokeWidth={1} />
          </_motion.div>
          <h1 className="text-[12rem] font-black text-white/5 absolute inset-0 -z-10 select-none tracking-tighter -translate-y-4">404</h1>
        </div>

        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            Lost in <span className="text-primary italic">Transmission?</span>
          </h2>
          <p className="text-slate-500 font-bold max-w-lg mx-auto leading-relaxed text-lg italic">
            The strategic career node you are attempting to access has shifted or been decommissioned.
          </p>
        </div>

        <div className="pt-10 flex justify-center">
          <Link 
            to="/" 
            className="btn-premium px-12 py-5 rounded-2xl flex items-center justify-center gap-4 group w-fit text-xl font-black uppercase tracking-widest"
          >
            <Home size={24} /> 
            Return to Hub
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-2" />
          </Link>
        </div>
      </_motion.div>

      <footer className="absolute bottom-10 text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
        CareerPath Strategic Error Protocol • Node 404 • Active
      </footer>
    </div>
  );
};

export default ErrorPage;
