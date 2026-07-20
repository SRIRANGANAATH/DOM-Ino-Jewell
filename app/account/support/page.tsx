"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Calendar, MessageSquare, ShieldCheck, 
  ChevronDown, CheckCircle, ChevronLeft 
} from 'lucide-react';

const SERVICES = [
  {
    title: "Private Viewings & Boutique Care",
    description: "Need assistance with your salon consultation or wish to arrange a private viewing? Our Client Advisors are delighted to assist.",
    icon: Calendar,
    buttonText: "Manage Appointments →",
    href: "/account/appointments"
  },
  {
    title: "WhatsApp Artisan Concierge",
    description: "Connect directly with our master gemologists for styling advice, ring sizing guidance, bespoke consultations, and live assistance.",
    icon: MessageSquare,
    buttonText: "Start WhatsApp Chat →",
    href: "https://web.whatsapp.com"
  },
  {
    title: "Bespoke & Hallmark Inquiries",
    description: "Questions about Radical Purity, BIS Hallmark certification, custom engravings, or gemstone authentication.",
    icon: ShieldCheck,
    buttonText: "Read Hallmark Guide →",
    href: "#"
  }
];

const FAQS = [
  {
    question: "How do I prepare for my Private Viewing appointment?",
    answer: "A dedicated Client Advisor will review your wishlist and preferences beforehand, ensuring a curated and personalized collection of jewelry is prepared prior to your arrival for an uninterrupted, exclusive experience."
  },
  {
    question: "What is DOMINO's standard for gold purity and BIS Hallmarking?",
    answer: "We adhere strictly to 'Radical Purity'. Every piece in our certified 22K and 18K collections is ethically sourced, rigorously verified for craftsmanship, and officially BIS Hallmarked to guarantee its enduring value."
  },
  {
    question: "How do I securely track or insure my jewelry shipment?",
    answer: "Every DOMINO creation is delivered via a fully insured, white-glove delivery service. You will receive real-time tracking, signature confirmation upon arrival, and your piece will be secured in protective luxury packaging."
  },
  {
    question: "Can I request bespoke engraving or modifications?",
    answer: "Yes, our personalization services include custom engravings, exquisite gemstone replacements, and precise resizing. You may consult directly with our master artisans to tailor any piece to your exact vision."
  }
];

const SUBJECTS = [
  "Private Viewing Inquiry",
  "Hallmark & Purity",
  "Order Status",
  "Bespoke Design Request",
  "Jewelry Care",
  "Returns & Exchanges",
  "Other"
];

export default function ClientCarePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email Address is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#11312B] font-sans selection:bg-[#D4AF37]/30 selection:text-[#11312B]">
      
      {/* Container constraint following layout rules */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-8 pb-20 md:pb-24">
        
        {/* Back Link */}
        <Link href="/account" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#11312B]/60 uppercase hover:text-[#D4AF37] transition-colors mb-12">
          <ChevronLeft size={14} /> Back to Account
        </Link>

        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto mb-24 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
          <span className="inline-block uppercase tracking-[0.25em] text-xs font-bold text-[#D4AF37] mb-6">
            CLIENT CARE
          </span>
          <h1 className="font-heading text-4xl md:text-6xl text-[#11312B] mb-6 leading-tight">
            Client Care & Concierge
          </h1>
          <p className="text-xl text-[#11312B] mb-8 font-heading italic">
            How may we assist your journey with DOMINO today?
          </p>
          <p className="text-base md:text-lg leading-relaxed text-[#11312B]/70 mb-12">
            Every DOMINO creation is designed to last generations. Our Client Care & Bespoke Concierge is dedicated to preserving that experience—from your first private viewing to lifelong aftercare, authentication, and artisan services.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className={`relative flex items-center bg-white border rounded-xl md:rounded-full transition-all duration-300 ${isSearchFocused ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]' : 'border-[#11312B]/20 shadow-sm hover:border-[#11312B]/40'}`}>
              <Search className={`absolute left-5 w-5 h-5 transition-colors duration-300 ${isSearchFocused ? 'text-[#D4AF37]' : 'text-[#11312B]/40'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search topics: Hallmark purity, private viewings, ring sizing, shipping..."
                className={`w-full py-4 pl-14 pr-6 bg-transparent outline-none text-base text-[#11312B] placeholder:transition-opacity duration-300 ${isSearchFocused ? 'placeholder:opacity-50' : 'placeholder:opacity-100 placeholder:text-[#11312B]/40'}`}
              />
            </div>
            
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white border border-[#11312B]/10 rounded-2xl shadow-xl p-8 text-center animate-[fadeIn_0.3s_ease-out_forwards]">
                <p className="text-[#11312B]/70 mb-6">No matching guidance found for "{searchQuery}". Please contact our Concierge.</p>
                <button className="bg-[#11312B] text-[#FAF8F5] rounded-xl px-8 py-3 tracking-[0.18em] uppercase font-medium hover:bg-[#0E332E] hover:shadow-lg active:scale-[0.98] transition-all text-sm inline-flex items-center gap-2">
                  Send Inquiry
                </button>
              </div>
            )}
          </div>
        </section>

      </div>

      {/* CONCIERGE SERVICES */}
      <section className="bg-white py-20 md:py-24 border-y border-[#11312B]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white rounded-2xl border border-[#11312B]/10 shadow-sm p-8 md:p-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl group flex flex-col">
                  <div className="w-12 h-12 rounded-full bg-[#11312B]/10 text-[#11312B] flex items-center justify-center mb-8 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-colors">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-2xl text-[#11312B] mb-4">{service.title}</h3>
                  <p className="text-[#11312B]/70 leading-relaxed mb-8 flex-1">{service.description}</p>
                  
                  {service.href.startsWith('http') ? (
                    <a href={service.href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold tracking-[0.18em] uppercase text-[#11312B] group-hover:text-[#D4AF37] transition-colors inline-block mt-auto">
                      {service.buttonText}
                    </a>
                  ) : (
                    <Link href={service.href} className="text-sm font-bold tracking-[0.18em] uppercase text-[#11312B] group-hover:text-[#D4AF37] transition-colors inline-block mt-auto">
                      {service.buttonText}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-[#FAF8F5] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <span className="inline-block uppercase tracking-[0.25em] text-xs font-bold text-[#D4AF37] mb-4">
              COMMON INQUIRIES
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-[#11312B]">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, index) => (
              <div key={index} className="border-b border-[#11312B]/10">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-6 text-left group hover:bg-[#11312B]/[0.02] transition-colors px-4 rounded-t-xl outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-heading text-xl text-[#11312B] group-hover:text-[#D4AF37] transition-colors pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`shrink-0 text-[#11312B]/40 transition-transform duration-300 ease-out ${openFaqIndex === index ? 'rotate-180 text-[#D4AF37]' : ''}`} 
                    size={24} 
                  />
                </button>
                <div 
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-out ${openFaqIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="pb-8 px-4 text-[#11312B]/70 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-white py-20 md:py-24 border-t border-[#11312B]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Editorial Text */}
            <div>
              <h2 className="font-heading text-3xl md:text-5xl text-[#11312B] mb-8 leading-tight">
                Speak with a DOMINO Concierge
              </h2>
              <p className="text-lg text-[#11312B]/70 leading-relaxed mb-12 font-serif italic">
                "Our Client Care team is pleased to assist with appointments, aftercare, bespoke commissions, authentication, and every step of your ownership journey."
              </p>
              
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#11312B]/50 mb-2">Email</p>
                  <p className="text-xl text-[#11312B]">concierge@dominojewell.com</p>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#11312B]/50 mb-2">Phone</p>
                  <p className="text-xl text-[#11312B]">+91 1800 123 4567</p>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#11312B]/50 mb-2">Business Hours</p>
                  <p className="text-xl text-[#11312B]">Mon – Sat, 10:00 AM – 8:00 PM IST</p>
                </div>
              </div>

              <div className="mt-16 inline-flex items-center gap-3 bg-[#FAF8F5] border border-[#11312B]/10 px-6 py-4 rounded-full">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
                <p className="text-sm font-medium text-[#11312B]">Within 4 Business Hours response guarantee</p>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {isSubmitted ? (
                <div className="bg-[#FAF8F5] border border-[#11312B]/10 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center animate-[fadeIn_0.5s_ease-out_forwards]">
                  <CheckCircle className="w-16 h-16 text-[#D4AF37] mb-6" strokeWidth={1} />
                  <h3 className="font-heading text-3xl text-[#11312B] mb-4">Inquiry Received</h3>
                  <p className="text-lg text-[#11312B]/70 leading-relaxed">
                    Thank you. <br/> A DOMINO Concierge will personally respond within four business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="sr-only">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={handleFormChange}
                        className={`w-full min-h-[44px] px-5 py-4 bg-white border ${errors.name ? 'border-red-400' : 'border-[#11312B]/20'} rounded-xl text-[#11312B] placeholder:text-[#11312B]/40 outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all`}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleFormChange}
                        className={`w-full min-h-[44px] px-5 py-4 bg-white border ${errors.email ? 'border-red-400' : 'border-[#11312B]/20'} rounded-xl text-[#11312B] placeholder:text-[#11312B]/40 outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all`}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="orderId" className="sr-only">Order Number / Appointment ID</label>
                      <input
                        type="text"
                        id="orderId"
                        name="orderId"
                        placeholder="Order Number / Appointment ID"
                        value={formData.orderId}
                        onChange={handleFormChange}
                        className="w-full min-h-[44px] px-5 py-4 bg-white border border-[#11312B]/20 rounded-xl text-[#11312B] placeholder:text-[#11312B]/40 outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="sr-only">Subject</label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleFormChange}
                          className="w-full min-h-[44px] px-5 py-4 bg-white border border-[#11312B]/20 rounded-xl text-[#11312B] outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all appearance-none"
                        >
                          <option value="" disabled className="text-[#11312B]/40">Subject</option>
                          {SUBJECTS.map(subj => (
                            <option key={subj} value={subj}>{subj}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#11312B]/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="How may we assist you?"
                      value={formData.message}
                      onChange={handleFormChange}
                      className="w-full min-h-[180px] px-5 py-4 bg-white border border-[#11312B]/20 rounded-xl text-[#11312B] placeholder:text-[#11312B]/40 outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all resize-y"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#11312B] text-[#FAF8F5] rounded-xl py-4 tracking-[0.18em] uppercase font-medium hover:bg-[#0E332E] hover:shadow-lg active:scale-[0.98] transition-all"
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
