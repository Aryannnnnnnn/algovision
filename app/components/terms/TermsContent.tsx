"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TermsContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          gsap.from(section, {
            opacity: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            By accessing and using Algo Vision's services, website, or any related platforms (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"). These Terms constitute a legally binding agreement between you and Algo Vision Marketing Solutions ("Algo Vision," "we," "us," or "our").
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you are entering into these Terms on behalf of a company, organization, or other legal entity, you represent and warrant that you have the authority to bind such entity to these Terms. In such case, "you" and "your" shall refer to such entity.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you do not agree to these Terms, you must not access or use our Services. Your continued use of the Services following any changes to these Terms constitutes acceptance of those changes.
          </p>
        </div>
      ),
    },
    {
      id: "services",
      title: "2. Services Description",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Algo Vision provides comprehensive marketing and analytics services, including but not limited to:
          </p>
          <ul className="space-y-3 ml-6">
            <li className="text-gray-700 leading-relaxed flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2"></span>
              <span><strong>Data Analytics and Insights:</strong> Advanced analytics solutions, market research, and performance tracking</span>
            </li>
            <li className="text-gray-700 leading-relaxed flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2"></span>
              <span><strong>Marketing Strategy:</strong> Campaign development, brand positioning, and strategic consulting</span>
            </li>
            <li className="text-gray-700 leading-relaxed flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2"></span>
              <span><strong>Digital Marketing:</strong> SEO, content marketing, social media management, and paid advertising</span>
            </li>
            <li className="text-gray-700 leading-relaxed flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2"></span>
              <span><strong>Creative Services:</strong> Brand development, content creation, and design services</span>
            </li>
            <li className="text-gray-700 leading-relaxed flex items-start gap-3">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#00b5ff] mt-2"></span>
              <span><strong>Technology Solutions:</strong> Marketing automation, CRM integration, and custom development</span>
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            The specific services provided to you will be detailed in your service agreement or statement of work. We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time, with or without notice, though we will make reasonable efforts to notify active clients of material changes.
          </p>
        </div>
      ),
    },
    {
      id: "responsibilities",
      title: "3. User Responsibilities",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            As a user of our Services, you agree to:
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">3.1 Accurate Information</h4>
              <p className="text-gray-700 leading-relaxed">
                Provide accurate, current, and complete information during registration and throughout your use of our Services. You are responsible for maintaining the accuracy of your account information and promptly updating any changes.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">3.2 Account Security</h4>
              <p className="text-gray-700 leading-relaxed">
                Maintain the confidentiality of your account credentials and be responsible for all activities that occur under your account. You must notify us immediately of any unauthorized access or security breach.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">3.3 Lawful Use</h4>
              <p className="text-gray-700 leading-relaxed">
                Use our Services only for lawful purposes and in accordance with these Terms. You may not use our Services to engage in any illegal activity, violate any applicable laws or regulations, or infringe upon the rights of others.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">3.4 Cooperation</h4>
              <p className="text-gray-700 leading-relaxed">
                Provide timely feedback, approvals, and materials necessary for us to deliver the Services effectively. Delays in providing required materials may impact project timelines and deliverables.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">3.5 Prohibited Activities</h4>
              <p className="text-gray-700 leading-relaxed">
                You agree not to: (a) attempt to gain unauthorized access to our systems or networks; (b) interfere with or disrupt the Services; (c) use automated systems to access the Services without our written permission; (d) impersonate any person or entity; or (e) engage in any activity that could harm Algo Vision's reputation or business interests.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "payment",
      title: "4. Payment Terms",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">4.1 Fees and Billing</h4>
            <p className="text-gray-700 leading-relaxed">
              All fees for Services will be specified in your service agreement, proposal, or statement of work. Unless otherwise stated, all fees are in U.S. Dollars and are non-refundable. You agree to pay all fees according to the payment schedule outlined in your agreement.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">4.2 Payment Methods</h4>
            <p className="text-gray-700 leading-relaxed">
              We accept payment via credit card, ACH transfer, wire transfer, or other methods as specified in your agreement. For recurring services, you authorize us to charge your designated payment method automatically according to the agreed schedule.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">4.3 Late Payments</h4>
            <p className="text-gray-700 leading-relaxed">
              Payments not received within 30 days of the invoice date are considered past due. We reserve the right to charge interest on late payments at a rate of 1.5% per month (or the maximum rate permitted by law, whichever is lower) and to suspend Services until payment is received.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">4.4 Taxes</h4>
            <p className="text-gray-700 leading-relaxed">
              All fees are exclusive of applicable taxes, duties, or similar governmental charges. You are responsible for paying all such taxes, except for taxes based on Algo Vision's net income.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">4.5 Expenses</h4>
            <p className="text-gray-700 leading-relaxed">
              Unless otherwise agreed in writing, you will reimburse Algo Vision for reasonable out-of-pocket expenses incurred in connection with providing the Services, including but not limited to travel, accommodation, third-party tools, and media costs.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">5.1 Algo Vision Property</h4>
            <p className="text-gray-700 leading-relaxed">
              All intellectual property rights in our Services, including but not limited to software, methodologies, processes, tools, templates, and documentation (collectively, "Algo Vision IP"), remain the exclusive property of Algo Vision. These Terms do not grant you any ownership rights in Algo Vision IP.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">5.2 Client Materials</h4>
            <p className="text-gray-700 leading-relaxed">
              You retain all rights to materials, content, and data you provide to us ("Client Materials"). By providing Client Materials, you grant Algo Vision a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such materials solely for the purpose of providing Services to you.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">5.3 Deliverables</h4>
            <p className="text-gray-700 leading-relaxed">
              Upon full payment of all fees, Algo Vision grants you ownership of the final deliverables specifically created for you as outlined in your service agreement ("Deliverables"), excluding any Algo Vision IP incorporated therein. You may not resell, redistribute, or claim ownership of any Algo Vision IP.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">5.4 Portfolio Rights</h4>
            <p className="text-gray-700 leading-relaxed">
              Unless you explicitly opt out in writing, you grant Algo Vision the right to use Deliverables and Client Materials in our portfolio, case studies, and marketing materials, with appropriate attribution and subject to any confidentiality obligations.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">5.5 Third-Party Materials</h4>
            <p className="text-gray-700 leading-relaxed">
              Deliverables may incorporate third-party materials (such as stock photos, fonts, or software) that are subject to separate licensing terms. You are responsible for obtaining and maintaining any necessary third-party licenses for your continued use of such materials.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "liability",
      title: "6. Limitation of Liability",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">6.1 Disclaimer of Warranties</h4>
            <p className="text-gray-700 leading-relaxed">
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. ALGO VISION DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">6.2 Limitation of Damages</h4>
            <p className="text-gray-700 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALGO VISION SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR USE OR INABILITY TO USE THE SERVICES; (B) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS AND/OR ANY PERSONAL INFORMATION STORED THEREIN; (C) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES; OR (D) ANY BUGS, VIRUSES, OR OTHER HARMFUL CODE.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">6.3 Liability Cap</h4>
            <p className="text-gray-700 leading-relaxed">
              IN NO EVENT SHALL ALGO VISION'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION EXCEED THE AMOUNT YOU HAVE PAID TO ALGO VISION IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE THOUSAND DOLLARS ($1,000), WHICHEVER IS GREATER.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">6.4 Results Not Guaranteed</h4>
            <p className="text-gray-700 leading-relaxed">
              While we strive to deliver excellent results, we do not guarantee specific outcomes, rankings, traffic, conversions, or other marketing metrics. Results depend on numerous factors beyond our control, including market conditions, competition, and your own business practices.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">6.5 Indemnification</h4>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Algo Vision and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising from: (a) your use of the Services; (b) your violation of these Terms; (c) your violation of any rights of another; or (d) any Client Materials you provide.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "confidentiality",
      title: "7. Confidentiality",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Both parties acknowledge that during the course of our business relationship, each may have access to confidential information belonging to the other party. "Confidential Information" includes business plans, strategies, financial information, customer data, proprietary methodologies, and any information marked as confidential.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Each party agrees to: (a) maintain the confidentiality of the other party's Confidential Information; (b) use such information only for the purposes of performing under these Terms; (c) not disclose such information to third parties without prior written consent; and (d) protect such information using the same degree of care used to protect its own confidential information, but no less than reasonable care.
          </p>
          <p className="text-gray-700 leading-relaxed">
            These obligations do not apply to information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was rightfully known prior to disclosure; (c) is independently developed without use of the Confidential Information; or (d) must be disclosed pursuant to law or court order, provided that the receiving party provides prompt notice to allow the disclosing party to seek protective measures.
          </p>
        </div>
      ),
    },
    {
      id: "termination",
      title: "8. Termination",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">8.1 Termination by Client</h4>
            <p className="text-gray-700 leading-relaxed">
              You may terminate your service agreement at any time by providing written notice as specified in your agreement (typically 30 days). You remain responsible for all fees incurred up to the termination date, including any committed minimum fees or early termination fees specified in your agreement.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">8.2 Termination by Algo Vision</h4>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your access to Services immediately, without prior notice, if: (a) you breach these Terms; (b) you fail to pay fees when due; (c) you engage in fraudulent or illegal activities; or (d) we are required to do so by law.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">8.3 Effect of Termination</h4>
            <p className="text-gray-700 leading-relaxed">
              Upon termination: (a) your right to use the Services immediately ceases; (b) you must pay all outstanding fees and expenses; (c) we will provide you with any completed Deliverables upon receipt of full payment; and (d) each party must return or destroy the other party's Confidential Information, except as required for legal or accounting purposes.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">8.4 Survival</h4>
            <p className="text-gray-700 leading-relaxed">
              Sections of these Terms that by their nature should survive termination shall survive, including but not limited to provisions regarding payment obligations, intellectual property rights, confidentiality, limitation of liability, and dispute resolution.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "changes",
      title: "9. Changes to Terms",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms at any time. When we make material changes, we will provide notice by posting the updated Terms on our website and updating the "Last Updated" date at the top of this page. For significant changes, we may also notify you via email or through our Services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Your continued use of the Services after the effective date of any changes constitutes acceptance of the updated Terms. If you do not agree to the modified Terms, you must discontinue use of our Services and may terminate your agreement in accordance with Section 8.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Changes to these Terms will not affect existing service agreements unless both parties agree in writing. However, the updated Terms will apply to any renewals or new services ordered after the effective date.
          </p>
        </div>
      ),
    },
    {
      id: "general",
      title: "10. General Provisions",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">10.1 Governing Law</h4>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">10.2 Dispute Resolution</h4>
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from these Terms or your use of the Services shall first be attempted to be resolved through good-faith negotiations. If unresolved within 30 days, the dispute shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, with proceedings conducted in Delaware.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">10.3 Severability</h4>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">10.4 Assignment</h4>
            <p className="text-gray-700 leading-relaxed">
              You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction. Any attempted assignment in violation of this section is void.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">10.5 Entire Agreement</h4>
            <p className="text-gray-700 leading-relaxed">
              These Terms, together with any service agreements, proposals, or statements of work, constitute the entire agreement between you and Algo Vision regarding the Services and supersede all prior agreements and understandings, whether written or oral.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">10.6 Waiver</h4>
            <p className="text-gray-700 leading-relaxed">
              No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term. Algo Vision's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">10.7 Force Majeure</h4>
            <p className="text-gray-700 leading-relaxed">
              Neither party shall be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      title: "11. Contact Information",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            If you have any questions, concerns, or requests regarding these Terms of Service, please contact us:
          </p>
          <div className="bg-gray-50 rounded-xl p-6 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 text-[#00b5ff] mt-0.5">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Email</p>
                <a href="mailto:legal@algovision.com" className="text-sm text-[#00b5ff] hover:underline">
                  legal@algovision.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 text-[#00b5ff] mt-0.5">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Address</p>
                <p className="text-sm text-gray-700">
                  Algo Vision Marketing Solutions<br />
                  123 Innovation Drive, Suite 500<br />
                  Wilmington, DE 19801<br />
                  United States
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 text-[#00b5ff] mt-0.5">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Phone</p>
                <a href="tel:+1-555-0123" className="text-sm text-[#00b5ff] hover:underline">
                  +1 (555) 012-3456
                </a>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            For general inquiries about our services, please visit our <a href="/company/contact" className="text-[#00b5ff] hover:underline font-medium">Contact page</a> or email <a href="mailto:info@algovision.com" className="text-[#00b5ff] hover:underline">info@algovision.com</a>.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>

      <div className="relative xl:max-w-[90vw] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                ref={addToRefs}
                className="scroll-mt-24"
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                {section.content}
              </div>
            ))}

            {/* Acknowledgment */}
            <div ref={addToRefs} className="border-t border-gray-200 pt-8">
              <div className="bg-[#f8fafc] rounded-xl p-6 md:p-8">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900">Acknowledgment:</strong> By using Algo Vision's Services, you acknowledge that you have read these Terms of Service, understand them, and agree to be bound by them. If you do not agree to these Terms, you are not authorized to use our Services. We recommend that you print or save a copy of these Terms for your records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
