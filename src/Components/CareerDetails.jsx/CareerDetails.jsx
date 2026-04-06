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
    { user: "Jane Doe", comment: "This session completely changed my perspective on my career path!", rating: 5 },
    { user: "John Smith", comment: "Very professional and detailed guidance. Highly recommend.", rating: 4 }
  ]);
  const [newReview, setNewReview] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  
  const { id } = useParams();
  const data = useLoaderData() || [];
  const detailsCard = data.find((card) => card.id === parseInt(id));

  if (!detailsCard) return <div className="p-20 text-center font-bold text-xl">Service not found.</div>;

  const {
    service_name,
    image,
    category,
    pricing,
    duration,
    counselor,
    description,
  } = detailsCard;
  
  // Use rating from API if available, otherwise default to 4.8
  const rating = detailsCard.rating || 4.8;

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([{ user: "You", comment: newReview, rating: 5 }, ...reviews]);
      setNewReview("");
      toast.success("Review added successfully!");
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      toast.success("Consultation Request Sent! We'll contact you soon.");
    }, 1500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSendingMessage(true);
    setTimeout(() => {
      setIsSendingMessage(false);
      setShowContactModal(false);
      toast.success("Message sent! Our support team will reply within 24 hours.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-b1 selection:bg-primary/20 selection:text-primary">
      <NavBar />
      
      <main className="pt-36 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        <Link to="/services" className="inline-flex items-center gap-3 text-slate-500 hover:text-primary transition-all mb-10 font-black uppercase tracking-widest text-xs group">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Intelligence Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Service Details */}
          <div className="lg:col-span-2 space-y-16">
            <_motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl"
            >
              <div className="relative h-[500px]">
                <img src={image} alt={service_name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-b1 via-b1/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-5 py-1.5 rounded-xl bg-primary text-b1 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/30">
                      {category}
                    </span>
                    <div className="lex gap-1 text-primary drop-shadow-glow">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} className="inline" />
                      ))}
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
                    {service_name}
                  </h1>
                </div>
              </div>

              <div className="p-10 md:p-16 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10 border-y border-white/5">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary shadow-inner">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Chief Counselor</p>
                      <p className="font-bold text-xl text-white">{counselor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary shadow-inner">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Session Depth</p>
                      <p className="font-bold text-xl text-white">{duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary shadow-inner">
                      <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Success Merit</p>
                      <p className="font-bold text-xl text-white">{rating} / 5.0</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-3xl font-black tracking-tight text-white flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                    Strategic Overview
                  </h2>
                  <p className="text-slate-400 text-xl leading-relaxed font-medium">
                    {description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
                    {[
                      "Personalized Roadmap",
                      "Industry Insider Tips",
                      "Resume Review Included",
                      "1-on-1 Dedicated Support",
                      "Actionable Career Milestones",
                      "Exclusive Resource Access"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-[1.5rem] border border-white/5 hover:border-primary/30 transition-all group">
                        <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                        <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </_motion.div>

            {/* Review Section */}
            <div className="space-y-12">
              <h2 className="text-3xl font-black tracking-tighter text-white flex items-center gap-4 px-2">
                <MessageSquare size={28} className="text-primary" /> 
                Impact Feed
              </h2>
              <div className="space-y-8">
                <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                  <textarea 
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Share your breakthrough moment..."
                    className="w-full h-40 p-6 rounded-2xl bg-b1/50 border border-white/5 focus:border-primary/50 resize-none mb-6 outline-none font-bold text-white placeholder:text-slate-700 transition-all"
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={handleAddReview}
                      className="btn-premium flex items-center gap-3 px-10"
                    >
                      Publish Impact <Send size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-10">
                  <AnimatePresence>
                    {reviews.map((rev, idx) => (
                      <_motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-10 rounded-[2.5rem] border border-white/5 flex gap-8 hover:border-primary/20 transition-all relative group"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center font-black text-2xl text-primary shadow-inner group-hover:scale-110 transition-transform">
                          {rev.user.charAt(0)}
                        </div>
                        <div className="space-y-4 flex-grow">
                          <div className="flex justify-between items-center">
                            <p className="font-black text-white text-xl tracking-tight">{rev.user}</p>
                            <div className="flex gap-1 text-primary">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < rev.rating ? "currentColor" : "none"} className="drop-shadow-glow" />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-400 text-lg leading-relaxed font-bold italic">"{rev.comment}"</p>
                        </div>
                      </_motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <_motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1e293b] text-white rounded-[3rem] p-10 space-y-8 overflow-hidden relative shadow-2xl shadow-black/40 border border-white/10"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>
                
                <div className="pb-8 border-b border-white/5 relative z-10">
                  <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mb-3 flex items-center gap-3">
                    <ShieldCheck size={16} className="text-primary" /> Program Investment
                  </p>
                  <div className="text-6xl font-black text-white drop-shadow-glow">{pricing}</div>
                </div>

                <form onSubmit={handleBooking} className="space-y-6 relative z-10">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">Strategic Launch Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={20} />
                      <input 
                        type="date" 
                        required 
                        className="w-full pl-14 pr-6 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all outline-none text-white font-bold" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-6 space-y-6">
                    <button 
                      type="submit" 
                      disabled={isBooking}
                      className="w-full btn-premium py-5 rounded-2xl flex items-center justify-center gap-4 text-xl font-black uppercase tracking-widest disabled:opacity-50"
                    >
                      {isBooking ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        <>Initialize <ArrowLeft className="rotate-180" size={24} /></>
                      )}
                    </button>
                    <div className="flex flex-col items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <div className="flex items-center gap-3">
                        <ShieldCheck size={14} className="text-primary" /> Elite Security Protocol
                      </div>
                      <p className="text-primary/40">100% Satisfaction Merit</p>
                    </div>
                  </div>
                </form>
              </_motion.div>

              <div className="glass-card p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
                <h4 className="font-black mb-4 text-xl text-white tracking-tight">Need Support?</h4>
                <p className="text-slate-500 text-base mb-8 leading-relaxed font-bold">
                  Technical or strategic clarification? Connect with our global support hub.
                </p>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full py-4 rounded-2xl border-2 border-white/5 font-black uppercase tracking-widest text-xs text-slate-400 hover:text-white hover:bg-white/5 hover:border-primary/20 transition-all cursor-pointer"
                >
                  Request Dispatch
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Support Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-b1/80 backdrop-blur-3xl">
            <_motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#1e293b] rounded-[3rem] p-12 max-w-lg w-full shadow-2xl relative border border-white/10"
            >
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-8 right-8 p-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="w-20 h-20 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center mb-10 border border-primary/20 shadow-lg shadow-primary/10">
                <Mail size={40} />
              </div>
              
              <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">Support Dispatch</h3>
              <p className="text-slate-400 font-bold mb-10 text-lg leading-relaxed">
                Inquiry regarding <strong className="text-primary">{service_name}</strong>? Bridge the gap now.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="relative group col-span-2 md:col-span-1">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary" size={20} />
                    <input type="text" required placeholder="Identity" className="w-full pl-14 pr-6 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all outline-none text-white font-bold" />
                  </div>
                  <div className="relative group col-span-2 md:col-span-1">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary" size={20} />
                    <input type="email" required placeholder="Mail Node" className="w-full pl-14 pr-6 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all outline-none text-white font-bold" />
                  </div>
                </div>
                <textarea 
                  required 
                  placeholder="Intelligence / Query details..." 
                  className="w-full p-6 h-40 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all outline-none resize-none text-white font-bold" 
                ></textarea>
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowContactModal(false)}
                    className="px-8 py-5 font-black uppercase tracking-widest text-xs text-slate-500 hover:text-white transition-all order-2 sm:order-1"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSendingMessage}
                    className="btn-premium px-12 py-5 rounded-2xl order-1 sm:order-2 disabled:opacity-50"
                  >
                    {isSendingMessage ? <span className="loading loading-spinner loading-md"></span> : "Execute Transmission"}
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
