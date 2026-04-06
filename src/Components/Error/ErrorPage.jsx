import { Link } from "react-router-dom";
import { motion as _motion } from "framer-motion";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Background ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      <_motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 space-y-8"
      >
        <div className="relative inline-block">
          <_motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <AlertTriangle className="text-primary mx-auto" size={120} strokeWidth={1} />
          </_motion.div>
          <h1 className="text-9xl font-black text-neutral/5 absolute inset-0 -z-10 select-none">404</h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-neutral font-display uppercase tracking-tight">
            Lost in <span className="text-primary italic">Transition?</span>
          </h2>
          <p className="text-neutral/40 font-bold max-w-md mx-auto leading-relaxed">
            The career path you're looking for seems to have shifted. Let's get you back to familiar territory.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            to="/" 
            className="btn-premium px-10 py-4 rounded-2xl flex items-center justify-center gap-3 group mx-auto w-fit"
          >
            <Home size={20} /> 
            Back to Safety
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </_motion.div>

      <footer className="absolute bottom-8 text-[10px] font-black uppercase tracking-[0.4em] text-neutral/20">
        CareerPath Error Analytics Protocol 1.0
      </footer>
    </div>
  );
};

export default ErrorPage;
