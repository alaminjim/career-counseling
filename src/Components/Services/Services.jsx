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
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Page Header */}
        <section className="mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
            <Briefcase size={14} />
            <span>Complete Catalog</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-tight">
            Career <span className="text-indigo-600">Excellence</span> Hub
          </h1>
          <p className="text-gray-500 max-w-2xl text-xl font-medium leading-relaxed">
            Explore our comprehensive range of professional strategic counseling, elite asset building, and market-ready diagnostic programs.
          </p>

          <div className="flex flex-col lg:flex-row gap-4 pt-10 border-t border-gray-100">
            <div className="relative flex-grow group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, counselors, or keywords..." 
                className="input-premium pl-14 py-5 shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-indigo-600 font-bold text-xs uppercase tracking-widest"
                >
                  Clear
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-8 py-5 rounded-2xl shadow-sm flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest transition-all border ${
                isFilterOpen || selectedCategory !== "All Categories" || sortBy !== "default"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              <Filter size={18} /> 
              <span>Filters</span>
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
                <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Category Filter */}
                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-3">
                      <Layers size={14} className="text-indigo-600" /> Sector Selection
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                            selectedCategory === cat
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                              : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-3">
                      <SortAsc size={14} className="text-indigo-600" /> Organizational Logic
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "default", label: "Priority Selection" },
                        { id: "rating", label: "Performance Rating" },
                        { id: "price-low", label: "Investment: Low → High" },
                        { id: "price-high", label: "Investment: High → Low" },
                      ].map((sort) => (
                        <button
                          key={sort.id}
                          onClick={() => setSortBy(sort.id)}
                          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                            sortBy === sort.id
                              ? "bg-gray-900 text-white shadow-lg"
                              : "bg-gray-50 text-gray-500 hover:bg-gray-100"
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

          <div className="flex items-center justify-between text-sm font-bold text-gray-400 cursor-default">
            <p>Showing <span className="text-gray-900">{filteredAndSortedData.length}</span> services in database</p>
            {(selectedCategory !== "All Categories" || searchQuery || sortBy !== "default") && (
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setSortBy("default");
                }}
                className="text-indigo-600 hover:underline underline-offset-4"
              >
                Reset Selection
              </button>
            )}
          </div>
        </section>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedData.map((singleCard, index) => (
              <_motion.div
                key={singleCard.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
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
            className="py-32 text-center"
          >
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100">
              <Search className="text-gray-200" size={40} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">No services discovered</h3>
            <p className="text-gray-500 font-medium max-w-md mx-auto mb-10 leading-relaxed">
              We couldn't find any professional services matching your refined criteria. Try clearing your filters or searching for alternate sectors.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSortBy("default");
              }}
              className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Clear Global Filters
            </button>
          </_motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Services;
