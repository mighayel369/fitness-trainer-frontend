
import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import { useEffect, useState } from "react";
import { adminTrainerService } from "../../services/admin/admin.Trainer.service";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GenericTable from "../../components/GenericTable";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import {type Trainer } from "../../types/trainerType";

const TrainerList = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
useEffect(() => {
  document.title = "FitConnect | Trainer List";
}, []);
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await adminTrainerService.fetchTrainers(page, search);
        setTrainers(response.data || []);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch trainers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [page, search]);

  const handleTrainerView = (trainer: Trainer) => {
    navigate(`/admin/trainers/${trainer.trainerId}`);
  };

  const handleModalOpen = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setShowModal(true);
  };

const handleConfirmAction = async () => {
  if (!selectedTrainer) return;
  
  try {
    const newStatus = !selectedTrainer.status;
    
    const result = await adminTrainerService.updateTrainerStatus(
      selectedTrainer.trainerId, 
      newStatus
    );
    setTrainers((prevTrainers) =>
      prevTrainers.map((t) =>
        t.trainerId === selectedTrainer.trainerId 
          ? { ...t, status: newStatus } 
          : t
      )
    );

    setToastType("success");
    setToastMessage(result.message || `Trainer ${newStatus ? "unblocked" : "blocked"} successfully`);
    
    setShowModal(false);
    setSelectedTrainer(null);
  } catch (err: any) {
    const errorMsg = err.response?.data?.message || "Failed to update trainer status";
    setToastType("error");
    setToastMessage(errorMsg);
  }
};

  const handleVerifyTrainer = () => {
    navigate("/admin/verify-trainer");
  };

  return (
    <>
      <AdminTopBar />
      <AdminSideBar />
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      )}
      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Trainer List</h2>
          <SearchInput value={search} onChange={setSearch} placeholder="Search trainers..." fullWidth={false} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <GenericTable<Trainer>
            data={trainers}
            page={page}
            loading={loading}
            columns={[
              { header: "Name", accessor: "name" },
              { header: "Email", accessor: "email" },
              {
                  header: "Price",
                  accessor: "pricePerSession",
                  render: (trainer) =>
                    trainer.pricePerSession ? `₹${trainer.pricePerSession}` : "NA",
                  className: "text-center",
                },
              {
                header: "Action",
                accessor: "action",
                render: (trainer) => (
                  <div className="flex justify-center gap-3">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                      onClick={() => handleTrainerView(trainer)}
                    >
                      View
                    </button>
                    <button
                      className={`px-3 py-1 text-white rounded-md text-xs ${
                        trainer.status
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                      onClick={() => handleModalOpen(trainer)}
                    >
                      {trainer.status ? "Block" : "Unblock"}
                    </button>
                  </div>
                ),
                className: "text-center",
              },
            ]}
          />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="flex items-center gap-2 p-2 border border-green-500 text-green-500 rounded hover:bg-green-50 transition"
            onClick={handleVerifyTrainer}
          >
            <FaCheckCircle />
            Verify Trainers
          </button>
        </div>

        {selectedTrainer && (
          <Modal
            isVisible={showModal}
            onCancel={() => setShowModal(false)}
            onConfirm={handleConfirmAction}
            title={`Are you sure you want to ${selectedTrainer.status ? 'block' : 'unblock'} user`}
            message={selectedTrainer.name}
          />
        )}
      </main>
    </>
  );
};

export default TrainerList;
