import { useEffect, useState } from "react";
import TrainerTopBar from "../../layout/TrainerTopBar";
import TrainerSideBar from "../../layout/TrainerSideBar";
import TextInput from "../../components/TextInput";
import SubmitButton from "../../components/SubmitButton";
import SelectField from "../../components/SelectField";
import CheckboxGroup from "../../components/CheckboxGroup";
import RadioGroup from "../../components/RadioGroup";
import Toast from "../../components/Toast";
import { trainerService } from "../../services/trainerService";
import { useNavigate } from "react-router-dom";
import { trainerValidation } from "../../validations/trainerValidation";

interface Errors {
  name?: string;
  gender?: string;
  experience?: string;
  specializations?: string;
  languages?: string;
  bio?: string;
  phone?: string;
  address?: string;
  pricing?: string;
  certificate?: string;
}

const specializationOptions = [
  "Weight Training",
  "Yoga",
  "Zumba",
  "Cardio",
  "Nutrition",
  "CrossFit",
];

const experienceOptions = ["0", "1", "2+", "5+", "10+"];

const languageOptions = ["English", "Malayalam"];

const TrainerEditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [certificate, setCertificate] = useState<File | null>(null);
  const [certificateUrl, setCertificateUrl] = useState<string>("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pricing, setPricing] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
useEffect(() => {
  document.title = "FitConnect | Trainer Edit Profile";
}, []);
  useEffect(() => {
    const fetchTrainerProfile = async () => {
      try {
        const res = await trainerService.getTrainerDetails();
        const t = res?.trainer;

        setName(t?.name || "");
        setExperience(t?.experience || "");
        setGender(t?.gender || "");
        setSpecialization(t?.specialization || []);
        setLanguages(t?.languages || []);
        setCertificateUrl(t?.certificate || "");
        setBio(t?.bio || "");
        setPhone(t?.phone || "");
        setAddress(t?.address || "");
        setPricing(t?.pricing || 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrainerProfile();
  }, []);

  const handleSpecializationChange = (option: string) => {
    setSpecialization((prev) =>
      prev.includes(option)
        ? prev.filter((s) => s !== option)
        : [...prev, option]
    );
  };

  const handleLanguageChange = (option: string) => {
    setLanguages((prev) =>
      prev.includes(option)
        ? prev.filter((l) => l !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = trainerValidation({
      name,
      gender,
      experience,
      certificate: certificate ?? undefined,
      specializations: specialization,
      languages,
      bio,
      phone,
      address,
      pricing,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("gender", gender);
      formData.append("experience", experience);
      formData.append("bio", bio);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("pricing", pricing.toString());

      specialization.forEach((s, idx) => {
        formData.append(`specialization[${idx}]`, s);
      });
      languages.forEach((l, idx) => {
        formData.append(`languages[${idx}]`, l);
      });

      if (certificate) {
        formData.append("certificate", certificate);
      }

      await trainerService.updateTrainerProfile(formData);
      setToastMessage("Trainer Data Updated Successfully");
      setTimeout(() => navigate("/trainer/trainer-profile"), 2000);
    } catch (err) {
      console.error("Error updating trainer profile", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerTopBar />
      <TrainerSideBar />

      <main className="ml-72 pt-24 px-10">
    {toastMessage && (
    <Toast
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage("")}
    />
    )}
        <h1 className="text-4xl font-bold mb-10 text-gray-800">
          Edit Trainer Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md space-y-6 max-w-3xl"
        >
          <div>
            <TextInput
            label="Name"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>

          <div>
            <RadioGroup
              label="Gender"
              name="gender"
              options={["Male", "Female", "Other"]}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
          </div>

          <div>
            <SelectField
              label="Experience"
              value={experience}
              options={experienceOptions}
              onChange={(e) => setExperience(e.target.value)}
            />
            {errors.experience && <p className="text-red-600 text-sm">{errors.experience}</p>}
          </div>

          <CheckboxGroup
            label="Specializations"
            options={specializationOptions}
            selected={specialization}
            onChange={handleSpecializationChange}
            error={errors.specializations}
          />

          <CheckboxGroup
            label="Languages"
            options={languageOptions}
            selected={languages}
            onChange={handleLanguageChange}
            error={errors.languages}
          />

          <div>
            <TextInput
            label="Bio"
              placeholder="Enter Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            {errors.bio && <p className="text-red-600 text-sm">{errors.bio}</p>}
          </div>

          <div>
            <TextInput
            label="Phone No"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
          </div>

          <div>
            <TextInput
            label="Address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
          </div>

          <div>
            <TextInput
            label="Session Rate"
              type="number"
              placeholder="Pricing (per session)"
              value={pricing.toString()}
              onChange={(e) => setPricing(Number(e.target.value))}
            />
            {errors.pricing && <p className="text-red-600 text-sm">{errors.pricing}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Certificate</label>
            {certificateUrl && (
              <a
                href={certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm"
              >
                View existing certificate
              </a>
            )}
            <input
              type="file"
              className="mt-2"
              onChange={(e) => setCertificate(e.target.files?.[0] || null)}
            />
            {errors.certificate && (
              <p className="text-red-600 text-sm">{errors.certificate}</p>
            )}
          </div>

          <SubmitButton
            text={loading ? "Updating..." : "Update Profile"}
            loading={loading}
          />
        </form>
      </main>
    </div>
  );
};

export default TrainerEditProfile;
