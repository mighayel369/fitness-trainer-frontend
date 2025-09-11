import { useState } from "react";
import { userService } from "../../services/userService";
import backgroundImage from '../../assets/full-shot-man-holding-device.jpg';
import TextInput from "../../components/TextInput";
import SubmitButton from "../../components/SubmitButton";
import LogoHeader from "../../components/LogoHeader";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setError('');
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const data = await userService.sendForgotPasswordLink(email);
      data.success ? setMsg('A reset link has been sent to your email.') : setError('No account found with this email.');
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden p-6 bg-gray-100">
      <img src={backgroundImage} alt="Background" className="w-full h-full object-cover absolute inset-0 z-0" />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white/50 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md px-8 py-10">
          <LogoHeader />
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Forgot Password</h1>
          <p className="text-sm text-gray-700 mb-6 text-center">Enter your registered email to reset your password</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            {msg && <p className="text-sm text-green-600 font-medium">{msg}</p>}
            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <SubmitButton loading={loading} text="Send Reset Link" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
