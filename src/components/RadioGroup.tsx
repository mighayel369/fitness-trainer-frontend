interface RadioGroupProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, value, onChange, error }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <div className="flex gap-4">
      {options.map((opt) => (
        <label key={opt}>
          <input type="radio" name={name} value={opt} checked={value === opt} onChange={onChange} /> {opt}
        </label>
      ))}
    </div>
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

export default RadioGroup;
