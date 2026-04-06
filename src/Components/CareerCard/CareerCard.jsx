import { Link, useLoaderData } from "react-router-dom";
import Cards from "../Cards/Cards";
import { motion as _motion } from "framer-motion";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

const CareerCard = () => {
  const career = useLoaderData();

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto selection:bg-indigo-100 selection:text-indigo-700">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] border border-indigo-100 shadow-sm">
            <Layers size={14} />
            <span>Premium Service Nodes</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-tight">
            Our Elite <span className="text-indigo-600 italic">Success Assets</span>
          </h2>
          <p className="text-gray-500 text-xl leading-relaxed font-semibold">
            Precision-engineered career diagnostics and strategic counseling designed to accelerate your position in the global job market.
          </p>
        </div>
        
        <Link 
          to="/services" 
          className="group flex items-center gap-4 font-black uppercase tracking-[0.2em] text-xs text-indigo-600 hover:text-indigo-800 transition-all border-b-2 border-indigo-100 pb-2"
        >
          Access Full catalog 
          <div className="w-12 h-12 rounded-2xl border-2 border-gray-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500 shadow-sm bg-white">
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
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-32 p-10 md:p-20 rounded-[4rem] bg-indigo-600 text-white relative overflow-hidden shadow-2xl shadow-indigo-100"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left max-w-2xl">
            <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Ready for Strategic <br />Career Navigation?
            </h3>
            <p className="text-indigo-100 text-lg font-medium opacity-90">Initialize a 20-minute baseline diagnostic session with our lead industry strategist.</p>
          </div>
          <button className="btn-cta bg-[#10B981] hover:bg-[#059669] text-white px-12 py-6 rounded-[2.5rem] text-xl font-black shadow-2xl transition-all active:scale-95 whitespace-nowrap">
            Authorize Diagnostic
          </button>
        </div>
      </_motion.div>
    </section>
  );
};

export default CareerCard;
