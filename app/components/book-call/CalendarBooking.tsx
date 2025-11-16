"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { getDay, addDays } from 'date-fns';

gsap.registerPlugin(ScrollTrigger);

export default function CalendarBooking() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string>('');
  const [timezoneSearch, setTimezoneSearch] = useState<string>('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    guestEmails: [] as string[],
    meetingPlatform: "",
    website: "",
    businessDescription: "",
    location: "",
  });

  // Detect user's timezone on mount
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);
  }, []);

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
      // Create booking via Cal.com API
      const response = await fetch('/api/cal-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selected_date: selectedDate,
          selected_time: selectedTime,
          timezone: timezone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book call');
      }

      // Success! Show confirmation
      setShowSuccess(true);

      // Reset form
      setFormData({ name: '', email: '', company: '', phone: '', guestEmails: [], meetingPlatform: '', website: '', businessDescription: '', location: '' });
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error: any) {
      alert(error.message || 'Failed to book call. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addGuestEmail = () => {
    setFormData({
      ...formData,
      guestEmails: [...formData.guestEmails, ''],
    });
  };

  const updateGuestEmail = (index: number, value: string) => {
    const newGuestEmails = [...formData.guestEmails];
    newGuestEmails[index] = value;
    setFormData({
      ...formData,
      guestEmails: newGuestEmails,
    });
  };

  const removeGuestEmail = (index: number) => {
    const newGuestEmails = formData.guestEmails.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      guestEmails: newGuestEmails,
    });
  };

  // Generate next 7 weekdays (excluding Saturdays and Sundays)
  // Always based on UTC date to ensure consistency across all timezones
  const getNextSevenDays = () => {
    const days = [];
    let daysAdded = 0;
    let offset = 1;

    while (daysAdded < 14) { // Check up to 14 days to ensure we get 7 weekdays
      const today = new Date();
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + offset);

      // Use UTC day to ensure consistent weekday checking
      const dayOfWeek = futureDate.getUTCDay();

      // Skip weekends (Saturday = 6, Sunday = 0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days.push(futureDate);
        daysAdded++;

        if (daysAdded === 7) break;
      }

      offset++;
    }

    return days;
  };

  const formatDate = (date: Date) => {
    if (!timezone) return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });

    // Always format in UTC to prevent timezone shifts that change the day
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const utcDateStr = `${year}-${month}-${day}T12:00:00Z`;
    const utcDate = new Date(utcDateStr);

    return formatInTimeZone(utcDate, 'UTC', 'EEE, MMM d');
  };

  // Generate time slots - 9 AM to 6 PM in the selected timezone (30-minute intervals)
  const generateTimeSlots = () => {
    if (!timezone) return [];
    const slots = [];

    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip 6:30 PM and beyond
        if (hour === 18 && minute > 0) break;

        // Format the time in 12-hour format
        const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const minuteStr = minute.toString().padStart(2, '0');
        const formattedTime = `${hour12}:${minuteStr} ${ampm}`;

        slots.push(formattedTime);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Timezone options with search functionality
  const timezoneOptions = [
    { value: "America/New_York", label: "Eastern Time (ET)", region: "North America" },
    { value: "America/Chicago", label: "Central Time (CT)", region: "North America" },
    { value: "America/Denver", label: "Mountain Time (MT)", region: "North America" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)", region: "North America" },
    { value: "America/Anchorage", label: "Alaska Time (AKT)", region: "North America" },
    { value: "Pacific/Honolulu", label: "Hawaii Time (HT)", region: "North America" },
    { value: "America/Toronto", label: "Toronto (ET)", region: "North America" },
    { value: "America/Vancouver", label: "Vancouver (PT)", region: "North America" },
    { value: "America/Mexico_City", label: "Mexico City (CST)", region: "North America" },
    { value: "Europe/London", label: "London (GMT/BST)", region: "Europe" },
    { value: "Europe/Paris", label: "Paris (CET/CEST)", region: "Europe" },
    { value: "Europe/Berlin", label: "Berlin (CET/CEST)", region: "Europe" },
    { value: "Europe/Madrid", label: "Madrid (CET/CEST)", region: "Europe" },
    { value: "Europe/Rome", label: "Rome (CET/CEST)", region: "Europe" },
    { value: "Europe/Amsterdam", label: "Amsterdam (CET/CEST)", region: "Europe" },
    { value: "Europe/Brussels", label: "Brussels (CET/CEST)", region: "Europe" },
    { value: "Europe/Zurich", label: "Zurich (CET/CEST)", region: "Europe" },
    { value: "Europe/Moscow", label: "Moscow (MSK)", region: "Europe" },
    { value: "Asia/Dubai", label: "Dubai (GST)", region: "Asia" },
    { value: "Asia/Kolkata", label: "India (IST)", region: "Asia" },
    { value: "Asia/Singapore", label: "Singapore (SGT)", region: "Asia" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)", region: "Asia" },
    { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", region: "Asia" },
    { value: "Asia/Shanghai", label: "Shanghai (CST)", region: "Asia" },
    { value: "Asia/Seoul", label: "Seoul (KST)", region: "Asia" },
    { value: "Asia/Bangkok", label: "Bangkok (ICT)", region: "Asia" },
    { value: "Australia/Sydney", label: "Sydney (AEDT/AEST)", region: "Australia" },
    { value: "Australia/Melbourne", label: "Melbourne (AEDT/AEST)", region: "Australia" },
    { value: "Pacific/Auckland", label: "Auckland (NZDT/NZST)", region: "Pacific" },
  ];

  const filteredTimezones = timezoneSearch
    ? timezoneOptions.filter(tz =>
        tz.label.toLowerCase().includes(timezoneSearch.toLowerCase()) ||
        tz.region.toLowerCase().includes(timezoneSearch.toLowerCase())
      )
    : timezoneOptions;

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
            <p className="text-lg text-gray-600 mb-6">
              Select a date and time that works best for you.
            </p>

            {/* Timezone Selector */}
            <div className="max-w-md">
              <label htmlFor="timezone" className="block text-sm font-bold text-gray-900 mb-2">
                Your Timezone
              </label>
              <Select
                value={timezone}
                onValueChange={(value) => setTimezone(value)}
              >
                <SelectTrigger className="w-full h-11 text-base">
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent className="max-h-[350px]">
                  <div className="sticky top-0 bg-white p-2 border-b z-10">
                    <Input
                      type="text"
                      placeholder="Search timezone..."
                      value={timezoneSearch}
                      onChange={(e) => setTimezoneSearch(e.target.value)}
                      className="h-9 text-sm"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="pt-1">
                    {filteredTimezones.length > 0 ? (
                      filteredTimezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value} className="text-base">
                          {tz.label}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-3 text-sm text-gray-500 text-center">
                        No timezones found
                      </div>
                    )}
                  </div>
                </SelectContent>
              </Select>
            </div>
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
              {selectedDate && timezone && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Select a Time ({timezone.split('/')[1].replace('_', ' ')})</h3>
                  <div className="grid grid-cols-3 gap-3">
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
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="h-11 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="h-11 text-base"
                  />
                </div>

                {/* Guest Emails */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-900">
                      Guest Emails (Optional)
                    </label>
                    <button
                      type="button"
                      onClick={addGuestEmail}
                      className="text-sm font-semibold text-[#00b5ff] hover:text-[#0099dd] transition-colors flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Guest
                    </button>
                  </div>
                  {formData.guestEmails.length > 0 && (
                    <div className="space-y-2">
                      {formData.guestEmails.map((email, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => updateGuestEmail(index, e.target.value)}
                            placeholder="guest@company.com"
                            className="flex-1 h-11 text-base"
                          />
                          <button
                            type="button"
                            onClick={() => removeGuestEmail(index)}
                            className="px-3 py-2 rounded-md border-2 border-red-200 text-red-600 hover:bg-red-50 transition-colors h-11"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-gray-900 mb-2">
                    Company Name *
                  </label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="h-11 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="h-11 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-bold text-gray-900 mb-2">
                    Website
                  </label>
                  <Input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    className="h-11 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-bold text-gray-900 mb-2">
                    Where are you based? *
                  </label>
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="h-11 text-base"
                  />
                </div>

                <div>
                  <label htmlFor="meetingPlatform" className="block text-sm font-bold text-gray-900 mb-2">
                    Preferred Meeting Platform *
                  </label>
                  <Select
                    value={formData.meetingPlatform}
                    onValueChange={(value) => setFormData({ ...formData, meetingPlatform: value })}
                    required
                  >
                    <SelectTrigger className="w-full h-11 text-base">
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google-meet" className="text-base">Google Meet</SelectItem>
                      <SelectItem value="zoom" className="text-base">Zoom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="businessDescription" className="block text-sm font-bold text-gray-900 mb-2">
                    Describe Your Business *
                  </label>
                  <Textarea
                    id="businessDescription"
                    name="businessDescription"
                    required
                    value={formData.businessDescription}
                    onChange={handleChange}
                    placeholder="Tell us about your business and what you're looking for..."
                    className="resize-none min-h-[120px] text-base"
                  />
                </div>

                {/* Selected Summary */}
                {selectedDate && selectedTime && timezone && (
                  <div className="p-4 bg-[#00b5ff]/10 rounded-xl border-2 border-[#00b5ff]/30">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Selected Time:</p>
                    <p className="text-sm text-gray-700">
                      {formatInTimeZone(new Date(selectedDate), timezone, 'EEEE, MMMM d, yyyy')} at {selectedTime} ({timezone.split('/')[1].replace('_', ' ')})
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime || !timezone || !formData.meetingPlatform || !formData.businessDescription || !formData.location || !formData.company || isSubmitting}
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
