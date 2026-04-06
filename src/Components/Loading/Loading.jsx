import { motion as _motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-b1 relative overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-[2000ms] pointer-events-none"></div>

      <_motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative w-32 h-32">
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/30 animate-ripple"></div>
          <div className="absolute inset-0 rounded-[2rem] border-2 border-primary/10 animate-ripple-slow"></div>
          
          {/* Main loader */}
          <div className="w-full h-full rounded-[2.5rem] border-t-2 border-l-2 border-primary animate-spin shadow-2xl shadow-primary/20 bg-white/5 backdrop-blur-sm border-white/5"></div>
          
          {/* Center glow */}
          <div className="absolute inset-0 m-auto w-6 h-6 bg-primary rounded-full shadow-[0_0_30px_rgba(45,212,191,0.8)]"></div>
        </div>

        <_motion.p 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mt-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 ml-2"
        >
          Synchronizing Intelligence Catalog
        </_motion.p>
      </_motion.div>
    </div>
  );
};

export default Loading;
