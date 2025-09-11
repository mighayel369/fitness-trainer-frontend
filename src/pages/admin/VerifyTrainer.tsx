import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import { useEffect, useState } from "react";
import { adminTrainerService } from "../../services/adminTrainerService";
import { useNavigate } from "react-router-dom";
import GenericTable from "../../components/GenericTable";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";

type Trainer = {
  _id: string;
  name: string;
  email: string;
  status: boolean;
  createdAt: Date;
  gender?: string;
  age?: number;
  specialization?: string[];
};

const VerifyTrainer = () => {
  const [loading, setLoading] = useState(false);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const response = await adminTrainerService.fetchPendingTrainers();
      if (response.success) {
        setTrainers(response.trainers || []);
        setTotalPages(response.totalPages || 1);
      }
    } catch (err) {
      console.log("Failed to fetch trainers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = (trainerId: string) => {
    navigate(`/admin/verify-trainer/${trainerId}`);
  };

  useEffect(() => {
    fetchTrainers();
  }, [page, search]);

  return (
    <>
      <AdminTopBar />
      <AdminSideBar />
      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen relative">
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Verify Trainers</h2>
          <SearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search trainers..."
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <GenericTable<Trainer>
            data={trainers}
            columns={[
              { header: "Name", accessor: "name" },
              { header: "Age", accessor: "age", render: (t) => t.age ?? "NA" },
              {
                header: "Gender",
                accessor: "gender",
                render: (t) => t.gender ?? "NA",
              },
              {
                header: "Specialization",
                accessor: "specialization",
                render: (t) =>
                  t.specialization?.join(", ") || "NA",
              },
              {
                header: "Action",
                accessor: "action",
                render: (t) => (
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-xs"
                    onClick={() => handleVerify(t._id)}
                  >
                    Verify
                  </button>
                ),
                className: "text-center",
              },
            ]}
            page={page}
            loading={loading}
            emptyMessage="No Trainers Found."
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          />
        </div>
      </main>
    </>
  );
};

export default VerifyTrainer;
