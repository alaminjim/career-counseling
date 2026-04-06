import { useState, useEffect } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <_motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-12 right-12 z-50 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-400 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-500 bg-[#1F2937]/80 backdrop-blur-xl border border-[#374151] hover:border-indigo-500/50 hover:text-white"
          aria-label="Scroll to top"
        >
          <ArrowUp size={28} strokeWidth={3} className="drop-shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
        </_motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
