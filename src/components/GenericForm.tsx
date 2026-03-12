import { useState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "email" | "password" | "number" | "date"|"file";
  placeholder?: string;
  required?: boolean;
  rows?: number; 
}

interface GenericFormProps {
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void>;
  buttonText: string;
  loading:boolean;
  externalErrors?: Record<string, string>;
}

const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  initialValues = {},
  onSubmit,
  buttonText,
  loading,
  externalErrors = {}
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});

useEffect(() => {
  const defaults: Record<string, any> = {};
  fields.forEach((f) => {
    defaults[f.name] = f.type === "file" ? null : initialValues[f.name] ?? "";
  });
  setFormValues(defaults);
}, []);

  const handleChange = (name: string, value: any, type: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (type === "file" && value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreviews((prev) => ({ ...prev, [name]: objectUrl }));
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col group">
          <label className="block text-sm font-semibold text-gray-700 mb-1 group-focus-within:text-blue-600 transition-colors">
            {field.label}
          </label>
          
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              rows={field.rows || 3}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field.type)}
              placeholder={field.placeholder}
              className={`mt-1 block w-full rounded-xl border px-4 py-3 text-gray-600 transition-all focus:ring-4 focus:outline-none ${
                externalErrors[field.name] 
                  ? "border-red-400 focus:ring-red-100" 
                  : "border-gray-200 focus:ring-blue-50 focus:border-blue-400"
              }`}
            />
          ) : field.type === "file" ? (
            <div className="mt-1 flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 transition-colors bg-gray-50/50">
              {previews[field.name] ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                  <img 
                    src={previews[field.name]} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviews(p => ({ ...p, [field.name]: "" }));
                      setFormValues(v => ({ ...v, [field.name]: null }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs shadow-lg hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Upload a high-quality JPG or PNG</p>
                </div>
              )}
              
              <input
                type="file"
                name={field.name}
                accept="image/*"
                onChange={(e) => handleChange(field.name, e.target.files?.[0], field.type)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formValues[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value, field.type)}
              placeholder={field.placeholder}
              className={`mt-1 block w-full rounded-xl border px-4 py-3 text-gray-600 transition-all focus:ring-4 focus:outline-none ${
                externalErrors[field.name] 
                  ? "border-red-400 focus:ring-red-100" 
                  : "border-gray-200 focus:ring-blue-50 focus:border-blue-400"
              }`}
            />
          )}

          {externalErrors[field.name] && (
            <span className="mt-2 text-xs font-bold text-red-500 flex items-center gap-1 uppercase tracking-wide">
               ⚠️ {externalErrors[field.name]}
            </span>
          )}
        </div>
      ))}

      <div className="pt-4">
        <SubmitButton text={buttonText} loading={loading}/>
      </div>
    </form>
  );
};
export default GenericForm;
