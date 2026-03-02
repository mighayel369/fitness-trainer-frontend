import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import GenericForm from "../../components/GenericForm";
import { adminServiceManagement } from "../../services/admin/admin.Service.service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import { serviceValidate } from "../../validations/serviceValidate";
import {validateImageFile} from '../../validations/validateImageFile'
const AddService = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    document.title = "FitConnect | Add Service";
  }, []);

  const fields = [
    {
      name: "name",
      label: "Service Name",
      type: "text" as const,
      required: true,
    },
    {
      name: "duration",
      label: "Duration (minutes)",
      type: "number" as const,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      rows: 3,
      required: true,
    },
    {
      name: "servicePic",
      label: "Service Picture",
      type: "file" as const,
      required: true,
    },
  ];

  const handleSubmit = async (values: Record<string, any>) => {
    const validationPayload = {
      name: values.name,
      description: values.description,
      duration: Number(values.duration),
    };

    const errors = serviceValidate(validationPayload);
    if (Object.keys(errors).length > 0) {
      setToast({
        message: Object.values(errors)[0]!,
        type: "error",
      });
      return;
    }
    console.log(values)
    const imageError = validateImageFile(values.servicePic, { required: true });
    if (imageError) {
        setToast({ message: imageError, type: "error" });
        return;
      }
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("duration", values.duration);
    formData.append("servicePic", values.servicePic);
      console.log(formData)
    const response = await adminServiceManagement.createNewService(formData);

    if (response.success) {
      setToast({ message: "Service created successfully", type: "success" });
      setTimeout(() => navigate("/admin/services"), 1000);
    } else {
      setToast({ message: response.message || "Something went wrong", type: "error" });
    }
  };

  return (
    <>
      <AdminTopBar />
      <AdminSideBar />

      <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Add New Service
          </h2>

          <GenericForm
            fields={fields}
            onSubmit={handleSubmit}
            buttonText="Add Service"
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

export default AddService;
