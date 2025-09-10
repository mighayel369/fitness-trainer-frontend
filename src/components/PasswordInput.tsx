import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showButton:boolean;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, value, onChange,showButton, error }) => {
  const [show, setShow] = useState(showButton);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {show ? <FaEye /> : <FaEyeSlash />}
      </div>
      {error && <p className="text-red-600 text-sm text-left">{error}</p>}
    </div>
  );
};

export default PasswordInput;
