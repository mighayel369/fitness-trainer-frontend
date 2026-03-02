interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  selected: string[];
  onChange: (value: string) => void;
  error?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  selected,
  onChange,
  error
}) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>

    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2">
          <input
            type="checkbox"
            value={opt.value}
            checked={selected.includes(opt.value)}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>

    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

export default CheckboxGroup
