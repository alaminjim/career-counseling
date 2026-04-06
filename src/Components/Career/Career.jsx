import { useLoaderData } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { motion as _motion } from "framer-motion";
import { 
  Globe, Users, FileText, CheckCircle2, 
  Sparkles, Laptop, Coffee, Award, Zap
} from "lucide-react";

const Career = () => {
  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header Section */}
        <section className="text-center space-y-10 mb-32">
          <_motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black border border-indigo-500/20 uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} />
            <span>360° Career Intelligence</span>
          </_motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.95]">
            Holistic <span className="text-[#22D3EE]">Career</span> Systems
          </h1>
          <p className="text-[#9CA3AF] max-w-3xl mx-auto text-xl md:text-2xl font-bold leading-relaxed">
            We provide a comprehensive ecosystem through specialized digital strategy, immersive regional workshops, and elite circle benefits.
          </p>
        </section>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Online Services */}
          <_motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-[#1F2937] rounded-[3.5rem] p-12 shadow-2xl border border-[#374151] hover:border-indigo-500/50 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-12 shadow-2xl shadow-indigo-900/20 group-hover:scale-110 transition-transform duration-500">
              <Laptop size={32} />
            </div>
            
            <div className="space-y-8">
              <h3 className="text-3xl font-black text-white leading-tight">Digital <span className="text-indigo-400">Strategy</span> Hub</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed font-bold">
                Elite guidance delivered straight to your workstation, ensuring career progression from any geographical node.
              </p>
              
              <ul className="space-y-5 pt-10 border-t border-[#374151]">
                {[
                  "Virtual 1-on-1 Strategic Counseling",
                  "Elite Skill Development Webinars",
                  "Interactive AI Diagnostic Interviews",
                  "Global Intelligence Network Access"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                    <CheckCircle2 size={18} className="text-indigo-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </_motion.div>

          {/* Offline Workshops */}
          <_motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group bg-[#111827] rounded-[3.5rem] p-12 shadow-2xl border border-[#4F46E5]/20 hover:scale-[1.02] transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-[#4F46E5] flex items-center justify-center text-white mb-12 shadow-2xl shadow-indigo-900/40 group-hover:scale-110 transition-transform duration-500">
              <Users size={32} />
            </div>
            
            <div className="space-y-8">
              <h3 className="text-3xl font-black leading-tight text-white">Immersive <span className="text-[#22D3EE] italic text-nowrap">Regional</span> Briefings</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed font-bold">
                High-impact physical workshops and elite networking events designed for rapid professional development.
              </p>
              
              <ul className="space-y-5 pt-10 border-t border-white/5">
                {[
                  "Hands-on Strategic Bootcamps",
                  "Physical Portfolio Labs",
                  "Executive Networking Summits",
                  "High-Stakes Public Speaking"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-[#9CA3AF] group-hover:text-white transition-colors">
                    <Zap size={18} className="text-[#22D3EE] flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </_motion.div>

          {/* Exclusive Membership */}
          <_motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group bg-[#1F2937] rounded-[3.5rem] p-12 shadow-2xl border border-[#374151] hover:border-[#16A34A]/50 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#16A34A]/5 rounded-full blur-3xl group-hover:bg-[#16A34A]/10 transition-colors"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-[#16A34A] flex items-center justify-center text-white mb-12 shadow-2xl shadow-green-900/20 group-hover:-rotate-6 transition-transform duration-500">
              <Award size={32} />
            </div>
            
            <div className="space-y-8">
              <h3 className="text-3xl font-black leading-tight text-white">Exclusive <span className="text-[#16A34A]">Elite</span> Inner Circle</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed font-bold">
                Premium membership program for dedicated professionals seeking a distinct competitive advantage.
              </p>
              
              <ul className="space-y-5 pt-10 border-t border-[#374151]">
                {[
                  "Priority Strategic Audits",
                  "Enterprise Profile SEO",
                  "Private Intelligence Community",
                  "Direct Access to Board Mentors"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                    <CheckCircle2 size={18} className="text-[#16A34A] flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </_motion.div>
        </div>

        {/* Closing Banner */}
        <_motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 p-16 md:p-32 rounded-[4rem] bg-[#1F2937] border border-[#374151] text-center space-y-12 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-[#16A34A]/10 opacity-40 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-[5rem] font-black tracking-tight leading-none uppercase text-white">Ready to <span className="italic text-[#16A34A]">Accelerate?</span></h2>
            <p className="text-[#9CA3AF] max-w-2xl mx-auto text-xl font-bold leading-relaxed">Join the thousands of professionals who successfully optimized their path through our strategic guidance system.</p>
            <div className="pt-10 flex justify-center">
              <button className="btn-cta text-lg px-16 shadow-2xl shadow-green-900/40">
                Become a Member Now
              </button>
            </div>
          </div>
        </_motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Career;
