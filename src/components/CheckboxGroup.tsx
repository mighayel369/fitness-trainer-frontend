interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (option: string) => void;
  error?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({label, options, selected, onChange, error }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2">
          <input type="checkbox" value={opt} checked={selected.includes(opt)} onChange={() => onChange(opt)} />
          {opt}
        </label>
      ))}
    </div>
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </div>
);

export default CheckboxGroup;
