import { useState, useEffect } from "react";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "email" | "password" | "number" | "date";
  placeholder?: string;
  required?: boolean;
  rows?: number; 
}

interface GenericFormProps {
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void>;
  buttonText: string;
}

const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  initialValues = {},
  onSubmit,
  buttonText,
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  useEffect(() => {
    const defaults: Record<string, any> = {};
    fields.forEach((f) => {
      defaults[f.name] = initialValues[f.name] || "";
    });
    setFormValues(defaults);
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              rows={field.rows || 3}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default GenericForm;
