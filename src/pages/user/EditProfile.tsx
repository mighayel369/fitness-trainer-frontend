import UserNavBar from "../../layout/UserNavBar";
import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaSave } from "react-icons/fa";
import axiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { validateUserProfile } from "../../validations/userProfileValidation";

interface UserProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
}

interface Errors {
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
}


const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  useEffect(() => {
  document.title = "FitConnect | Edit Profile";
}, []);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosInstance.get("/user-details", {
          withCredentials: true,
        });
        setFormData({
          name: res.data.userData.name,
          email: res.data.userData.email,
          phone: res.data.userData.phone,
          address: res.data.userData.address,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors =await validateUserProfile(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await axiosInstance.patch(
        "/update-userdata",
        formData,
        { withCredentials: true }
      );
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
 

      <UserNavBar />
      <div className="flex justify-center p-6 bg-gray-50 mt-24">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <div className="flex items-center border rounded-lg px-3">
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full py-2 outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Email</label>
              <div className="flex items-center border rounded-lg px-3">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full py-2 outline-none"
                  disabled
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-1">Phone Number</label>
              <div className="flex items-center border rounded-lg px-3">
                <FaPhone className="text-gray-500 mr-2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full py-2 outline-none"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
      </div>
            <div>
              <label className="block font-semibold mb-1">Address</label>
              <div className="flex items-center border rounded-lg px-3">
                <FaHome className="text-gray-500 mr-2" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full py-2 outline-none resize-none"
                  rows={3}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaSave /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
