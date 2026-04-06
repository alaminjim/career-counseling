import { Link, useLoaderData } from "react-router-dom";
import Cards from "../Cards/Cards";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Layers } from "lucide-react";

const CareerCard = () => {
  const career = useLoaderData();

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Layers size={14} />
            <span>Premium Career Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Our Professional <span className="text-primary font-display">Services</span>
          </h2>
          <p className="text-neutral/60 text-lg leading-relaxed">
            From personalized counseling to expert resume building, we provide the tools and guidance you need to accelerate your professional growth.
          </p>
        </div>
        
        <Link 
          to="/services" 
          className="group flex items-center gap-3 font-bold text-primary hover:text-primary-focus transition-colors underline-offset-8 decoration-2 hover:underline"
        >
          View All Services 
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
            <ArrowRight size={20} />
          </div>
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {career.slice(0, 3).map((singleCard, index) => (
          <Cards key={singleCard.id} singleCard={singleCard} />
        ))}
      </div>

      {/* Trust Banner / Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 p-8 md:p-12 rounded-[2rem] bg-neutral text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              Not sure where to start? <Sparkles className="text-accent" />
            </h3>
            <p className="text-neutral-400">Get a free 15-minute consultation with our lead career pathfinder.</p>
          </div>
          <button className="btn-premium whitespace-nowrap">
            Book Free Consultation
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default CareerCard;
