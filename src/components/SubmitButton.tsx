interface SubmitButtonProps {
  loading?: boolean;
  text: string;
  onClick?: () => void;
  className?: string; 
  type?: "button" | "submit";
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  loading, 
  text, 
  onClick, 
  className, 
  type = "submit" 
}) => (
  <button
    type={type}
    disabled={loading}
    onClick={onClick}
    className={`relative flex items-center justify-center w-full py-2.5 rounded-md font-semibold transition-all duration-200 ${
      loading 
        ? "bg-gray-400 text-transparent cursor-not-allowed" 
        : className || "bg-black text-white hover:bg-gray-800 active:scale-95"
    }`}
  >
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          className="animate-spin h-5 w-5 text-white" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    )}

    <span className={loading ? "opacity-0" : "opacity-100"}>
      {text}
    </span>
  </button>
);

export default SubmitButton;