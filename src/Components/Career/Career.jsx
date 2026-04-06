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
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Header Section */}
        <section className="text-center space-y-8 mb-24">
          <_motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black border border-indigo-100 uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} />
            <span>360° Career Intelligence</span>
          </_motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-gray-900 leading-tight">
            Holistic <span className="text-indigo-600">Career</span> Systems
          </h1>
          <p className="text-gray-500 max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed">
            We provide a comprehensive ecosystem through specialized digital strategy, immersive regional workshops, and elite circle benefits.
          </p>
        </section>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Online Services */}
          <_motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-[3rem] p-10 shadow-2xl shadow-indigo-100/20 border border-gray-50 hover:border-indigo-100 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-10 shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">
              <Laptop size={32} />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-gray-900 leading-tight">Digital <span className="text-indigo-600">Strategy</span> Hub</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-bold">
                Elite guidance delivered straight to your workstation, ensuring career progression from any geographical node.
              </p>
              
              <ul className="space-y-4 pt-8 border-t border-gray-50">
                {[
                  "Virtual 1-on-1 Strategic Counseling",
                  "Elite Skill Development Webinars",
                  "Interactive AI Diagnostic Interviews",
                  "Global Intelligence Network Access"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                    <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" /> {item}
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
            className="group bg-gray-900 text-white rounded-[3rem] p-10 shadow-2xl shadow-gray-200 border border-white/5 hover:scale-[1.02] transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-10 shadow-2xl shadow-indigo-900 group-hover:scale-110 transition-transform">
              <Users size={32} />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-3xl font-black leading-tight">Immersive <span className="text-emerald-400 italic">Regional</span> Briefings</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-bold">
                High-impact physical workshops and elite networking events designed for rapid professional development.
              </p>
              
              <ul className="space-y-4 pt-8 border-t border-white/10">
                {[
                  "Hands-on Strategic Bootcamps",
                  "Physical Portfolio Labs",
                  "Executive Networking Summits",
                  "High-Stakes Public Speaking"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-gray-300">
                    <Zap size={18} className="text-emerald-400 flex-shrink-0" /> {item}
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
            className="group bg-white rounded-[3rem] p-10 shadow-2xl shadow-indigo-100/20 border border-gray-50 hover:border-emerald-100 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white mb-10 shadow-xl shadow-emerald-100 group-hover:-rotate-6 transition-transform">
              <Award size={32} />
            </div>
            
            <div className="space-y-6 text-gray-900">
              <h3 className="text-3xl font-black leading-tight">Exclusive <span className="text-emerald-500">Elite</span> Inner Circle</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-bold">
                Premium membership program for dedicated professionals seeking a distinct competitive advantage.
              </p>
              
              <ul className="space-y-4 pt-8 border-t border-gray-50">
                {[
                  "Priority Strategic Audits",
                  "Enterprise Profile SEO",
                  "Private Intelligence Community",
                  "Direct Access to Board Mentors"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" /> {item}
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
          className="mt-32 p-16 md:p-24 rounded-[4rem] bg-indigo-600 text-white text-center space-y-10 relative overflow-hidden shadow-2xl shadow-indigo-100"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-emerald-400 opacity-20 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-none uppercase">Ready to <span className="italic text-emerald-400">Accelerate?</span></h2>
            <p className="text-indigo-100 max-w-2xl mx-auto text-lg md:text-xl font-bold">Join the thousands of professionals who successfully optimized their path through our strategic guidance system.</p>
            <div className="pt-8 flex justify-center">
              <button className="bg-[#10B981] hover:bg-[#0fd695] text-white px-14 py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-black/20 active:scale-95 text-sm">
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
