import React from 'react';

interface Props {
  otp: string[];
  onChange: (index: number, value: string) => void;
  inputRef: React.RefObject<Array<HTMLInputElement | null>>;
}
const OTPInputGroup: React.FC<Props> = ({ otp, onChange, inputRef }) => {
  return (
    <form className="gap-2 mb-6 flex justify-center">
      {otp.map((digit, index) => (
        <input
        key={index}
        type="text"
        maxLength={1}
        value={digit}
        onChange={(e) => onChange(index, e.target.value.replace(/[^0-9]/g, ''))}
        ref={(el) => {
            if (inputRef.current) {
            inputRef.current[index] = el;
            }
        }}
        className="w-12 h-12 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-center"
        />
      ))}
    </form>
  );
};

export default OTPInputGroup;
