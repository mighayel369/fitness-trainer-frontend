import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import GenericForm from "../../components/GenericForm";
import { adminServiceManagement } from "../../services/admin/admin.Service.service";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { serviceValidate } from "../../validations/serviceValidate";
import {validateImageFile} from '../../validations/validateImageFile'
import Toast from "../../components/Toast";

type InitialValues = {
  name: string;
  description: string;
  duration: number;
  servicePic?: File | null;
};

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState<InitialValues>({
    name: "",
    description: "",
    duration: 60,
    servicePic: null,
  });

  const [existingImage, setExistingImage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    document.title = "FitConnect | Edit Service";
  }, []);

  const fields = [
    {
      name: "name",
      label: "Service Name",
      type: "text" as const,
      placeholder: "Enter service name",
      required: true,
    },
    {
      name: "duration",
      label: "Duration (minutes)",
      type: "number" as const,
      placeholder: "10 - 180",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Enter description",
      rows: 3,
      required: true,
    },
    {
      name: "servicePic",
      label: "Service Image",
      type: "file" as const,
      required: false,
    },
  ];

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        const response = await adminServiceManagement.getServiceById(id);

        setInitialValues({
          name: response.service.name,
          description: response.service.description,
          duration: response.service.duration,
          servicePic: response.service.servicePic,
        });

        setExistingImage(response.service.servicePic);
      } catch (error) {
        console.error(error);
        setToast({ message: "Failed to load service", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSubmit = async (values: Record<string, any>) => {
    const payload = {
      name: values.name,
      description: values.description,
      duration: Number(values.duration),
    };

    const errors = serviceValidate(payload);
    if (Object.keys(errors).length > 0) {
      setToast({
        message: Object.values(errors)[0]!,
        type: "error",
      });
      return;
    }

    const imageError = validateImageFile(values.servicePic, {
      required: false
    });

    if (imageError) {
      setToast({ message: imageError, type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("duration", payload.duration.toString());

    if (values.servicePic) {
      formData.append("servicePic", values.servicePic);
    }

    const response = await adminServiceManagement.updateService(id!, formData);

    if (response.success) {
      setToast({ message: "Service updated successfully", type: "success" });
      setTimeout(() => navigate("/admin/services"), 1000);
    } else {
      setToast({
        message: response.message || "Something went wrong",
        type: "error",
      });
    }
  };

  if (loading) {
    return (
      <>
        <AdminTopBar />
        <AdminSideBar />
        <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen flex items-center justify-center">
          <Loading />
        </main>
      </>
    );
  }

  return (
    <>
      <AdminTopBar />
      <AdminSideBar />

      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Edit Service
          </h2>

          {existingImage && (
            <div className="mb-4 flex justify-center">
              <img
                src={existingImage}
                alt="Service"
                className="w-32 h-32 object-cover rounded-md border"
              />
            </div>
          )}

          <GenericForm
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            buttonText="Update Service"
          />
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default EditService;
