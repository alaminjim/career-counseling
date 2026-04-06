import { Outlet, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";
import Title from "../Title/Title";
import { motion as _motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle2, Sparkles, Target, Zap, Users, Award,
  Globe, TrendingUp, Star, ChevronDown, Search, FileText, Headphones,
  GraduationCap, Rocket, MessageCircle, Quote, Play
} from "lucide-react";
import heroImage from "../../assets/The Little Things - Working.png";

/* ─── Animated Counter Hook ─── */
const useCounter = (end, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!startOnView || !isInView) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration, startOnView]);

  return { count, ref };
};

/* ─── Stats Data ─── */
const statsData = [
  { value: 10000, suffix: "+", label: "Professionals Guided", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { value: 98, suffix: "%", label: "Success Rate", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { value: 250, suffix: "+", label: "Expert Counselors", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
  { value: 50, suffix: "+", label: "Countries Reached", icon: Globe, color: "text-sky-500", bg: "bg-sky-500/10" },
];

/* ─── How It Works Steps ─── */
const steps = [
  { icon: Search, title: "Discover", desc: "Take our AI-powered assessment to uncover your strengths and ideal career paths.", color: "from-primary to-indigo-400" },
  { icon: FileText, title: "Plan", desc: "Get a personalized career roadmap crafted by industry experts.", color: "from-sky-500 to-cyan-400" },
  { icon: Headphones, title: "Execute", desc: "Work 1-on-1 with certified counselors to build skills and confidence.", color: "from-emerald-500 to-teal-400" },
  { icon: Rocket, title: "Succeed", desc: "Land your dream role with our resume, interview & negotiation coaching.", color: "from-amber-500 to-orange-400" },
];

/* ─── Testimonials Data ─── */
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Google",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=4f46e5&color=fff&bold=true",
    comment: "CareerPath completely transformed my career trajectory. Within 3 months of their coaching, I transitioned from junior developer to PM at Google. The personalized roadmap was invaluable.",
    rating: 5,
  },
  {
    name: "James Mitchell",
    role: "Senior UX Designer at Apple",
    avatar: "https://ui-avatars.com/api/?name=James+Mitchell&background=0ea5e9&color=fff&bold=true",
    comment: "The resume workshop alone was worth 10x the investment. My interview callback rate went from 5% to 45%. The counselors truly understand the tech industry inside out.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Data Scientist at Netflix",
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=f59e0b&color=fff&bold=true",
    comment: "I was stuck in my career for 2 years. CareerPath helped me identify my strengths and pivot into data science. Best professional decision I ever made!",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    role: "Engineering Lead at Microsoft",
    avatar: "https://ui-avatars.com/api/?name=David+Rodriguez&background=10b981&color=fff&bold=true",
    comment: "The mock interview sessions were incredibly realistic. I went into my final interview at Microsoft feeling completely prepared and confident. Landed the offer the same week!",
    rating: 5,
  },
];

/* ─── FAQ Data ─── */
const faqs = [
  { q: "How does the career counseling process work?", a: "Our process begins with a comprehensive assessment of your skills, interests, and goals. You're then matched with a certified counselor who creates a personalized roadmap. Sessions are conducted via video call, and you'll receive ongoing support through our platform." },
  { q: "What qualifications do your counselors have?", a: "All counselors hold advanced degrees and have 10+ years of industry experience. They're certified in career coaching methodologies and undergo continuous training to stay current with market trends." },
  { q: "How long until I see results?", a: "Most clients see tangible results within 4-8 weeks – whether that's interview callbacks, skill improvements, or clarity on their career direction. Our average client lands their target role within 3 months." },
  { q: "Can I get a refund if I'm not satisfied?", a: "Absolutely! We offer a 100% satisfaction guarantee. If you're not seeing progress after your first 3 sessions, we'll refund your investment in full – no questions asked." },
  { q: "Do you offer corporate or team packages?", a: "Yes! We have dedicated enterprise solutions for companies looking to invest in their employees' professional development. Contact our sales team for custom pricing and packages." },
];

/* ─── FAQ Item Component ─── */
const FAQItem = ({ faq, index, isOpen, onToggle }) => (
  <_motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    className="faq-item border border-neutral/5 rounded-2xl overflow-hidden"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-6 text-left group cursor-pointer"
    >
      <span className="font-bold text-lg pr-8 group-hover:text-primary transition-colors">{faq.q}</span>
      <_motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-neutral/5 text-neutral/40'}`}
      >
        <ChevronDown size={20} />
      </_motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <_motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-6 text-neutral/60 leading-relaxed text-[15px]">{faq.a}</p>
        </_motion.div>
      )}
    </AnimatePresence>
  </_motion.div>
);

const StatCard = ({ stat, index }) => {
  const { count, ref } = useCounter(stat.value, 2200);
  const Icon = stat.icon;
  return (
    <_motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center group flex flex-col items-center justify-center p-6 glass-card rounded-2xl"
    >
      <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={28} className={stat.color} />
      </div>
      <p className="text-4xl md:text-5xl font-black tracking-tight text-neutral">
        {count.toLocaleString()}{stat.suffix}
      </p>
      <p className="font-medium text-neutral/60 mt-1">{stat.label}</p>
    </_motion.div>
  );
};

/* ─── MAIN HOME COMPONENT ─── */
const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-cycle testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-24">
        {/* ════════════════════════════════════════════
            SECTION 1: DYNAMIC HERO
        ════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-transparent pb-20 pt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <_motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">
                <Sparkles size={16} />
                <span>Trusted by 10,000+ Professionals</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                Design Your <span className="gradient-text font-display">Future</span> With Expert Guidance
              </h1>
              
              <p className="text-xl text-neutral/70 leading-relaxed max-w-xl">
                Unlock your full potential with personalized career roadmaps, industry-leading counseling, and strategic professional development.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/services" className="btn-premium flex items-center justify-center gap-2">
                  Explore Services <ArrowRight size={18} />
                </Link>
                <Link to="/career" className="px-8 py-4 rounded-xl border-2 border-neutral/10 font-semibold hover:bg-neutral/5 transition-all duration-300 flex items-center justify-center gap-2">
                  Take Skill Test <Zap size={18} className="text-accent" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-neutral/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-medium text-neutral/80">Certified Experts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-medium text-neutral/80">Lifetime Support</span>
                </div>
              </div>
            </_motion.div>

            <_motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
                <img 
                  src={heroImage} 
                  alt="Professional Workspace" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 p-6 bg-white rounded-2xl shadow-xl flex items-center gap-4 z-20 hidden md:flex border border-neutral/5 animate-float">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold leading-none">98%</p>
                  <p className="text-xs text-neutral/60 font-semibold uppercase tracking-wider">Success Rate</p>
                </div>
              </div>

              {/* New: Floating review badge */}
              <_motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                className="absolute -top-4 -right-4 md:right-8 md:top-8 px-4 py-3 bg-white rounded-2xl shadow-xl z-20 hidden md:flex items-center gap-3 border border-neutral/5"
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-sky-200 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white"></div>
                </div>
                <div>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                  <p className="text-[10px] font-bold text-neutral/50">2,500+ Reviews</p>
                </div>
              </_motion.div>
            </_motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 2: MARQUEE BULLETIN
        ════════════════════════════════════════════ */}
        <Title />

        {/* ════════════════════════════════════════════
            SECTION 3: ANIMATED STATS COUNTER
        ════════════════════════════════════════════ */}
        <section className="py-20 bg-transparent relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[200px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
              {statsData.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 4: CAREER SERVICES (Outlet)
        ════════════════════════════════════════════ */}
        <section className="bg-base-200/50 min-h-[400px]">
          <Outlet />
        </section>

        {/* ════════════════════════════════════════════
            SECTION 5: HOW IT WORKS
        ════════════════════════════════════════════ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <_motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-20 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Play size={14} />
                <span>Simple Process</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                How <span className="gradient-text font-display">CareerPath</span> Works
              </h2>
              <p className="text-neutral/50 text-lg">
                Four steps to transform your professional life forever.
              </p>
            </_motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connecting Line (desktop) */}
              <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-primary via-sky-400 via-emerald-400 to-amber-400 opacity-20"></div>
              
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <_motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative text-center group"
                  >
                    <div className="relative z-10 mx-auto mb-8">
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={32} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-neutral rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg">
                        {idx + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-display">{step.title}</h3>
                    <p className="text-neutral/50 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                  </_motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 6: TESTIMONIALS
        ════════════════════════════════════════════ */}
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <_motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                <MessageCircle size={14} />
                <span>Success Stories</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                What Our <span className="gradient-text font-display">Clients</span> Say
              </h2>
              <p className="text-neutral/50 text-lg">
                Real stories from real professionals who transformed their careers.
              </p>
            </_motion.div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Featured Testimonial */}
              <AnimatePresence mode="wait">
                <_motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-neutral/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                  <Quote className="text-primary/10 absolute top-6 right-8" size={80} />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-neutral/80 leading-relaxed font-medium italic">
                      "{testimonials[activeTestimonial].comment}"
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-neutral/5">
                      <img
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                        className="w-14 h-14 rounded-full border-4 border-primary/10"
                      />
                      <div>
                        <p className="font-bold text-lg">{testimonials[activeTestimonial].name}</p>
                        <p className="text-primary text-sm font-semibold">{testimonials[activeTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </_motion.div>
              </AnimatePresence>

              {/* Testimonial Grid */}
              <div className="grid grid-cols-1 gap-4">
                {testimonials.map((t, idx) => (
                  <_motion.button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`w-full text-left p-5 rounded-2xl flex items-center gap-4 transition-all duration-300 cursor-pointer border ${
                      activeTestimonial === idx
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                        : 'bg-white border-neutral/5 hover:border-primary/20 hover:bg-primary/5'
                    }`}
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full border-2 border-white/30"
                    />
                    <div className="flex-grow min-w-0">
                      <p className="font-bold truncate">{t.name}</p>
                      <p className={`text-sm truncate ${activeTestimonial === idx ? 'text-white/70' : 'text-neutral/50'}`}>{t.role}</p>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" className={activeTestimonial === idx ? 'text-amber-300' : 'text-amber-400'} />
                      ))}
                    </div>
                  </_motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 7: FAQ ACCORDION
        ════════════════════════════════════════════ */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <_motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <GraduationCap size={14} />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Frequently Asked <span className="gradient-text font-display">Questions</span>
              </h2>
              <p className="text-neutral/50 text-lg">
                Everything you need to know about our services.
              </p>
            </_motion.div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  faq={faq}
                  index={idx}
                  isOpen={openFAQ === idx}
                  onToggle={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                />
              ))}
            </div>

            <_motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-neutral/40 font-medium">
                Still have questions? <Link to="/career" className="text-primary font-bold hover:underline underline-offset-4">Contact our team</Link>
              </p>
            </_motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;
