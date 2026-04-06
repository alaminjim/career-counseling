import { useContext, useState } from "react";
import { AuthContextUser } from "../Auth/AuthContext";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-20 max-w-6xl mx-auto px-4 md:px-8 w-full">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          <div className="h-48 md:h-64 bg-neutral rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-neutral/20 border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl"></div>
            <div className="absolute bottom-8 right-8 flex gap-3">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                Professional Level 4
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-10 left-8 md:left-12 flex flex-col md:flex-row items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-slate-50 overflow-hidden shadow-xl bg-white">
                <img 
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2.5 bg-primary text-white rounded-full shadow-lg hover:bg-primary-focus transition-all group-hover:scale-110">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="pb-4 md:pb-2 text-center md:text-left space-y-1">
              <h1 className="text-3xl md:text-4xl font-black text-neutral font-display">
                {user?.displayName || "Adventurer"}
              </h1>
              <p className="flex items-center justify-center md:justify-start gap-2 text-neutral/50 font-bold text-sm tracking-wide">
                <Mail size={14} className="text-primary" /> {user?.email}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-20 md:mt-16">
          {/* Account Settings */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Settings size={22} className="text-primary" /> Profile Settings
                </h2>
                <div className="h-[1px] flex-grow bg-neutral/5 mx-6"></div>
              </div>

              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral/40 uppercase tracking-widest ml-2">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                    <input 
                      type="text" 
                      name="name"
                      defaultValue={user?.displayName}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral/40 uppercase tracking-widest ml-2">Avatar URL</label>
                  <div className="relative">
                    <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
                    <input 
                      type="text" 
                      name="photo"
                      defaultValue={user?.photoURL}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-medium outline-none" 
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-4 flex justify-end">
                  <button 
                    disabled={isUpdating}
                    className="btn-premium px-10 flex items-center gap-3 disabled:opacity-50"
                  >
                    {isUpdating ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <><Save size={20} /> Synchronize Profile</>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Session Management */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Calendar size={22} className="text-primary" /> Booked Sessions
                </h2>
                <span className="bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-full">{mockSessions.length} Total</span>
              </div>

              <div className="space-y-4">
                {mockSessions.map((session) => (
                  <div key={session.id} className="group p-5 rounded-2xl border border-neutral/5 flex items-center justify-between hover:bg-slate-50 transition-all duration-300">
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 ${session.color}/10 ${session.color.replace('bg-', 'text-')} rounded-xl flex items-center justify-center`}>
                        <Clock size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral">{session.title}</h4>
                        <p className="text-sm font-medium text-neutral/40 italic">{session.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-lg ${session.color}/10 ${session.color.replace('bg-', 'text-')}`}>
                        {session.status}
                      </span>
                      <button className="p-2 text-neutral/20 hover:text-primary transition-colors group-hover:bg-white rounded-lg group-hover:shadow-sm">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-neutral text-white rounded-3xl p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <h4 className="text-xl font-bold font-display flex items-center gap-2">
                <ShieldCheck size={24} className="text-primary" /> Verification
              </h4>
              <p className="text-sm text-neutral-400 leading-relaxed font-medium italic">
                Your account is currently undergoing professional verification. Most features remain active during this phase.
              </p>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary w-2/3 h-full rounded-full"></div>
                </div>
                <span className="text-xs font-black">66%</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral/5">
              <h4 className="font-bold mb-4 text-emerald-600 flex items-center gap-2 uppercase tracking-widest text-xs">
                <Edit3 size={16} /> Quick Note
              </h4>
              <p className="text-neutral/70 text-sm leading-relaxed italic font-medium">
                "Keep your avatar and display name updated to ensure our counselors can recognize you during live sessions."
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
