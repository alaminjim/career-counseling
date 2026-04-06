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
    rating = 4.8
  } = singleCard;

  return (
    <_motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group premium-card overflow-hidden h-full flex flex-col hover:border-indigo-500/50"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={service_name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 rounded-xl bg-[#0B1020]/90 backdrop-blur-md text-[#22D3EE] text-[10px] font-black uppercase tracking-widest border border-[#374151] shadow-2xl">
            {category}
          </span>
        </div>
        
        <div className="absolute bottom-6 right-6">
          <div className="bg-[#1F2937]/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-[#374151] shadow-2xl">
            <span className="text-xl font-black text-white tracking-tight">{pricing}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10 flex flex-col flex-grow space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} className="drop-shadow-sm" />
            ))}
            <span className="text-gray-500 text-[10px] font-black ml-2 uppercase tracking-widest">{rating} PV Index</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors leading-tight">
            {service_name}
          </h3>
        </div>

        <p className="text-[#9CA3AF] text-sm leading-relaxed line-clamp-3 font-bold">
          {description}
        </p>

        <div className="flex items-center gap-8 text-[10px] text-gray-500 font-black uppercase tracking-widest pt-4">
          <div className="flex items-center gap-3">
            <User size={16} className="text-indigo-500" />
            <span className="group-hover:text-gray-300 transition-colors">{counselor}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-indigo-500" />
            <span className="group-hover:text-gray-300 transition-colors">{duration}</span>
          </div>
        </div>

        <div className="pt-8 mt-auto border-t border-[#374151] flex items-center justify-between">
          <Link 
            to={`/services/${id}`} 
            className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-4 group/link"
          >
            <span>Learn More</span>
            <ArrowRight size={18} className="text-indigo-500 transition-transform group-hover/link:translate-x-2" />
          </Link>
          
          <Link 
            to={`/services/${id}`}
            className="w-12 h-12 rounded-2xl bg-[#111827] flex items-center justify-center text-white hover:bg-indigo-600 transition-all duration-500 border border-[#374151] shadow-xl"
          >
            <ArrowRight size={22} className="group-hover:scale-110 transition-transform" />
          </Link>
        </div>
      </div>
    </_motion.div>
  );
};

export default Cards;
