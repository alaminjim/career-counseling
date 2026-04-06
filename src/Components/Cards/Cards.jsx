import { Link } from "react-router-dom";
import { motion as _motion } from "framer-motion";
import { Clock, User, Tag, ArrowRight, Star } from "lucide-react";

const Cards = ({ singleCard }) => {
  const {
    service_name,
    image,
    category,
    pricing,
    duration,
    counselor,
    id,
    description,
    rating = 4.8 // Fallback rating if not in data
  } = singleCard;

  return (
    <_motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative glass-card rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-700"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={service_name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-b1/90 via-b1/20 to-transparent"></div>
        
        <div className="absolute top-5 left-5 flex gap-2">
          <span className="px-4 py-1.5 rounded-xl bg-primary/20 backdrop-blur-xl text-primary text-[10px] font-black uppercase tracking-widest border border-primary/30 shadow-lg">
            {category}
          </span>
        </div>
        
        <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end text-white">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} className="drop-shadow-glow" />
              ))}
              <span className="text-white/60 text-[10px] font-black ml-2 uppercase tracking-widest">{rating} PV</span>
            </div>
            <h3 className="text-2xl font-black tracking-tighter leading-tight drop-shadow-lg">{service_name}</h3>
          </div>
          <div className="text-3xl font-black text-primary drop-shadow-glow">{pricing}</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-5">
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-black uppercase tracking-[0.1em]">
          <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <User size={14} className="text-primary" />
            <span>{counselor}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <Clock size={14} className="text-primary" />
            <span>{duration}</span>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
          {description}
        </p>

        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <Link 
            to={`/services/${id}`} 
            className="text-primary font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 group/btn"
          >
            <span>Learn More</span>
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
          </Link>
          
          <Link 
            to={`/services/${id}`}
            className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-b1 transition-all duration-500 border border-primary/20"
          >
            <ArrowRight size={22} />
          </Link>
        </div>
      </div>
    </_motion.div>
  );
};

export default Cards;
