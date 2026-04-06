import { motion as _motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 relative overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] animate-pulse delay-700"></div>

      <_motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative w-24 h-24">
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary/10 animate-ping delay-300"></div>
          
          {/* Main spinner */}
          <div className="w-full h-full rounded-full border-t-4 border-l-4 border-primary animate-spin shadow-xl shadow-primary/20"></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 m-auto w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/40"></div>
        </div>

        <_motion.p 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-neutral/40 ml-1.5"
        >
          Synchronizing Career Path
        </_motion.p>
      </_motion.div>
    </div>
  );
};

export default Loading;
