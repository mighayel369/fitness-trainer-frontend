interface TextInputProps {
  label?: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({label,type = "text",placeholder,value,onChange,error}) => (
  <div className="mb-4">
    {label && (
      <label className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
    )}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-red-600 text-sm text-left mt-1">{error}</p>}
  </div>
);

export default TextInput;
