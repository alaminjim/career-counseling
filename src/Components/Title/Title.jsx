import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { Megaphone, Zap } from "lucide-react";

const Title = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/career")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
      <div className="relative group overflow-hidden bg-white/40 backdrop-blur-md rounded-2xl border border-neutral/5 shadow-sm hover:shadow-md transition-all flex items-center h-14 md:h-16">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
        
        <div className="flex-shrink-0 bg-primary text-white h-full px-4 md:px-8 flex items-center gap-3 font-black text-xs md:text-sm uppercase tracking-widest relative z-10 skew-x-[-15deg] -ml-4">
          <div className="skew-x-[15deg] flex items-center gap-2">
            <Megaphone size={16} fill="currentColor" />
            <span className="hidden md:inline">Bulletin</span>
            <span className="md:hidden">Latest</span>
          </div>
        </div>

        <Marquee pauseOnHover={true} speed={60} className="font-bold text-neutral/60 overflow-hidden">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 mr-12 hover:text-primary transition-colors">
                <Zap size={14} className="text-accent" />
                <Link to={`/services/${item.id}`}>{item.service_name}</Link>
              </div>
            ))
          ) : (
            <span className="ml-10 italic">Initializing career paths...</span>
          )}
        </Marquee>
      </div>
    </div>
  );
};

export default Title;
