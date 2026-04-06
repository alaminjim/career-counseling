import { useLoaderData, useParams, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { 
  Star, Clock, User, CheckCircle2, MessageSquare, 
  Send, Calendar, ShieldCheck, ArrowLeft, Info, X, Mail, ArrowRight, Zap
} from "lucide-react";
import toast from "react-hot-toast";

const CareerDetails = () => {
  const [reviews, setReviews] = useState([
    { user: "Jane Doe", comment: "This session completely changed my perspective on my career path!", rating: 5, date: "2 days ago" },
    { user: "John Smith", comment: "Very professional and detailed guidance. Highly recommend.", rating: 4, date: "1 week ago" }
  ]);
  const [newReview, setNewReview] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  
  const { id } = useParams();
  const data = useLoaderData() || [];
  const detailsCard = data.find((card) => card.id === parseInt(id));

  if (!detailsCard) return (
    <div className="p-32 text-center bg-[#0B1020] min-h-screen flex flex-col items-center justify-center space-y-8">
      <div className="w-24 h-24 rounded-[2rem] bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
        <X size={48} />
      </div>
      <h2 className="text-4xl font-black text-white uppercase tracking-widest">Service Node Not Found</h2>
      <Link to="/services" className="btn-cta px-12 py-5 text-sm uppercase tracking-widest">Initialize Search Again</Link>
    </div>
  );

  const {
    service_name,
    image,
    category,
    pricing,
    duration,
    counselor,
    description,
  } = detailsCard;
  
  const rating = detailsCard.rating || 4.8;

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([{ user: "Verified Professional", comment: newReview, rating: 5, date: "Just now" }, ...reviews]);
      setNewReview("");
      toast.success("Professional Impact Logged Successfully!");
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      toast.success("Strategic Consultation Initialized! Node Contact within 4 hours.");
    }, 1500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSendingMessage(true);
    setTimeout(() => {
      setIsSendingMessage(false);
      setShowContactModal(false);
      toast.success("Priority Mission Dispatch Successful!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <NavBar />
      
      <main className="pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow">
        <Link to="/services" className="inline-flex items-center gap-4 text-indigo-400 hover:text-white transition-all mb-16 font-black uppercase tracking-[0.4em] text-[10px] group">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Intelligence Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Service Details */}
          <div className="lg:col-span-2 space-y-20">
            <_motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1F2937]/50 rounded-[4rem] overflow-hidden border border-[#374151] shadow-2xl backdrop-blur-3xl"
            >
              <div className="relative h-[500px] overflow-hidden group">
                <img src={image} alt={service_name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-[#1F2937]/40 to-transparent"></div>
                <div className="absolute bottom-16 left-16 right-16">
                  <div className="flex items-center gap-5 mb-8">
                    <span className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-900/50">
                      {category}
                    </span>
                    <div className="flex items-center gap-2 text-[#22D3EE] bg-[#0B1020]/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                      <Star size={16} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{rating} PV INDEX</span>
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-[5.5rem] font-black text-white tracking-tighter leading-[0.95] uppercase">
                    {service_name}
                  </h1>
                </div>
              </div>

              <div className="p-16 md:p-24 space-y-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-y border-[#374151]">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-[#0B1020] flex items-center justify-center text-indigo-400 border border-[#374151] shadow-inner">
                      <User size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-2">Technical Lead</p>
                      <p className="font-black text-xl text-white">{counselor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-[#0B1020] flex items-center justify-center text-indigo-400 border border-[#374151] shadow-inner">
                      <Clock size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-2">Program Cycle</p>
                      <p className="font-black text-xl text-white">{duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.25rem] bg-[#0B1020] flex items-center justify-center text-emerald-400 border border-[#374151] shadow-inner">
                      <ShieldCheck size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-2">Protocol Status</p>
                      <p className="font-black text-xl text-white">Advanced Tier</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-black tracking-tight text-white uppercase flex items-center gap-5">
                      <Zap size={32} className="text-[#22D3EE]" /> 
                      Strategic Briefing
                    </h2>
                    <p className="text-[#9CA3AF] text-xl leading-relaxed font-bold">
                      {description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                    {[
                      "Priority Strategic Roadmap",
                      "Sector-Specific Intelligence",
                      "Full Asset Optimization",
                      "Bespoke 1-on-1 Sessions",
                      "Actionable Competitive Insights",
                      "Exclusive Network Access"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-6 p-8 bg-[#111827] rounded-[2rem] border border-[#374151] hover:border-indigo-500/40 transition-all group">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <CheckCircle2 size={20} />
                        </div>
                        <span className="font-black text-white text-[11px] uppercase tracking-widest leading-loose">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </_motion.div>

            {/* Impact Feed */}
            <div className="space-y-16">
              <div className="flex items-center justify-between px-6">
                <h2 className="text-4xl font-black tracking-tight text-white uppercase flex items-center gap-6">
                  Intelligence <span className="text-[#22D3EE] italic underline decoration-indigo-500/20">Impact Feed</span>
                </h2>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">
                  Verified Logs
                </div>
              </div>
              
              <div className="space-y-10">
                <div className="bg-[#1F2937] p-12 rounded-[3.5rem] border border-[#374151] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px]"></div>
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black uppercase text-xs">LOG</div>
                    <span className="text-xs font-black text-white uppercase tracking-widest">Contribute Breakthrough Experience</span>
                  </div>
                  <textarea 
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Provide your experience with the diagnostic methodology..."
                    className="w-full h-40 p-8 rounded-[2rem] bg-[#111827] border border-[#374151] focus:border-indigo-400/50 resize-none mb-10 outline-none font-bold text-white placeholder:text-gray-600 transition-all text-sm shadow-inner"
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={handleAddReview}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 font-black rounded-2xl transition-all shadow-xl shadow-indigo-900/40 active:scale-95 text-xs uppercase tracking-[0.2em]"
                    >
                      Publish Intelligence
                    </button>
                  </div>
                </div>

                <div className="grid gap-10">
                  <AnimatePresence>
                    {reviews.map((rev, idx) => (
                      <_motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#111827] p-12 rounded-[3.5rem] border border-[#374151] flex flex-col md:flex-row gap-10 hover:border-indigo-500/30 transition-all relative group"
                      >
                        <div className="w-20 h-20 rounded-[1.5rem] bg-[#1F2937] border border-[#374151] flex-shrink-0 flex items-center justify-center font-black text-3xl text-indigo-400 shadow-inner group-hover:scale-110 transition-transform">
                          {rev.user.charAt(0)}
                        </div>
                        <div className="space-y-6 flex-grow">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                              <p className="font-black text-white text-2xl tracking-tight uppercase">{rev.user}</p>
                              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-2">{rev.date}</p>
                            </div>
                            <div className="flex gap-1.5 text-[#22D3EE] bg-[#0B1020] px-4 py-2 rounded-xl border border-[#374151]">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                          <p className="text-[#9CA3AF] text-xl leading-relaxed font-bold italic opacity-90 leading-normal">"{rev.comment}"</p>
                        </div>
                      </_motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Hub */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-10">
              <_motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#4F46E5] text-white rounded-[4rem] p-12 space-y-12 overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(79,70,229,0.5)]"
              >
                <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="pb-12 border-b border-white/20 relative z-10">
                  <p className="text-indigo-100 font-bold uppercase text-[10px] tracking-[0.5em] mb-5 flex items-center gap-4">
                    <ShieldCheck size={20} className="text-[#22D3EE]" /> System Investment
                  </p>
                  <div className="text-7xl font-black text-white tracking-tighter">{pricing}</div>
                </div>

                <form onSubmit={handleBooking} className="space-y-10 relative z-10">
                  <div className="space-y-5">
                    <label className="text-[10px] font-black uppercase tracking-[0.6em] text-indigo-100 ml-4">Deployment Window</label>
                    <div className="relative group">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-200 group-focus-within:text-white transition-colors" size={24} />
                      <input 
                        type="date" 
                        required 
                        className="w-full pl-16 pr-8 py-6 bg-white/10 border border-white/20 rounded-[1.75rem] focus:border-white transition-all outline-none text-white font-black uppercase text-[11px] tracking-widest" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-10">
                    <button 
                      type="submit" 
                      disabled={isBooking}
                      className="btn-cta w-full py-7 text-xl shadow-2xl whitespace-nowrap"
                    >
                      {isBooking ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        <>Initialize Mission <ArrowRight className="ml-2" size={28} /></>
                      )}
                    </button>
                    <div className="flex flex-col items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-indigo-100">
                      <div className="flex items-center gap-4">
                        <CheckCircle2 size={16} className="text-[#16A34A]" /> Quantum Security Encrypted
                      </div>
                      <p className="opacity-60 italic text-[9px]">Satisfaction Integrity Guaranteed</p>
                    </div>
                  </div>
                </form>
              </_motion.div>

              <div className="bg-[#1F2937] p-16 rounded-[4rem] border border-[#374151] shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform"></div>
                <h4 className="font-black mb-6 text-3xl text-white tracking-tight uppercase">Clarification Hub</h4>
                <p className="text-[#9CA3AF] text-lg mb-12 leading-relaxed font-bold italic opacity-90">
                  Technical or strategic mismatch? Contact our system observers for priority briefing.
                </p>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full py-6 rounded-2xl border border-indigo-500/30 font-black uppercase tracking-[0.3em] text-[10px] text-indigo-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all cursor-pointer shadow-xl"
                >
                  Request Dispatch Briefing
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Support Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0B1020]/80 backdrop-blur-2xl">
            <_motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-[#1F2937] rounded-[4.5rem] p-16 md:p-24 max-w-2xl w-full shadow-[0_50px_150px_-30px_rgba(0,0,0,0.8)] relative border border-[#374151] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-12 right-12 p-5 text-gray-500 hover:text-[#22D3EE] hover:bg-[#111827] rounded-3xl transition-all cursor-pointer"
              >
                <X size={28} />
              </button>

              <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mb-12 shadow-2xl shadow-indigo-900/50">
                <Mail size={48} />
              </div>
              
              <h3 className="text-5xl font-black text-white mb-6 uppercase tracking-tight">Mission Briefing</h3>
              <p className="text-[#9CA3AF] font-bold mb-16 text-xl leading-relaxed">
                Connect with advisors regarding <br /><strong className="text-[#22D3EE] italic underline decoration-indigo-500/30">{service_name}</strong>.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-10 relative z-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative group col-span-2 md:col-span-1">
                    <User className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#22D3EE]" size={24} />
                    <input type="text" required placeholder="Identity Name" className="w-full pl-20 pr-8 py-6 bg-[#111827] border border-[#374151] rounded-[2rem] focus:border-[#22D3EE] transition-all outline-none text-white font-black uppercase text-[11px] tracking-widest shadow-inner" />
                  </div>
                  <div className="relative group col-span-2 md:col-span-1">
                    <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#22D3EE]" size={24} />
                    <input type="email" required placeholder="Network Mail" className="w-full pl-20 pr-8 py-6 bg-[#111827] border border-[#374151] rounded-[2rem] focus:border-[#22D3EE] transition-all outline-none text-white font-black uppercase text-[11px] tracking-widest shadow-inner" />
                  </div>
                </div>
                <div className="relative group">
                  <textarea 
                    required 
                    placeholder="Intelligence Inquiry Log..." 
                    className="w-full p-10 h-48 bg-[#111827] border border-[#374151] rounded-[2.5rem] focus:border-[#22D3EE] transition-all outline-none resize-none text-white font-bold opacity-90 shadow-inner" 
                  ></textarea>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-10 pt-10">
                  <button 
                    type="button" 
                    onClick={() => setShowContactModal(false)}
                    className="px-12 py-6 font-black uppercase tracking-[0.5em] text-[10px] text-gray-500 hover:text-white transition-all order-2 sm:order-1"
                  >
                    Abort Request
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSendingMessage}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-20 py-6 rounded-[2rem] order-1 sm:order-2 disabled:opacity-50 font-black shadow-2xl shadow-indigo-900/50 transition-all active:scale-95 text-xs uppercase tracking-[0.3em]"
                  >
                    {isSendingMessage ? <span className="loading loading-spinner loading-md"></span> : "Confirm Dispatch"}
                  </button>
                </div>
              </form>
            </_motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CareerDetails;
