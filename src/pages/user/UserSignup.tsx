import React, { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signuppic from '../../assets/signuppic.jpg';
import { signupValidate } from '../../validations/signupValidate';
import { userService } from '../../services/userService';
import { setEmail,setRole } from '../../redux/slices/otpSlice';
import { useAppDispatch } from '../../redux/hooks';

import LogoHeader from '../../components/LogoHeader';
import TextInput from '../../components/TextInput';
import PasswordInput from '../../components/PasswordInput';
import SubmitButton from '../../components/SubmitButton';
import GoogleAuthButton from '../../components/GoogleAuthButton';
import BackgroundImageWrapper from '../../components/BackgroundImage';

interface Errors {
  email?: string;
  name?: string;
  password?: string;
  confirm?: string;
}

const UserSignup: React.FC = () => {
  const [email, setEmailVal] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Errors = signupValidate({ name, email, password, confirm });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await userService.signup(name, email, password);

      if (response.success) {
        console.log(response)
        setErrors({});
        console.log('dispatching')
        dispatch(setEmail(email));
        dispatch(setRole('user'))
        console.log('user')
        const otpSent = await userService.otpsent(email,'user');
        console.log(otpSent)

        if (otpSent) {
          localStorage.setItem('startTime', Date.now().toString());
          navigate('/otp');
        }
      } else {
        setErrors({ email: response.message });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unexpected server error';
      console.log(error)
      setErrors({ email: message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    userService.googleLogin()
  };


  return (
<BackgroundImageWrapper image={signuppic}>
  <div className="flex justify-end w-full h-full items-center">
    <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6 md:p-10 w-full max-w-md text-center mr-8">
      <LogoHeader />

      <h1 className="text-3xl font-bold mb-4 text-gray-800">Register</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />
        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmailVal(e.target.value)}
          error={errors.email}
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showButton={false}
          error={errors.password}
        />
        <PasswordInput
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          showButton={false}
          error={errors.confirm}
        />
        <SubmitButton loading={loading} text="Sign Up" />
      </form>

      <p className="mt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>

     <GoogleAuthButton text="Sign in with Google" onClick={handleGoogleLogin} />
    </div>
  </div>
</BackgroundImageWrapper>

  );
};

export default UserSignup;
