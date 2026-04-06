import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-neutral/5 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={service_name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/30">
            {category}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
          <div>
            <div className="flex items-center gap-1 text-accent mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
              ))}
              <span className="text-white text-xs font-bold ml-1">{rating}</span>
            </div>
            <h3 className="text-xl font-bold font-display leading-tight">{service_name}</h3>
          </div>
          <div className="text-2xl font-black text-white">{pricing}</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-neutral/60 font-medium">
          <div className="flex items-center gap-2">
            <User size={16} className="text-primary" />
            <span>{counselor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span>{duration}</span>
          </div>
        </div>

        <p className="text-neutral/70 text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="pt-4 border-t border-neutral/5 flex items-center justify-between">
          <Link 
            to={`/services/${id}`} 
            className="text-primary font-bold text-sm flex items-center gap-2 group/btn"
          >
            Full Details 
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
          
          <Link 
            to={`/services/${id}`}
            className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Cards;
