import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAccessToken } from "../redux/slices/authSlice";
import { tokenService } from "../services/tokenService";
import logo from "../assets/logo.jpg"
import "./UserNavbar.css";
import { useEffect } from "react";
const UserNavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const handleLogin = () => {
    navigate("/login");
  };

useEffect(() => {
  const verifyUser = async () => {
    try {
      const res = await tokenService.verifyAccessToken()
      console.log(res)
      const { success, name } = res

      if (success) {
        setUserName(name);
      } else {
        dispatch(clearAccessToken());
        setUserName('');
      }

    } catch (error: any) {
      if (error.response?.data?.message === 'User is blocked') {
        dispatch(clearAccessToken());
        navigate('/user/login');  
      } else {
        dispatch(clearAccessToken());
        setUserName('');    
      }
    }
  };
  verifyUser();
}, [dispatch, navigate]);


  const handleLogout =async () => {
    await tokenService.clearRefreshToken()
    dispatch(clearAccessToken());
    navigate('/login');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <img src={logo} alt="logo" className="navbar-icon" />
        <h1>FITCONNECT</h1>
      </div>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <p className="navbar-link">About</p>
        <Link to="/trainers" className="navbar-link">Trainers</Link>
        <p className="navbar-link">Booking</p>
        <FaSearch className="navbar-link" />

        {userName ? (
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <FaUserCircle className="navbar-link" />
            {showDropdown && (
              <div className="absolute right-0 mt-0 w-24 bg-white rounded shadow-lg z-10 text-sm font-medium border border-gray-200 py-1 px-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-300 hover:text-white rounded"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-left w-full px-3 py-2 text-gray-700 hover:bg-blue-300 hover:text-white rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="px-2 py-1 bg-blue-600 text-white font-semibold rounded-lg border border-blue-700 hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default UserNavBar;
