// CalendarTimePicker.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

const CalendarTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className={`calendar-time-picker ${isMobile ? 'mobile' : ''}`}>
      <div className="box">
        <div>
          <div className="month">{date.toLocaleString('default', { month: 'long' })}</div>
        </div>
        <div className="two">
          <div className="day">{date.toLocaleDateString(undefined, { weekday: 'long' })}</div>
          <div className="date">{date.getDate()}</div>
          <div className="year">{date.getFullYear()}</div>
        </div>
      </div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="calendar"
        tileClassName={isMobile ? 'mobile-tile' : ''}
      />
      <TimePicker
        onChange={handleTimeChange}
        value={time}
        className={`time-picker ${isMobile ? 'mobile-time-picker' : ''}`}
        disableClock={isMobile}
        format={isMobile ? 'h:mm a' : 'HH:mm'}
      />
    </div>
  );
};

export default CalendarTimePicker;
