import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import bgpic from "../../assets/reload-reset-technology-update-digital.jpg";
import { useEffect } from "react";
import LogoHeader from "../../components/LogoHeader";
import PasswordInput from "../../components/PasswordInput";
import SubmitButton from "../../components/SubmitButton";
import BackgroundImageWrapper from "../../components/BackgroundImage";

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  document.title = "FitConnect | Reset Password";
}, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await userService.resetPassword(token, password);

      if (response.success) {
        const role = response.role;
        navigate(role === "trainer" ? "/trainer/login" : "/login");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>


    <BackgroundImageWrapper image={bgpic}>
      <div className="flex items-center justify-center w-full h-full z-10">
        <div className="bg-white/50 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md px-8 py-10">
          <LogoHeader />

          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Reset Password</h1>
          <p className="text-sm text-gray-700 mb-6 text-center">Enter your new password below</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <PasswordInput
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showButton={false}
            />

            <PasswordInput
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              showButton={false}
            />

            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <SubmitButton text="Reset Password" loading={loading} />
          </form>
        </div>
      </div>
    </BackgroundImageWrapper>
    </>
  );
};

export default ResetPassword;
