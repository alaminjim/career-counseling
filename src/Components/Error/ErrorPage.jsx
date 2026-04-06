import { Link } from "react-router-dom";
import { motion as _motion } from "framer-motion";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8 relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-700">
      {/* Background ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-[140px] animate-pulse delay-[2000ms] pointer-events-none"></div>

      <_motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="text-center relative z-10 space-y-10"
      >
        <div className="relative inline-block mb-8">
          <_motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -2, 2, 0]
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="drop-shadow-2xl shadow-indigo-100"
          >
            <AlertTriangle className="text-indigo-600 mx-auto" size={120} strokeWidth={1} />
          </_motion.div>
          <span className="text-[14rem] font-black text-indigo-50/50 absolute inset-0 -z-10 select-none tracking-tighter -translate-y-12">404</span>
        </div>

        <div className="space-y-6">
          <h2 className="text-6xl md:text-8xl font-black text-gray-200 tracking-tighter uppercase leading-none">
            Lost in <br />
            <span className="text-indigo-600 italic">Transmission?</span>
          </h2>
          <p className="text-gray-500 font-bold max-w-lg mx-auto leading-relaxed text-lg italic">
            The strategic career node you are attempting to access has shifted or been decommissioned.
          </p>
        </div>

        <div className="pt-8 flex justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-4 px-12 py-5 rounded-3xl bg-white border-2 border-gray-100 shadow-xl shadow-indigo-100/50 hover:border-indigo-600 transition-all duration-300 group text-xl font-black uppercase tracking-widest text-gray-900"
          >
            <Home size={22} className="text-indigo-600" /> 
            <span>Return to Hub</span>
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-2 text-gray-400" />
          </Link>
        </div>
      </_motion.div>

      <footer className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.6em] text-gray-400 opacity-60">
        CareerPath Strategic Error Protocol • Node 404 • Active
      </footer>
    </div>
  );
};

export default ErrorPage;
