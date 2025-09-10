import logoPic from '../assets/logo.jpg'
import { FaUserCircle } from "react-icons/fa"
import { IoIosNotifications } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { tokenService } from '../services/tokenService'
import { clearAccessToken } from "../redux/slices/authSlice";
const AdminTopBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const handleLogout = async() => {
    await tokenService.clearRefreshToken()
    dispatch(clearAccessToken());
    navigate('/admin/login');
  };

  return (
    <nav className="bg-black text-white w-full h-16 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
        <img src={logoPic} alt="logo" className="w-10 h-10 object-cover rounded-full" />
        <h1 className="text-xl font-semibold">FITCONNECT ADMIN PANEL</h1>
      </div>
      <div className="flex gap-5 items-center text-2xl">
        <div className="relative" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} >
          <FaUserCircle className="navbar-link" />
          {showDropdown && (
            <div className="absolute right-0 mt-0 w-24 bg-white rounded shadow-lg z-10 text-sm font-medium border border-gray-200 py-1 px-1">
              <button
                onClick={handleLogout}
                className="block text-left w-full px-3 py-2 text-gray-700 hover:bg-blue-300 hover:text-white rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <IoIosNotifications className="cursor-pointer hover:text-yellow-400" />
      </div>
    </nav>
  )
}

export default AdminTopBar