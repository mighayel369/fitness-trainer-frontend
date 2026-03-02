
import UserNavBar from "../../layout/UserNavBar";
import React, { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaCalendarAlt,
  FaWallet,
  FaHistory,
  FaCog,
  FaCamera,
  FaArrowRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userProfileService } from "../../services/user/user.Profile.service";
import { userWalletService } from "../../services/user/user.Wallet.service";
import Toast from "../../components/Toast";
const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("wallet"); 
  const [wallet, setWallet] = useState<any>(null);
  const [walletLoading, setWalletLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Vitalic | My Account";
    getUserData();
    fetchWalletData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await userProfileService.fetchUserProfile()
      if (res.success) setUser(res.userData);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const fetchWalletData = async () => {
    try {
      setWalletLoading(true);
      const res = await userWalletService.fetchUserWallet();
      if (res?.success) setWallet(res.data);
    } catch (error) {
      console.error("Error fetching wallet data", error);
    } finally {
      setWalletLoading(false);
    }
  };

  const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await userProfileService.updateUserProfilePic(formData);
      if(res.success){
        setUser((prev: any) => ({ ...prev, profilePic: res.data?.imageUrl }));
        setToastType("success")
        setToastMessage(res.message)
      }else{
        setToastType("error")
        setToastMessage(res.message||"Something went wrong try again!")
      }
    } catch (err) {
      console.log(err);
    }
  };

  const walletColumns = [
    { header: "Date", accessor: "createdAt", render: (row: any) => new Date(row.createdAt).toLocaleDateString() },
    { header: "Type", accessor: "type", render: (row: any) => (
      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
        {row.type}
      </span>
    )},
    { header: "Source", accessor: "source" },
    { header: "Amount", accessor: "amount", render: (row: any) => (
      <span className={`font-bold ${row.type === "credit" ? "text-green-600" : "text-red-600"}`}>
        {row.type === "credit" ? "+" : "-"} ₹{row.amount}
      </span>
    )}
  ];

  const tabs = [
    { id: "schedule", label: "My Schedule", icon: <FaCalendarAlt /> },
    { id: "wallet", label: "Wallet", icon: <FaWallet /> },
    { id: "history", label: "Booking History", icon: <FaHistory /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavBar />
       {toastMessage && (
          <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      )}
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="relative group">
              <div className="w-44 h-44 rounded-full border-4 border-white shadow-xl overflow-hidden ring-1 ring-gray-100">
                <img src={user?.profilePic || DEFAULT_IMAGE} className="w-full h-full object-cover" alt="Profile" />
              </div>
              <label htmlFor="profilePicUpload" className="absolute bottom-2 right-2 bg-red-600 p-3 rounded-full cursor-pointer shadow-lg hover:bg-red-700 transition-all transform hover:scale-110">
                <FaCamera className="text-white" />
                <input type="file" id="profilePicUpload" className="hidden" onChange={handleProfilePicChange} />
              </label>
            </div>


            <div className="flex-1 text-center md:text-left">
              <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Vitalic Member</span>
              <h1 className="text-4xl font-black text-gray-900 mt-1">{user?.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-500 text-sm">
                <span className="flex items-center gap-2"><FaEnvelope className="text-red-400" /> {user?.email}</span>
                {user?.phone && <span className="flex items-center gap-2"><FaPhone className="text-red-400" /> {user?.phone}</span>}
                {user?.address && <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-400" /> {user?.address}</span>}
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-3xl p-6 min-w-[200px] text-center shadow-2xl shadow-gray-200">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Wallet Balance</p>
              <h2 className="text-3xl font-black">₹{wallet?.balance ?? 0}</h2>
              <button onClick={() => setActiveTab("wallet")} className="mt-3 text-[10px] font-bold text-red-500 flex items-center gap-2 mx-auto hover:text-red-400">
                VIEW TRANSACTIONS <FaArrowRight />
              </button>
            </div>
            
            <button onClick={() => navigate("/profile/edit")} className="p-3 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors">
              <FaEdit className="text-xl" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                activeTab === tab.id 
                ? "bg-red-600 text-white shadow-lg shadow-red-200" 
                : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 min-h-[400px] animate-in fade-in slide-in-from-bottom-4">
          {activeTab === "wallet" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-gray-900">Transaction History</h3>
                <button className="bg-gray-900 text-white px-6 py-2 rounded-xl text-xs font-bold">Add Funds</button>
              </div>
              <div className="border border-gray-50 rounded-2xl overflow-hidden">
                <GenericTable
                  data={wallet?.transactions || []}
                  columns={walletColumns}
                  page={1}
                  loading={walletLoading}
                  emptyMessage="No transactions recorded yet."
                />
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="text-center py-20">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-3xl text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Coming Up Next</h3>
              <p className="text-gray-500 mt-2">No training sessions scheduled for today.</p>
              <button onClick={() => navigate('/trainers')} className="mt-6 text-red-600 font-bold hover:underline">Find a Trainer</button>
            </div>
          )}

          {activeTab === "history" && <p className="text-gray-500 italic">No previous booking history found.</p>}
          {activeTab === "settings" && <p className="text-gray-500 italic">General account settings and preferences.</p>}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
