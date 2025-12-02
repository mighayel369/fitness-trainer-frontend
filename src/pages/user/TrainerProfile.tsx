
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserNavBar from "../../layout/UserNavBar";
import { FaRegCommentDots } from "react-icons/fa";
import axiosInstance from "../../api/AxiosInstance";

const DEFAULT_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  document.title = "FitConnect | Trainer Profile";
}, []);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/trainer/${id}`, { withCredentials: true });
        setTrainer(response.data.trainer);
      } catch (err) {
        console.error("Failed to fetch trainer details", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTrainer();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading trainer details...</p>;
  }

  if (!trainer) {
    return <p className="text-center mt-20">Trainer not found</p>;
  }

  return (
    <>


      <UserNavBar />
      <div className="max-w-5xl mx-auto mt-36 flex gap-10 bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center w-1/3 relative">
          <img
            src={trainer.profilePic || DEFAULT_IMAGE}
            alt={trainer.name}
            className="w-72 h-72 object-cover rounded-t-2xl shadow-lg"
          />
          <button className="w-72 flex items-center justify-center gap-2 px-5 py-3 border border-gray-400 border-t-0 text-gray-700 rounded-b-2xl shadow-lg hover:bg-gray-100 transition">
            <span className="font-medium">Chat</span>
            <FaRegCommentDots size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-extrabold text-gray-900">{trainer.name}</h1>
          <p className="text-lg text-gray-500">{trainer.address || "Location not available"}</p>

          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Specialized:</span>{" "}
            {trainer.specialization?.join(", ") || "N/A"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Languages:</span>{" "}
            {trainer.languages?.join(", ") || "N/A"}
          </p>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900">Bio:</span>{" "}
            {trainer.bio || "No bio available"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Availability:</span>{" "}
            <span className="text-green-600 font-medium">
              {trainer.status ? "Active" : "Unavailable"}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-gray-900">Pricing:</span>{" "}
            {trainer.pricing ? `₹${trainer.pricing} / session` : "Not available"}
          </p>
        </div>
      </div>
    </>
  );
};

export default TrainerProfile;
