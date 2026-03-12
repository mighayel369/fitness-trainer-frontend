import { FaSearch, FaBell, FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { clearAccessToken } from "../redux/slices/authSlice";
import { AuthService } from "../services/auth-service";
import logo from "../assets/logo.jpg";
import "./UserNavbar.css";

const UserNavBar = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [user, setUser] = useState<any>("");
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const verifyUser = async () => {
      try {
        const res = await AuthService.VerifyUserAccount();
        if (res.success) setUser(res.user);
        else dispatch(clearAccessToken());
      } catch (error:any) {
        let errMesg=error.response?.data?.message
        dispatch(clearAccessToken());
        setUser("");
      }
    };
    verifyUser();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch]);

  const handleLogout = async () => {
    await AuthService.Logout();
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

            {user.name ? (
              <div 
                className="profile-trigger"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="user-avatar">
                   {user.name.charAt(0).toUpperCase()}
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