import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import { useEffect, useState } from "react";
import { adminServiceManagement } from "../../services/adminServiceManagement";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import GenericTable from "../../components/GenericTable";
import PaginationControls from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
type Service = {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt: Date;
};

const ServiceList = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [actionType, setActionType] = useState<"list" | "unlist" | "delete" | null>(null)
  const navigate=useNavigate()

useEffect(() => {
  document.title = "FitConnect | Service List";
}, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await adminServiceManagement.fetchServices(page, search);
        setServices(response.services|| []);
        setTotalPages(response.totalPages || 1);

      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [page, search]);

const handleModalOpen = (service: Service, action: "list" | "unlist") => {
  setSelectedService(service);
  setActionType(action);
  setShowModal(true);
};

const handleDelete = (service: Service) => {
  setSelectedService(service);
  setActionType("delete");
  setShowModal(true);
};

const handleConfirmAction = async () => {
  if (!selectedService || !actionType) return;

  try {
    if (actionType === "delete") {
      await adminServiceManagement.deleteServiceById(selectedService._id);
      const refreshed = await adminServiceManagement.fetchServices(page, search);
      setServices(refreshed.services || []);
      setToastType("success");
      setToastMessage(`Service deleted successfully`);
    } else {
      const newStatus = actionType === "list";
      await adminServiceManagement.updateService(selectedService._id, {status:newStatus});
      const refreshed = await adminServiceManagement.fetchServices(page, search);
      setServices(refreshed.services || []);
      setToastType("success");
      setToastMessage(`Service ${newStatus ? "listed" : "unlisted"} successfully`);
    }
  } catch (err) {
    console.error(err);
    setToastType("error");
    setToastMessage("Failed to update service");
  } finally {
    setShowModal(false);
    setSelectedService(null);
    setActionType(null);
  }
};


  const handleAddService = () => {
    navigate('/admin/services/add')
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
          <h2 className="text-3xl font-bold text-gray-800">Service List</h2>
          <SearchInput value={search} onChange={setSearch} placeholder="Search services..." />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <GenericTable<Service>
            data={services}
            page={page}
            loading={loading}
            columns={[
              { header: "Name", accessor: "name" },
              {
                header: "Status",
                accessor: "status",
                render: (service) => (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      service.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {service.status ? "Listed" : "Unlisted"}
                  </span>
                ),
                className: "text-center",
              },
              {
                header: "Action",
                accessor: "action",
                render: (service) => (
                  <button
                    className={`px-3 py-1 text-white rounded-md text-xs ${
                      service.status
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleModalOpen(service,service.status ? "unlist" : "list")}
                  >
                    {service.status ? "Unlist" : "List"}
                  </button>
                ),
                className: "text-center",
              },
              {
                header: "Manage",
                accessor: "manage",
                render: (service) => (
                  <div className="flex justify-center gap-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/admin/services/edit/${service._id}`)}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(service)}
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                ),
                className: "text-center",
              },
            ]}

          />

          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setPage((prev) => prev + 1)}
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            onClick={handleAddService}
          >
            <FaPlus /> Add Service
          </button>
        </div>

        {selectedService && actionType && (
          <Modal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmAction}
            actionType={actionType}   
            userName={selectedService.name}
          />
        )}

      </main>
    </>
  );
};

export default ServiceList;
