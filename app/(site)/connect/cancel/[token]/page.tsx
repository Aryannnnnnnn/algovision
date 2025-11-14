"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Calendar, Clock, User, Mail } from "lucide-react";

export default function CancelBookingPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

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

  const handleCancel = async () => {
    setCancelling(true);

    try {
      const response = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          cancellation_reason: cancellationReason,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel booking");
      }

      setCancelled(true);
    } catch (err: any) {
      alert(err.message || "Failed to cancel booking");
    } finally {
      setCancelling(false);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Cancel</h2>
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

  if (cancelled) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Cancelled</h2>
          <p className="text-gray-600 mb-6">
            Your booking has been successfully cancelled. We've sent you a confirmation email.
          </p>
          <Link
            href="/connect/book-call"
            className="inline-block px-6 py-3 bg-[#00b5ff] text-white rounded-lg font-semibold hover:bg-[#0099dd] transition-colors"
          >
            Book Another Call
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/connect/book-call"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">Cancel Your Booking</h1>
            <p className="mt-2 opacity-90">
              We're sorry to see you cancel. You can reschedule instead if you'd like.
            </p>
          </div>

          {/* Booking Details */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-5 h-5 text-gray-400" />
                <span>{booking.name}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{booking.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>
                  {new Date(booking.selected_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{booking.selected_time} EST</span>
              </div>
            </div>
          </div>

          {/* Cancellation Form */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Why are you cancelling? (Optional)
            </h3>
            <textarea
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g., Schedule conflict, changed my mind, found another solution..."
            />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href={`/connect/reschedule/${token}`}
                className="flex-1 px-6 py-3 bg-[#00b5ff] text-white text-center rounded-lg font-semibold hover:bg-[#0099dd] transition-colors"
              >
                Reschedule Instead
              </Link>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {cancelling ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  "Confirm Cancellation"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
