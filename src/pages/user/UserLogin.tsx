import loginpic from '../../assets/loginpic.jpg';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginValidate } from '../../validations/loginValidate';
import { setAccessToken } from '../../redux/slices/authSlice';
import { userService } from '../../services/userService';

import LogoHeader from '../../components/LogoHeader';
import TextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import SubmitButton from '../../components/SubmitButton';
import GoogleAuthButton from '../../components/GoogleAuthButton';
import BackgroundImageWrapper from '../../components/BackgroundImage';

interface Errors {
  email?: string;
  password?: string;
}

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = loginValidate({ email, password });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const result = await userService.login(email, password);

      if (result.success && result.accessToken) {
        dispatch(setAccessToken(result.accessToken));
        navigate('/');
      }
    } catch (error: any) {
      newErrors.password = error.response?.data?.message || 'Something Went Wrong. Try Again';
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleGoogleLogin = () => {
    userService.googleLogin();
  };

  return (
    <BackgroundImageWrapper image={loginpic}>
      <div className="flex justify-start w-full h-full items-center p-4 md:p-12">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6 md:p-10 w-full max-w-md text-center">
          <LogoHeader />

          <h1 className="text-3xl font-bold mb-4 text-gray-800">Login User</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showButton={false}
              error={errors.password}
            />

            <SubmitButton loading={loading} text="Login" />
          </form>

          <p
            onClick={handleForgotPassword}
            className="text-sm font-medium text-right mt-1 cursor-pointer bg-transparent border-none text-blue-600 hover:underline"
          >
            Forgot Password?
          </p>

          <p className='mt-1'>
            Create an account? <Link to='/signup' className='text-blue-600 font-semibold'>Sign up</Link>
          </p>

          <GoogleAuthButton text="Sign in with Google" onClick={handleGoogleLogin} />
        </div>
      </div>
    </BackgroundImageWrapper>
  );
};

export default UserLogin;
