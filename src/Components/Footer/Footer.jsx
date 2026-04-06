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
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Animated glow effect behind footer content */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Premium Newsletter Section */}
        <div className="bg-white/5 rounded-3xl p-8 md:p-12 mb-16 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl text-center lg:text-left space-y-4">
              <h3 className="text-3xl font-black font-display tracking-tight text-white mb-2">
                Accelerate Your <span className="text-primary italic">Career</span>
              </h3>
              <p className="text-neutral-400 font-medium text-lg leading-relaxed">
                Join our newsletter to receive weekly insights, exclusive job opportunities, and expert career development tips directly in your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-grow max-w-md relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your professional email" 
                className="w-full pl-6 pr-40 py-5 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none text-white placeholder:text-neutral-500 font-medium"
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="absolute right-2 top-2 bottom-2 px-6 bg-primary hover:bg-primary-focus transition-colors text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubscribing ? <span className="loading loading-spinner loading-sm"></span> : <>Subscribe <Send size={16} /></>}
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Briefcase size={22} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Career<span className="text-primary font-display">Path</span>
              </span>
            </Link>
            <p className="text-neutral-400 leading-relaxed font-medium">
              Empowering professionals to find their true calling through expert guidance, personalized roadmaps, and industry-leading resources.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-display text-white">Quick Links</h3>
            <ul className="space-y-4 font-medium text-sm">
              <li><Link to="/" className="text-neutral-400 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Home</Link></li>
              <li><Link to="/services" className="text-neutral-400 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Career Services</Link></li>
              <li><Link to="/career" className="text-neutral-400 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Career Path</Link></li>
              <li><Link to="/profile" className="text-neutral-400 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> User Dashboard</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-display text-white">Top Services</h3>
            <ul className="space-y-4 text-neutral-400 font-medium text-sm">
              <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> Career Counseling</li>
              <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> Resume Building</li>
              <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> Interview Prep</li>
              <li className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span> Skill Assessments</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-display text-white">Contact Info</h3>
            <ul className="space-y-5 font-medium text-sm">
              <li className="flex items-start gap-4 text-neutral-400 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="pt-1">123 Career Blvd, Tech City,<br />Innovation District</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-400 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-400 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <span>hello@careerpath.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter / Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 font-medium text-sm">
            © {currentYear} CareerPath. All rights reserved. Built with <span className="text-red-500">❤️</span> for professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-500 font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
