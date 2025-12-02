import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { userService } from '../../services/userService';
import { setEmailNull,setRoleNull } from '../../redux/slices/otpSlice';
import otppic from '../../assets/otppage.jpg';

import LogoHeader from '../../components/LogoHeader';
import SubmitButton from '../../components/SubmitButton';
import BackgroundImageWrapper from '../../components/BackgroundImage';
import OTPInputGroup from '../../components/OTPInputGroup';

const OTP: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [timer, setTimer] = useState<number>(60);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const email = useAppSelector((state) => state.otp.Useremail);
  const role = useAppSelector((state) => state.otp.role);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
  document.title = "FitConnect | OTP Verification";
}, []);
  useEffect(() => {
    const startTime = localStorage.getItem('startTime');
    if (startTime) {
      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const remaining = 60 - elapsed;
      setTimer(remaining > 0 ? remaining : 0);
    } else {
      setTimer(0);
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          localStorage.removeItem('startTime');
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) inputRef.current[index + 1]?.focus();
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    try {
      const result = await userService.verifyOtp(email, otpCode);
      if (result.success) {
        dispatch(setEmailNull());
         dispatch(setRoleNull());
        localStorage.removeItem('startTime');
        navigate(result.role === 'trainer' ? '/trainer/login' : '/login');
      } else {
        setError('Invalid OTP');
      }
    } catch {
      setError('Invalid OTP');
    }
  };

  const handleResend = async () => {
    try {
      await userService.otpsent(email,role);
      setOtp(new Array(6).fill(''));
      inputRef.current[0]?.focus();
      localStorage.setItem('startTime', Date.now().toString());
      setTimer(60);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>

    <BackgroundImageWrapper image={otppic}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-white/50 backdrop-blur-md rounded-xl shadow-xl w-full max-w-md px-8 py-10 text-center">
          <LogoHeader />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">OTP VERIFICATION</h1>
          <p className="text-sm text-gray-700 mb-6">Enter the OTP sent to your email</p>

          <OTPInputGroup
            otp={otp}
            onChange={handleOtpChange}
            inputRef={inputRef}
          />

          {error && <p className="text-sm text-red-600 font-medium mb-4">{error}</p>}

          <span className="font-medium">{timer} s</span>
          <div className="mb-6 text-sm text-gray-700">
            Didn’t receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={timer > 0}
              className={`font-medium ${
                timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-black hover:underline'
              }`}
            >
              Resend Code
            </button>
          </div>

          <SubmitButton text="Verify" onClick={handleSubmit} />
        </div>
      </div>
    </BackgroundImageWrapper>
    </>
  );
};

export default OTP;
