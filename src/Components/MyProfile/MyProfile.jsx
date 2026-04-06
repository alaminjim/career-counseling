import { useContext, useState } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { _motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Camera, Settings, Calendar, 
  Clock, ShieldCheck, Edit3, Save, ExternalLink, Activity,
  Zap, Award, TrendingUp, ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { user, updateProfileUser } = useContext(AuthContextUser);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");

    updateProfileUser({ displayName: name, photoURL: photo })
      .then(() => {
        toast.success("Identity Synchronization Successful!");
        setIsUpdating(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setIsUpdating(false);
      });
  };

  const metrics = [
    { label: "Career Pulse", value: "94%", icon: <Zap size={20} />, color: "text-[#22D3EE]" },
    { label: "Sessions Logged", value: "12", icon: <Calendar size={20} />, color: "text-indigo-400" },
    { label: "Success Rate", value: "100%", icon: <Award size={20} />, color: "text-[#16A34A]" }
  ];

  const mockSessions = [
    { id: 1, title: "Career Discovery Session", date: "Oct 24, 2026", type: "Diagnostic", status: "Active Node", color: "text-[#22D3EE]", bgColor: "bg-[#22D3EE]/10" },
    { id: 2, title: "Resume Workshop", date: "Sep 15, 2026", type: "Optimization", status: "Success", color: "text-[#16A34A]", bgColor: "bg-[#16A34A]/10" }
  ];

  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Profile Header & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20 animate-in fade-in duration-1000">
          <div className="lg:col-span-4 relative group">
            <div className="h-96 md:h-[500px] bg-[#111827] rounded-[4rem] overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-[#374151]">
              {/* Cover Gradient/Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-[#111827] to-cyan-500/10 transition-all group-hover:scale-110 duration-1000"></div>
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
              
              {/* Verification Badge */}
              <div className="absolute top-12 right-12 hidden md:flex items-center gap-4 bg-[#0B1020]/60 backdrop-blur-3xl px-8 py-3 rounded-2xl border border-white/5 shadow-2xl">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Internal Rank: A1 Verified</span>
              </div>
            </div>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-12">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
                <div className="relative group/avatar">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-[3.5rem] border-[12px] border-[#0B1020] overflow-hidden shadow-2xl bg-[#1F2937] transition-transform duration-500 group-hover/avatar:scale-105">
                    <img 
                      src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="absolute bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-[1.25rem] shadow-2xl hover:scale-110 hover:bg-indigo-500 transition-all border-4 border-[#0B1020] cursor-pointer group-hover/avatar:rotate-12">
                    <Camera size={22} />
                    <input type="file" className="hidden" />
                  </label>
                </div>
                
                <div className="pb-4 text-center md:text-left">
                  <div className="flex items-center gap-4 mb-2 justify-center md:justify-start">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
                      {user?.displayName || "Executive Analyst"}
                    </h1>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-indigo-400 font-black text-xs tracking-widest uppercase opacity-80 bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/10 inline-flex">
                    <Mail size={16} /> 
                    <span>{user?.email}</span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid inside Header Area for Desktop */}
              <div className="hidden lg:grid grid-cols-3 gap-6 pb-4">
                {metrics.map((m, i) => (
                  <div key={i} className="bg-[#0B1020]/60 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/5 space-y-3 min-w-[140px] hover:border-indigo-400/30 transition-all group/metric">
                    <div className={`${m.color} bg-white/5 w-10 h-10 rounded-xl flex items-center justify-center group-hover/metric:scale-110 transition-transform`}>
                      {m.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">{m.label}</p>
                      <p className="text-xl font-black text-white">{m.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Metrics for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 lg:hidden">
          {metrics.map((m, i) => (
            <div key={i} className="bg-[#1F2937] p-8 rounded-[2.5rem] border border-[#374151] flex items-center gap-8 shadow-2xl">
              <div className={`${m.color} bg-[#111827] w-14 h-14 rounded-2xl flex items-center justify-center border border-[#374151]`}>
                {m.icon}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{m.label}</p>
                <p className="text-2xl font-black text-white">{m.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-16">
            {/* Identity Protocols (Edit Form) */}
            <div className="bg-[#1F2937] rounded-[4rem] p-12 md:p-20 shadow-2xl border border-[#374151] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-16 px-4">
                <div className="space-y-3">
                  <h2 className="text-4xl font-black text-white tracking-tight uppercase flex items-center gap-5">
                    Profile <span className="text-[#22D3EE] italic">Settings</span>
                  </h2>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">Synchronize Personal Data Nodes</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#111827] flex items-center justify-center text-indigo-400 border border-[#374151] group-hover:rotate-12 transition-transform">
                  <Settings size={28} />
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.6em] ml-8">Full Name</label>
                  <div className="relative group/field">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-[#22D3EE] transition-colors" size={24} />
                    <input 
                      type="text" 
                      name="name"
                      defaultValue={user?.displayName}
                      className="input-premium pl-16 pr-8 py-6 text-white font-black uppercase text-[11px] tracking-[0.2em] shadow-inner border-[#374151] focus:border-[#22D3EE]/50 !bg-[#111827]" 
                      placeholder="ENTER NAME"
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.6em] ml-8">Profile Image URL</label>
                  <div className="relative group/field">
                    <Camera className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within/field:text-[#22D3EE] transition-colors" size={24} />
                    <input 
                      type="text" 
                      name="photo"
                      defaultValue={user?.photoURL}
                      className="input-premium pl-16 pr-8 py-6 text-white font-black uppercase text-[11px] tracking-[0.2em] shadow-inner border-[#374151] focus:border-[#22D3EE]/50 !bg-[#111827]" 
                      placeholder="HTTPS://IMAGE.URL"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-10 flex justify-end">
                  <button 
                    disabled={isUpdating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-20 py-6 rounded-[2rem] flex items-center gap-6 text-xl font-black uppercase tracking-[0.2em] disabled:opacity-50 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95 group/btn"
                  >
                    {isUpdating ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      <><Save size={28} className="group-hover:rotate-12 transition-transform" /> Save Identity</>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Career Journey (Activity) */}
            <div className="bg-[#1F2937] rounded-[4rem] p-12 md:p-20 shadow-2xl border border-[#374151] relative">
              <div className="flex items-center justify-between mb-20 px-4">
                <div>
                  <h2 className="text-4xl font-black text-white tracking-tight uppercase">
                    Career <span className="text-[#16A34A] italic underline decoration-green-500/20">Timeline</span>
                  </h2>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mt-3">Verified Service Deployments</p>
                </div>
                <div className="flex items-center gap-4 bg-[#111827] px-6 py-3 rounded-2xl border border-[#374151]">
                  <TrendingUp size={20} className="text-[#16A34A]" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">{mockSessions.length} Logs</span>
                </div>
              </div>

              <div className="relative pl-12 md:pl-20 py-8 space-y-16">
                {/* Vertical Line */}
                <div className="absolute left-[34px] md:left-[42px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-indigo-500/50 to-transparent"></div>

                {mockSessions.map((session, idx) => (
                  <div key={session.id} className="relative group">
                    {/* Circle on the line */}
                    <div className="absolute -left-[54px] md:-left-[61px] top-4 w-12 h-12 bg-[#0B1020] rounded-full flex items-center justify-center border border-indigo-500/30 z-10 shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:scale-125 transition-transform">
                      <div className={`w-3 h-3 rounded-full ${idx === 0 ? "bg-indigo-500" : "bg-emerald-500"}`}></div>
                    </div>
                    
                    <div className="bg-[#111827] p-10 rounded-[3rem] border border-[#374151] hover:border-indigo-500/30 transition-all duration-500 shadow-xl flex flex-col md:flex-row items-center justify-between gap-10 group-hover:-translate-y-2">
                      <div className="flex items-start gap-8">
                        <div className={`w-20 h-20 ${session.bgColor} ${session.color} rounded-[1.75rem] flex items-center justify-center border border-white/5 shadow-2xl`}>
                          <Clock size={32} />
                        </div>
                        <div className="space-y-2">
                          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${session.color}`}>{session.type} Mission</p>
                          <h4 className="font-black text-white text-3xl tracking-tight uppercase leading-tight">{session.title}</h4>
                          <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            <Calendar size={14} />
                            <span>Dispatch: {session.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className={`text-[9px] uppercase font-black tracking-[0.3em] px-8 py-3 rounded-2xl shadow-xl border ${session.bgColor} ${session.color} border-white/5`}>
                          {session.status}
                        </span>
                        <ChevronRight className="text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-2" size={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-16">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 text-white rounded-[4rem] p-12 space-y-12 relative overflow-hidden shadow-[0_30px_70px_-20px_rgba(79,70,229,0.6)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="relative z-10 space-y-10">
                <div className="bg-white/10 w-20 h-20 rounded-[1.75rem] flex items-center justify-center border border-white/20 shadow-2xl">
                  <ShieldCheck size={40} className="text-[#22D3EE]" /> 
                </div>
                <div>
                  <h4 className="text-4xl font-black tracking-tight uppercase mb-6 leading-tight">Access <br />Integrity</h4>
                  <p className="text-indigo-100 text-lg leading-relaxed font-bold italic opacity-90">
                    Your profile data is synchronized with the CareerPath global technical registry. 
                  </p>
                </div>
                
                <div className="space-y-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] text-white">
                    <span className="flex items-center gap-3"><Activity size={12} /> Sync Integrity</span>
                    <span>100%</span>
                  </div>
                  <div className="h-3 rounded-full bg-black/30 p-0.5 border border-white/5">
                    <div style={{ width: "100%" }} className="shadow-2xl h-full rounded-full bg-[#22D3EE]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1F2937] p-16 rounded-[4.5rem] border border-[#374151] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#22D3EE]/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform"></div>
              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#22D3EE]/10 text-[#22D3EE] rounded-2xl flex items-center justify-center border border-[#22D3EE]/10">
                    <Edit3 size={32} />
                  </div>
                  <h4 className="font-black text-3xl text-white tracking-tight uppercase">Analyst Log</h4>
                </div>
                <div className="relative">
                  <span className="absolute -left-4 top-0 text-6xl text-gray-700 font-serif">"</span>
                  <p className="text-[#9CA3AF] text-xl leading-relaxed italic font-bold opacity-90 leading-tight pl-2">
                    Continuously update your technical alias and photo URL to maintain priority visibility during live session transmissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyProfile;
