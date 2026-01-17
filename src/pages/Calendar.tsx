import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type Meeting = {
  id: number;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'declined';
};

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<string[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      date: new Date(),
      time: '10:00 AM',
      status: 'pending',
    },
  ]);

  const addAvailability = (time: string) => {
    if (!availability.includes(time)) {
      setAvailability([...availability, time]);
    }
  };

  const updateMeetingStatus = (id: number, status: 'confirmed' | 'declined') => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, status } : meeting
      )
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meeting Scheduling</h1>

      {/* Calendar */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
        />
      </div>

      {/* Availability Slots */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Your Availability</h2>
        <div className="flex gap-2 mb-3 flex-wrap">
          {['9:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'].map((time) => (
            <button
              key={time}
              onClick={() => addAvailability(time)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              {time}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {availability.map((time, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Meeting Requests */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Meeting Requests</h2>

        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <p className="font-medium">
                {meeting.date.toDateString()} at {meeting.time}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                Status: {meeting.status}
              </p>
            </div>

            {meeting.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    updateMeetingStatus(meeting.id, 'confirmed')
                  }
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    updateMeetingStatus(meeting.id, 'declined')
                  }
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
