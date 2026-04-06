import { Mail, Phone, MapPin, Briefcase, Send } from "lucide-react";
import { FaFacebook as Facebook, FaTwitter as Twitter, FaLinkedin as Linkedin, FaGithub as Github } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail("");
      toast.success("Successfully synchronized with our network!");
    }, 1000);
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-32 pb-16 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-indigo-50/40 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        
        {/* Newsletter / CTA Section */}
        <div className="bg-gray-900 rounded-[4rem] p-12 md:p-20 mb-32 relative overflow-hidden shadow-2xl shadow-indigo-100">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            <div className="max-w-xl text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                <Sparkles size={14} />
                <span>Synchronized Intelligence</span>
              </div>
              <h3 className="text-4xl md:text-7xl font-black tracking-tight text-white leading-tight">
                Accelerate Your <br />
                <span className="text-indigo-400 italic">Full Potential</span>
              </h3>
              <p className="text-gray-400 font-bold text-lg md:text-xl leading-relaxed">
                Join our elite professional channel for exclusive career blueprints, job market intelligence, and strategic growth protocols.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-grow max-w-xl">
              <div className="relative flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@enterprise.com" 
                  className="flex-grow px-10 py-6 bg-white/5 border border-white/10 rounded-3xl focus:border-indigo-400 focus:bg-white/10 outline-none text-white placeholder:text-gray-500 font-black tracking-wider transition-all"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-[#10B981] hover:bg-[#0fd695] text-white py-6 px-12 font-black rounded-3xl shadow-xl shadow-emerald-900/10 transition-all active:scale-95 flex items-center justify-center gap-4 text-lg uppercase tracking-widest disabled:opacity-50"
                >
                  {isSubscribing ? <span className="loading loading-spinner loading-md"></span> : <>Initialize <Send size={22} /></>}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          {/* Brand Column */}
          <div className="space-y-10">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:rotate-12 transition-transform duration-500">
                <Briefcase size={24} />
              </div>
              <span className="text-3xl font-black tracking-[0.05em] text-gray-900 uppercase">
                Career<span className="text-indigo-600">Path</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed font-bold text-lg">
              The world's most sophisticated career guidance platform for ambitious professionals seeking elite performance.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-400 border border-gray-100 hover:border-indigo-600 text-gray-400 group">
                  <social.icon size={22} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-gray-300">Navigation</h3>
            <ul className="space-y-6 font-black text-[12px] uppercase tracking-widest">
              {[
                { name: "Home Operations", path: "/" },
                { name: "Career Services", path: "/services" },
                { name: "Strategic Path", path: "/career" },
                { name: "User Dashboard", path: "/profile" }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-gray-400 hover:text-indigo-600 transition-all flex items-center gap-4 group">
                    <div className="w-2 h-2 rounded-full bg-gray-100 group-hover:bg-indigo-600 transition-all"></div> 
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Nodes */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-gray-300">Service Nodes</h3>
            <ul className="space-y-6 text-gray-400 font-black text-[12px] uppercase tracking-widest">
              {[
                "1-on-1 Mentorship",
                "Portfolio Architecting",
                "Interview Simulator",
                "Diagnostic Audits"
              ].map((service, i) => (
                <li key={i} className="hover:text-indigo-600 transition-all cursor-pointer flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-gray-100 group-hover:bg-indigo-600 transition-all"></div> 
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Network Connection */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-gray-300">Network Connection</h3>
            <ul className="space-y-8 font-bold text-sm">
              <li className="flex items-start gap-5 text-gray-400 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all shrink-0 border border-gray-100">
                  <MapPin size={22} />
                </div>
                <span className="pt-2 font-black uppercase tracking-widest text-[11px] group-hover:text-gray-900 transition-colors">HQ: Global Hub <br />Tech Sector, 10220</span>
              </li>
              <li className="flex items-center gap-5 text-gray-400 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all shrink-0 border border-gray-100">
                  <Mail size={22} />
                </div>
                <span className="font-black uppercase tracking-widest text-[11px] group-hover:text-gray-900 transition-colors">connect@careerpath.io</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Final Sweep */}
        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-gray-300 font-black text-[10px] uppercase tracking-[0.3em]">
            © {currentYear} <span className="text-gray-900">CareerPath Operations</span>. All Protocol Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
            <a href="#" className="hover:text-indigo-600 transition-all">Data Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-all">Terms of Access</a>
            <a href="#" className="hover:text-indigo-600 transition-all">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

