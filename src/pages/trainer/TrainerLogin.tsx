import React, { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setAccessToken } from '../../redux/slices/authSlice';
import { trainerAuthService } from '../../services/trainerAuthService';
import { loginValidate } from '../../validations/loginValidate';

import BackgroundImageWrapper from '../../components/BackgroundImage';
import LogoHeader from '../../components/LogoHeader';
import TextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import SubmitButton from '../../components/SubmitButton';

import loginpic from '../../assets/trainer-loginpic.jpg';

interface Errors {
  email?: string;
  password?: string;
}

const TrainerLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleForgotPassword = () => navigate('/forgot-password');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = loginValidate({ email, password });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await trainerAuthService.loginTrainer(email, password);
  if (result.success) {
    dispatch(setAccessToken(result.accessToken));

    if (result.status === 'accepted') {
      navigate('/trainer'); 
    } else {
      navigate('/trainer/trainer-profile'); 
    }
  }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message;
      const msgMap: Record<string, string> = {
        'Trainer Not Found': 'Trainer not found',
        'Password is incorrect': 'Incorrect password',
        'Trainer Is Blocked': 'Your account is blocked',
        'Trainer Is Not Verified': 'Trainer is not verified',
      };
      setErrors({ password: msgMap[errorMsg] || 'Incorrect data' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundImageWrapper image={loginpic}>
      <div className="bg-white/70 bg-opacity-90 rounded-lg shadow-xl p-6 md:p-10 w-full max-w-md text-center">
        <LogoHeader />
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Trainer Login</h1>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <TextInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            error={errors.password}
            showButton={false}
          />
          <SubmitButton loading={loading} text="Login" />
        </form>

        <p
          onClick={handleForgotPassword}
          className="text-sm font-medium text-right mt-2 cursor-pointer text-blue-600 hover:underline"
        >
          Forgot Password?
        </p>

        <p className="mt-2 text-sm text-center">
          Create an account?{' '}
          <Link to="/trainer/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </BackgroundImageWrapper>
  );
};

export default TrainerLogin;
