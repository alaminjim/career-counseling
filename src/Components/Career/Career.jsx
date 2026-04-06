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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-20 max-w-7xl mx-auto px-4 md:px-8 w-full">
        {/* Header Section */}
        <section className="text-center space-y-6 mb-20">
          <_motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20 uppercase tracking-widest"
          >
            <Sparkles size={16} />
            <span>360° Career Ecosystem</span>
          </_motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight font-display text-neutral uppercase">
            Complete <span className="text-primary italic">Career</span> Solutions
          </h1>
          <p className="text-neutral/50 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            At TEAM NM, we offer a comprehensive support system through specialized online guidance, immersive offline workshops, and exclusive member benefits.
          </p>
        </section>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Online Services */}
          <_motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral/5 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:rotate-6 transition-transform">
              <Laptop size={32} />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-display leading-tight">Online <span className="text-primary">Learning</span> & Growth</h3>
              <p className="text-neutral/60 text-sm leading-relaxed">
                Expert guidance delivered straight to your screen, ensuring career progression from the comfort of your sanctuary.
              </p>
              
              <ul className="space-y-3 pt-6 border-t border-neutral/5">
                {[
                  "Virtual 1-on-1 Counseling",
                  "Skill Development Webinars",
                  "Interactive AI Mock Interviews",
                  "Global Networking Access"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral/80">
                    <CheckCircle2 size={18} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </_motion.div>

          {/* Offline Workshops */}
          <_motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group bg-neutral text-white rounded-[2.5rem] p-8 shadow-2xl border border-white/5 hover:scale-[1.02] transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform">
              <Users size={32} />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-display leading-tight italic">Personalized <span className="text-primary">In-Person</span> Support</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Immersive workshops and networking events designed for high-impact physical professional development.
              </p>
              
              <ul className="space-y-3 pt-6 border-t border-white/10">
                {[
                  "Hands-on Bootcamps",
                  "Resume Lab Sessions",
                  "Corporate Networking Events",
                  "Public Speaking Training"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/80">
                    <Zap size={18} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </_motion.div>

          {/* Exclusive Membership */}
          <_motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-neutral/5 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-8 group-hover:-rotate-6 transition-transform">
              <Award size={32} />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-display leading-tight">Exclusive <span className="text-accent">Member</span> Inner Circle</h3>
              <p className="text-neutral/60 text-sm leading-relaxed">
                Premium membership program for dedicated professionals seeking an unfair advantage in the job market.
              </p>
              
              <ul className="space-y-3 pt-6 border-t border-neutral/5">
                {[
                  "Priority Resume Audits",
                  "LinkedIn Profile SEO",
                  "Private Slack Community",
                  "Direct Access to Mentors"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral/80">
                    <CheckCircle2 size={18} className="text-accent" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </_motion.div>
        </div>

        {/* Closing Banner */}
        <_motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-12 rounded-[3rem] bg-gradient-to-r from-primary to-secondary text-white text-center space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-black font-display uppercase italic tracking-tighter">Ready to Accelerate?</h2>
          <p className="text-white/80 max-w-xl mx-auto font-medium">Join thousands of others who fixed their career path with our expert guidance system.</p>
          <div className="pt-4 flex justify-center">
            <button className="bg-white text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Become a Member Now
            </button>
          </div>
        </_motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Career;
