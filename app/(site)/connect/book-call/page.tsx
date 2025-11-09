"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

export default function BookCallPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    timezone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Call booking submitted:", formData);
    alert("Thank you! Your call has been scheduled. We'll send you a confirmation email shortly.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      timezone: "",
      projectType: "",
      budget: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-orange-200/70 rounded-full mb-6 shadow-lg shadow-orange-200/30">
              <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-bold text-orange-700">Schedule a Call</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Book Your Free{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">Consultation</span>
                <span className="absolute bottom-2 left-0 w-0 h-3 bg-orange-400/30 -rotate-1 animate-underline-expand"></span>
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Let's discuss your project and explore how AlgoVision can help you achieve your goals. Schedule a free 30-minute consultation with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Booking Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-8 sm:p-12">
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
                Schedule Your Call
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll confirm your appointment within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Company and Phone */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Preferred Date and Time */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-900 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-900 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Timezone */}
                <div>
                  <label htmlFor="timezone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Timezone *
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                  >
                    <option value="">Select timezone</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="CST">Central Time (CST)</option>
                    <option value="MST">Mountain Time (MST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="GMT">Greenwich Mean Time (GMT)</option>
                    <option value="CET">Central European Time (CET)</option>
                    <option value="IST">Indian Standard Time (IST)</option>
                    <option value="JST">Japan Standard Time (JST)</option>
                  </select>
                </div>

                {/* Project Type and Budget */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-semibold text-gray-900 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                    >
                      <option value="">Select type</option>
                      <option value="ai-solutions">AI Solutions</option>
                      <option value="content-creatives">Content & Creatives</option>
                      <option value="pr-marketing">PR & Marketing</option>
                      <option value="social-media-seo">Social Media & SEO</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-gray-900 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
                    >
                      <option value="">Select range</option>
                      <option value="<10k">Less than $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value=">100k">More than $100,000</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400 resize-none"
                    placeholder="Brief description of what you're looking to achieve..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                  }
                >
                  {isSubmitting ? "Scheduling..." : "Book My Call"}
                </Button>
              </form>
            </div>

            {/* Right - Why Book a Call */}
            <div className="lg:sticky lg:top-24">
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  Why Book a Call?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A consultation call is the best way to understand your needs and show you how we can help transform your business.
                </p>
              </div>

              <div className="space-y-6">
                {/* Benefit 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Free & No Obligation</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      This is a completely free consultation with no strings attached. Get expert advice without any commitment.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Talk to Experts</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Connect directly with our senior team members who have years of experience in digital transformation.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Get Custom Solutions</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We'll discuss your unique challenges and provide tailored recommendations specific to your business.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/30">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Fast-Track Your Project</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Start your project faster by aligning on goals, timeline, and approach during our initial call.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-8 p-6 bg-orange-50/50 border border-orange-200/50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                  </svg>
                  <h5 className="font-bold text-gray-900">Average Call Duration: 30 Minutes</h5>
                </div>
                <p className="text-sm text-gray-600">
                  We respect your time. Our calls are focused, efficient, and packed with value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
