import { useLoaderData, useParams, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import { 
  Star, Clock, User, CheckCircle2, MessageSquare, 
  Send, Calendar, ShieldCheck, ArrowLeft, Info, X, Mail
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

  if (!detailsCard) return <div className="p-32 text-center font-black text-2xl text-gray-900 bg-white min-h-screen flex items-center justify-center">Service nodes not found.</div>;

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
      toast.success("Impact log updated successfully!");
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      toast.success("Strategic Consultation Initialized! Expect contact within 4 hours.");
    }, 1500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSendingMessage(true);
    setTimeout(() => {
      setIsSendingMessage(false);
      setShowContactModal(false);
      toast.success("Priority Message Dispatched!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] selection:bg-indigo-100 selection:text-indigo-700">
      <NavBar />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        <Link to="/services" className="inline-flex items-center gap-3 text-gray-400 hover:text-indigo-600 transition-all mb-12 font-bold uppercase tracking-widest text-[10px] group">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Strategic Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Service Details */}
          <div className="lg:col-span-2 space-y-16">
            <_motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl shadow-indigo-100/20"
            >
              <div className="relative h-[440px] overflow-hidden">
                <img src={image} alt={service_name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20 shadow-sm">
                      <Star size={14} fill="currentColor" />
                      <span className="text-gray-900 text-[10px] font-black ml-1 uppercase tracking-widest">{rating} Merit Score</span>
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight">
                    {service_name}
                  </h1>
                </div>
              </div>

              <div className="p-12 md:p-16 space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-y border-gray-50">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Direct Lead</p>
                      <p className="font-black text-xl text-gray-900">{counselor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Program Depth</p>
                      <p className="font-black text-xl text-gray-900">{duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Guarantee</p>
                      <p className="font-black text-xl text-gray-900">Elite Level</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 flex items-center gap-4">
                      Strategic Overview
                    </h2>
                    <p className="text-gray-500 text-xl leading-relaxed font-medium">
                      {description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    {[
                      "Priority Strategic Roadmap",
                      "Sector-Specific Intelligence",
                      "Full Asset Optimization",
                      "Bespoke 1-on-1 Sessions",
                      "Actionable Competitive Insights",
                      "Exclusive Network Access"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all group">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="font-bold text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </_motion.div>

            {/* Impact Feed */}
            <div className="space-y-12">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 flex items-center gap-4">
                  Professional <span className="text-indigo-600">Impact Feed</span>
                </h2>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Verified Testimonials
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-100/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl"></div>
                  <div className="flex items-center gap-4 mb-6 px-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-sm">A</div>
                    <span className="text-sm font-bold text-gray-900">Log Your Breakthrough</span>
                  </div>
                  <textarea 
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Provide your experience with the diagnostic methodology..."
                    className="w-full h-32 p-6 rounded-2xl bg-gray-50 border border-gray-100 focus:border-indigo-400/50 resize-none mb-6 outline-none font-bold text-gray-900 placeholder:text-gray-300 transition-all text-sm shadow-inner"
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={handleAddReview}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 font-black rounded-2xl transition-all shadow-lg shadow-indigo-100 active:scale-95 text-sm uppercase tracking-widest"
                    >
                      Publish Impact
                    </button>
                  </div>
                </div>

                <div className="grid gap-8">
                  <AnimatePresence>
                    {reviews.map((rev, idx) => (
                      <_motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-10 rounded-[2.5rem] border border-gray-50 flex gap-8 hover:border-indigo-100 transition-all relative group shadow-sm"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center font-black text-2xl text-indigo-600 shadow-inner group-hover:scale-110 transition-transform">
                          {rev.user.charAt(0)}
                        </div>
                        <div className="space-y-4 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-black text-gray-900 text-xl tracking-tight">{rev.user}</p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">{rev.date}</p>
                            </div>
                            <div className="flex gap-1 text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-500 text-lg leading-relaxed font-semibold italic">"{rev.comment}"</p>
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
            <div className="sticky top-32 space-y-8">
              <_motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-indigo-600 text-white rounded-[3rem] p-10 space-y-10 overflow-hidden relative shadow-2xl shadow-indigo-100"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-[80px] pointer-events-none"></div>
                
                <div className="pb-10 border-b border-white/20 relative z-10">
                  <p className="text-indigo-100 font-bold uppercase text-[10px] tracking-[0.3em] mb-3 flex items-center gap-3">
                    <ShieldCheck size={16} className="text-emerald-400" /> Organizational Investment
                  </p>
                  <div className="text-6xl font-black text-white tracking-tighter">{pricing}</div>
                </div>

                <form onSubmit={handleBooking} className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-100 ml-1">Launch Initialization</label>
                    <div className="relative group">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-emerald-400 transition-colors" size={20} />
                      <input 
                        type="date" 
                        required 
                        className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/20 rounded-2xl focus:border-emerald-400 transition-all outline-none text-white font-bold" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-8">
                    <button 
                      type="submit" 
                      disabled={isBooking}
                      className="w-full bg-[#10B981] hover:bg-[#0fd695] text-white py-6 rounded-2xl flex items-center justify-center gap-4 text-xl font-black uppercase tracking-widest disabled:opacity-50 transition-all shadow-2xl active:scale-95"
                    >
                      {isBooking ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        <>Initialize Program <ArrowRight className="" size={24} /></>
                      )}
                    </button>
                    <div className="flex flex-col items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-indigo-100">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={14} className="text-emerald-400" /> Precision Encrypted Protocol
                      </div>
                      <p className="opacity-60 italic">Corporate Satisfaction Guarantee</p>
                    </div>
                  </div>
                </form>
              </_motion.div>

              <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-indigo-100/20 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
                <h4 className="font-black mb-4 text-2xl text-gray-900 tracking-tight">Need Briefing?</h4>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed font-bold">
                  Technical or strategic clarification? Connect with our intelligence hub.
                </p>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full py-5 rounded-2xl border-2 border-gray-100 font-bold uppercase tracking-widest text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all cursor-pointer shadow-sm"
                >
                  Request Dispatch
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Support Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/40 backdrop-blur-3xl">
            <_motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[3.5rem] p-12 md:p-16 max-w-2xl w-full shadow-[0_40px_100px_-20px_rgba(79,70,229,0.2)] relative border border-indigo-50 overflow-hidden"
            >
              {/* Decorative background shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-10 right-10 p-4 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-2xl transition-all cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="w-20 h-20 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center mb-10 shadow-2xl shadow-indigo-100">
                <Mail size={36} />
              </div>
              
              <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Strategic Inquiry</h3>
              <p className="text-gray-500 font-bold mb-10 text-xl leading-relaxed">
                Connect with our advisors regarding <strong className="text-indigo-600">{service_name}</strong>.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group col-span-2 md:col-span-1">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" size={20} />
                    <input type="text" required placeholder="Full Name" className="w-full pl-16 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-indigo-400 Transition-all outline-none text-gray-900 font-bold shadow-inner" />
                  </div>
                  <div className="relative group col-span-2 md:col-span-1">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600" size={20} />
                    <input type="email" required placeholder="Professional Mail" className="w-full pl-16 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:border-indigo-400 transition-all outline-none text-gray-900 font-bold shadow-inner" />
                  </div>
                </div>
                <div className="relative group">
                  <textarea 
                    required 
                    placeholder="Intelligence / Inquiry details..." 
                    className="w-full p-8 h-40 bg-gray-50 border border-gray-100 rounded-2xl focus:border-indigo-400 transition-all outline-none resize-none text-gray-900 font-bold shadow-inner" 
                  ></textarea>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-6 pt-6">
                  <button 
                    type="button" 
                    onClick={() => setShowContactModal(false)}
                    className="px-10 py-5 font-black uppercase tracking-[0.2em] text-xs text-gray-400 hover:text-indigo-600 transition-all order-2 sm:order-1"
                  >
                    Abort Dispatch
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSendingMessage}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-14 py-5 rounded-2xl order-1 sm:order-2 disabled:opacity-50 font-black shadow-xl shadow-indigo-100 transition-all active:scale-95 text-sm uppercase tracking-widest"
                  >
                    {isSendingMessage ? <span className="loading loading-spinner loading-md"></span> : "Execute Dispatch"}
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
