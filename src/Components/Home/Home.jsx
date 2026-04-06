import { Outlet, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";
import { motion as _motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle2, Sparkles, Target, Zap, Users,
  TrendingUp, Award, Globe, FileText, ChevronDown, MessageCircle, Play, Rocket
} from "lucide-react";

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
  { value: 10000, suffix: "+", label: "Professionals Guided", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  { value: 98, suffix: "%", label: "Success Rate", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  { value: 250, suffix: "+", label: "Expert Counselors", icon: Award, color: "text-amber-500", bg: "bg-amber-50" },
  { value: 50, suffix: "+", label: "Countries Reached", icon: Globe, color: "text-sky-500", bg: "bg-sky-50" },
];

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
      className="text-center group flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
        <Icon size={24} className={stat.color} />
      </div>
      <p className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
        {count.toLocaleString()}{stat.suffix}
      </p>
      <p className="font-bold text-gray-400 mt-2 text-sm uppercase tracking-widest">{stat.label}</p>
    </_motion.div>
  );
};

/* ─── FAQ Data ─── */
const faqs = [
  { q: "How does the career counseling process work?", a: "Our process begins with a comprehensive assessment of your skills, interests, and goals. You're then matched with a certified counselor who creates a personalized roadmap. Sessions are conducted via video call, and you'll receive ongoing support through our platform." },
  { q: "What qualifications do your counselors have?", a: "All counselors hold advanced degrees and have 10+ years of industry experience. They're certified in career coaching methodologies and undergo continuous training to stay current with market trends." },
  { q: "How long until I see results?", a: "Most clients see tangible results within 4-8 weeks – whether that's interview callbacks, skill improvements, or clarity on their career direction. Our average client lands their target role within 3 months." },
  { q: "Can I get a refund if I'm not satisfied?", a: "Absolutely! We offer a 100% satisfaction guarantee. If you're not seeing progress after your first 3 sessions, we'll refund your investment in full – no questions asked." },
];

const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col selection:bg-indigo-100 selection:text-indigo-700 fade-in">
      <NavBar />
      
      <main className="flex-grow overflow-x-hidden">
        {/* ════════════════════════════════════════════
            SECTION 1: PREMIUM HERO
        ════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-56 bg-white overflow-hidden">
          {/* Background Decorative Blob */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <_motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest border border-indigo-100">
                <Sparkles size={14} className="animate-pulse" />
                <span>The Future of Career Guidance</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight text-gray-900">
                Unlock Your <br />
                <span className="text-indigo-600 italic">Full Potential</span>
              </h1>
              
              <p className="text-xl text-gray-500 leading-relaxed max-w-xl font-medium">
                Navigate your professional journey with precision-engineered roadmaps, expert counseling, and data-driven career diagnostics.
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                    +2k
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-400">Join 2,500+ successful professionals</p>
              </div>
            </_motion.div>

            <_motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-10 lg:p-14 bg-gray-50 rounded-[3.5rem] border border-gray-100 shadow-inner"
            >
              <div className="relative z-10 space-y-8 bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-indigo-50">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-gray-900 leading-tight tracking-tight">Start Your Transformation</h3>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed">Enter your professional email to initialize your baseline diagnostic assessment.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="work@yourcompany.com" 
                      className="input-premium pr-36 py-5 text-lg"
                    />
                    <button className="absolute right-2 top-2 bottom-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-2xl px-7 transition-all shadow-lg shadow-emerald-100 active:scale-95">
                      Join Now
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-6 pt-2">
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Zap size={10} className="text-amber-400" /> No credit card required
                    </p>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Award size={10} className="text-indigo-400" /> GDPR Compliant
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Expert Review</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Elite Network</span>
                  </div>
                </div>
              </div>
              
              {/* Abstract Background Shapes */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-100 rounded-full blur-3xl opacity-60 -z-10"></div>
            </_motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 2: ANIMATED STATS
        ════════════════════════════════════════════ */}
        <section className="py-24 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {statsData.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 3: FEATURES GRID
        ════════════════════════════════════════════ */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
                <Target size={14} />
                <span>Our Methodology</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-tight">
                Strategic Career <br /><span className="text-indigo-600">Infrastructure</span>
              </h2>
              <p className="text-gray-500 text-xl font-medium leading-relaxed">
                We provide the critical tools and elite counseling necessary to navigate the modern professional landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { title: "Career Strategy", icon: Users, desc: "1-on-1 intensive sessions with industry sector leads." },
                { title: "ATS Optimization", icon: FileText, desc: "Architecting high-conversion professional identities." },
                { title: "Mock Lab", icon: MessageCircle, desc: "High-fidelity behavioral and technical simulations." },
                { title: "Diagnostics", icon: Target, desc: "Data-driven gap analysis & competitive assessment." }
              ].map((feature, idx) => (
                <_motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -12 }}
                  className="premium-card p-12 space-y-8 group cursor-pointer hover:border-indigo-200 border-2"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100">
                    <feature.icon size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-gray-900">{feature.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed text-[15px]">{feature.desc}</p>
                  </div>
                  <div className="pt-4 flex items-center text-indigo-600 font-bold text-sm gap-2">
                    Review Suite <ArrowRight size={16} />
                  </div>
                </_motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 4: OUTLET (Services Display)
        ════════════════════════════════════════════ */}
        <section className="py-24 bg-[#F9FAFB] border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <Outlet />
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 5: HIGH-CONVERSION CTA
        ════════════════════════════════════════════ */}
        <section className="py-32 px-6 md:px-12 relative">
          <div className="absolute inset-0 bg-white -z-20"></div>
          
          <_motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-indigo-600 rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl shadow-indigo-200"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,#ffffff_0%,transparent_50%)]"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                <Rocket size={14} />
                <span>Immediate Engagement Available</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.95]">
                Ready to Scale <br />Your Career?
              </h2>
              <p className="text-indigo-100 text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                Join our elite professional community and receive the strategic advantage required to dominate your industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <button className="btn-cta bg-[#10B981] hover:bg-[#0fd695] text-white px-14 py-6 rounded-[2rem] text-xl font-black shadow-2xl active:scale-95 transition-all">
                  Initialize Setup
                </button>
                <button className="px-14 py-6 rounded-[2rem] text-xl font-black text-white bg-indigo-700 hover:bg-indigo-800 transition-all border border-indigo-400/30 active:scale-95">
                  Contact Specialist
                </button>
              </div>
            </div>
          </_motion.div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 6: FAQ ACCORDION
        ════════════════════════════════════════════ */}
        <section className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="text-center mb-20 space-y-4">
              <p className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[11px]">Knowledge Architecture</p>
              <h2 className="text-5xl font-black tracking-tight text-gray-900">Operations FAQ</h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <_motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="premium-card overflow-hidden border-2 border-gray-50 hover:border-indigo-100 transition-colors"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                    className="w-full flex items-center justify-between p-10 text-left group"
                  >
                    <span className="font-black text-xl text-gray-900 group-hover:text-indigo-600 transition-colors pr-8">{faq.q}</span>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${openFAQ === idx ? 'bg-indigo-600 text-white shadow-xl rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-400'}`}>
                      <ChevronDown size={24} />
                    </div>
                  </button>
                  {openFAQ === idx && (
                    <_motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-10 pb-10"
                    >
                      <p className="text-gray-500 font-medium text-lg leading-relaxed border-t border-gray-50 pt-8">{faq.a}</p>
                    </_motion.div>
                  )}
                </_motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Home;
