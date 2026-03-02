
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserNavBar from "../../layout/UserNavBar";
import Calendar from "../../components/Calandar";
import Toast from "../../components/Toast";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import { userTrainerService } from "../../services/user/user.Trainer.service";
import { userBookingService } from "../../services/user/user.Booking.service";
import { type TrainerDetails } from "../../types/trainerType";

type serviceOption={
  serviceId:string,
  name:string
}

const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const TrainerBookingPage = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState<TrainerDetails | null>(null);
  const [selectedService, setSelectedService] = useState<serviceOption|null>(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [bookingSummary, setBookingSummary] = useState<any>(null);

  useEffect(() => {
    document.title = "Vitalic | Trainer Booking";

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if(!trainerId) return
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        const response = await userTrainerService.fetchTrainerProfile(trainerId);
        setTrainer(response.trainer);
    
      } catch (error: any) {
        setToastMessage("Failed to load trainer");
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
        const res = await userTrainerService.fetchTrainerSlot(
          new Date(selectedDate),
          trainer.trainerId
        );
        setSlots(res.data || []);
      } catch {
        setToastMessage("Failed to fetch slots");
        setToastType("error");
      }
    };
    fetchSlots();
  }, [trainer, selectedDate]);

  const handleConfirmBooking = async () => {
    if (!trainer || !selectedService || !selectedDate || !selectedTime) {
      setToastMessage("Please complete all selections");
      setToastType("error");
      return;
    }

    try {
      setLoading(true);
      setShowModal(false);
      
      const orderResponse = await userBookingService.createOnlinePaymentOrder({
        trainerId: trainer.trainerId,
        serviceId: selectedService.serviceId,
        date: selectedDate,
        time: selectedTime,
        amount: trainer.pricePerSession, 
      });

      const options = {
        key: orderResponse.key, 
        amount: orderResponse.amount,
        currency: orderResponse.currency || "INR",
        name: "Vitalic",
        description: `Session with ${trainer.name}`,
        order_id: orderResponse.orderId,
        handler: async (paymentRes: any) => {
          try {
            setLoading(true);
            const verifyRes = await userBookingService.verifyAndCreateBooking({
              razorpay_order_id: paymentRes.razorpay_order_id,
              razorpay_payment_id: paymentRes.razorpay_payment_id,
              razorpay_signature: paymentRes.razorpay_signature,
              bookingDetails: {
                trainerId:trainer.trainerId,
                service: selectedService.name,
                date: selectedDate,
                time: selectedTime,
                price: trainer.pricePerSession
              }
            });

            if (verifyRes.success) {
              setBookingSummary({
                trainer: trainer.name,
                service: selectedService.name,
                date: selectedDate,
                time: selectedTime,
                payment: "Razorpay (Online)",
                status: "Confirmed",
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
            ondismiss: function(){
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
                {trainer.services?.map((s) => s.name).join(", ")}
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
              {trainer?.services.map((s) => (
                <div
                  key={s.serviceId}
                  onClick={() => setSelectedService(s)}
                  className={`p-3 rounded-lg border cursor-pointer ${
                    selectedService?.serviceId === s.serviceId ? "border-red-500 bg-red-50" : "border-gray-200 hover:bg-gray-50"
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
                    className={`py-2 text-xs font-bold rounded-lg border ${
                      selectedTime === slot ? "bg-gray-900 text-white" : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedService && selectedTime && (
          <div className="mt-8 bg-white p-4 rounded-xl shadow flex justify-between items-center animate-fade-in">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Booking Summary</p>
              <p className="font-bold text-sm">{selectedDate} @ {selectedTime}</p>
              <p className="text-xs text-gray-500">{selectedService.name} with {trainer?.name}</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all"
            >
              Pay ₹{trainer?.pricePerSession} Online
            </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900">Booking Confirmed</h3>
            </div>
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Trainer:</span><span className="font-bold">{bookingSummary.trainer}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Service:</span><span className="font-bold">{bookingSummary.service}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Scheduled:</span><span className="font-bold">{bookingSummary.date} @ {bookingSummary.time}</span></div>
              <div className="flex justify-between text-sm border-t pt-2"><span className="text-gray-500">Method:</span><span className="font-bold">{bookingSummary.payment}</span></div>
            </div>
            <button
              onClick={() => navigate("/bookings")}
              className="mt-8 w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all"
            >
              Go to My Bookings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerBookingPage;