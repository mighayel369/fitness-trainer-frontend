import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCheck,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaAward,
  FaLanguage,
  FaCalendarAlt,
  FaCertificate,
} from "react-icons/fa";
import {DetailCard} from './../../components/DetailCard'

import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import { adminTrainerService } from "../../services/adminTrainerService";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import NotFound from "../../components/NotFound";

const DEFAULT_AVATAR = "https://www.w3schools.com/howto/img_avatar.png";

type Trainer = {
  name: string;
  email: string;
  _id: string;
  status: boolean;
  verified: string;
  role: string;
  gender: string;
  experience: string;
  specialization: string[];
  certificate?: string;
  languages?: string[];
  createdAt: Date;
};

const VerifySinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"accept" | "decline">(
    "accept"
  );
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await adminTrainerService.findSingleTrainer(id);
        setTrainer(response.trainer);
      } catch (error) {
        console.error("Failed to fetch trainer details", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTrainer();
  }, [id]);

const confirmAction = async (reason?: string) => {
  if (!trainer) return;
  selectedAction === "accept" ? setActionLoading(true) : setDeclineLoading(true);
  setShowModal(false);

  try {
    await adminTrainerService.updateVerification(trainer._id, selectedAction, reason);
    setToastMessage(
      selectedAction === "accept"
        ? "Trainer verified successfully!"
        : `Trainer declined. Reason: ${reason}`
    );
    setToastType("success");
    setTimeout(() => navigate("/admin/verify-trainer"), 2000);
  } catch (error) {
    console.error("Action failed", error);
    setToastMessage("Something went wrong. Please try again.");
    setToastType("error");
  } finally {
    setActionLoading(false);
    setDeclineLoading(false);
  }
};


  const handleOpenModal = (action: "accept" | "decline") => {
    setSelectedAction(action);
    setShowModal(true);
  };

  return (
    <>
      <AdminTopBar />
      <AdminSideBar />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}

      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={(reason?: string) => confirmAction(reason)}
        actionType={selectedAction}
        userName={trainer?.name || ""}
      />


      <main className="ml-64 mt-16 p-8 bg-gray-50 min-h-screen">
        {loading ? (
          <p className="text-gray-600">Loading trainer details...</p>
        ) : trainer ? (
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-8 flex flex-col items-center text-white">
              <img
                src={DEFAULT_AVATAR}
                alt="Trainer Avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
              />
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {trainer.name}
                {trainer.verified === "verified" && (
                  <FaCheck className="text-green-300" />
                )}
              </h2>
              <p className="opacity-90 flex items-center gap-2">
                <FaEnvelope /> {trainer.email}
              </p>
              <p className="text-sm flex items-center gap-2 mt-1">
                <FaCalendarAlt /> Joined {new Date(trainer.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="p-8 grid md:grid-cols-2 gap-6">
              <DetailCard icon={<FaUser />} label="Gender" value={trainer.gender} />
              <DetailCard
                icon={<FaAward />}
                label="Experience"
                value={trainer.experience}
              />
              <DetailCard
                icon={<FaCheck />}
                label="Specializations"
                value={trainer.specialization.join(", ")}
              />
              {trainer.languages && (
                <DetailCard
                  icon={<FaLanguage />}
                  label="Languages"
                  value={trainer.languages.join(", ")}
                />
              )}
              {trainer.certificate && (
                <DetailCard
                  icon={<FaCertificate />}
                  label="Certificate"
                  value={
                    <a
                      href={trainer.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Certificate
                    </a>
                  }
                />
              )}
            </div>

            <div className="p-8 border-t flex flex-wrap gap-4 justify-end">
              <button
                onClick={() => handleOpenModal("accept")}
                disabled={actionLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition"
              >
                <FaCheck /> {actionLoading ? "Processing..." : "Verify Trainer"}
              </button>
              <button
                onClick={() => handleOpenModal("decline")}
                disabled={declineLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition"
              >
                <FaTimes /> {declineLoading ? "Processing..." : "Decline Trainer"}
              </button>
            </div>
          </div>
        ) : (
          <NotFound message="Trainer not found." />
        )}
      </main>
    </>
  );
};

export default VerifySinglePage;
