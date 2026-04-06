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
    { id: 1, title: "Career Discovery Session", date: "Oct 24, 2026", status: "Upcoming", color: "bg-indigo-600", textColor: "text-indigo-600", bgColor: "bg-indigo-50" },
    { id: 2, title: "Resume Workshop", date: "Sep 15, 2026", status: "Completed", color: "bg-emerald-500", textColor: "text-emerald-600", bgColor: "bg-emerald-50" }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col selection:bg-indigo-100 selection:text-indigo-700">
      <NavBar />
      
      <main className="flex-grow pt-32 pb-24 max-w-6xl mx-auto px-6 md:px-12 w-full">
        {/* Profile Header */}
        <_motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-24"
        >
          <div className="h-64 md:h-80 bg-indigo-600 rounded-[3.5rem] overflow-hidden relative shadow-2xl shadow-indigo-100">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-emerald-400 opacity-40 blur-[80px] pointer-events-none"></div>
            {/* Grid Pattern mask */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
            
            <div className="absolute top-10 right-10 flex gap-3">
              <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 shadow-xl">
                Verified Strategist
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-16 left-10 md:left-16 flex flex-col md:flex-row items-end gap-8">
            <div className="relative group">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-[2.5rem] border-[12px] border-[#F9FAFB] overflow-hidden shadow-2xl bg-white group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-5 right-5 p-4 bg-indigo-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-[#F9FAFB] active:scale-95">
                <Camera size={22} />
              </button>
            </div>
            
            <div className="pb-10 md:pb-6 text-center md:text-left space-y-3">
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none">
                {user?.displayName || "Executive Analyst"}
              </h1>
              <p className="flex items-center justify-center md:justify-start gap-3 text-gray-400 font-bold text-sm tracking-widest uppercase">
                <Mail size={16} className="text-indigo-600" /> {user?.email}
              </p>
            </div>
          </div>
        </_motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-10">
          {/* Account Settings */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-indigo-100/20 border border-gray-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl"></div>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black flex items-center gap-4 text-gray-900 tracking-tight">
                  Core <span className="text-indigo-600 italic">Identity</span>
                </h2>
                <Settings size={24} className="text-gray-200" />
              </div>

              <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-4">Strategic Alias</label>
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input 
                      type="text" 
                      name="name"
                      defaultValue={user?.displayName}
                      className="input-premium pl-16 py-5 text-gray-900 font-bold shadow-inner" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-4">Network Node (Avatar)</label>
                  <div className="relative group">
                    <Camera className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input 
                      type="text" 
                      name="photo"
                      defaultValue={user?.photoURL}
                      className="input-premium pl-16 py-5 text-gray-900 font-bold shadow-inner" 
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-10 flex justify-end">
                  <button 
                    disabled={isUpdating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-14 py-5 rounded-2xl flex items-center gap-4 text-xl font-black uppercase tracking-widest disabled:opacity-50 transition-all shadow-xl shadow-indigo-100"
                  >
                    {isUpdating ? (
                      <span className="loading loading-spinner loading-md"></span>
                    ) : (
                      <><Save size={24} /> Sync Database</>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Session Management */}
            <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-indigo-100/20 border border-gray-50">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black flex items-center gap-4 text-gray-900 tracking-tight">
                  Mission <span className="text-emerald-500 italic">Log</span>
                </h2>
                <span className="bg-gray-50 text-gray-400 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border border-gray-100">{mockSessions.length} active sessions</span>
              </div>

              <div className="space-y-6">
                {mockSessions.map((session) => (
                  <div key={session.id} className="group p-8 rounded-[2.5rem] border border-gray-50 flex items-center justify-between hover:bg-indigo-50/30 transition-all duration-400 bg-gray-50/50 shadow-sm">
                    <div className="flex items-center gap-8">
                      <div className={`w-16 h-16 ${session.bgColor} ${session.textColor} rounded-2xl flex items-center justify-center shadow-sm border border-white`}>
                        <Clock size={32} />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 text-2xl tracking-tight leading-tight">{session.title}</h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{session.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className={`text-[10px] uppercase font-black tracking-widest px-5 py-2.5 rounded-xl ${session.bgColor} ${session.textColor} border border-white shadow-sm`}>
                        {session.status}
                      </span>
                      <button className="p-4 text-gray-300 hover:text-indigo-600 transition-all hover:bg-white rounded-2xl border border-transparent hover:border-indigo-100 shadow-sm group-hover:scale-110">
                        <ExternalLink size={22} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-12">
            <div className="bg-gray-900 text-white rounded-[3rem] p-10 space-y-10 relative overflow-hidden shadow-2xl shadow-gray-200">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>
              <h4 className="text-2xl font-black tracking-tight flex items-center gap-4">
                <ShieldCheck size={28} className="text-emerald-400" /> 
                System Access
              </h4>
              <p className="text-lg text-gray-400 leading-relaxed font-bold">
                Your profile is synchronized with elite global counseling protocols. No blockers detected.
              </p>
              <div className="space-y-6">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  <span>Profile Integrity</span>
                  <span>100%</span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-white/5 border border-white/10">
                    <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[3.5rem] border border-gray-50 shadow-xl shadow-indigo-100/20 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
              <h4 className="font-black mb-6 text-2xl text-gray-900 tracking-tight flex items-center gap-4">
                <Edit3 size={24} className="text-secondary" /> Observer Log
              </h4>
              <p className="text-gray-400 text-lg leading-relaxed italic font-bold">
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
