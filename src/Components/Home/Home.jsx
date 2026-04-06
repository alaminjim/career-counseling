import { Outlet, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";
import { motion as _motion, useInView, AnimatePresence } from "framer-motion";
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
  { value: 10000, suffix: "+", label: "Professionals Guided", icon: Users, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { value: 98, suffix: "%", label: "Success Rate", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { value: 250, suffix: "+", label: "Expert Counselors", icon: Award, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { value: 50, suffix: "+", label: "Countries Reached", icon: Globe, color: "text-sky-400", bg: "bg-sky-500/10" },
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
      className="text-center group flex flex-col items-center justify-center p-10 bg-[#1F2937] border border-[#374151] rounded-[2.5rem] shadow-2xl hover:border-indigo-500/50 transition-all duration-500"
    >
      <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(0,0,0,0.1)]`}>
        <Icon size={28} className={stat.color} />
      </div>
      <p className="text-4xl md:text-5xl font-black tracking-tight text-white">
        {count.toLocaleString()}{stat.suffix}
      </p>
      <p className="font-bold text-[#9CA3AF] mt-3 text-[10px] uppercase tracking-[0.3em]">{stat.label}</p>
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
    <div className="min-h-screen bg-[#0B1020] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200 fade-in">
      <NavBar />
      
      <main className="flex-grow overflow-x-hidden">
        {/* ════════════════════════════════════════════
            SECTION 1: PREMIUM HERO
        ════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-32 lg:pt-56 lg:pb-64 bg-[#0B1020] overflow-hidden">
          {/* Background Subtle Glow */}
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/4 -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <_motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-12"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                <Sparkles size={14} className="animate-pulse" />
                <span>The Future of Career Guidance</span>
              </div>
              
              <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.95] tracking-tight text-white">
                Unlock Your <br />
                <span className="text-[#22D3EE] italic">Full Potential</span>
              </h1>
              
              <p className="text-xl text-[#9CA3AF] leading-relaxed max-w-xl font-bold">
                Navigate your professional journey with precision-engineered roadmaps, expert counseling, and data-driven career diagnostics.
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0B1020] bg-[#1F2937] overflow-hidden shadow-2xl">
                      <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-[#0B1020] bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black shadow-2xl">
                    +2k
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-loose">Join 2,500+ <br />Elite professionals</p>
              </div>
            </_motion.div>

            <_motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-1 bg-[#111827] rounded-[4rem] border border-[#374151] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              <div className="relative z-10 space-y-10 bg-[#1F2937] p-12 lg:p-16 rounded-[3.5rem] border border-[#374151]">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white leading-tight tracking-tight">System Initialization</h3>
                  <p className="text-[#9CA3AF] font-bold text-lg leading-relaxed">Enter your professional email to initialize your baseline diagnostic assessment.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="relative group">
                    <input 
                      type="email" 
                      placeholder="work@yourcompany.com" 
                      className="input-premium py-6 uppercase tracking-widest text-xs"
                    />
                  </div>
                  <button className="btn-cta w-full py-6 text-lg hover:scale-[1.01] shadow-2xl shadow-green-900/40">
                    Initialize Setup Now
                  </button>
                  <div className="flex items-center justify-center gap-8 pt-2">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Zap size={12} className="text-amber-400" /> No Card Required
                    </p>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Award size={12} className="text-cyan-400" /> GDPR Secure
                    </p>
                  </div>
                </div>

                <div className="pt-10 border-t border-[#374151] grid grid-cols-2 gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Expert Review</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Elite Network</span>
                  </div>
                </div>
              </div>
            </_motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 2: ANIMATED STATS
        ════════════════════════════════════════════ */}
        <section className="py-32 bg-[#0B1020]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {statsData.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 3: FEATURES GRID
        ════════════════════════════════════════════ */}
        <section className="py-40 bg-[#111827] border-y border-[#374151]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] border border-cyan-500/20">
                <Target size={14} />
                <span>Our Methodology</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
                Strategic Career <br /><span className="text-indigo-500">Infrastructure</span>
              </h2>
              <p className="text-[#9CA3AF] text-xl font-bold leading-relaxed">
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
                  className="premium-card p-12 space-y-10 group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-[#111827] rounded-[1.5rem] flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner border border-[#374151]">
                    <feature.icon size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white">{feature.title}</h3>
                    <p className="text-[#9CA3AF] font-bold leading-relaxed text-[15px]">{feature.desc}</p>
                  </div>
                  <div className="pt-4 flex items-center text-indigo-400 font-black text-[10px] uppercase tracking-widest gap-3 group-hover:text-white transition-colors">
                    Access Suite <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </_motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 4: OUTLET (Services Display)
        ════════════════════════════════════════════ */}
        <section className="py-32 bg-[#0B1020]">
          <div className="max-w-7xl mx-auto px-6">
            <Outlet />
          </div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 5: HIGH-CONVERSION CTA
        ════════════════════════════════════════════ */}
        <section className="py-40 px-6 md:px-12 relative">
          <div className="absolute inset-0 bg-[#111827] -z-20"></div>
          
          <_motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-[#1F2937] border border-[#374151] rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]"
          >
            <div className="relative z-10 max-w-3xl mx-auto space-y-14">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">
                <Rocket size={16} className="text-[#22D3EE]" />
                <span>Immediate Engagement Available</span>
              </div>
              <h2 className="text-5xl md:text-[5.5rem] font-black tracking-tight text-white leading-[0.95]">
                Ready to Scale <br />Your Career?
              </h2>
              <p className="text-[#9CA3AF] text-xl font-bold leading-relaxed max-w-2xl mx-auto">
                Join our elite professional community and receive the strategic advantage required to dominate your industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
                <button className="btn-cta text-lg px-16 shadow-2xl shadow-green-900/40">
                  Initialize Setup
                </button>
                <button className="btn-secondary text-lg px-16">
                  Contact Specialist
                </button>
              </div>
            </div>
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,#4F46E5_0%,transparent_40%)]"></div>
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px]"></div>
            </div>
          </_motion.div>
        </section>

        {/* ════════════════════════════════════════════
            SECTION 6: FAQ ACCORDION
        ════════════════════════════════════════════ */}
        <section className="py-40 bg-[#0B1020]">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="text-center mb-24 space-y-6">
              <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px]">Knowledge Architecture</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white">Operations FAQ</h2>
            </div>

            <div className="space-y-8">
              {faqs.map((faq, idx) => (
                <_motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#1F2937] border border-[#374151] rounded-[2rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
                    className="w-full flex items-center justify-between p-10 md:p-12 text-left group"
                  >
                    <span className="font-black text-xl text-white group-hover:text-indigo-400 transition-colors pr-8 leading-tight">{faq.q}</span>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 ${openFAQ === idx ? 'bg-indigo-600 text-white shadow-2xl rotate-180' : 'bg-[#111827] text-gray-500 group-hover:text-white border border-[#374151]'}`}>
                      <ChevronDown size={28} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFAQ === idx && (
                      <_motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-10 md:px-12 pb-12">
                          <p className="text-[#9CA3AF] font-bold text-lg leading-relaxed border-t border-[#374151]/50 pt-10">{faq.a}</p>
                        </div>
                      </_motion.div>
                    )}
                  </AnimatePresence>
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
