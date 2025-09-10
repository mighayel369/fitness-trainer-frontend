import { FcGoogle } from "react-icons/fc";

interface GoogleAuthButtonProps {
  text: string;
  onClick: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ text, onClick }) => (
  <div
    className="mt-2 bg-white flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 px-4 cursor-pointer hover:shadow-md transition duration-300"
    onClick={onClick}
  >
    <FcGoogle className="text-2xl" />
    <span className="text-gray-700 font-medium">{text}</span>
  </div>
);

export default GoogleAuthButton;
