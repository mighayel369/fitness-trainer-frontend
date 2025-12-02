import { Link, useLocation, useNavigate } from "react-router-dom";
import logoPic from '../assets/logo.jpg';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokenService } from "../services/tokenService";
import { clearAccessToken } from "../redux/slices/authSlice";

const TrainerSideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.accessToken);
  
  const [trainerStatus, setTrainerStatus] = useState<string>("");

  const navItems = [
    { label: "Dashboard", to: "/trainer" },
    { label: "Availability", to: "/trainer/availability" },
    { label: "Bookings", to: "/trainer/bookings" },
    { label: "Chats", to: "/trainer/chats" },
    { label: "Profile", to: "/trainer/trainer-profile" },
  ];

useEffect(() => {
  console.log('token from sidebar',token)
  const verifyTrainer = async () => {
    if (!token) {
      navigate('/trainer/login');
      return;
    }
    try {
      const res = await tokenService.verifyTrainerAccessToken();
      console.log("Verify Trainer Response:", res);

      if (!res.success || res.trainer.status === false) {
        dispatch(clearAccessToken());
        navigate('/trainer/login');
        return;
      }

      setTrainerStatus(res.trainer.verified)
    } catch (error) {
      console.error(error);
      dispatch(clearAccessToken());
      navigate('/trainer/login');
    }
  };

  verifyTrainer();
}, [token, navigate, dispatch]);

const isRestricted = trainerStatus === "pending" || trainerStatus === "rejected";


  return (
    <aside className="w-64 fixed top-4 left-4 bg-white border border-gray-300 text-gray-800 py-6 px-5 shadow-xl z-30 rounded-lg">
      <div className="flex flex-col items-center gap-2 mb-8">
        <img src={logoPic} alt="logo" className="w-14 h-14 object-cover rounded-full shadow-md" />
        <h1 className="text-2xl font-bold tracking-wide">FITCONNECT</h1>
        <p className="text-sm text-gray-500 font-medium">Trainer Portal</p>
      </div>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const disabled = isRestricted && item.label !== "Profile";
          return disabled ? (
            <span
              key={item.to}
              className="px-4 py-2 rounded-md text-base font-medium text-gray-400 cursor-not-allowed bg-gray-100"
            >
              {item.label}
            </span>
          ) : (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-2 rounded-md text-base transition-all duration-200 font-medium ${
                location.pathname === item.to
                  ? "bg-yellow-400 text-black shadow-md"
                  : "hover:bg-yellow-400 hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default TrainerSideBar;
