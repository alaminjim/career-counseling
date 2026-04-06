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
      className="group premium-card overflow-hidden h-full flex flex-col hover:border-indigo-200"
    >
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={image} 
          alt={service_name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
            {category}
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-xl">
            <span className="text-xl font-black text-indigo-600 tracking-tight">{pricing}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow space-y-5 bg-white">
        <div className="space-y-3">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
            ))}
            <span className="text-gray-400 text-[10px] font-black ml-1 uppercase tracking-widest">{rating} PV Index</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">{service_name}</h3>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium">
          {description}
        </p>

        <div className="flex items-center gap-6 text-[10px] text-gray-400 font-black uppercase tracking-widest pt-2">
          <div className="flex items-center gap-2">
            <User size={14} className="text-indigo-400" />
            <span>{counselor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-indigo-400" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-between">
          <Link 
            to={`/services/${id}`} 
            className="text-indigo-600 font-bold text-sm flex items-center gap-2 group/link"
          >
            <span>Learn More</span>
            <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
          
          <Link 
            to={`/services/${id}`}
            className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-500 border border-indigo-100"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </_motion.div>
  );
};

export default Cards;
