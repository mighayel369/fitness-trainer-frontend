interface SubmitButtonProps {
  loading?: boolean;
  text: string;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, text, onClick }) => (
  <button
    type="submit"
    disabled={loading}
    onClick={onClick}
    className={`w-full py-2 rounded-md font-semibold transition ${
      loading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
    }`}
  >
    {loading ? "Please wait..." : text}
  </button>
);

export default SubmitButton;
