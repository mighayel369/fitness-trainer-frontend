import { useEffect, useState } from "react";
import TrainerTopBar from "../../layout/TrainerTopBar";
import TrainerSideBar from "../../layout/TrainerSideBar";
import { Calendar, Trash2, Pencil } from "lucide-react";
import axiosInstance from "../../api/AxiosInstance";

const SLOT_DURATION = 60;

const formatTo12Hour = (time: string) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hours = ((h + 11) % 12) + 1;
  return `${hours}:${m.toString().padStart(2, "0")} ${suffix}`;
};

const generateUpcomingWeek = () => {
  const today = new Date();
  const days: { day: string; date: string; fullDate: string }[] = [];

  let addedDays = 0;
  let i = 0;

  while (addedDays < 6) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayOfWeek = d.getDay();

    if (dayOfWeek !== 0) {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "short",
        day: "numeric",
      };

      days.push({
        day: d.toLocaleDateString("en-US", { weekday: "long" }),
        date: d.toLocaleDateString("en-US", options),
        fullDate: d.toISOString().split("T")[0],
      });

      addedDays++;
    }
    i++;
  }
  return days;
};

const TrainerAvailability = () => {
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [slots, setSlots] = useState<any[]>([]);
  const [weeklySlots, setWeeklySlots] = useState<any[]>([]);
  const [editingSlot, setEditingSlot] = useState<any | null>(null);
  const daysWithDates = generateUpcomingWeek();

useEffect(() => {
  const fetchSlots = async () => {
    try {
      const res = await axiosInstance.get("/trainer/trainer-slot",{withCredentials:true});
      if (res.data?.data) {
        const backendSlots = res.data.data; 
        setWeeklySlots(
          daysWithDates.map((day) => ({
            ...day,
            slots: backendSlots
              .filter((s: any) => s.date === day.fullDate)
              .map((s: any) => ({
                id: Date.now() + Math.random(),
                startTime: s.startTime,
                endTime: s.endTime,
                status: s.status,
              })),
          }))
        );
      }
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };
  fetchSlots();
}, []);

  const addMinutes = (time: string, mins: number) => {
    const [h, m] = time.split(":").map(Number);
    const start = new Date();
    start.setHours(h, m);
    start.setMinutes(start.getMinutes() + mins);
    return start.toTimeString().slice(0, 5);
  };

  const handleAddSlot = () => {
    if (!startTime) return;
    if (slots.length >= 5) {
      alert("You can only add up to 5 slots.");
      return;
    }

    const endTime = addMinutes(startTime, SLOT_DURATION);

    if (editingSlot) {
      const updated = slots.map((s) =>
        s.id === editingSlot.id ? { ...s, startTime, endTime } : s
      );
      setSlots(updated);
      setEditingSlot(null);
    } else {
      const newSlot = { id: Date.now(), startTime, endTime };
      setSlots([...slots, newSlot]);
    }

    setStartTime("");
  };

  const handleDeleteSlot = (id: number) => {
    setSlots(slots.filter((slot) => slot.id !== id));
  };

  const handleEditSlot = (slot: any) => {
    setStartTime(slot.startTime);
    setEditingSlot(slot);
  };

const handleSave = async () => {
  if (slots.length < 3) {
    alert("You must select at least 3 slots.");
    return;
  }

  const payload = daysWithDates.flatMap((day) =>
    slots.map((s) => ({
      date: day.fullDate,
      startTime: s.startTime,
      endTime: s.endTime,
    }))
  );

  try {
    await axiosInstance.post(
      "/trainer/save-trainerslot",
      { slots: payload },
      { withCredentials: true }
    );

    const expanded = daysWithDates.map((day) => ({
      ...day,
      slots: slots.map((s) => ({ ...s, status: "available" })),
    }));
    setWeeklySlots(expanded);
    setShowModal(false);
  } catch (err) {
    console.error("Error saving slots:", err);
  }
};

  const toggleSlotStatus = (fullDate: string, id: number) => {
    const updated = weeklySlots.map((d) =>
      d.fullDate === fullDate
        ? {
            ...d,
            slots: d.slots.map((s: any) =>
              s.id === id
                ? { ...s, status: s.status === "available" ? "leave" : "available" }
                : s
            ),
          }
        : d
    );
    setWeeklySlots(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TrainerTopBar />
      <TrainerSideBar />

      <main className="ml-72 pt-24 px-10">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">
          Trainer Availability Management
        </h1>

        {slots.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-10 max-w-3xl mx-auto text-center">
            <Calendar className="w-16 h-16 text-blue-600 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to Availability Management
            </h2>
            <p className="text-gray-600 mb-6">
              You haven’t set up your availability slots yet. Set at least 3 slots so clients know when to book sessions.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
            >
              + Set Availability
            </button>
          </div>
        ) : (
          <div className="bg-white shadow rounded-2xl p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Trainer Weekly Slots</h2>

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-gray-100 text-left">Time Slot</th>
                  {daysWithDates.map((day) => (
                    <th
                      key={day.fullDate}
                      className="border px-4 py-2 bg-gray-100 text-center"
                    >
                      {day.date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot.id}>
                    <td className="border px-4 py-2 font-medium">
                      {formatTo12Hour(slot.startTime)} - {formatTo12Hour(slot.endTime)}
                    </td>
                    {daysWithDates.map((day) => {
                      const dayData = weeklySlots.find((d: any) => d.fullDate === day.fullDate);
                      const slotData = dayData?.slots.find((s: any) => s.id === slot.id);

                      return (
                        <td
                          key={day.fullDate + slot.id}
                          onClick={() => toggleSlotStatus(day.fullDate, slot.id)}
                          className={`border px-4 py-2 text-center cursor-pointer transition ${
                            slotData?.status === "available"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {slotData?.status}
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[600px] relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editingSlot ? "Edit Slot" : "Set Your Availability (3–5 slots per day)"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                onClick={handleAddSlot}
                disabled={!startTime || slots.length >= 5}
                className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {editingSlot ? "Update Slot" : "+ Add Slot (1hr each)"}
              </button>
            </div>

            {slots.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Selected Slots
                </h3>
                <ul className="space-y-2">
                  {slots.map((slot) => (
                    <li
                      key={slot.id}
                      className="flex justify-between items-center border rounded-lg px-4 py-2 bg-gray-50"
                    >
                      <span>
                        {formatTo12Hour(slot.startTime)} - {formatTo12Hour(slot.endTime)}
                      </span>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditSlot(slot)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingSlot(null);
                  setStartTime("");
                }}
                className="px-5 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={slots.length < 3}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                Save & Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerAvailability;
