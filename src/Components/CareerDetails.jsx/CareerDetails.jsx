import { useLoaderData, useParams, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8">
        <Link to="/services" className="inline-flex items-center gap-2 text-neutral/60 hover:text-primary transition-colors mb-8 font-medium">
          <ArrowLeft size={18} /> Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Service Details */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-neutral/5"
            >
              <div className="relative h-[400px]">
                <img src={image} alt={service_name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-lg shadow-primary/30">
                    {category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-black text-white font-display uppercase tracking-tight text-shadow-md">
                    {service_name}
                  </h1>
                </div>
              </div>

              <div className="p-8 md:p-12 space-y-8">
                <div className="flex flex-wrap gap-8 py-6 border-y border-neutral/5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral/40 font-bold uppercase tracking-wider">Counselor</p>
                      <p className="font-bold text-lg">{counselor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-sm hover:scale-105 transition-transform">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral/40 font-bold uppercase tracking-wider">Duration</p>
                      <p className="font-bold text-lg">{duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-sm hover:scale-105 transition-transform">
                      <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral/40 font-bold uppercase tracking-wider">Rating</p>
                      <p className="font-bold text-lg">{rating} / 5.0</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Info size={24} className="text-primary" /> About This Service
                  </h2>
                  <p className="text-neutral/70 text-lg leading-relaxed">
                    {description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {[
                      "Personalized Roadmap",
                      "Industry Insider Tips",
                      "Resume Review Included",
                      "1-on-1 Dedicated Support",
                      "Actionable Career Milestones",
                      "Exclusive Resource Access"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-neutral/5 hover:border-primary/20 transition-colors">
                        <CheckCircle2 size={20} className="text-success flex-shrink-0" />
                        <span className="font-semibold text-neutral/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Review Section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-2 px-2">
                <MessageSquare size={24} className="text-primary" /> Student Reviews
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral/5 transition-shadow hover:shadow-md">
                  <textarea 
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full h-32 p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 resize-none mb-4 outline-none font-medium text-neutral"
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={handleAddReview}
                      className="btn-premium flex items-center gap-2"
                    >
                      Post Review <Send size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-6">
                  <AnimatePresence>
                    {reviews.map((rev, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-6 rounded-3xl shadow-sm border border-neutral/5 flex gap-4 hover:border-primary/10 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center font-bold text-neutral">
                          {rev.user.charAt(0)}
                        </div>
                        <div className="space-y-2 flex-grow">
                          <div className="flex justify-between items-center">
                            <p className="font-bold">{rev.user}</p>
                            <div className="flex gap-1 text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} />
                              ))}
                            </div>
                          </div>
                          <p className="text-neutral/60 text-sm leading-relaxed font-medium">{rev.comment}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-neutral text-white rounded-[2.5rem] p-8 space-y-6 overflow-hidden relative shadow-xl shadow-neutral/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
                
                <div className="pb-6 border-b border-white/10 relative z-10">
                  <p className="text-neutral-400 font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-success" /> Investment
                  </p>
                  <div className="text-5xl font-black text-white">{pricing}</div>
                </div>

                <form onSubmit={handleBooking} className="space-y-4 relative z-10">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-neutral-400">Select Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                      <input 
                        type="date" 
                        required 
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/40 focus:border-primary/40 outline-none text-white transition-all custom-calendar-icon" 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <button 
                      type="submit" 
                      disabled={isBooking}
                      className="w-full btn-premium py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-50"
                    >
                      {isBooking ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <>Complete Booking <ArrowLeft className="rotate-180" size={20} /></>
                      )}
                    </button>
                    <p className="text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
                      <ShieldCheck size={14} /> 100% Satisfaction Guarantee
                    </p>
                  </div>
                </form>
              </motion.div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-neutral/5">
                <h4 className="font-bold mb-4 text-lg">Need help?</h4>
                <p className="text-neutral/60 text-sm mb-6 leading-relaxed font-medium">
                  Have questions about this session? Chat with our team or schedule a callback.
                </p>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full py-3 rounded-xl border-2 border-neutral/10 font-bold text-neutral hover:bg-neutral/5 hover:border-neutral/20 transition-all cursor-pointer"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Support Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 p-2 text-neutral/40 hover:text-neutral hover:bg-neutral/5 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Mail size={32} />
              </div>
              
              <h3 className="text-2xl font-bold font-display mb-2">Contact Support</h3>
              <p className="text-neutral/60 text-sm mb-6">
                Have a question about <strong>{service_name}</strong>? Send us a message and we'll get back to you shortly.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative col-span-2 md:col-span-1">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                    <input type="text" required placeholder="Your Name" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-neutral/10 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                  <div className="relative col-span-2 md:col-span-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                    <input type="email" required placeholder="Email Address" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-neutral/10 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                  </div>
                </div>
                <textarea 
                  required 
                  placeholder="How can we help you?" 
                  className="w-full p-4 h-32 bg-slate-50 border border-neutral/10 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" 
                ></textarea>
                <div className="flex justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowContactModal(false)}
                    className="px-6 py-3 font-bold text-neutral/60 hover:text-neutral transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSendingMessage}
                    className="btn-premium px-8 py-3 rounded-xl disabled:opacity-50 cursor-pointer"
                  >
                    {isSendingMessage ? <span className="loading loading-spinner loading-sm"></span> : "Send Message"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CareerDetails;
