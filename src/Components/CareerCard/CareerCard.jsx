import { Link, useLoaderData } from "react-router-dom";
import Cards from "../Cards/Cards";
import { motion as _motion } from "framer-motion";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

const CareerCard = () => {
  const career = useLoaderData();

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto selection:bg-primary/20 selection:text-primary">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-lg shadow-primary/5">
            <Layers size={14} />
            <span>Executive Intelligence Tier</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Our Elite <span className="text-primary italic drop-shadow-glow">Success Nodes</span>
          </h2>
          <p className="text-slate-500 text-xl leading-relaxed font-bold italic">
            Precision counseling and strategic asset building designed to accelerate your position within the global professional hierarchy.
          </p>
        </div>
        
        <Link 
          to="/services" 
          className="group flex items-center gap-4 font-black uppercase tracking-[0.2em] text-xs text-primary hover:text-white transition-all border-b-2 border-primary/20 pb-2"
        >
          Access Full catalog 
          <div className="w-12 h-12 rounded-2xl border-2 border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-b1 group-hover:border-primary transition-all duration-500 shadow-inner bg-white/5">
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {career.slice(0, 3).map((singleCard, index) => (
          <Cards key={singleCard.id} singleCard={singleCard} />
        ))}
      </div>

      {/* Trust Banner / Bottom CTA */}
      <_motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-24 p-10 md:p-16 rounded-[3.5rem] bg-[#1e293b] text-white relative overflow-hidden border border-white/10 shadow-2xl shadow-black/40"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight flex items-center justify-center lg:justify-start gap-4">
              Strategic Navigation Required? <Sparkles className="text-primary drop-shadow-glow" size={32} />
            </h3>
            <p className="text-slate-400 text-lg font-bold italic">Initialize a priority 15-minute diagnostic session with our chief career strategist.</p>
          </div>
          <button className="btn-premium px-12 py-5 rounded-2xl text-xl font-black uppercase tracking-widest whitespace-nowrap shadow-2xl">
            Authorize Diagnostic
          </button>
        </div>
      </_motion.div>
    </section>
  );
};

export default CareerCard;
