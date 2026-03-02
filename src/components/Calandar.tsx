import { useState } from "react";
type CalendarProps = {
  selectDate: (date: string) => void;  
  selectedDate: string;
};
const Calendar:React.FC<CalendarProps> = ({selectDate,selectedDate}) => {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null); 
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  const goPrevMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
    if (currentMonth === 0) setCurrentYear(y => y - 1);
  };
  
  const goNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
    if (currentMonth === 11) setCurrentYear(y => y + 1);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <button onClick={goPrevMonth} className="text-xl font-bold">&lt;</button>
        <h2 className="text-xl font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={goNextMonth} className="text-xl font-bold">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-medium">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>

        {daysArray.map((day, index) => {
          const isSunday = index % 7 === 0;
          const formattedDay =`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isPastDate =new Date(formattedDay).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
          const isSelected = selectedDate === formattedDay
          return (
          <div
            key={index}
            className={`
              p-3 rounded-lg border text-center
              ${isSelected ? "bg-red-600 text-white font-bold" : ""}
              ${isSunday ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""}
              ${!isSelected && !isSunday ? "hover:bg-red-100" : ""}
              ${isPastDate ?"text-gray-400 opacity-50 cursor-not-allowed":"cursor-pointer"}
            `}
            onClick={() => !isSunday && !isPastDate && selectDate(formattedDay)}
          >
            {day}
          </div>

          );
        })}
      </div>
    </>
  );
};

export default Calendar;
