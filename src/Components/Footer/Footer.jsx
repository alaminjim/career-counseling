import { Mail, Phone, MapPin, Briefcase, Send, Sparkles } from "lucide-react";
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
    <footer className="bg-[#0B1020] border-t border-[#374151] pt-32 pb-16 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        
        {/* Newsletter / CTA Section */}
        <div className="bg-[#111827] rounded-[3rem] p-12 md:p-20 mb-32 relative overflow-hidden shadow-2xl border border-[#374151]">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none transform translate-x-1/4 -translate-y-1/4"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            <div className="max-w-xl text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-500/10 text-[#22D3EE] text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                <Sparkles size={14} />
                <span>Synchronized Intelligence</span>
              </div>
              <h3 className="text-4xl md:text-7xl font-black tracking-tight text-white leading-tight">
                Accelerate Your <br />
                <span className="text-indigo-500 italic">Full Potential</span>
              </h3>
              <p className="text-[#9CA3AF] font-bold text-lg md:text-xl leading-relaxed">
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
                  className="flex-grow px-10 py-6 bg-[#0B1020] border border-[#374151] rounded-3xl focus:border-[#4F46E5] outline-none text-white placeholder:text-gray-600 font-bold tracking-wider transition-all shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-[#16A34A] hover:bg-[#15803d] text-white py-6 px-12 font-black rounded-3xl shadow-xl shadow-green-900/20 transition-all active:scale-95 flex items-center justify-center gap-4 text-lg uppercase tracking-widest disabled:opacity-50"
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
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-900/20 group-hover:rotate-12 transition-transform duration-500">
                <Briefcase size={24} />
              </div>
              <span className="text-3xl font-black tracking-[0.05em] text-white uppercase">
                Career<span className="text-indigo-500">Path</span>
              </span>
            </Link>
            <p className="text-[#9CA3AF] leading-relaxed font-bold text-lg">
              The world's most sophisticated career guidance platform for ambitious professionals seeking elite performance.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-12 h-12 rounded-2xl bg-[#1F2937] flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-400 border border-[#374151] hover:border-indigo-600 text-[#9CA3AF] group shadow-sm">
                  <social.icon size={22} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-gray-500">Navigation</h3>
            <ul className="space-y-6 font-black text-[12px] uppercase tracking-widest">
              {[
                { name: "Home Operations", path: "/" },
                { name: "Career Services", path: "/services" },
                { name: "Strategic Path", path: "/career" },
                { name: "User Dashboard", path: "/profile" }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-[#9CA3AF] hover:text-indigo-400 transition-all flex items-center gap-4 group">
                    <div className="w-2 h-2 rounded-full bg-[#374151] group-hover:bg-indigo-500 transition-all"></div> 
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Nodes */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-gray-500">Service Nodes</h3>
            <ul className="space-y-6 text-[#9CA3AF] font-black text-[12px] uppercase tracking-widest">
              {[
                "1-on-1 Mentorship",
                "Portfolio Architecting",
                "Interview Simulator",
                "Diagnostic Audits"
              ].map((service, i) => (
                <li key={i} className="hover:text-indigo-400 transition-all cursor-pointer flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-[#374151] group-hover:bg-indigo-500 transition-all"></div> 
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Network Connection */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-gray-500">Network Connection</h3>
            <ul className="space-y-8 font-bold text-sm">
              <li className="flex items-start gap-5 text-[#9CA3AF] group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-[#1F2937] flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all shrink-0 border border-[#374151] shadow-sm">
                  <MapPin size={22} />
                </div>
                <span className="pt-2 font-black uppercase tracking-widest text-[11px] group-hover:text-white transition-colors">HQ: Global Hub <br />Tech Sector, 10220</span>
              </li>
              <li className="flex items-center gap-5 text-[#9CA3AF] group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-[#1F2937] flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-all shrink-0 border border-[#374151] shadow-sm">
                  <Mail size={22} />
                </div>
                <span className="font-black uppercase tracking-widest text-[11px] group-hover:text-white transition-colors">connect@careerpath.io</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Final Sweep */}
        <div className="pt-12 border-t border-[#374151] flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em]">
            © {currentYear} <span className="text-white">CareerPath Operations</span>. All Protocol Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
            <a href="#" className="hover:text-indigo-400 transition-all">Data Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-all">Terms of Access</a>
            <a href="#" className="hover:text-indigo-400 transition-all">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
