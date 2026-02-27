"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: "Newsletter Subscription - Algo Vision",
          from_name: "Newsletter Subscriber",
          email,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
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
              {status === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-2 text-green-700 font-semibold">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  You're subscribed! Check your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={status === "loading"}
                    className="w-full px-6 py-4 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00b5ff] focus:ring-4 focus:ring-[#00b5ff]/10 transition-all duration-300 placeholder:text-gray-400 disabled:opacity-50"
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
                    {status === "loading" ? "Subscribing..." : "Subscribe Now"}
                  </Button>
                  {status === "error" && (
                    <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}

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
