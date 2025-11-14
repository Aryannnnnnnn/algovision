"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CalendarBooking() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selected_date: selectedDate,
          selected_time: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book call');
      }

      // Success! Show confirmation
      setShowSuccess(true);

      // Reset form
      setFormData({ name: '', email: '', company: '', phone: '' });
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error: any) {
      alert(error.message || 'Failed to book call. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate next 7 days for date selection
  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
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

  return (
    <section ref={sectionRef} className="relative py-12 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #00b5ff 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {showSuccess ? (
          <div ref={contentRef} className="bg-white p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Booking Confirmed! 🎉
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We've sent a confirmation email with all the details and a calendar invite.
                Check your inbox!
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-8 py-3 bg-[#00b5ff] text-white rounded-lg font-semibold hover:bg-[#0099dd] transition-colors"
              >
                Book Another Call
              </button>
            </div>
          </div>
        ) : (
          <div ref={contentRef} className="bg-white p-8 md:p-12">
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Time
            </h2>
            <p className="text-lg text-gray-600">
              Select a date and time that works best for you. All times are in EST.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Date & Time Selection */}
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select a Date</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {getNextSevenDays().map((date, index) => {
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
              {selectedDate && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Select a Time</h3>
                  <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto">
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
                </div>
              )}
            </div>

            {/* Right: Contact Form */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#00b5ff] focus:outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#00b5ff] focus:outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-gray-900 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#00b5ff] focus:outline-none transition-colors"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#00b5ff] focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Selected Summary */}
                {selectedDate && selectedTime && (
                  <div className="p-4 bg-[#00b5ff]/10 rounded-xl border-2 border-[#00b5ff]/30">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Selected Time:</p>
                    <p className="text-sm text-gray-700">
                      {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime} EST
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || isSubmitting}
                  className="w-full group relative bg-[#00011f] text-white hover:scale-[1.02] font-semibold transition-all duration-500 ease-out flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 px-10 py-5 text-lg"
                >
                  <span className="relative">
                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </span>
                  {!isSubmitting && (
                    <span className="relative group-hover:translate-x-1 transition-transform duration-500 ease-out">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
