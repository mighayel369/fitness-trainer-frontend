import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginValidate } from '../../validations/loginValidate';
import { setAccessToken } from '../../redux/slices/authSlice';
import { adminAuthService } from '../../services/adminAuthService';

import TextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import SubmitButton from '../../components/SubmitButton';
import LogoHeader from '../../components/LogoHeader';
import BackgroundImageWrapper from '../../components/BackgroundImage'; 
import adminLoginPic from '../../assets/perfectly-ordered-compositions-view.jpg'; 

interface Errors {
  email?: string;
  password?: string;
}

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = loginValidate({ email, password });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await adminAuthService.loginAdmin(email, password);
      if (response.success) {
        dispatch(setAccessToken(response.accessToken));
        navigate('/admin');
      }
    } catch (error: any) {
      console.log(error)
      setErrors({
        password: error.response?.data?.message || 'Something went wrong. Try again.',
      });
    }
  };

  return (
    <BackgroundImageWrapper image={adminLoginPic}>
      <div className='flex justify-center w-full h-full items-center '>
        <div className="bg-white bg-opacity-95 rounded-lg shadow-2xl p-8 md:p-10 w-full max-w-md text-center z-10">
        <LogoHeader />
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <TextInput
            type="email"
            placeholder="Admin Email"
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
          <SubmitButton text="Login" loading={false} />
        </form>
      </div>
      </div>
    </BackgroundImageWrapper>
  );
};

export default AdminLogin;