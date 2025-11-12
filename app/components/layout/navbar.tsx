"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navbarData } from "@/app/constants/navbar-data";
import Button from "@/app/components/ui/Button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
    if (dropdown === "solutions") {
      setActiveCategory(0);
    }
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200/60 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <img src="/AlgoVisionLogo.png" alt="Algo Vision Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display text-lg font-semibold text-gray-900 tracking-tight">
              Algo Vision
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Home */}
            <Link href="/" className="px-3.5 py-2 text-[15px] text-gray-700 hover:text-gray-900 font-medium transition-colors duration-150 relative group">
              Home
              <span className="absolute inset-x-3 -bottom-px h-0.5 bg-[#00b5ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full"></span>
            </Link>

            {/* Solutions Dropdown */}
            <div
              className="relative h-[72px] flex items-center"
              onMouseEnter={() => handleDropdownEnter("solutions")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className={`px-3.5 py-2 text-[15px] text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors duration-150 relative group ${activeDropdown === "solutions" ? "text-gray-900" : ""}`}>
                {navbarData.solutions.title}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
                <span className={`absolute inset-x-3 -bottom-px h-0.5 bg-[#00b5ff] transition-transform duration-200 origin-center rounded-full ${activeDropdown === "solutions" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
              </button>

              {activeDropdown === "solutions" && (
                <div className="fixed top-[72px] left-0 right-0 w-full bg-white border-t border-gray-200/80 shadow-xl pt-0">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex">
                      {/* Left Sidebar - Categories */}
                      <div className="w-72 bg-gray-50 border-r border-gray-200 py-8">
                        <div className="px-6">
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                            Solutions
                          </h3>
                          <nav className="space-y-1">
                            {navbarData.solutions.categories.map((category, idx) => (
                              <button
                                key={idx}
                                onMouseEnter={() => setActiveCategory(idx)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                                  activeCategory === idx
                                    ? "bg-white text-[#00b5ff] font-semibold shadow-sm"
                                    : "text-gray-700 hover:bg-white/50 hover:text-gray-900"
                                }`}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  activeCategory === idx ? "bg-[#00b5ff]" : "bg-gray-400"
                                }`}></div>
                                <span className="text-sm">{category.title}</span>
                              </button>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Right Content - Services */}
                      <div className="flex-1 py-8 px-8">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-1 h-6 bg-[#00b5ff] rounded-full"></div>
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                            {navbarData.solutions.categories[activeCategory].title}
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {navbarData.solutions.categories[activeCategory].links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[#00b5ff]/10 transition-all duration-300"
                            >
                              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors duration-300">
                                <svg className="w-5 h-5 text-gray-600 group-hover:text-[#00b5ff] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-300 mb-0.5">
                                  {link.name}
                                </div>
                                <div className="text-xs text-gray-500 leading-relaxed">
                                  {link.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative h-[72px] flex items-center"
              onMouseEnter={() => handleDropdownEnter("company")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className={`px-3.5 py-2 text-[15px] text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors duration-150 relative group ${activeDropdown === "company" ? "text-gray-900" : ""}`}>
                {navbarData.company.title}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "company" ? "rotate-180" : ""}`} />
                <span className={`absolute inset-x-3 -bottom-px h-0.5 bg-[#00b5ff] transition-transform duration-200 origin-center rounded-full ${activeDropdown === "company" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
              </button>

              {activeDropdown === "company" && (
                <div className="fixed top-[72px] left-0 right-0 w-full bg-white border-t border-gray-200/80 shadow-xl pt-0">
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1 h-6 bg-[#00b5ff] rounded-full"></div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Company
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {navbarData.company.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[#00b5ff]/10 transition-all duration-300"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors duration-300">
                            <svg className="w-5 h-5 text-gray-600 group-hover:text-[#00b5ff] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-300 mb-0.5">
                              {link.name}
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed">
                              {link.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative h-[72px] flex items-center"
              onMouseEnter={() => handleDropdownEnter("resources")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className={`px-3.5 py-2 text-[15px] text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors duration-150 relative group ${activeDropdown === "resources" ? "text-gray-900" : ""}`}>
                {navbarData.resources.title}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
                <span className={`absolute inset-x-3 -bottom-px h-0.5 bg-[#00b5ff] transition-transform duration-200 origin-center rounded-full ${activeDropdown === "resources" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
              </button>

              {activeDropdown === "resources" && (
                <div className="fixed top-[72px] left-0 right-0 w-full bg-white border-t border-gray-200/80 shadow-xl pt-0">
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1 h-6 bg-[#00b5ff] rounded-full"></div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Resources
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {navbarData.resources.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[#00b5ff]/10 transition-all duration-300"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors duration-300">
                            <svg className="w-5 h-5 text-gray-600 group-hover:text-[#00b5ff] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-300 mb-0.5">
                              {link.name}
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed">
                              {link.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Connect Dropdown */}
            <div
              className="relative h-[72px] flex items-center"
              onMouseEnter={() => handleDropdownEnter("connect")}
              onMouseLeave={handleDropdownLeave}
            >
              <button className={`px-3.5 py-2 text-[15px] text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors duration-150 relative group ${activeDropdown === "connect" ? "text-gray-900" : ""}`}>
                {navbarData.connect.title}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "connect" ? "rotate-180" : ""}`} />
                <span className={`absolute inset-x-3 -bottom-px h-0.5 bg-[#00b5ff] transition-transform duration-200 origin-center rounded-full ${activeDropdown === "connect" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
              </button>

              {activeDropdown === "connect" && (
                <div className="fixed top-[72px] left-0 right-0 w-full bg-white border-t border-gray-200/80 shadow-xl pt-0">
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1 h-6 bg-[#00b5ff] rounded-full"></div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                        Connect
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {navbarData.connect.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[#00b5ff]/10 transition-all duration-300"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#00b5ff]/20 transition-colors duration-300">
                            <svg className="w-5 h-5 text-gray-600 group-hover:text-[#00b5ff] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-[#00b5ff] transition-colors duration-300 mb-0.5">
                              {link.name}
                            </div>
                            <div className="text-xs text-gray-500 leading-relaxed">
                              {link.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              href="/connect/book-call"
              variant="primary"
              size="sm"
              className="text-[15px] whitespace-nowrap"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              Request a Proposal
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white lg:hidden z-[100] flex flex-col h-screen w-screen">
          {/* Header */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex justify-between items-center p-4">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 bg-gradient-to-br from-[#00b5ff] via-[#00b5ff] to-[#0095d9] rounded-lg flex items-center justify-center">
                  <span className="text-white font-display text-base font-bold">A</span>
                </div>
                <span className="font-display text-lg font-semibold text-gray-900">Algo Vision</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Menu Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Home Link */}
            <Link
              href="/"
              className="block px-4 py-3 text-gray-900 hover:bg-[#00b5ff]/10 hover:text-[#00b5ff] rounded-lg font-medium transition-colors mb-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Solutions Accordion */}
            <div className="mb-1">
              <button
                onClick={() => setMobileActiveSection(mobileActiveSection === "solutions" ? null : "solutions")}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-[#00b5ff]/10 rounded-lg font-medium transition-colors"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileActiveSection === "solutions" ? "rotate-180" : ""}`} />
              </button>
              {mobileActiveSection === "solutions" && (
                <div className="pl-2 pr-2 py-2 space-y-4">
                  {navbarData.solutions.categories.map((category) => (
                    <div key={category.title}>
                      {/* Category Title */}
                      <div className="px-4 py-1.5 text-xs font-bold text-[#00b5ff] uppercase tracking-wider">
                        {category.title}
                      </div>
                      {/* Category Links */}
                      <div className="space-y-0.5">
                        {category.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00b5ff]/10 hover:text-[#00b5ff] rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Company Accordion */}
            <div className="mb-1">
              <button
                onClick={() => setMobileActiveSection(mobileActiveSection === "company" ? null : "company")}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-[#00b5ff]/10 rounded-lg font-medium transition-colors"
              >
                <span>Company</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileActiveSection === "company" ? "rotate-180" : ""}`} />
              </button>
              {mobileActiveSection === "company" && (
                <div className="pl-4 pr-2 py-2 space-y-1">
                  {navbarData.company.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00b5ff]/10 hover:text-[#00b5ff] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Accordion */}
            <div className="mb-1">
              <button
                onClick={() => setMobileActiveSection(mobileActiveSection === "resources" ? null : "resources")}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-[#00b5ff]/10 rounded-lg font-medium transition-colors"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileActiveSection === "resources" ? "rotate-180" : ""}`} />
              </button>
              {mobileActiveSection === "resources" && (
                <div className="pl-4 pr-2 py-2 space-y-1">
                  {navbarData.resources.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00b5ff]/10 hover:text-[#00b5ff] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Connect Accordion */}
            <div className="mb-1">
              <button
                onClick={() => setMobileActiveSection(mobileActiveSection === "connect" ? null : "connect")}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-[#00b5ff]/10 rounded-lg font-medium transition-colors"
              >
                <span>Connect</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileActiveSection === "connect" ? "rotate-180" : ""}`} />
              </button>
              {mobileActiveSection === "connect" && (
                <div className="pl-4 pr-2 py-2 space-y-1">
                  {navbarData.connect.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#00b5ff]/10 hover:text-[#00b5ff] rounded-lg transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog Link */}
            <Link
              href="/resources/blogs"
              className="block px-4 py-3 text-gray-900 hover:bg-[#00b5ff]/10 hover:text-[#00b5ff] rounded-lg font-medium transition-colors mb-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </div>

          {/* Bottom CTA - Fixed at bottom using flexbox */}
          <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div onClick={() => setMobileMenuOpen(false)}>
              <Button
                href="/connect/book-call"
                variant="primary"
                size="md"
                className="w-full"
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
