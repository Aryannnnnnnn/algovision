"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
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

    console.log("Form submitted:", formData);
    alert("Thank you! We'll get back to you soon.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      value: "hello@algovision.com",
      description: "Quick response within 24hrs",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Live Chat",
      value: "Chat with our team",
      description: "Available now for instant help",
    },
  ];

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
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-[#00b5ff]/30 rounded-full mb-6 shadow-lg shadow-[#00b5ff]/20">
              <svg className="w-4 h-4 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span className="text-sm font-bold text-[#0095d9]">Get In Touch</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Let's Build Something{" "}
              <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">Amazing</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Have a project in mind? We'd love to hear about it. Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-8 sm:p-12">
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
                Send us a message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you shortly.
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
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00b5ff] focus:ring-4 focus:ring-[#00b5ff]/10 transition-all duration-300 placeholder:text-gray-400"
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
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00b5ff] focus:ring-4 focus:ring-[#00b5ff]/10 transition-all duration-300 placeholder:text-gray-400"
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
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00b5ff] focus:ring-4 focus:ring-[#00b5ff]/10 transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00b5ff] focus:ring-4 focus:ring-[#00b5ff]/10 transition-all duration-300 placeholder:text-gray-400"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-900 mb-2">
                  Service Interested In *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00b5ff] focus:ring-4 focus:ring-[#00b5ff]/10 transition-all duration-300"
                >
                  <option value="">Select a service</option>
                  <option value="ai-solutions">AI Solutions</option>
                  <option value="content-creatives">Content & Creatives</option>
                  <option value="pr-marketing">PR & Marketing</option>
                  <option value="social-media-seo">Social Media & SEO</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00b5ff] focus:ring-4 focus:ring-[#00b5ff]/10 transition-all duration-300 placeholder:text-gray-400 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Right - What Happens Next */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-8">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">
                What Happens Next?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're excited to learn about your project. Here's what you can expect after submitting the form:
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl flex items-center justify-center shadow-lg shadow-[#00b5ff]/30">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Quick Response</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our team will review your message and get back to you within 24 hours during business days.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl flex items-center justify-center shadow-lg shadow-[#00b5ff]/30">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Discovery Call</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We'll schedule a free consultation to discuss your needs, goals, and how we can help.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl flex items-center justify-center shadow-lg shadow-[#00b5ff]/30">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Custom Proposal</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Receive a tailored proposal outlining our strategy, timeline, and investment for your project.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff] to-[#00b5ff] rounded-xl flex items-center justify-center shadow-lg shadow-[#00b5ff]/30">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Let's Get Started</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Once approved, we'll kick off your project and begin bringing your vision to life.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 p-6 bg-[#00b5ff]/10 border border-[#00b5ff]/30 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-[#00b5ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <h5 className="font-bold text-gray-900">Trusted by 500+ Companies</h5>
              </div>
              <p className="text-sm text-gray-600">
                Join hundreds of satisfied clients who have transformed their business with AlgoVision.
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative py-20 bg-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-[#00b5ff] transition-all duration-500">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00b5ff]/10 to-[#00b5ff]/20 rounded-xl flex items-center justify-center mb-4 shadow-md shadow-[#00b5ff]/20">
                  <div className="text-[#00b5ff]">
                    {method.icon}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
