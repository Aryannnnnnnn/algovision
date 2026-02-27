"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

const trends = [
  {
    number: "01",
    title: "AI-Driven Personalization",
    stat: "2.8x",
    statLabel: "higher conversions",
    description:
      "Brands leveraging AI for dynamic content personalization saw 2.8x higher conversion rates compared to static campaigns.",
  },
  {
    number: "02",
    title: "Short-Form Video Dominance",
    stat: "67%",
    statLabel: "of all engagement",
    description:
      "Short-form video content accounted for 67% of all engagement across platforms, with Reels and Shorts leading attribution.",
  },
  {
    number: "03",
    title: "First-Party Data Advantage",
    stat: "41%",
    statLabel: "lower CAC",
    description:
      "Companies with mature first-party data strategies reduced customer acquisition costs by 41% year-over-year.",
  },
  {
    number: "04",
    title: "Omnichannel Attribution",
    stat: "53%",
    statLabel: "efficiency gain",
    description:
      "Multi-touch attribution models increased marketing efficiency by 53%, enabling smarter budget allocation across channels.",
  },
];

export default function GrowthReport2026() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: "2026 Growth Report Download - Algo Vision",
          from_name: "Growth Report Subscriber",
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
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative pt-10 pb-36 sm:pt-12 sm:pb-28 lg:pt-16 lg:pb-16">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right,#94a3b8 1px,transparent 1px),linear-gradient(to bottom,#94a3b8 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-bl from-[#00b5ff]/8 via-[#00b5ff]/3 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl space-y-4 sm:space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">2026 Annual Report</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              The Digital{" "}
              <span className="bg-gradient-to-r from-[#00b5ff] to-[#0095d9] bg-clip-text text-transparent">
                Growth Report
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Performance data, emerging trends, and growth strategies across 136+ brands
              and 10+ industries &mdash; distilled into actionable insights for 2026.
            </p>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-5 inline-flex items-center gap-2 text-green-700 font-semibold text-sm sm:text-base">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Check your inbox! The report is on its way.
              </div>
            ) : (
              <div className="pt-1 sm:pt-2">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    disabled={status === "loading"}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#00b5ff] focus:ring-4 focus:ring-[#00b5ff]/10 transition-all duration-300 placeholder:text-gray-400 text-sm sm:text-base disabled:opacity-50"
                  />
                  <Button
                    variant="primary"
                    size="md"
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                    }
                  >
                    {status === "loading" ? "Sending..." : "Get Full Report"}
                  </Button>
                </form>
                {status === "error" && (
                  <p className="text-xs text-red-500 mt-3">Something went wrong. Please try again.</p>
                )}
                <p className="text-xs text-gray-500 mt-3">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Trends + Key Findings card ── */}
      <section className="relative pt-[320px] sm:pt-[220px] lg:pt-[160px] pb-12 sm:pb-16 lg:pb-24 bg-[#00011f] overflow-visible">
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right,#00b5ff 1px,transparent 1px),linear-gradient(to bottom,#00b5ff 1px,transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        {/* Key Findings card — absolutely positioned, hanging between hero & trends */}
        <div className="absolute top-0 left-0 right-0 z-10 -translate-y-[30%] px-4 sm:px-6 lg:px-8">
          <div className="xl:max-w-[90vw] max-w-7xl mx-auto flex justify-center lg:justify-end">
            <div className="bg-gray-50 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 w-full max-w-md sm:max-w-2xl lg:max-w-3xl">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-center">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Key Findings
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-5xl font-normal text-gray-900 mb-1">
                    340<span className="text-[#00b5ff] text-base sm:text-xl align-top">%</span><span className="text-[#00b5ff] text-xs sm:text-sm align-top ml-0.5">+</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    average client revenue growth across all cohorts in 2026
                  </p>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">
                    More Statistics
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 mb-0.5">
                        4.2<span className="text-[#00b5ff] text-base sm:text-xl align-top">x</span>
                      </div>
                      <div className="text-[10px] sm:text-xs font-semibold text-gray-600">
                        return on ad spend
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 mb-0.5">
                        89<span className="text-[#00b5ff] text-base sm:text-xl align-top">%</span>
                      </div>
                      <div className="text-[10px] sm:text-xs font-semibold text-gray-600">
                        client retention rate
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center col-span-2">
                      <div className="text-xl sm:text-2xl lg:text-3xl font-normal text-gray-900 mb-0.5">
                        136<span className="text-[#00b5ff] text-xs sm:text-sm align-top ml-0.5">+</span>
                      </div>
                      <div className="text-[10px] sm:text-xs font-semibold text-gray-600">
                        brands scaled across 10+ industries
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trends content */}
        <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/10 border border-white/10 rounded-full">
              <span className="text-xs font-bold text-white">Trend Insights</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mt-4 sm:mt-6 mb-4 sm:mb-6">
              Four trends shaping{" "}
              <span className="bg-gradient-to-r from-[#00b5ff] to-[#0095d9] bg-clip-text text-transparent">
                the future
              </span>
            </h2>

            <div className="space-y-6 sm:space-y-8 max-w-3xl">
              {trends.map((t, i) => (
                <div key={i} className="flex gap-3 sm:gap-5">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00b5ff] leading-none flex-shrink-0 w-14 sm:w-16 lg:w-20">
                    {t.stat}
                  </span>
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1">
                      {t.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 sm:py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#1e293b] rounded-full shadow-lg">
              <span className="text-xs font-bold text-white">Ready to Scale?</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Ready to outperform{" "}
              <span className="bg-gradient-to-r from-[#00b5ff] to-[#0095d9] bg-clip-text text-transparent">
                the benchmark?
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl">
              Brands that invest in strategic, data-driven digital growth outperform their
              peers by 3-5x. Let&apos;s build your roadmap.
            </p>

            <div className="pt-2 sm:pt-4 inline-block">
              <Button
                href="/connect/book-call"
                variant="primary"
                size="lg"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                }
              >
                Book a Strategy Call
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500">
              No pitch. No pressure. Just a clear plan you can act on immediately.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
