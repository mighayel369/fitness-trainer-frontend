import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TrainerTopBar from "../../layout/TrainerTopBar";
import TrainerSideBar from "../../layout/TrainerSideBar";
import { trainerService } from "../../services/trainerService";
import Toast from "../../components/Toast";
import { reapplyValidation } from "../../validations/reapplyValidation";
interface Errors {
  name?: string;
  gender?: string;
  experience?: string;
  specializations?: string;
  languages?: string;
}
const specializationOptions = [
  "Weight Training",
  "Yoga",
  "Zumba",
  "Cardio",
  "Nutrition",
  "CrossFit",
];

const languageOptions = ["English", "Malayalam"];

const ReapplyPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [gender, setGender] = useState("");
  const [specializations, setSpecialization] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [certificate, setCertificate] = useState<File | null>(null);
  const [certificateUrl, setCertificateUrl] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    const fetchTrainerProfile = async () => {
      try {
        const res = await trainerService.getTrainerDetails();
        const t = res?.trainer;

        setName(t?.name || "");
        setExperience(t?.experience || "");
        setGender(t?.gender ? t.gender.charAt(0).toUpperCase() + t.gender.slice(1) : "");
        setSpecialization(t?.specialization || []); 
        setLanguages(t?.languages || []);
        setCertificateUrl(t?.certificate || "");
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrainerProfile();
  }, []);

  const handleSpecializationChange = (option: string) => {
    setSpecialization((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleLanguageChange = (option: string) => {
    setLanguages((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificate(e.target.files[0]);
    }
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  const newErrors = reapplyValidation({
    name,
    gender,
    experience,
    certificate: certificate ?? undefined, 
    specializations,
    languages
  });

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return; 
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("experience", experience);
  formData.append("gender", gender);

  specializations.forEach((s) => formData.append("specializations[]", s));
  languages.forEach((l) => formData.append("languages[]", l));
  if (certificate) {
    formData.append("certificate", certificate);
  }

  try {
    await trainerService.reapplyTrainer(formData);
    setToastMessage("Reapply Success");
    setTimeout(() => navigate("/trainer/trainer-profile"), 2000);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerTopBar />
      <TrainerSideBar />

      <main className="ml-72 pt-24 px-10 mt-5">
        {toastMessage && (
          <Toast
            message={toastMessage}
            type="success"
            onClose={() => setToastMessage("")}
          />
        )}
        <h1 className="text-4xl font-bold mb-10 text-gray-800">
          Reapply As Trainer
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-3xl bg-white p-8 rounded-2xl shadow-lg"
        >

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Certificate
            </label>
            {certificateUrl && (
              <div className="mt-2">
                <a
                  href={certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View current certificate
                </a>
              </div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-2 w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Specialization
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {specializationOptions.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={specializations.includes(option)}
                    onChange={() => handleSpecializationChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
             {errors.specializations && <p className="text-red-500 text-sm mt-1">{errors.specializations}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Languages
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {languageOptions.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={languages.includes(option)}
                    onChange={() => handleLanguageChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
             {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Experience
              </label>
              <input
                type="text" 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
             {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
             {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
            >
              Reapply
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReapplyPage;
