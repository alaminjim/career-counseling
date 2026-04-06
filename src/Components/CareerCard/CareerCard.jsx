import { Link, useLoaderData } from "react-router-dom";
import Cards from "../Cards/Cards";
import { motion as _motion } from "framer-motion";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

const CareerCard = () => {
  const career = useLoaderData();

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto selection:bg-indigo-100 selection:text-indigo-700">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20 shadow-sm">
            <Layers size={14} />
            <span>Core Knowledge Hub</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.9]">
            Elite <span className="text-[#22D3EE] italic underline underline-offset-[12px] decoration-indigo-500/30">Strategic</span> Assets
          </h2>
          <p className="text-[#9CA3AF] text-xl leading-relaxed font-bold max-w-2xl">
            Precision-engineered career diagnostics and strategic counseling designed to accelerate your position in the global job market.
          </p>
        </div>
        
        <Link 
          to="/services" 
          className="group flex items-center gap-6 font-black uppercase tracking-[0.3em] text-[10px] text-indigo-400 hover:text-white transition-all pb-2"
        >
          Access Intelligence catalog 
          <div className="w-14 h-14 rounded-[1.5rem] border border-[#374151] flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500 shadow-2xl bg-[#1F2937]">
            <ArrowRight size={24} className="group-hover:translate-x-1.5 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {career.slice(0, 3).map((singleCard, index) => (
          <Cards key={singleCard.id} singleCard={singleCard} />
        ))}
      </div>

      {/* Trust Banner / Bottom CTA */}
      <_motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-40 p-16 md:p-24 rounded-[4rem] bg-[#1F2937] border border-[#374151] text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="space-y-8 text-center lg:text-left max-w-2xl">
            <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
              Ready for Strategic <br /><span className="text-[#16A34A] italic">Navigation?</span>
            </h3>
            <p className="text-[#9CA3AF] text-xl font-bold opacity-90 leading-relaxed">Initialize a 20-minute baseline diagnostic session with our lead industry strategist.</p>
          </div>
          <button className="btn-cta text-xl px-16 py-7 shadow-2xl shadow-green-900/40 whitespace-nowrap">
            Authorize Diagnostic
          </button>
        </div>
      </_motion.div>
    </section>
  );
};

export default CareerCard;
