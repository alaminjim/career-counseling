import { useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Layers, Briefcase, ChevronDown, SortAsc } from "lucide-react";

const Services = () => {
  const cardsService = useLoaderData() || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique categories
  const categories = ["All Categories", ...new Set(cardsService.map(item => item.category))];

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = cardsService;

    // 1. Category Filter
    if (selectedCategory !== "All Categories") {
      result = result.filter(item => item.category === selectedCategory);
    }

    // 2. Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.service_name?.toLowerCase().includes(query) ||
        item.counselor?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query)
      );
    }

    // 3. Sorting
    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => {
        const priceA = parseFloat(a.pricing?.replace(/[^0-9.]/g, '') || 0);
        const priceB = parseFloat(b.pricing?.replace(/[^0-9.]/g, '') || 0);
        return priceA - priceB;
      });
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => {
        const priceA = parseFloat(a.pricing?.replace(/[^0-9.]/g, '') || 0);
        const priceB = parseFloat(b.pricing?.replace(/[^0-9.]/g, '') || 0);
        return priceB - priceA;
      });
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [cardsService, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Page Header */}
        <section className="mb-20 space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
            <Briefcase size={14} />
            <span>Complete Catalog</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.95]">
            Career <span className="text-[#22D3EE]">Excellence</span> Hub
          </h1>
          <p className="text-[#9CA3AF] max-w-2xl text-xl font-bold leading-relaxed">
            Explore our comprehensive range of professional strategic counseling, elite asset building, and market-ready diagnostic programs.
          </p>

          <div className="flex flex-col lg:flex-row gap-6 pt-12 border-t border-[#374151]">
            <div className="relative flex-grow group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, counselors, or keywords..." 
                className="input-premium pl-16 py-6 uppercase tracking-[0.1em] text-[10px]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-[#22D3EE] font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-10 py-6 rounded-2xl flex items-center justify-center gap-4 font-black text-[10px] uppercase tracking-[0.2em] transition-all border ${
                isFilterOpen || selectedCategory !== "All Categories" || sortBy !== "default"
                  ? "border-[#4F46E5] bg-[#4F46E5]/10 text-white shadow-2xl shadow-indigo-900/20"
                  : "border-[#374151] bg-[#111827] text-gray-500 hover:border-gray-600 hover:text-white shadow-inner"
              }`}
            >
              <Filter size={18} /> 
              <span>Global Filters</span>
              <ChevronDown size={16} className={`transition-transform duration-500 ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Expandable Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <_motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-12 bg-[#1F2937] rounded-[3rem] border border-[#374151] shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-20">
                  {/* Category Filter */}
                  <div className="space-y-8">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 flex items-center gap-4">
                      <Layers size={14} className="text-indigo-400" /> Sector Selection
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            selectedCategory === cat
                              ? "bg-[#4F46E5] text-white shadow-xl shadow-indigo-900/40"
                              : "bg-[#111827] text-gray-500 border border-[#374151] hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-8">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 flex items-center gap-4">
                      <SortAsc size={14} className="text-indigo-400" /> Organizational Logic
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: "default", label: "Priority Selection" },
                        { id: "rating", label: "Performance Rating" },
                        { id: "price-low", label: "Investment: Low → High" },
                        { id: "price-high", label: "Investment: High → Low" },
                      ].map((sort) => (
                        <button
                          key={sort.id}
                          onClick={() => setSortBy(sort.id)}
                          className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            sortBy === sort.id
                              ? "bg-[#16A34A] text-white shadow-xl shadow-green-900/40"
                              : "bg-[#111827] text-gray-500 border border-[#374151] hover:text-white"
                          }`}
                        >
                          {sort.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </_motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            <p>Database synchronization: <span className="text-indigo-400">{filteredAndSortedData.length}</span> Active nodes</p>
            {(selectedCategory !== "All Categories" || searchQuery || sortBy !== "default") && (
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setSortBy("default");
                }}
                className="text-[#22D3EE] hover:text-white transition-colors"
              >
                Reset Filter Logic
              </button>
            )}
          </div>
        </section>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedData.map((singleCard) => (
              <_motion.div
                key={singleCard.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Cards singleCard={singleCard} />
              </_motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredAndSortedData.length === 0 && (
          <_motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-48 text-center"
          >
            <div className="w-32 h-32 bg-[#111827] border border-[#374151] rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
              <Search className="text-gray-700" size={48} />
            </div>
            <h3 className="text-4xl font-black text-white mb-6">No nodes discovered</h3>
            <p className="text-[#9CA3AF] font-bold max-w-md mx-auto mb-12 text-lg leading-relaxed">
              We couldn't find any professional services matching your refined criteria. Try clearing your filters or searching for alternate sectors.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSortBy("default");
              }}
              className="btn-primary"
            >
              Flush Filter Buffer
            </button>
          </_motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Services;
