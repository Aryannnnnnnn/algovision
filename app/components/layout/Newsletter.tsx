"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-12 md:p-16 overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #00b5ff 1px, transparent 1px), linear-gradient(to bottom, #00b5ff 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}></div>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center px-5 py-2.5 bg-[#1e293b] rounded-full mb-6 shadow-lg">
                <span className="text-xs font-bold text-white">Stay Connected</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Get the Latest{" "}
                <span className="relative z-10 bg-gradient-to-r from-[#00b5ff] via-[#00b5ff] to-[#00b5ff] bg-clip-text text-transparent">Insights</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Subscribe to our newsletter for exclusive updates, industry insights, and expert tips delivered straight to your inbox
              </p>
            </div>

            {/* Right - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00b5ff] focus:ring-4 focus:ring-[#00b5ff]/10 transition-all duration-300 placeholder:text-gray-400"
                />
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  }
                >
                  Subscribe Now
                </Button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
