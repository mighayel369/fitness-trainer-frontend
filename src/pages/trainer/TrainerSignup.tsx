import React, { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trainerService } from "../../services/trainerService";
import { userService } from "../../services/userService";
import { signupValidate } from "../../validations/signupValidate";
import { setEmail, setRole } from "../../redux/slices/otpSlice";
import { useAppDispatch } from "../../redux/hooks";
import { adminServiceManagement } from "../../services/adminServiceManagement";
import TextInput from "../../components/TextInput";
import PasswordInput from "../../components/PasswordInput";
import SubmitButton from "../../components/SubmitButton";
import SelectField from "../../components/SelectField";
import CheckboxGroup from "../../components/CheckboxGroup";
import RadioGroup from "../../components/RadioGroup";
import LogoHeader from "../../components/LogoHeader";
import signuppic from "../../assets/trainer-signup pic.jpg";

const languageOptions = import.meta.env.VITE_LANGUAGES?.split(",") || [];
const experienceOptions = import.meta.env.VITE_EXPERIENCE?.split(",") || [];

console.log(languageOptions)




interface Errors {
  email?: string;
  name?: string;
  password?: string;
  confirm?: string;
  gender?: string;
  experience?: string;
  certificate?: string;
  specializations?: string;
  languages?: string;
}

const TrainerSignup: React.FC = () => {
  const [email, setEmailVal] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [specializationOptions, setSpecializationOptions] = useState<string[]>([]); 
  const [languages, setLanguages] = useState<string[]>([]);
  const [certificate, setCertificate] = useState<File>();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
useEffect(() => {
  document.title = "FitConnect | Trainer Signup";
}, []);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await adminServiceManagement.fetchServices(1, "");
        console.log(response)
        if (response.services) {
          const serviceNames = response.services.map((s: any) => s.name);
          setSpecializationOptions(serviceNames);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleSpecializationChange = (option: string) => {
    setSpecializations((prev) =>
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


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = signupValidate({
      name,
      email,
      password,
      confirm,
      gender,
      experience,
      certificate,
      specializations,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirm", confirm);
    formData.append("gender", gender);
    formData.append("experience", experience);

    specializations.forEach((spec) => formData.append("specializations[]", spec));
    languages.forEach((lang) => formData.append("languages[]", lang));
    if (certificate) formData.append("certificate", certificate);

    try {
      const response = await trainerService.createTrainer(formData);

      if (response.success) {
        dispatch(setEmail(email));
        dispatch(setRole("trainer"));

        const otpSent = await userService.otpsent(email, "trainer");
        if (otpSent) {
          localStorage.setItem("startTime", Date.now().toString());
          navigate("/otp");
        }
      } else {
        setErrors({ email: response.message });
      }
    } catch (err: any) {
      setErrors({
        email: err.response?.data?.message || "Unexpected error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen p-6">
      <img
        src={signuppic}
        alt="Signup"
        className="fixed top-0 left-0 w-full h-screen object-cover z-0 rounded-lg p-6"
      />

      <div className="relative z-10 min-h-screen overflow-y-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-10 w-full max-w-md text-center mx-auto">
          <LogoHeader />
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Become a Certified Trainer
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <h2 className="font-semibold">Personal Details</h2>

            <TextInput
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              error={errors.name}
            />

            <TextInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmailVal(e.target.value)}
              placeholder="Email"
              error={errors.email}
            />

            <RadioGroup
              label="Gender"
              name="gender"
              options={["male", "female", "other"]}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              error={errors.gender}
            />


            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              error={errors.password}
              showButton={false}
            />

            <PasswordInput
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm Password"
              error={errors.confirm}
              showButton={false}
            />

            <SelectField
              label="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              options={experienceOptions}
              error={errors.experience}
            />

            <CheckboxGroup
              label="Specialization"
              options={specializationOptions}
              selected={specializations}
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
              <label className="block font-medium mb-1">Upload Certificate</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-md"
              />
              {errors.certificate && (
                <p className="text-red-600 text-sm">{errors.certificate}</p>
              )}
            </div>

            <SubmitButton loading={loading} text="Join With Us" />
          </form>

          <p className="mt-2 text-sm text-center">
            Already have an account?{" "}
            <Link to="/trainer/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerSignup;
