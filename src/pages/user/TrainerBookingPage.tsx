
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserNavBar from "../../layout/UserNavBar";
import Calendar from "../../components/Calandar";
import Toast from "../../components/Toast";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import { type TrainerDetails } from "../../types/trainerType";
import DEFAULT_IMAGE from '../../assets/default image.png'
import { TrainerService } from "../../services/trainer-service";
import { SlotService } from "../../services/slot-service";
import { PaymentService } from "../../services/payment-service";
import { BookingService } from "../../services/booking-service";

type programOption = {
  programId: string,
  name: string
}


const TrainerBookingPage = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState<TrainerDetails | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<programOption | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [bookingSummary, setBookingSummary] = useState<any>(null);

  useEffect(() => {
    document.title = "FitTribe | Trainer Booking";

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!trainerId) return
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        const response = await TrainerService.ExploreTrainerDetails(trainerId);
        setTrainer(response.trainer);

      } catch (err: any) {
        let errMesg = err.response?.data?.message
        setToastMessage(errMesg);
        setToastType("error");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainer();
  }, [trainerId]);
  console.log(trainer)
  useEffect(() => {
    if (!trainer || !selectedDate) return;

    const fetchSlots = async () => {
      try {
        const res = await SlotService.AvailableBookingSlots(
          new Date(selectedDate),
          trainer.trainerId
        );
        setSlots(res.data || []);
      } catch (err: any) {
        let errMesg = err.response?.data?.message
        setToastMessage(errMesg);
        setToastType("error");
      }
    };
    fetchSlots();
  }, [trainer, selectedDate]);

  const handleConfirmBooking = async () => {
    if (!trainer || !selectedProgram || !selectedDate || !selectedTime) {
      setToastMessage("Please complete all selections");
      setToastType("error");
      return;
    }

    try {
      setLoading(true);
      setShowModal(false);

      const orderResponse = await PaymentService.InitiateOnlinePaymentOrder({
        trainerId: trainer.trainerId,
        programId: selectedProgram.programId,
        date: selectedDate,
        time: selectedTime,
        amount: trainer.pricePerSession,
      });

      const options = {
        key: orderResponse.key,
        amount: orderResponse.amount,
        currency: orderResponse.currency || "INR",
        name: "FitTibe",
        description: `Session with ${trainer.name}`,
        order_id: orderResponse.orderId,
        handler: async (paymentRes: any) => {
          try {
            setLoading(true);
            const verifyRes = await BookingService.BookSessionWithTrainer({
              razorpay_order_id: paymentRes.razorpay_order_id,
              razorpay_payment_id: paymentRes.razorpay_payment_id,
              razorpay_signature: paymentRes.razorpay_signature,
              trainerId: trainer.trainerId,
              program: selectedProgram.name,
              date: selectedDate,
              time: selectedTime,
              price: trainer.pricePerSession
            })

            console.log(verifyRes)

            if (verifyRes.success) {
              const summary = verifyRes.bookingSummary;

              setBookingSummary({
                trainer: summary.trainerName,
                program: summary.bookedProgram,
                date: new Date(summary.bookedDate),
                time: summary.bookedTime,
                id: summary.bookingId,
                payment: "Razorpay (Online)",
              });
            }
          } catch (err: any) {
            console.log(err)
            setToastMessage(err.response?.data?.message || "Verification Failed");
            setToastType("error");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
        },
        theme: { color: "#E11D48" },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      console.log(err)
      setToastMessage(err.response?.data?.message || "Payment Initialization Failed");
      setToastType("error");
      setLoading(false);
    }
  };

  if (loading && !bookingSummary) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <UserNavBar />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}

      <div className="max-w-6xl mx-auto pt-32 px-4">
        {trainer && (
          <div className="bg-white rounded-2xl shadow border p-6 flex items-center gap-6 mb-8">
            <img
              src={trainer.profilePic || DEFAULT_IMAGE}
              className="w-24 h-24 rounded-full object-cover border"
              alt={trainer.name}
            />
            <div>
              <h2 className="text-xl font-black text-gray-800">{trainer.name}</h2>
              <p className="text-sm text-gray-500">
                {trainer.programs?.map((s) => s.name).join(", ")}
              </p>
              <p className="text-xs text-green-600 font-bold mt-1">Verified Trainer</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl border">
            <h3 className="text-sm font-bold mb-2 uppercase text-gray-500">Select Date</h3>
            <Calendar selectedDate={selectedDate} selectDate={setSelectedDate} />
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <h3 className="text-sm font-bold mb-2 uppercase text-gray-500">Choose Service</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {trainer?.programs.map((s) => (
                <div
                  key={s.programId}
                  onClick={() => setSelectedProgram(s)}
                  className={`p-3 rounded-lg border cursor-pointer ${selectedProgram?.programId === s.programId ? "border-red-500 bg-red-50" : "border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  <span className="font-semibold text-sm">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border md:col-span-2">
            <h3 className="text-sm font-bold mb-3 uppercase text-gray-500">Available Slots</h3>
            {!selectedDate ? (
              <p className="text-xs text-gray-400 italic">Select date to view slots</p>
            ) : slots.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No slots available</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 text-xs font-bold rounded-lg border ${selectedTime === slot ? "bg-gray-900 text-white" : "border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {selectedProgram && selectedTime && (
          <div className="mt-8 bg-gray-900 text-white p-6 rounded-[2rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
              <div className="bg-red-600 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[70px]">
                <span className="text-[10px] uppercase font-black tracking-tighter">
                  {selectedDate.toLocaleDateString('en-US', { month: 'short' })}
                </span>
                <span className="text-xl font-black">
                  {selectedDate.getDate()}
                </span>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                  Finalizing Your Session
                </p>
                <h4 className="text-lg font-bold leading-tight">
                  {selectedProgram.name} <span className="text-gray-500 text-sm font-medium">@ {selectedTime}</span>
                </h4>
                <p className="text-sm text-red-500 font-bold">
                  with {trainer?.name}
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2">
              <p className="text-[10px] text-gray-500 uppercase font-black">Total Investment</p>
              <button
                onClick={() => setShowModal(true)}
                className="group relative w-full md:w-auto bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Pay ₹{trainer?.pricePerSession} Online</span>
                <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isVisible={showModal}
        title="Confirm Booking"
        message={`Confirming your session for ₹${trainer?.pricePerSession}. You will be redirected to the secure payment gateway.`}
        confirmText="Confirm & Pay"
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirmBooking}
      />

      {bookingSummary && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"></div>

          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-red-600 p-8 text-center text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-black tracking-tighter uppercase italic">You're In!</h3>
              <p className="text-red-100 text-sm font-medium opacity-80 mt-1">Booking ID:{bookingSummary.id}</p>
            </div>

            <div className="p-8 pt-6">

              <div className="space-y-4 relative">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Training Program</span>
                  <span className="text-lg font-bold text-gray-900">{bookingSummary.program}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-dashed border-gray-200">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Date</span>
                    <p className="font-bold text-gray-800">{bookingSummary.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Time Slot</span>
                    <p className="font-bold text-gray-800">{bookingSummary.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-2">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                    🏋️‍♂️
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block">With Trainer</span>
                    <span className="font-bold text-gray-800">{bookingSummary.trainer}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/bookings")}
                className="mt-8 w-full group bg-gray-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Manage My Schedule
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            <div className="absolute left-[-15px] top-[55%] w-8 h-8 bg-gray-900/80 rounded-full"></div>
            <div className="absolute right-[-15px] top-[55%] w-8 h-8 bg-gray-900/80 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerBookingPage;