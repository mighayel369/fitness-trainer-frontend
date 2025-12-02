

import UserNavBar from "../../layout/UserNavBar";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import axiosInstance from "../../api/AxiosInstance";
import { useNavigate } from "react-router-dom";


const TrainerListing = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    gender: "",
    availability: "",
    language: "",
    category: ""
  });
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

const DEFAULT_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const handleTrainerView = (trainer:any) => {
    navigate(`/trainer-details/${trainer._id}`);
  };

      useEffect(() => {
      document.title = "Fitconnect | Trainer Listing"
    }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/list-trainers?pageNO=${1}&search=${""}`,{withCredentials:true})
        setTrainers(response.data.trainers || []);
      } catch (err) {
        console.error("Failed to fetch trainers", err);
        setTrainers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <>

      <UserNavBar />

      <div className="pt-24 px-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Available Trainers</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-300 rounded-lg p-5 h-fit shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Gender</h3>
                {["Male", "Female"].map((gender) => (
                  <label key={gender} className="block mb-2">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={filters.gender === gender}
                      onChange={(e) =>
                        setFilters({ ...filters, gender: e.target.value })
                      }
                      className="mr-2"
                    />{" "}
                    {gender}
                  </label>
                ))}
              </div>


              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Availability</h3>
                {["Morning", "Evening"].map((time) => (
                  <label key={time} className="block mb-2">
                    <input
                      type="radio"
                      name="availability"
                      value={time}
                      checked={filters.availability === time}
                      onChange={(e) =>
                        setFilters({ ...filters, availability: e.target.value })
                      }
                      className="mr-2"
                    />{" "}
                    {time}
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700">Language</h3>
                {["English", "Malayalam"].map((lang) => (
                  <label key={lang} className="block mb-2">
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={filters.language === lang}
                      onChange={(e) =>
                        setFilters({ ...filters, language: e.target.value })
                      }
                      className="mr-2"
                    />{" "}
                    {lang}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
                {["Yoga", "Cardio"].map((cat) => (
                  <label key={cat} className="block mb-2">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                      }
                      className="mr-2"
                    />{" "}
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              {loading ? (
                <p className="text-center text-gray-600">Loading trainers...</p>
              ) : trainers.length === 0 ? (
                <p className="text-center text-gray-600">No trainers found</p>
              ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                  {trainers.map((trainer) => (
                    <div
                      key={trainer._id}
                      className="bg-gradient-to-br from-blue-50 to-teal-50 h-[350px] mt-8 mb-8 
                      rounded-2xl shadow-md hover:shadow-xl transition 
                      relative pt-16 flex flex-col items-center border border-blue-100"
                    >
                      <div className="absolute -top-12">
                        <img
                          src={trainer.profilePic || DEFAULT_IMAGE}
                          alt={trainer.name}
                          className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                      </div>

                      <div className="p-6 flex flex-col flex-grow text-center w-full">
                        <h3 className="font-bold text-xl text-gray-900">{trainer.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {trainer.experience} Experience
                        </p>

                        <div className="flex items-center justify-center gap-1 text-yellow-500 mt-2">
                          <FaStar className="w-4 h-4" />
                          <span className="font-medium">
                            {trainer.rating || "N/A"}
                          </span>
                        </div>

                        <p className="flex items-center justify-center text-teal-600 text-sm gap-2 mt-2">
                          <FaMapMarkerAlt className="w-4 h-4" />{" "}
                          {trainer.address || "Location not available"}
                        </p>

                        <div className="flex gap-3 mt-6">
                          <button
                            onClick={() => handleTrainerView(trainer)}
                            className="flex-1 border border-indigo-500 text-indigo-600 font-medium px-3 py-2 rounded-lg 
                              hover:bg-indigo-50 hover:border-indigo-600 transition"
                          >
                            View Profile
                          </button>
                          <button className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold px-3 py-2 rounded-lg 
                            shadow-md hover:from-teal-600 hover:to-emerald-700 transition">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerListing;
