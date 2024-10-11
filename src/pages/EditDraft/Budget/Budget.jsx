// import React, { useState, useEffect } from 'react';
// import { Calendar, Wallet } from "lucide-react";
// import { Calendar as MainCalendar } from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
// import TimePicker from 'react-time-picker';

// const Budget = ({ onInputChange, estimatedCost }) => {
//   const [send_time, setSendTime] = useState('now');
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState('10:00');

//   useEffect(() => {
//     // Call onInputChange when send_time changes or when date or time changes
//     if (onInputChange) {
//       const formattedDateTime = formatDateTime(date, time);
//       if (send_time === 'now') {
//         onInputChange(new Date().toISOString());
//       } else if (send_time === 'later') {
//         onInputChange(formattedDateTime);
//       }
//     }
//   }, [send_time, date, time, onInputChange]);

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//   };

//   const handleTimeChange = (newTime) => {
//     setTime(newTime);
//   };

//   const formatDateTime = (date, time) => {
//     const [hours, minutes] = time.split(':').map(Number);
//     const formattedDate = new Date(date);
//     formattedDate.setHours(hours);
//     formattedDate.setMinutes(minutes);
//     return formattedDate.toISOString();
//   };

//   return (
//     <>
//       <div className="w-full h-full space-y-6 p-4 shadow-inner rounded-xl bg-[#F6F6F7]">
//         <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
//           <div className="flex items-center">
//             <Wallet className="mr-2 w-6 h-6" />
//             <div>
//               <p className="font-semibold text-[#040869] text-sm">Your Wallet</p>
//               <p className="text-xl text-[#040869]">$ 20.00</p>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <Wallet className="mr-2 w-6 h-6" />
//             <div>
//               <p className="font-semibold text-[#040869] text-sm">Estimate Cost:</p>
//               <p className="text-xl text-[#040869]">$ {estimatedCost()}</p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center mb-2">
//             <Calendar className="mr-2 w-6 h-6" />
//             <p className="font-semibold text-[#040869] text-sm">Campaign Schedule:</p>
//           </div>
//           <div className="flex mb-4 bg-gray-200 rounded-full p-1">
//             <button
//               onClick={() => setSendTime('now')}
//               className={`flex-1 py-2 px-3 text-sm rounded-full ${send_time === 'now' ? 'bg-[#040869] text-white' : ''}`}
//             >
//               Send Now
//             </button>
//             <button
//               onClick={() => setSendTime('later')}
//               className={`flex-1 py-2 px-3 text-sm rounded-full ${send_time === 'later' ? 'bg-[#040869] text-white' : ''}`}
//             >
//               Send Later
//             </button>
//           </div>
//           {send_time === 'later' && (
//             <div className="calendar-time-picker space-y-4">
//               <MainCalendar
//                 onChange={handleDateChange}
//                 value={date}
//                 className="calendar w-full max-w-xs mx-auto"
//               />
//               <TimePicker
//                 clearIcon={null}
//                 onChange={handleTimeChange}
//                 value={time}
//                 className="time-picker w-full max-w-xs mx-auto"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Budget;


import React, { useState, useEffect } from "react";
import { Calendar, Wallet } from "lucide-react";
import { Calendar as MainCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";

const Budget = ({ onInputChange, estimatedCost }) => {
  const [send_time, setSendTime] = useState("now");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");

  useEffect(() => {
    // Call onInputChange when send_time changes or when date or time changes
    if (onInputChange) {
      const formattedDateTime = formatDateTime(date, time);
      if (send_time === "now") {
        onInputChange(new Date().toISOString());
      } else if (send_time === "later") {
        onInputChange(formattedDateTime);
      }
    }
  }, [send_time, date, time, onInputChange]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const formatDateTime = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const formattedDate = new Date(date);
    formattedDate.setHours(hours);
    formattedDate.setMinutes(minutes);
    return formattedDate.toISOString();
  };

  return (
    <>
      <div className="w-full h-full space-y-6 p-4 shadow-inner rounded-xl bg-[#F6F6F7]">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <Wallet className="mr-2 w-6 h-6" />
            <div>
              <p className="font-semibold text-[#040869] text-sm">
                Your Wallet
              </p>
              <p className="text-xl text-[#040869]">$ 20.00</p>
            </div>
          </div>

          <div className="flex items-center">
            <Wallet className="mr-2 w-6 h-6" />
            <div>
              <p className="font-semibold text-[#040869] text-sm">
                Estimate Cost:
              </p>
              <p className="text-xl text-[#040869]">$ {estimatedCost()}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <Calendar className="mr-2 w-6 h-6" />
            <p className="font-semibold text-[#040869] text-sm">
              Campaign Schedule:
            </p>
          </div>
          <div className="flex mb-4 bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setSendTime("now")}
              className={`flex-1 py-2 px-3 text-sm rounded-full ${
                send_time === "now" ? "bg-[#040869] text-white" : ""
              }`}
            >
              Send Now
            </button>
            <button
              onClick={() => setSendTime("later")}
              className={`flex-1 py-2 px-3 text-sm rounded-full ${
                send_time === "later" ? "bg-[#040869] text-white" : ""
              }`}
            >
              Send Later
            </button>
          </div>
          {send_time === "later" && (
            <div className="calendar-time-picker space-y-4">
              <MainCalendar
                onChange={handleDateChange}
                value={date}
                className="calendar w-full max-w-xs mx-auto"
              />
              <TimePicker
                clearIcon={null}
                onChange={handleTimeChange}
                value={time}
                className="time-picker w-full max-w-xs mx-auto"
                amPmAriaLabel={"Select AM/PM"}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Budget;
