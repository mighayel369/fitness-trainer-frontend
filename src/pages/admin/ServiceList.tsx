import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import { useEffect, useState, useCallback } from "react";
import { adminServiceManagement } from "../../services/admin/admin.Service.service";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import GenericTable from "../../components/GenericTable";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { type Service } from "../../types/serviceType";

type ActionType = "list" | "unlist" | "delete" | null;
type ActionConfig = {
  execute: (id: string) => Promise<any>;
  needsFetch: boolean;
  successMessage: string;
  modalVerb: string;
  buttonColor: string;
};

const SERVICE_ACTIONS: Record<Exclude<ActionType, null>, ActionConfig> = {
  delete: {
    execute: (id) => adminServiceManagement.deleteServiceById(id),
    needsFetch: true,
    successMessage: "Service deleted permanently",
    modalVerb: "delete",
    buttonColor: "bg-red-600",
  },
  list: {
    execute: (id) => adminServiceManagement.updateServiceStatus(id, true),
    needsFetch: false,
    successMessage: "Service is now live",
    modalVerb: "list",
    buttonColor: "bg-green-600",
  },
  unlist: {
    execute: (id) => adminServiceManagement.updateServiceStatus(id, false),
    needsFetch: false,
    successMessage: "Service has been hidden",
    modalVerb: "unlist",
    buttonColor: "bg-orange-500",
  },
};
const ServiceList = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [actionType, setActionType] = useState<ActionType>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    document.title = "FitConnect | Service List";
  }, []);

const fetchServices = useCallback(async () => {
  try {
    setLoading(true);
    const response = await adminServiceManagement.fetchServices(page, search);
    setServices(response.data ?? []); 
    setTotalPages(response.total ?? 1);
  } catch (error) {
    console.error("Failed to fetch services", error);
  } finally {
    setLoading(false);
  }
}, [page, search]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);


  const openModal = (service: Service, action: ActionType) => {
    setSelectedService(service);
    setActionType(action);
    setShowModal(true);
  };

const handleConfirmAction = async () => {
  if (!selectedService || !actionType) return;

  const targetId = selectedService.serviceId;

  try {
    if (actionType === "delete") {
      await adminServiceManagement.deleteServiceById(targetId);
      setToastType("success");
      setToastMessage("Service deleted permanently");
      
      fetchServices();

    } else if (actionType === "list") {
      const response = await adminServiceManagement.updateServiceStatus(targetId, true);
      setServices((prev) =>
        prev.map((s) =>
          s.serviceId === targetId ? { ...s, status: response.status } : s
        )
      );
      setToastType("success");
      setToastMessage(response.message||"successfully listed the service");

    } else if (actionType === "unlist") {
      const response = await adminServiceManagement.updateServiceStatus(targetId, false);
      setServices((prev) =>
        prev.map((s) =>
          s.serviceId === targetId ? { ...s, status: response.status } : s
        )
      );
      setToastType("success");
      setToastMessage(response.message||"successfully un-listed the service");
    }

  } catch (error: any) {
    console.error(`Error during ${actionType}:`, error);
    setToastType("error");
    setToastMessage(error.response?.data?.message || "Action failed");
    fetchServices();
  } finally {
    setShowModal(false);
    setSelectedService(null);
    setActionType(null);
  }
};
    const handleAdd = () => {
    navigate("/admin/services/add");
  };
  return (
    <>
      <AdminTopBar />
      <AdminSideBar />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}

      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Service List</h2>
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search services..."
            fullWidth={false}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
          <GenericTable<Service>
            data={services}
            page={page}
            loading={loading}
            columns={[
              {
                header: "Image",
                accessor: "servicePic",
                render: (service) => (
                  <img
                    src={service.servicePic}
                    alt={service.name}
                    className="w-14 h-14 rounded-md object-cover mx-auto border"
                  />
                ),
                className: "text-center",
              },
              { header: "Name", accessor: "name" },
              {
                header: "Duration",
                accessor: "duration",
                render: (service) => (
                  <span className="font-medium text-gray-700">
                    {service.duration} mins
                  </span>
                ),
                className: "text-center",
              },
              {
                header: "Status",
                accessor: "status",
                render: (service) => (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      service.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
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
                    onClick={() =>
                      openModal(service, service.status ? "unlist" : "list")
                    }
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
                      onClick={() =>
                        navigate(`/admin/services/edit/${service.serviceId}`)
                      }
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => openModal(service, "delete")}
                    >
                      <FaTrash size={18} />
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

        {/* <div className="flex justify-end mt-6">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            onClick={() => navigate("/admin/services/add")}
          >
            <FaPlus /> Add Service
          </button>
        </div> */}

              <button className="mt-3 px-5 py-2 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition" onClick={handleAdd}>
                  Add
              </button>


{showModal && selectedService && actionType && (
  <Modal
    isVisible={showModal}
    title={`${actionType.toUpperCase()}: ${selectedService.name}`}
    message={`Are you sure you want to ${SERVICE_ACTIONS[actionType].modalVerb} this service?`}
    onCancel={() => setShowModal(false)}
    onConfirm={handleConfirmAction}
  />
)}
      </main>
    </>
  );
};

export default ServiceList;
