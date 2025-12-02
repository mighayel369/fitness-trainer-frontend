import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
import UserLogin from "../pages/user/UserLogin";
import UserSignup from "../pages/user/UserSignup";
import OTP from "../pages/user/OTP";
import ForgotPassword from "../pages/user/ForgotPassword";
import ResetPassword from "../pages/user/ResetPassword";
import GoogleAuthSuccess from "../pages/user/GoogleAuthSuccess";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";
import UserProfile from "../pages/user/UserProfile";
import EditProfile from "../pages/user/EditProfile";
import TrainerListing from "../pages/user/TrainerListing";
import TrainerProfile from "../pages/user/TrainerProfile";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="profile" element={<UserProfile />} />
      <Route path="profile/edit" element={<EditProfile />} />

      <Route path="trainers" element={<TrainerListing />} />
      <Route path="trainer-details/:id" element={<TrainerProfile />} />

      <Route path="login" element={<PublicRoute><UserLogin /></PublicRoute>} />
      <Route path="signup" element={<PublicRoute><UserSignup /></PublicRoute>} />

      <Route path="otp" element={<PrivateRoute><OTP /></PrivateRoute>} />

      <Route path="oauth-success" element={<GoogleAuthSuccess />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}
