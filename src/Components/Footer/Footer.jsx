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
      toast.success("Successfully subscribed to our newsletter!");
    }, 1000);
  };

  return (
    <footer className="bg-b1 border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Dynamic Aura Background */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Premium Newsletter Section */}
        <div className="glass-card rounded-[3rem] p-10 md:p-16 mb-20 relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="max-w-xl text-center lg:text-left space-y-6">
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight">
                Unlock Your <span className="text-primary">Full Potential</span>
              </h3>
              <p className="text-slate-400 font-medium text-lg md:text-xl leading-relaxed">
                Join our elite newsletter for exclusive career blueprints, job market alerts, and strategic growth tips.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-grow max-w-lg relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your professional email" 
                  className="flex-grow px-8 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary outline-none text-white placeholder:text-slate-600 font-bold transition-all"
                />
                <button 
                  type="submit"
                  disabled={isSubscribing}
                  className="btn-premium whitespace-nowrap min-w-[160px] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubscribing ? <span className="loading loading-spinner loading-sm"></span> : <>Join Now <Send size={18} /></>}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-primary-content shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                <Briefcase size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Career<span className="text-primary">Path</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed font-medium text-base">
              The world's most sophisticated career guidance platform for ambitious professionals seeking meaningful impact.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-b1 transition-all duration-300 border border-white/5 hover:border-primary text-slate-400">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-white/40">Navigation</h3>
            <ul className="space-y-5 font-bold text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Career Services", path: "/services" },
                { name: "Career Path", path: "/career" },
                { name: "User Dashboard", path: "/profile" }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-slate-400 hover:text-primary transition-all flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary group-hover:scale-150 transition-all"></span> 
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-white/40">Our Specialties</h3>
            <ul className="space-y-5 text-slate-400 font-bold text-sm">
              {[
                "Career Counseling",
                "Resume Building",
                "Interview Prep",
                "Skill Assessments"
              ].map((service, i) => (
                <li key={i} className="hover:text-primary transition-all cursor-pointer flex items-center gap-3 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary group-hover:scale-150 transition-all"></span> 
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-white/40">Connect</h3>
            <ul className="space-y-6 font-bold text-sm">
              <li className="flex items-start gap-5 text-slate-400 group">
                <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0 border border-white/5">
                  <MapPin size={20} />
                </div>
                <span className="pt-2 leading-relaxed">Innovation District,<br />Tech City, 10420</span>
              </li>
              <li className="flex items-center gap-5 text-slate-400 group">
                <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0 border border-white/5">
                  <Phone size={20} />
                </div>
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center gap-5 text-slate-400 group cursor-pointer">
                <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all shrink-0 border border-white/5">
                  <Mail size={20} />
                </div>
                <span>hello@careerpath.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 font-bold text-xs">
            © {currentYear} <span className="text-white">CareerPath</span>. Professional Excellence Guaranteed.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-primary transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-all">Terms of Use</a>
            <a href="#" className="hover:text-primary transition-all">Cookie Config</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
