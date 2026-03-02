// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useState } from "react";

// interface PasswordInputProps {
//   placeholder: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   showButton:boolean;
//   error?: string;
// }

// const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, value, onChange,showButton, error }) => {
//   const [show, setShow] = useState(showButton);

//   return (
//     <div className="relative">
//       <input
//         type={show ? "text" : "password"}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <div
//         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
//         onClick={() => setShow(!show)}
//       >
//         {show ? <FaEye /> : <FaEyeSlash />}
//       </div>
//       {error && <p className="text-red-600 text-sm text-left">{error}</p>}
//     </div>
//   );
// };

// export default PasswordInput;


import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

interface PasswordInputProps {
  label?: string; 
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showButton: boolean; 
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  showButton, 
  error 
}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col w-full space-y-1">
      {label && (
        <label className="text-sm font-bold text-gray-700 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2.5 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 
            ${error 
              ? "border-red-500 focus:ring-red-200" 
              : "border-gray-200 focus:border-red-500 focus:ring-red-100"
            }`}
        />

        {showButton && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer p-1"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            tabIndex={-1} 
          >
            {isPasswordVisible ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-600 text-xs font-medium ml-1 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;