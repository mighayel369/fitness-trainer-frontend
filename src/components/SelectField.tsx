interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options, error }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-md"
    >
      <option value="" disabled>Select {label.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option} years</option>
      ))}
    </select>
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

export default SelectField;