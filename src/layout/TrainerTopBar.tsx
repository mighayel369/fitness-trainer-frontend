import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { tokenService } from "../services/tokenService";
import { clearAccessToken } from "../redux/slices/authSlice";


const TrainerTopBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    await tokenService.clearRefreshToken()
    dispatch(clearAccessToken());
    navigate('/trainer/login');
  }



  return (
    <nav className="bg-zinc-100 border border-gray-200 rounded-lg h-20 px-8 flex justify-between items-center fixed top-5 right-5 left-72 z-20 shadow-md">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 w-64"
        />
      </div>
      <div className="flex items-center gap-6 text-2xl relative">
        <IoIosNotifications className="cursor-pointer text-gray-600 hover:text-yellow-500" />
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <FaUserCircle className="cursor-pointer text-gray-600 hover:text-yellow-500" />
          {showDropdown && (
            <div className="absolute right-0 w-32 bg-white text-gray-800 rounded shadow-lg z-20 text-sm border">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-yellow-400 hover:text-white rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TrainerTopBar;