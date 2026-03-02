import { useEffect, useState } from "react";
import UserNavBar from "../../layout/UserNavBar";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import GenericTable from "../../components/GenericTable";
import { userBookingService } from "../../services/user/user.Booking.service";
import { FaCalendarAlt } from "react-icons/fa";
import {type Booking } from "../../types/bookingType";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Vitalic | My Bookings";
    fetchBookings();
  }, [page, search]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await userBookingService.fetchUserBookings(page,search)
      console.log(res)
      setBookings(res.bookingData);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(bookings)
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavBar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              My <span className="text-red-600">Sessions</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Manage and track your upcoming fitness sessions.</p>
          </div>

          <div className="w-full md:w-80">
            <SearchInput
              placeholder="Search by trainer or service..."
              value={search}
              onChange={(value) => {
                setPage(1);
                setSearch(value);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-4 shadow-sm">
            <div className="bg-red-50 p-4 rounded-2xl text-red-600"><FaCalendarAlt /></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Bookings</p>
              <p className="text-xl font-black text-gray-900">{bookings.length}</p>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden p-4">
          <GenericTable
            data={bookings}
            page={page}
            loading={loading}
            emptyMessage="You haven't booked any sessions yet."
            columns={[
              {
                header: "Trainer",
                accessor: "trainer",
                render: (row) => (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-red-600">
                      {row.trainerName.charAt(0)}
                    </div>
                    <span className="font-bold text-gray-900">{row.trainerName || "N/A"}</span>
                  </div>
                ),
              },
              {
                header: "Service",
                accessor: "service",
                render: (row) => <span className="text-gray-600 font-medium">{row.bookedService}</span>
              },
              {
                header: "Date",
                accessor: "date",
                render: (row) =>{
                  const dateObj = row.bookedDate ? new Date(row.bookedDate) : null;
                  return (
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-bold">
                        {dateObj 
                          ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                          : 'N/A'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                        {row.bookedTime}
                      </span>
                    </div>
                  );
                },
              },
              {
                header: "Amount",
                accessor: "totalAmount",
                render: (row) => <span className="font-black text-gray-900">₹{row.sessionAmount}</span>
              },
              {
                header: "Status",
                accessor: "status",
                render: (row) => (
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusStyle(row.bookingStatus)}`}>
                    {row.bookingStatus}
                  </span>
                ),
              },
              {
                header: "Action",
                accessor: "action",
                className: "text-right",
                render: (row) => (
                  <button
                    onClick={() => navigate(`/bookings/${row.bookingId}`)}
                    className="bg-gray-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-red-600 transition-colors shadow-lg shadow-gray-200"
                  >
                    View Details
                  </button>
                ),
              },
            ]}
          />
        </div>

        <div className="mt-8">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </main>
    </div>
  );
};

export default Bookings;