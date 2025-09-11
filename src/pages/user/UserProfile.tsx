import UserNavBar from "../../layout/UserNavBar";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaCalendarAlt,
  FaWallet,
  FaHistory,
  FaCog
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/AxiosInstance";

const defaultImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("schedule");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axiosInstance.get("/user-details", {
          withCredentials: true,
        });
        if (res.data?.success) {
          setUser(res.data.userData);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    getUserData();
  }, []);

  const handleEditPage = () => {
    navigate("/profile/edit");
  };

  return (
    <>
      <UserNavBar />

      <div className="pt-28 pb-10">
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg border border-black shadow-none">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <img
              src={defaultImage}
              alt="Profile"
              className="w-28 h-28 rounded-full border-2 border-gray-300"
            />

            <div className="flex-1 space-y-3">
              <h2 className="text-3xl font-bold">
                {user?.name || "No Name Available"}
              </h2>

              <p className="text-gray-700 flex items-center gap-3 text-lg">
                <FaEnvelope className="text-gray-500" /> {user?.email}
              </p>

              <p
                className={`flex items-center gap-3 text-lg ${
                  user?.phone ? "text-gray-700" : "text-gray-400 italic"
                }`}
              >
                <FaPhone className="text-gray-500" />{" "}
                {user?.phone || "No Phone Number Added"}
              </p>

              <p
                className={`flex items-center gap-3 text-lg ${
                  user?.address ? "text-gray-700" : "text-gray-400 italic"
                }`}
              >
                <FaMapMarkerAlt className="text-gray-500" />{" "}
                {user?.address || "No Address Added"}
              </p>
            </div>

            <div>
              <button
                onClick={handleEditPage}
                className="flex items-center gap-2 px-5 py-3 bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition"
              >
                <FaEdit /> Edit
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mt-4 mx-auto p-6 bg-white rounded-lg border border-black shadow-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div
              onClick={() => setActiveTab("schedule")}
              className={`cursor-pointer p-4 rounded-lg transition ${
                activeTab === "schedule"
                  ? "bg-blue-100 border border-blue-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaCalendarAlt className="text-4xl mx-auto mb-2 text-blue-600" />
              <p className="font-semibold">My Schedule</p>
            </div>

            <div
              onClick={() => setActiveTab("wallet")}
              className={`cursor-pointer p-4 rounded-lg transition ${
                activeTab === "wallet"
                  ? "bg-blue-100 border border-blue-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaWallet className="text-4xl mx-auto mb-2 text-green-600" />
              <p className="font-semibold">Wallet</p>
            </div>

            <div
              onClick={() => setActiveTab("history")}
              className={`cursor-pointer p-4 rounded-lg transition ${
                activeTab === "history"
                  ? "bg-blue-100 border border-blue-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaHistory className="text-4xl mx-auto mb-2 text-orange-600" />
              <p className="font-semibold">Booking History</p>
            </div>

            <div
              onClick={() => setActiveTab("settings")}
              className={`cursor-pointer p-4 rounded-lg transition ${
                activeTab === "settings"
                  ? "bg-blue-100 border border-blue-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaCog className="text-4xl mx-auto mb-2 text-gray-700" />
              <p className="font-semibold">Settings</p>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mt-4 mx-auto p-6 bg-white rounded-lg border border-black shadow-none">
          {activeTab === "schedule" && <p>📅 Here are your schedule details...</p>}
          {activeTab === "wallet" && <p>💰 Wallet balance and transactions...</p>}
          {activeTab === "history" && <p>📜 Your booking history...</p>}
          {activeTab === "settings" && <p>⚙️ Profile and account settings...</p>}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
