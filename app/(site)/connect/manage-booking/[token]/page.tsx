"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Calendar, Clock, User, Mail, Building, Phone } from "lucide-react";

export default function ManageBookingPage() {
  const params = useParams();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00b5ff] to-[#00d4ff] p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Manage Your Booking</h1>
                <p className="opacity-90">View or update your strategy call details</p>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                booking.status === 'confirmed'
                  ? 'bg-green-500 bg-opacity-20'
                  : 'bg-white bg-opacity-20'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00b5ff]/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-[#00b5ff]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Name</p>
                  <p className="text-gray-900 font-semibold">{booking.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00b5ff]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#00b5ff]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-gray-900 font-semibold">{booking.email}</p>
                </div>
              </div>

              {booking.company && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00b5ff]/10 flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-[#00b5ff]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Company</p>
                    <p className="text-gray-900 font-semibold">{booking.company}</p>
                  </div>
                </div>
              )}

              {booking.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00b5ff]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#00b5ff]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <p className="text-gray-900 font-semibold">{booking.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00b5ff]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#00b5ff]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Date</p>
                  <p className="text-gray-900 font-semibold">
                    {new Date(booking.selected_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00b5ff]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#00b5ff]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Time</p>
                  <p className="text-gray-900 font-semibold">{booking.selected_time} EST</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need to Make Changes?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href={`/connect/reschedule/${token}`}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-[#00b5ff] text-white rounded-lg font-semibold hover:bg-[#0099dd] transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Reschedule Booking
                </Link>
                <Link
                  href={`/connect/cancel/${token}`}
                  className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel Booking
                </Link>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Note:</span> You'll receive a confirmation email 24 hours before your call with a calendar invite and meeting link.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
