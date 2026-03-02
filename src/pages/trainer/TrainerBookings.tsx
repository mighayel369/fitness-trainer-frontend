import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Search, ChevronLeft, ChevronRight } from "lucide-react";
import TrainerTopBar from "../../layout/TrainerTopBar";
import TrainerSideBar from "../../layout/TrainerSideBar";
import Toast from "../../components/Toast";
import Loading from "../../components/Loading";
import { trainerBookingervice } from "../../services/trainer/trainer.Booking.service";
import GenericTable from "../../components/GenericTable";
import Modal from "../../components/Modal";
import { allBookingsColumns,pendingBookingsColumns,rescheduleColumns } from "../../constants/TableColumns/TrainerBookingColumns";
type TabType = "all" | "pending" | "reschedule";
export interface TableActions {
  onView: (id: string) => void;
  onDecision: (id: string, type: string, context: "pending" | "reschedule") => void;
}
interface ActiveAction {
  id: string;
  type: string;
  context: string;
  payload?: any; 
}
const TrainerBookings = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [bookings, setBookings] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
const [showModal, setShowModal] = useState(false);
const [activeAction, setActiveAction] = useState<ActiveAction | null>(null);
const navigate = useNavigate();

const getActiveColumns = () => {
    switch (activeTab) {
      case "pending":
        return pendingBookingsColumns(tableActions);
      case "reschedule":
        return rescheduleColumns(tableActions);
      default:
        return allBookingsColumns(tableActions);
    }
  };
  const limit = 5;

  useEffect(() => {
    fetchData();
  }, [activeTab, currentPage, searchQuery]);


  const actionRegistry: Record<string, (id: string, type: string) => Promise<any>> = {
    pending: (id, type) => type === 'approve' 
      ? trainerBookingervice.acceptPendingBooking(id) 
      : trainerBookingervice.rejectPendingBooking(id),
      
    reschedule: (id, type) => 
      trainerBookingervice.handleRescheduleRequest(id, type),
  };
const tableActions: TableActions = {
    onView: (id) => navigate(`/trainer/bookings/${id}`),
    onDecision: (id, type, context) => {
      setActiveAction({ id, type, context });
      setShowModal(true);
    }
  };
const fetchData = async () => {
    try {
      setIsLoading(true);
      const serviceMap = {
        all: trainerBookingervice.fetchTrainerAllBookings,
        pending: trainerBookingervice.fetchTrainerPendingBookings,
        reschedule: trainerBookingervice.fetchTrainerRescheduleRequests,
      };

      const res = await serviceMap[activeTab](currentPage, searchQuery, limit);
      console.log(res)
      if (res.success) {
        setBookings(res.data);
        setTotal(res.total);
      }
    } catch (err) {
      setToast({ message: "Failed to load bookings", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAction=async()=>{
    if (!activeAction) return;
    try{
      setIsLoading(true)
      const execute=actionRegistry[activeAction.context]
      const res = await execute(activeAction.id, activeAction.type);

      if (res.success) {
        setToast({ message: res.message, type: "success" });
        fetchData();
      }
    }catch (err: any) {
      setToast({ message: "Action failed", type: "error" });
    } finally {
      setShowModal(false);
      setActiveAction(null);
      setIsLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TrainerTopBar />
      <TrainerSideBar />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <main className="ml-72 pt-24 px-10 pb-12">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Bookings</h1>
            <p className="text-gray-500 mt-1">Manage your training sessions and requests.</p>
          </div>

          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search service..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </header>

        <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 w-fit">
          {[
            { id: "all", label: "All Sessions", color: "indigo" },
            { id: "pending", label: "Pending", color: "indigo" },
            { id: "reschedule", label: "Reschedules", color: "indigo" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as TabType); setCurrentPage(1); }}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id
                  ? `bg-${tab.color}-600 text-white shadow-md shadow-${tab.color}-200`
                  : "text-gray-500 hover:bg-gray-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <Loading message="Fetching your data..." />
        ) : (
          <>
          <GenericTable
            data={bookings}
            columns={getActiveColumns()} 
            page={currentPage}
            loading={isLoading}
            emptyMessage={`No ${activeTab} records found.`}
          />


            <div className="flex justify-between items-center mt-6">
              <p className="text-xs text-gray-500 font-medium">Showing {bookings.length} of {total} results</p>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  disabled={currentPage * limit >= total}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
       <Modal
        isVisible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirmAction}
        title="Confirm Action"
        message={`Confirming will ${activeAction?.type} this ${activeAction?.context} request.`}
      />
      </main>
    </div>
     );
};

export default TrainerBookings;