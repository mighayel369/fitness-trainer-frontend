import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAccessToken } from "../redux/slices/authSlice";
import { userAuthService } from "../services/user/user.Auth.service";

import logo from "../assets/logo.jpg";
import "./UserNavbar.css";

const UserNavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const verifyUser = async () => {
      try {
        const res = await userAuthService.verifyAccessToken();
        if (res.success) setUserName(res.name);
        else dispatch(clearAccessToken());
      } catch (error) {
        dispatch(clearAccessToken());
        setUserName("");
      }
    };
    verifyUser();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const handleLogout = async () => {
    await userAuthService.clearRefreshToken();
    dispatch(clearAccessToken());
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Trainers", path: "/trainers" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className={`nav-container ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-content">

        <div className="nav-logo" onClick={() => navigate("/")}>
          <div className="logo-wrapper">
            <img src={logo} alt="Vitalic Logo" />
          </div>
          <span className="brand-name">FitTribe</span>
        </div>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={location.pathname === link.path ? "active-link" : ""}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <div className="search-pill">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search sessions..." />
          </div>

          <div className="action-icons">
            <div className="notif-trigger" onClick={() => navigate('/notifications')}>
              <FaBell />
              <span className="notif-dot animate-pulse"></span>
            </div>

            {userName ? (
              <div 
                className="profile-trigger"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="user-avatar">
                   {userName.charAt(0).toUpperCase()}
                </div>
                <FaChevronDown className={`chevron ${showDropdown ? 'rotate' : ''}`} />
                
                {showDropdown && (
                  <div className="nav-dropdown">
                    <Link to="/profile">My Account</Link>
                    <Link to="/bookings">My Bookings</Link>
                    <div className="nav-divider"></div>
                    <button onClick={handleLogout}>Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <button className="nav-login-btn" onClick={() => navigate("/login")}>
                Join Vitalic
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;