import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrainerTopBar from "../../layout/TrainerTopBar";
import TrainerSideBar from "../../layout/TrainerSideBar";
import TextInput from "../../components/TextInput";
import SubmitButton from "../../components/SubmitButton";
import SelectField from "../../components/SelectField";
import CheckboxGroup from "../../components/CheckboxGroup";
import RadioGroup from "../../components/RadioGroup";
import Toast from "../../components/Toast";
import { trainerProfileValidation,type ValidationErrors } from "../../validations/trainerProfileValidation";
import { trainerProfileService } from "../../services/trainer/trainer.Profile.service";
import { PublicService } from "../../services/public/public.service";
import { type UpdateTrainerProfileDTO } from "../../types/trainerType";

const TrainerEditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UpdateTrainerProfileDTO>({
    name: '',
    gender: "",
    experience: 0,
    languages: [],
    bio: "",
    phone: "",
    address: "",
    pricePerSession: 0,
    services: [], 
  });

  const [specializationOptions, setSpecializationOptions] = useState<{serviceId: string, name: string}[]>([]);
   const [errors, setErrors] = useState<ValidationErrors<UpdateTrainerProfileDTO>>({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);

  useEffect(() => {
    const initData = async () => {
      try {
        const [servicesRes, profileRes] = await Promise.all([
          PublicService.fetchPublicServices(),
          trainerProfileService.getTrainerDetails()
        ]);
        console.log(servicesRes,profileRes)
        setSpecializationOptions(servicesRes.data);
        
        const t = profileRes.trainer;
        setFormData({
          ...t,
          services: t.services?.map((s: any) => s.serviceId || s.id || s) || [],
          experience: Number(t.experience) || 0,
          pricePerSession: Number(t.pricePerSession) || 0
        });
      } catch (err) {
        console.error("Error initializing data:", err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "pricePerSession" || name === "experience" ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (field: "services" | "languages", value: string) => {
    setFormData(prev => {
      const current = (prev[field] as string[]) || [];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value) 
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    const validationErrors = trainerProfileValidation(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setActionLoading(false);
      return;
    }

    try {
      const data = new FormData();
      
      (Object.keys(formData) as Array<keyof UpdateTrainerProfileDTO>).forEach((key) => {
        const value = formData[key];
        
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
          value.forEach(val => data.append(`${key}[]`, val));
        } else {
          data.append(key, value.toString());
        }
      });

      const res = await trainerProfileService.updateTrainerProfile(data);
      if (res.success) {
        setToast({ message: "Profile updated successfully!", type: "success" });
        setTimeout(() => navigate("/trainer/trainer-profile"), 2000);
      } else {
        setToast({ message: res.message || "Failed to update profile", type: "error" });
      }
    } catch (err) {
      setToast({ message: "An unexpected error occurred", type: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerTopBar />
      <TrainerSideBar />
      
      <main className="ml-72 pt-24 px-10 pb-12">
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tight">
            Edit Trainer Profile
          </h1>
          
          <form 
            onSubmit={handleSubmit} 
            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 space-y-6"
          >
            <TextInput
              name='name'
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name||''}
              onChange={handleChange}
              error={errors.name}
            />

            <div className="grid grid-cols-2 gap-6">
              <RadioGroup
                label="Gender"
                name="gender"
                options={["male", "female", "other"]}
                value={formData.gender || ""}
                onChange={handleChange}
                error={errors.gender}
              />
              <SelectField
                label="Experience (Years)"
                name='experience'
                value={formData.experience?.toString()}
                options={import.meta.env.VITE_EXPERIENCE?.split(",") || []}
                onChange={handleChange}
                error={errors.experience}
              />
            </div>

            <TextInput
              label="Price Per Session (₹)"
              name="pricePerSession"
              type="number"
              value={formData.pricePerSession?.toString() || ""}
              onChange={handleChange}
              error={errors.pricePerSession}
            />

            <CheckboxGroup
              label="Specializations"
              options={specializationOptions.map(s => ({ 
                label: s.name, 
                value: s.serviceId 
              }))}
              selected={formData.services}
              onChange={(val) => handleCheckboxChange("services", val)}
              error={errors.services}
            />

            <CheckboxGroup
              label="Languages"
              options={import.meta.env.VITE_LANGUAGES?.split(",").map((l: string) => ({
                label: l.trim(),
                value: l.trim()
              })) || []}
              selected={formData.languages || []}
              onChange={(val) => handleCheckboxChange("languages", val)}
              error={errors.languages}
            />

            <TextInput
              label="Bio"
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              error={errors.bio}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <TextInput
                name="phone"
                label="Phone"
                value={formData.phone || ""}
                onChange={handleChange}
                error={errors.phone}
              />
              <TextInput
                name="address"
                label="Address"
                value={formData.address||''}
                onChange={handleChange}
                error={errors.address}
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <SubmitButton
                text="Save Changes"
                loading={actionLoading}
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TrainerEditProfile;