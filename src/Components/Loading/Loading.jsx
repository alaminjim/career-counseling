import { motion as _motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#0B1020] relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background ambient elements */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] animate-pulse delay-[2000ms] pointer-events-none"></div>

      <_motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative w-32 h-32">
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-indigo-500/20 animate-ripple"></div>
          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-indigo-500/10 animate-ripple-slow"></div>
          
          {/* Main loader */}
          <div className="w-full h-full rounded-[2.5rem] border-t-2 border-l-2 border-[#22D3EE] animate-spin shadow-2xl shadow-[#22D3EE]/10 bg-[#1F2937]/20 backdrop-blur-md border-white/5"></div>
          
          {/* Center node */}
          <div className="absolute inset-0 m-auto w-8 h-8 bg-[#22D3EE] rounded-full shadow-[0_0_30px_rgba(34,211,238,0.6)]"></div>
        </div>

        <_motion.p 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mt-16 text-[11px] font-black uppercase tracking-[0.6em] text-indigo-400 ml-3"
        >
          Synchronizing Hub Nodes
        </_motion.p>
      </_motion.div>
    </div>
  );
};

export default Loading;
