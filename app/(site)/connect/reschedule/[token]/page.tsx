"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Calendar, Clock, User, Mail } from "lucide-react";

export default function RescheduleBookingPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [rescheduling, setRescheduling] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [rescheduled, setRescheduled] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await fetch(`/api/bookings/verify-token?token=${token}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid or expired link");
        return;
      }

      setBooking(data.booking);
    } catch (err: any) {
      setError("Failed to load booking details");
    } finally {
      setLoading(false);
    }
  };

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a new date and time");
      return;
    }

    setRescheduling(true);

    try {
      const response = await fetch("/api/bookings/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          selected_date: selectedDate,
          selected_time: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reschedule booking");
      }

      setRescheduled(true);
    } catch (err: any) {
      alert(err.message || "Failed to reschedule booking");
    } finally {
      setRescheduling(false);
    }
  };

  // Generate next 14 days for date selection
  const getNextTwoWeeks = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00b5ff]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Reschedule</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/connect/book-call"
            className="inline-block px-6 py-3 bg-[#00b5ff] text-white rounded-lg font-semibold hover:bg-[#0099dd] transition-colors"
          >
            Book a New Call
          </Link>
        </div>
      </div>
    );
  }

  if (rescheduled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Rescheduled!</h2>
          <p className="text-gray-600 mb-6">
            Your booking has been rescheduled. We've sent you a new confirmation email with the updated details.
          </p>
          <Link
            href="/connect/book-call"
            className="inline-block px-6 py-3 bg-[#00b5ff] text-white rounded-lg font-semibold hover:bg-[#0099dd] transition-colors"
          >
            Done
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/connect/book-call"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00b5ff] to-[#00d4ff] p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Reschedule Your Booking</h1>
            <p className="mt-2 opacity-90">
              Choose a new date and time that works better for you.
            </p>
          </div>

          {/* Current Booking */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Current Booking</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>
                  {new Date(booking.selected_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{booking.selected_time} EST</span>
              </div>
            </div>
          </div>

          {/* New Date & Time Selection */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Select New Date & Time</h3>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Choose a Date</h4>
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                  {getNextTwoWeeks().map((date, index) => {
                    const dateString = date.toISOString().split('T')[0];
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(dateString)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedDate === dateString
                            ? 'border-[#00b5ff] bg-[#00b5ff]/10'
                            : 'border-gray-200 hover:border-[#00b5ff]/40'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-900">{formatDate(date)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Choose a Time</h4>
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all duration-200 ${
                          selectedTime === time
                            ? 'border-[#00b5ff] bg-[#00b5ff]/10 text-[#00b5ff]'
                            : 'border-gray-200 text-gray-700 hover:border-[#00b5ff]/40'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    Please select a date first
                  </div>
                )}
              </div>
            </div>

            {/* Selected Summary */}
            {selectedDate && selectedTime && (
              <div className="mt-6 p-4 bg-[#00b5ff]/10 rounded-xl border-2 border-[#00b5ff]/30">
                <p className="text-sm font-semibold text-gray-900 mb-1">New Time:</p>
                <p className="text-sm text-gray-700">
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })} at {selectedTime} EST
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href={`/connect/cancel/${token}`}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 text-center rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel Instead
              </Link>
              <button
                onClick={handleReschedule}
                disabled={!selectedDate || !selectedTime || rescheduling}
                className="flex-1 px-6 py-3 bg-[#00b5ff] text-white rounded-lg font-semibold hover:bg-[#0099dd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {rescheduling ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Rescheduling...
                  </>
                ) : (
                  "Confirm Reschedule"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
