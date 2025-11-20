export default function UtilityBar() {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          {/* Left Side */}
          <div className="flex items-center gap-1.5 text-gray-600">
            <svg className="w-3.5 h-3.5 text-[#1e293b] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium whitespace-nowrap">Trusted by 100+ global brands</span>
          </div>

          {/* Right Side */}
          <a
            href="/resources/2025-growth-report"
            className="flex items-center gap-2 text-gray-900 hover:text-[#00b5ff] transition-colors font-medium"
          >
            <span className="px-1.5 py-0.5 bg-[#00b5ff] text-white text-[10px] font-bold rounded uppercase tracking-wide flex-shrink-0">New</span>
            <span className="hidden sm:inline">Explore our 2025 Growth Report</span>
            <span className="sm:hidden">2025 Growth Report</span>
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
