import { useLoaderData } from "react-router-dom";
import { useState, useMemo } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";
import { motion, AnimatePresence } from "framer-motion";
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
      // Assuming pricing is string like "$150" or something, trying to parse numeric value
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8 w-full">
        {/* Page Header */}
        <section className="mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Briefcase size={14} />
            <span>Full Catalog</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight font-display text-neutral uppercase">
            Career <span className="text-primary italic">Excellence</span> Services
          </h1>
          <p className="text-neutral/50 max-w-2xl text-lg font-medium">
            Explore our comprehensive range of professional counseling, skill development, and strategic guidance programs designed for modern professionals.
          </p>

          <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-neutral/5">
            <div className="relative flex-grow max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/40" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, counselors, or keywords..." 
                className="w-full pl-12 pr-4 py-4 bg-white border border-neutral/10 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-neutral placeholder:text-neutral/40"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral/40 hover:text-neutral transition-colors text-sm font-bold"
                >
                  Clear
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-6 py-4 bg-white border rounded-2xl shadow-sm flex items-center justify-center gap-2 font-bold transition-colors md:w-auto ${
                isFilterOpen || selectedCategory !== "All Categories" || sortBy !== "default"
                  ? "border-primary text-primary"
                  : "border-neutral/10 text-neutral/60 hover:text-primary hover:border-primary/30"
              }`}
            >
              <Filter size={18} /> Filters
              <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Expandable Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-white rounded-2xl border border-neutral/10 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral/40 flex items-center gap-2">
                      <Layers size={14} /> Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            selectedCategory === cat
                              ? "bg-primary text-white shadow-md shadow-primary/20"
                              : "bg-slate-50 text-neutral/60 hover:bg-neutral/5"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral/40 flex items-center gap-2">
                      <SortAsc size={14} /> Sort By
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "default", label: "Recommended" },
                        { id: "rating", label: "Highest Rated" },
                        { id: "price-low", label: "Price: Low to High" },
                        { id: "price-high", label: "Price: High to Low" },
                      ].map((sort) => (
                        <button
                          key={sort.id}
                          onClick={() => setSortBy(sort.id)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                            sortBy === sort.id
                              ? "bg-slate-800 text-white shadow-md"
                              : "bg-slate-50 text-neutral/60 hover:bg-neutral/5"
                          }`}
                        >
                          {sort.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between text-sm font-bold text-neutral/50">
            <p>Showing <span className="text-neutral">{filteredAndSortedData.length}</span> services</p>
            {(selectedCategory !== "All Categories" || searchQuery || sortBy !== "default") && (
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setSortBy("default");
                }}
                className="text-primary hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </section>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedData.map((singleCard, index) => (
              <motion.div
                key={singleCard.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Cards singleCard={singleCard} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State / Bottom CTA */}
        {filteredAndSortedData.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center space-y-6"
          >
            <div className="w-24 h-24 bg-neutral/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-neutral/20" size={40} />
            </div>
            <h3 className="text-2xl font-bold font-display">No services found</h3>
            <p className="text-neutral/50 font-medium max-w-md mx-auto">
              We couldn't find any services matching your current filters. Try adjusting your search terms or clearing categories.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
                setSortBy("default");
              }}
              className="mt-6 px-8 py-3 bg-neutral text-white rounded-xl font-bold hover:bg-neutral-focus transition-colors inline-block"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Services;
