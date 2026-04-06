import { useContext, useState } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { motion as _motion } from "framer-motion";
import { 
  User, Mail, Camera, Settings, Calendar, 
  Clock, ShieldCheck, Edit3, Save, ExternalLink, Activity
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

  const mockSessions = [
    { id: 1, title: "Career Discovery Session", date: "Oct 24, 2026", status: "Active Node", color: "text-[#22D3EE]", bgColor: "bg-[#22D3EE]/10", borderColor: "border-[#22D3EE]/20" },
    { id: 2, title: "Resume Workshop", date: "Sep 15, 2026", status: "Success", color: "text-[#16A34A]", bgColor: "bg-[#16A34A]/10", borderColor: "border-[#16A34A]/20" }
  ];

  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-32 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Profile Header */}
        <_motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-32"
        >
          <div className="h-80 md:h-[450px] bg-[#111827] rounded-[4.5rem] overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-[#374151]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-cyan-500/10 opacity-60 blur-[120px] pointer-events-none"></div>
            {/* Grid Pattern mask */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
            
            <div className="absolute top-16 right-16 flex gap-4">
              <div className="px-6 py-3 bg-[#0B1020]/60 backdrop-blur-2xl rounded-2xl text-[#22D3EE] text-[10px] font-black uppercase tracking-[0.4em] border border-white/5 shadow-2xl">
                Verified Strategist • Internal Rank A1
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-20 left-12 md:left-24 flex flex-col md:flex-row items-end gap-12">
            <div className="relative group">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-[3.5rem] border-[16px] border-[#0B1020] overflow-hidden shadow-2xl bg-[#1F2937] group-hover:scale-105 transition-transform duration-700">
                <img 
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-8 right-8 p-5 bg-indigo-600 text-white rounded-[1.5rem] shadow-2xl hover:scale-110 hover:bg-indigo-500 transition-all border-4 border-[#0B1020] active:scale-95 cursor-pointer">
                <Camera size={26} />
              </button>
            </div>
            
            <div className="pb-12 md:pb-16 text-center md:text-left space-y-4">
              <h1 className="text-5xl md:text-[6.5rem] font-black text-white tracking-tighter leading-none uppercase">
                {user?.displayName || "Executive Analyst"}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-[#9CA3AF] font-black text-xs tracking-[0.1em] uppercase">
                <Mail size={18} className="text-indigo-500" /> 
                <span className="opacity-80">{user?.email}</span>
              </div>
            </div>
          </div>
        </_motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-16">
          {/* Account Settings */}
          <div className="lg:col-span-2 space-y-16">
            <div className="bg-[#1F2937] rounded-[4.5rem] p-16 md:p-24 shadow-2xl border border-[#374151] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]"></div>
              <div className="flex items-center justify-between mb-16">
                <h2 className="text-4xl font-black flex items-center gap-6 text-white tracking-tight uppercase">
                  Identity <span className="text-indigo-500 italic underline decoration-indigo-500/20">Protocols</span>
                </h2>
                <div className="w-12 h-12 rounded-xl bg-[#111827] flex items-center justify-center text-gray-500 border border-[#374151]">
                  <Settings size={22} />
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] ml-6">Network Alias</label>
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={24} />
                    <input 
                      type="text" 
                      name="name"
                      defaultValue={user?.displayName}
                      className="input-premium pl-16 pr-8 py-6 text-white font-black uppercase text-[11px] tracking-widest shadow-inner !bg-[#111827]" 
                      placeholder="ENTER ALIAS"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] ml-6">Node Avatar URL</label>
                  <div className="relative group">
                    <Camera className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={24} />
                    <input 
                      type="text" 
                      name="photo"
                      defaultValue={user?.photoURL}
                      className="input-premium pl-16 pr-8 py-6 text-white font-black uppercase text-[11px] tracking-widest shadow-inner !bg-[#111827]" 
                      placeholder="SYSTEM://URL"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-12 flex justify-end">
                  <button 
                    disabled={isUpdating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-20 py-6 rounded-2xl flex items-center gap-5 text-xl font-black uppercase tracking-[0.2em] disabled:opacity-50 transition-all shadow-2xl shadow-indigo-900/40 active:scale-95"
                  >
                    {isUpdating ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      <><Save size={28} /> Synchronize Hub</>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Session Management */}
            <div className="bg-[#1F2937] rounded-[4.5rem] p-16 md:p-24 shadow-2xl border border-[#374151]">
              <div className="flex items-center justify-between mb-16 px-6">
                <h2 className="text-4xl font-black flex items-center gap-6 text-white tracking-tight uppercase">
                  Service <span className="text-[#16A34A] italic">Deployment Log</span>
                </h2>
                <span className="bg-[#111827] text-indigo-400 text-[10px] font-black px-6 py-3 rounded-2xl uppercase tracking-[0.2em] border border-[#374151]">{mockSessions.length} Nodes Active</span>
              </div>

              <div className="space-y-8">
                {mockSessions.map((session) => (
                  <div key={session.id} className="group p-10 rounded-[3rem] border border-[#374151] flex flex-col md:flex-row items-center justify-between hover:bg-[#111827] transition-all duration-500 bg-[#111827]/40 shadow-inner">
                    <div className="flex items-center gap-10">
                      <div className={`w-20 h-20 ${session.bgColor} ${session.color} rounded-[1.5rem] flex items-center justify-center shadow-2xl border ${session.borderColor} group-hover:scale-110 transition-transform duration-500`}>
                        <Clock size={36} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-black text-white text-3xl tracking-tight uppercase leading-none">{session.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-widest mt-4">
                          <Calendar size={14} />
                          <span>Initialized: {session.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-10 mt-8 md:mt-0">
                      <span className={`text-[10px] uppercase font-black tracking-[0.3em] px-8 py-3 rounded-2xl shadow-2xl border ${session.bgColor} ${session.color} ${session.borderColor}`}>
                        {session.status}
                      </span>
                      <button className="w-14 h-14 bg-[#1F2937] text-gray-500 hover:text-indigo-400 transition-all rounded-2xl border border-[#374151] flex items-center justify-center hover:scale-110 hover:border-indigo-500/50 cursor-pointer shadow-xl">
                        <ExternalLink size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-16">
            <div className="bg-[#111827] text-white rounded-[4rem] p-12 space-y-12 relative overflow-hidden shadow-2xl border border-[#374151]">
              <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
              <h4 className="text-3xl font-black tracking-tight flex items-center gap-6 uppercase">
                <ShieldCheck size={36} className="text-[#16A34A]" /> 
                Access Integrity
              </h4>
              <p className="text-xl text-[#9CA3AF] leading-relaxed font-bold italic opacity-90">
                Identity synchronization active. Protocol status verified against global elite databases.
              </p>
              <div className="space-y-8 pt-6">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.5em] text-[#16A34A]">
                  <span>System Synchronization</span>
                  <span className="flex items-center gap-2"><Activity size={12} /> 100% SECURE</span>
                </div>
                <div className="relative pt-2">
                  <div className="overflow-hidden h-4 rounded-full bg-[#0B1020] border border-[#374151] p-1">
                    <div style={{ width: "100%" }} className="shadow-2xl h-full rounded-full bg-gradient-to-r from-[#16A34A] to-indigo-600 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1F2937] p-16 rounded-[4.5rem] border border-[#374151] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform"></div>
              <h4 className="font-black mb-10 text-3xl text-white tracking-tight uppercase flex items-center gap-6">
                <Edit3 size={32} className="text-[#22D3EE]" /> Observer Log
              </h4>
              <p className="text-[#9CA3AF] text-xl leading-relaxed italic font-bold opacity-90 leading-normal">
                "Keep your network nodes synchronized to ensure priority recognition during elite live transmissions."
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyProfile;
