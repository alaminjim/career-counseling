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
          className="fixed bottom-10 right-10 z-50 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 cursor-pointer transition-all duration-300 bg-indigo-600 hover:bg-indigo-700"
          aria-label="Scroll to top"
        >
          <ArrowUp size={28} strokeWidth={3} />
        </_motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
