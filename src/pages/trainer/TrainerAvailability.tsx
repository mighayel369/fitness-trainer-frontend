import TrainerSideBar from "../../layout/TrainerSideBar";
import TrainerTopBar from "../../layout/TrainerTopBar";
import { useState, useEffect } from "react";
import { Clock, Edit, Trash2 } from "lucide-react";
import axiosInstance from "../../api/AxiosInstance";
import Toast from "../../components/Toast";
import Loading from "../../components/Loading";
const formatTo12Hour = (time: string) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hours = ((h + 11) % 12) + 1;
  return `${hours}:${m.toString().padStart(2, "0")} ${suffix}`;
};

const SLOT_DURATION = 60;

const TrainerAvailability = () => {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState<{ startTime: string; endTime: string }[]>([]);
  const [showModel, setShowModel] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [weeklySlots, setWeeklySlots] = useState<
    { date: string; slots: { startTime: string; endTime: string; status: string }[] }[]
  >([]);

  const endTimeFn = (time: string, min: number) => {
    const [h, m] = time.split(":").map(Number);
    const start = new Date();
    start.setHours(h, m);
    start.setMinutes(start.getMinutes() + min);
    return start.toTimeString().slice(0, 5);
  };
useEffect(() => {
  document.title = "FitConnect | Trainer Slots";
}, []);
  useEffect(() => {
    const fetchTrainerSlots = async () => {
      try {
        const res = await axiosInstance.get("/trainer/trainer-slots", {
          withCredentials: true,
        });

        if (res.data.success) {
          console.log(res.data.weeklySlots)
          setSlots(res.data.weeklySlots[0]?.slots || []);
          setWeeklySlots(res.data.weeklySlots);
        } else {
          setSlots([]);
          setWeeklySlots([]);
        }
      } catch (err) {
        console.error("Error fetching slots:", err);
        setSlots([]);
        setWeeklySlots([]);
      }finally{
        setLoading(false)
      }
    };

    fetchTrainerSlots();
  }, []);

  const handleAddOrUpdateSlot = () => {
    if (!startTime) return;

    const endTime = endTimeFn(startTime, SLOT_DURATION);
    const newSlot = { startTime, endTime };

    if (editIndex === null && slots.some((s) => s.startTime === newSlot.startTime)) {
      setToastMessage("You already picked this slot.");
      setToastType("error");
      return;
    }

    if (editIndex !== null) {
      const updated = [...slots];
      updated[editIndex] = newSlot;
      setSlots(updated);
      setEditIndex(null);
    } else {
      if (slots.length >= 4) {
        setToastMessage("You can only add up to 4 slots.");
        setToastType("error");
        return;
      }
      setSlots([...slots, newSlot]);
    }

    setStartTime("");
  };

  const handleDelete = (index: number) => {
    const updated = slots.filter((_, i) => i !== index);
    setSlots(updated);
  };

  const handleEdit = (index: number) => {
    setStartTime(slots[index].startTime);
    setEditIndex(index);
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(
        "/trainer/update",
        { timeSlot: slots },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setToastMessage("Slots saved successfully!");
        setToastType("success");
        setShowModel(false);
      } else {
        setToastMessage("Something went wrong. Please try again.");
        setToastType("error");
      }
    } catch (error) {
      console.error(error);
      setToastMessage("Error saving slots.");
      setToastType("error");
    }
  };

  const handleCancel = () => {
    setShowModel(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerTopBar />
      <TrainerSideBar />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}

      <main className="ml-72 pt-24 px-10">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">Slot Management</h1>

        {loading?(<Loading message="Loading..."/>):weeklySlots.length === 0 ? (
          <div className="bg-white shadow-xl rounded-2xl border border-gray-200 p-10 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Welcome, Trainer!
                </h2>
                <p className="text-gray-600 mt-1">
                  You haven’t set up your availability yet. Add your preferred
                  time slots so clients can start booking you.
                </p>
              </div>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition"
              onClick={() => setShowModel(true)}
            >
              Setup Time Slots
            </button>
          </div>
        ) : (
<div className="bg-white shadow-xl rounded-2xl p-6 overflow-x-auto mt-10">
  <h2 className="text-xl font-semibold mb-6 text-gray-800">
    Trainer Weekly Slots
  </h2>
  <table className="w-full border-collapse rounded-xl overflow-hidden">
    <thead>
      <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
          Time Slot
        </th>
        {weeklySlots.map((day) => (
          <th
            key={day.date}
            className="px-6 py-3 text-center text-sm font-semibold text-gray-700"
          >
            {day.date}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {weeklySlots[0]?.slots.map((slot, idx) => (
        <tr
          key={idx}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          <td className="px-6 py-3 font-medium text-gray-800 border-t">
            {formatTo12Hour(slot.startTime)} - {formatTo12Hour(slot.endTime)}
          </td>
          {weeklySlots.map((day) => {
            const slotData = day.slots.find(
              (s) => s.startTime === slot.startTime
            );

            let badgeClass = "";
            if (slotData?.status === "available") {
              badgeClass =
                "bg-green-100 text-green-700 border border-green-300";
            } else if (slotData?.status === "booked") {
              badgeClass = "bg-red-100 text-red-700 border border-red-300";
            } else if (slotData?.status === "leave") {
              badgeClass =
                "bg-yellow-100 text-yellow-700 border border-yellow-300";
            } else {
              badgeClass = "bg-gray-100 text-gray-500 border border-gray-300";
            }

            return (
              <td
                key={day.date + slot.startTime}
                className="px-6 py-3 text-center border-t"
              >
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${badgeClass}`}
                >
                  {slotData?.status || "N/A"}
                </span>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
</div>

        )}
      </main>

      {showModel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-[600px] rounded-2xl shadow-xl p-8 relative max-h-[90vh] overflow-y-auto">
            <p className="font-bold text-2xl">
              Set Your Time Slots <span className="text-gray-500">(Max 4)</span>
            </p>

            <div className="space-y-4 mt-6">
              <div>
                <label className="text-gray-700 text-sm font-medium">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>
              <button
                onClick={handleAddOrUpdateSlot}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {editIndex !== null ? "Update Slot" : "Add Slot"}
              </button>
            </div>

            {slots.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Chosen Slots
                </h3>
                <ul className="space-y-2">
                  {slots.map((slot, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg"
                    >
                      <span className="text-gray-800 font-medium">
                        {formatTo12Hour(slot.startTime)} -{" "}
                        {formatTo12Hour(slot.endTime)}
                      </span>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md"
                onClick={handleSave}
              >
                Save Slots
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerAvailability;
