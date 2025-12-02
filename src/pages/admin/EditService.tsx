import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import GenericForm from "../../components/GenericForm";
import { adminServiceManagement } from "../../services/adminServiceManagement";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true); 

useEffect(() => {
  document.title = "FitConnect | Edit Profile";
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
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Enter description",
      rows: 3,
      required: true,
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
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSubmit = async (values: Record<string, any>) => {
    const response = await adminServiceManagement.updateService(id, {
      name: values.name,
      description: values.description,
    });

    if (response.success) {
      navigate("/admin/services");
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
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Service</h2>

          <GenericForm
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            buttonText="Edit Service"
          />
        </div>
      </main>
    </>
  );
};

export default EditService;
