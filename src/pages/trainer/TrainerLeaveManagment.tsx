import { useEffect, useState } from "react";
import TrainerTopBar from "../../layout/TrainerTopBar";
import TrainerSideBar from "../../layout/TrainerSideBar";
import {  FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import Toast from "../../components/Toast";
import GenericTable from "../../components/GenericTable";
import LeaveRequestModal from "../../components/FormModal";
import { LeaveService } from "../../services/leave-service";
import { leaveFields } from "../../constants/FormFields/leave-fields";
import FormModal from "../../components/FormModal";
interface LeaveRecord {
  type: "Sick" | "Casual" | "Medical";
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const TrainerLeaveManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingButton,setLoadingButton]=useState(false)
  const [leaves, setLeaves] = useState<LeaveRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const leaveStats = [
    { label: "Sick Leave", used: 2, total: 5, color: "bg-red-100 text-red-700" },
    { label: "Casual Leave", used: 3, total: 10, color: "bg-blue-100 text-blue-700" },
    { label: "Medical Leave", used: 0, total: 12, color: "bg-emerald-100 text-emerald-700" },
  ];

  const columns = [
    { header: "Leave Type", accessor: "type" },
    { 
      header: "Duration", 
      accessor: "startDate",
      render: (row: LeaveRecord) => (
        <span className="text-xs">
          {new Date(row.startDate).toLocaleDateString()} - {new Date(row.endDate).toLocaleDateString()}
        </span>
      )
    },
    { header: "Reason", accessor: "reason", className: "max-w-xs truncate" },
    { 
      header: "Status", 
      accessor: "status",
      render: (row: LeaveRecord) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
          row.status === 'Approved' ? 'bg-green-100 text-green-700' : 
          row.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {row.status}
        </span>
      )
    },
  ];
const handleLeaveSubmit = async (formDataObject: any) => {
    try {
      setLoadingButton(true)
      const formData = new FormData();
      formData.append("type", formDataObject.type);
      formData.append("startDate", formDataObject.startDate);
      formData.append("endDate", formDataObject.endDate);
      formData.append("reason", formDataObject.reason);
      if (formDataObject.documents) {
        formData.append("documents", formDataObject.documents);
      }

      const res = await LeaveService.applyForLeave(formData);

      if (res.success) {
        setToast({ message: res.message, type: "success" });
        setIsModalOpen(false);
      }
    } catch (err: any) {
      const errMesg = err.response?.data?.message || "Something went wrong";
      setToast({ message: errMesg, type: "error" });
    }finally{
      setLoadingButton(false)
       setIsModalOpen(false);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerTopBar />
      <TrainerSideBar />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <main className="ml-72 pt-24 px-10 pb-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Leave Management</h1>
            <p className="text-gray-500 mt-1">Track your time off and request new leaves.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-xl text-sm"
          >
            Request Leave
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {leaveStats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className={`p-2 rounded-lg ${stat.color}`}>
                  <FaCalendarAlt size={20} />
                </span>
                <span className="text-2xl font-black text-gray-800">{stat.used}/{stat.total}</span>
              </div>
              <h3 className="text-gray-500 font-medium">{stat.label}</h3>
              <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-1000" 
                  style={{ width: `${(stat.used / stat.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-50 flex items-center gap-2">
            <FaFileAlt className="text-emerald-600" />
            <h2 className="font-bold text-gray-700">Leave History</h2>
          </div>
          <GenericTable 
            data={leaves} 
            columns={columns} 
            page={page} 
            loading={loading} 
            emptyMessage="You haven't requested any leaves yet."
          />
        </div>
      </main>
      {isModalOpen && (
     <FormModal 
  heading="Request Leave"
  fields={leaveFields}
  onClose={() => setIsModalOpen(false)}
  onSubmit={handleLeaveSubmit} 
  buttonText="Submit"
  loading={loadingButton}
/>
)}
    </div>
  );
};

export default TrainerLeaveManagement;