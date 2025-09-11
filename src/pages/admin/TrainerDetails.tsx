import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserTie, FaCheckCircle, FaTimesCircle, FaCertificate, FaUserShield, FaClock, FaVenusMars } from "react-icons/fa";
import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import { adminTrainerService } from "../../services/adminTrainerService";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";

const DEFAULT_AVATAR = "https://www.w3schools.com/howto/img_avatar.png";

type Trainer = {
  name: string;
  email: string;
  _id: string;
  status: boolean;
  verified: boolean;
  role: string;
  gender: string;
  experience: string;
  specialization: string[];
  createdAt: Date;
  certificate: string;
};

const TrainerDetails: React.FC = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await adminTrainerService.fetchTrainerById(id!);
        setTrainer(response.trainer);
      } catch (error) {
        console.error("Failed to fetch trainer details", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTrainer();
  }, [id]);

  return (
    <>
      <AdminTopBar />
      <AdminSideBar />

      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Trainer Profile</h2>

        {loading ? (
          <Loading message="Loading trainer details..." />
        ) : !trainer ? (
          <NotFound message="Trainer not found." />
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
            {/* Header */}
            <div className="flex items-center gap-6 border-b pb-6">
              <img
                src={DEFAULT_AVATAR}
                alt={`${trainer.name}'s avatar`}
                className="w-24 h-24 rounded-full border object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {trainer.name}
                  {trainer.verified ? (
                    <FaCheckCircle className="text-green-500" title="Verified" />
                  ) : (
                    <FaTimesCircle className="text-red-500" title="Not Verified" />
                  )}
                </h3>
                <p className="text-gray-600">{trainer.email}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <FaClock className="text-gray-400" />
                  Joined{" "}
                  {new Date(trainer.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

  
            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-2">
                  <FaUserShield className="text-gray-400" /> Role
                </span>
                <span className="font-medium">{trainer.role}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-2">
                  <FaUserTie className="text-gray-400" /> Status
                </span>
                {trainer.status ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600 font-medium">
                    Blocked
                  </span>
                )}
              </div>

              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-2">
                  <FaVenusMars className="text-gray-400" /> Gender
                </span>
                <span className="font-medium">{trainer.gender || "Not specified"}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span className="flex items-center gap-2">
                  <FaUserTie className="text-gray-400" /> Experience
                </span>
                <span className="font-medium">{trainer.experience}</span>
              </div>
            </div>

            <div className="mt-6 border-t pt-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Specializations</h4>
                <p className="text-gray-800">
                  {trainer.specialization.length > 0
                    ? trainer.specialization.join(", ")
                    : "Not specified"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                  <FaCertificate className="text-gray-400" /> Certificate
                </h4>
                <a
                  href={trainer.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Certificate
                </a>
              </div>
            </div>


            <div className="mt-8 flex justify-end">
              <button
                className={`px-5 py-2 rounded-md font-medium text-white shadow-sm transition ${
                  trainer.status
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {trainer.status ? "Block Trainer" : "Unblock Trainer"}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default TrainerDetails;
