import { useContext, useState } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { motion as _motion } from "framer-motion";
import { 
  User, Mail, Camera, Settings, Calendar, 
  Clock, ShieldCheck, Edit3, Save, ExternalLink 
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
        toast.success("Profile synchronized successfully!");
        setIsUpdating(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setIsUpdating(false);
      });
  };

  const mockSessions = [
    { id: 1, title: "Career Discovery Session", date: "Oct 24, 2026", status: "Upcoming", color: "bg-primary" },
    { id: 2, title: "Resume Workshop", date: "Sep 15, 2026", status: "Completed", color: "bg-success" }
  ];

  return (
    <div className="min-h-screen bg-b1 flex flex-col selection:bg-primary/20 selection:text-primary">
      <NavBar />
      
      <main className="flex-grow pt-36 pb-24 max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Profile Header */}
        <_motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-20"
        >
          <div className="h-56 md:h-72 bg-[#1e293b] rounded-[3.5rem] overflow-hidden relative shadow-2xl shadow-black/40 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20 blur-[100px] pointer-events-none"></div>
            <div className="absolute top-10 right-10 flex gap-3">
              <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 shadow-xl">
                Elite Tier IV
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-12 left-10 md:left-16 flex flex-col md:flex-row items-end gap-8">
            <div className="relative group">
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-[2.5rem] border-8 border-b1 overflow-hidden shadow-[0_20px_50px_rgba(45,212,191,0.2)] bg-b1 group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-3 right-3 p-3.5 bg-primary text-b1 rounded-2xl shadow-lg hover:scale-110 transition-all border-4 border-b1">
                <Camera size={20} />
              </button>
            </div>
            
            <div className="pb-6 md:pb-4 text-center md:text-left space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-lg">
                {user?.displayName || "Executive User"}
              </h1>
              <p className="flex items-center justify-center md:justify-start gap-3 text-slate-500 font-bold text-sm tracking-widest uppercase">
                <Mail size={16} className="text-primary" /> {user?.email}
              </p>
            </div>
          </div>
        </_motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-24">
          {/* Account Settings */}
          <div className="lg:col-span-2 space-y-12">
            <div className="glass-card rounded-[3rem] p-10 md:p-14 shadow-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black flex items-center gap-4 text-white tracking-tight text-shadow-sm">
                  <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                  Profile Intelligence
                </h2>
              </div>

              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Digital Identity</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={20} />
                    <input 
                      type="text" 
                      name="name"
                      defaultValue={user?.displayName}
                      className="w-full pl-14 pr-6 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all font-bold text-white outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Avatar Interface</label>
                  <div className="relative group">
                    <Camera className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={20} />
                    <input 
                      type="text" 
                      name="photo"
                      defaultValue={user?.photoURL}
                      className="w-full pl-14 pr-6 py-5 bg-b1/50 border border-white/10 rounded-2xl focus:border-primary transition-all font-bold text-white outline-none" 
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-8 flex justify-end">
                  <button 
                    disabled={isUpdating}
                    className="btn-premium px-12 py-5 rounded-2xl flex items-center gap-4 text-xl font-black uppercase tracking-widest disabled:opacity-50"
                  >
                    {isUpdating ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <><Save size={24} /> Sync Core</>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Session Management */}
            <div className="glass-card rounded-[3rem] p-10 md:p-14 shadow-2xl border border-white/5">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black flex items-center gap-4 text-white tracking-tight">
                  <div className="w-1.5 h-8 bg-secondary rounded-full"></div>
                  Mission Log
                </h2>
                <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-primary/20">{mockSessions.length} Actives</span>
              </div>

              <div className="space-y-6">
                {mockSessions.map((session) => (
                  <div key={session.id} className="group p-6 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-white/5 transition-all duration-500 bg-white/[0.02]">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 ${session.color}/10 ${session.color.replace('bg-', 'text-')} rounded-2xl flex items-center justify-center shadow-lg border border-white/5`}>
                        <Clock size={28} />
                      </div>
                      <div>
                        <h4 className="font-black text-white text-xl tracking-tight">{session.title}</h4>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1 italic">{session.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-[10px] uppercase font-black tracking-widest px-4 py-2 rounded-xl ${session.color}/20 ${session.color.replace('bg-', 'text-')} border border-white/5`}>
                        {session.status}
                      </span>
                      <button className="p-3 text-slate-600 hover:text-primary transition-all group-hover:bg-white/5 rounded-xl border border-transparent group-hover:border-white/10">
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-12">
            <div className="bg-[#1e293b] text-white rounded-[3rem] p-10 space-y-8 relative overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
              <h4 className="text-2xl font-black tracking-tighter flex items-center gap-4">
                <ShieldCheck size={28} className="text-primary drop-shadow-glow" /> 
                Clearance
              </h4>
              <p className="text-lg text-slate-400 leading-relaxed font-bold italic">
                Your profile is undergoing strategic verification. All core modules remain operational.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <span>Sychronization</span>
                  <span className="text-primary">66%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-primary w-2/3 h-full rounded-full shadow-[0_0_20px_rgba(45,212,191,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/5 rounded-full blur-2xl"></div>
              <h4 className="font-black mb-6 text-xl text-white tracking-tight flex items-center gap-3">
                <Edit3 size={20} className="text-primary" /> Strategist Note
              </h4>
              <p className="text-slate-500 text-lg leading-relaxed italic font-bold">
                "Keep your interface synchronized to ensure counselor recognition during priority live transmissions."
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
