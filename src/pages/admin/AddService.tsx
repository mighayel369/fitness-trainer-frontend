
import AdminTopBar from "../../layout/AdminTopBar";
import AdminSideBar from "../../layout/AdminSideBar";
import GenericForm from "../../components/GenericForm";
import { adminServiceManagement } from "../../services/adminServiceManagement";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AddService = () => {
  const navigate = useNavigate();

  useEffect(() => {
  document.title = "FitConnect | Add Service";
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

  const handleSubmit = async (values: Record<string, any>) => {
    const response = await adminServiceManagement.createNewService(
      values.name,
      values.description
    );

    if (response.success) {
      navigate("/admin/services");
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
    </>
  );
};

export default AddService;
















// import { useState } from "react";
// import AdminTopBar from "../../layout/AdminTopBar";
// import AdminSideBar from "../../layout/AdminSideBar";
// import { adminServiceManagement } from "../../services/adminServiceManagement";
// import { useNavigate } from "react-router-dom";
// const AddService = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const navigate=useNavigate()

//   const handleSubmit = async(e: React.FormEvent) => {
//     e.preventDefault();
//     let response=await adminServiceManagement.createNewService(name,description)
// if (response.success) {
//   navigate('/admin/services');
// }
    
//   };

//   return (
//     <>
//       <AdminTopBar />
//       <AdminSideBar />

//       <main className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
//         <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-6">
//             Add New Service
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Service Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter service name"
//                 required
//                 className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={description}
//                  onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter description"
//                 rows={3}
//                 required
//                 className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
//             >
//               Add Service
//             </button>
//           </form>
//         </div>
//       </main>
//     </>
//   );
// };

// export default AddService;
