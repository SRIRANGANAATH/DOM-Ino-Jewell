"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, ArrowRight, ArrowLeft, Download, 
  Calendar, CheckCircle2, Lock, Unlock, Award, Star, 
  ShieldCheck, Smartphone, Gem, MapPin, Search, ChevronRight, ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

// --- MOCK DATA ---
const USER = {
  name: "Eleanor Harrington",
  tier: "Gold Member",
  memberSince: "Nov 2021",
  activePlan: "Heritage Loyalty Plan",
  currentReserveValue: 580800,
  goldEquivalent: 43.18, // grams of 22K
  monthlyContribution: 5000,
  baseSavings: 516000,
  heritageBonus: 4800,
  apy: 8,
  maturityPercentage: 85,
  monthsCompleted: 10,
  monthsTotal: 12
};

const GOLD_RATES = {
  '22K': { rate: 9220, change: 1.2 }, // positive change
  '18K': { rate: 7550, change: 0.8 },
  '24K': { rate: 10050, change: -0.5 }, // negative change
  'lastContributionDiff': 450 // appreciation since last contribution
};

const HEIRLOOMS = [
  {
    id: 1,
    name: "Aurelia Gold Necklace",
    weight: "24g 22K Gold",
    price: 320000,
    coverage: 100, // fully covered
    status: "Ready to Redeem",
    image: "/images/account_product.jpg"
  },
  {
    id: 2,
    name: "Celeste Diamond Ring",
    weight: "Platinum, 1.5ct",
    price: 850000,
    coverage: 68, // partially covered
    status: "Partially Funded",
    image: "/images/person.jpg"
  },
  {
    id: 3,
    name: "Heritage Link Bracelet",
    weight: "45g 24K Gold",
    price: 1200000,
    coverage: 48,
    status: "Locked Until Maturity",
    image: "/images/account_product.jpg"
  }
];

const MILESTONES = [
  { label: "Account Created", status: "completed" },
  { label: "First Contribution", status: "completed" },
  { label: "Silver Member", status: "completed" },
  { label: "Gold Member", status: "completed" },
  { label: "Plan Completion", status: "upcoming" },
  { label: "Redeem Jewelry", status: "upcoming" },
  { label: "Bespoke Circle", status: "upcoming" },
];

const TRANSACTIONS = [
  { id: "TX-9921", installment: 10, date: "01 Aug 2026", amount: 5000, rateLocked: 9200, weight: 0.54, status: "Paid" },
  { id: "TX-9922", installment: 11, date: "01 Sep 2026", amount: 5000, rateLocked: null, weight: null, status: "Upcoming" },
  { id: "BN-0012", installment: "-", date: "15 Jul 2026", amount: 1200, rateLocked: 9150, weight: 0.13, status: "Bonus" },
  { id: "TX-8843", installment: 9, date: "01 Jul 2026", amount: 5000, rateLocked: 9150, weight: 0.55, status: "Paid" },
];

const MEMBERSHIP_TIERS = [
  { name: "Silver", status: "completed" },
  { name: "Gold", status: "current" },
  { name: "Bespoke Circle", status: "upcoming" },
];

const BENEFITS = [
  "8% Heritage Bonus",
  "Priority Private Viewings",
  "Reduced Making Charges",
  "Birthday Gift",
  "Early Collection Access",
  "Complimentary Annual Jewelry Spa",
  "VIP Customer Care",
  "Home Consultation Eligibility"
];

const ACHIEVEMENTS = [
  "3 Years of Membership",
  "₹5L+ Saved",
  "Gold Tier Member",
  "Zero Missed Contributions",
  "Heritage Bonus Earned"
];

const DOCUMENTS = [
  "Savings Certificate",
  "Membership Certificate",
  "Hallmark Ownership Certificate",
  "Tax Invoice",
  "Contribution Statements"
];

// --- ANIMATION VARIANTS ---
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function HeritageGoldReserve() {
  const [txFilter, setTxFilter] = useState('All');

  const filteredTx = TRANSACTIONS.filter(tx => {
    if (txFilter === 'All') return true;
    return tx.status === txFilter;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-32 pt-8 selection:bg-[#D4AF37]/30 selection:text-[#11312B]">
      <div className="w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        
        {/* Back Link */}
        <Link href="/account" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#11312B]/60 uppercase hover:text-[#D4AF37] transition-colors mb-12">
          <ChevronLeft size={14} /> Back to Account
        </Link>

        {/* INTRODUCTION */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-block px-4 py-1.5 border border-[#D4AF37]/40 bg-[#D4AF37]/10 rounded-full mb-6 text-[9px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            Heritage Gold Reserve
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#11312B] mb-6 leading-tight">
            Build Tomorrow's <br className="hidden md:block"/> Heirloom Today
          </h1>
          <p className="text-[#11312B]/70 font-medium text-sm md:text-base leading-relaxed mb-6 px-4">
            Every monthly contribution brings you closer to owning handcrafted DOMINO jewelry while preserving the enduring value of gold.
          </p>
          <p className="text-[#11312B]/50 italic text-sm md:text-base leading-relaxed px-4 font-serif">
            "Your Heritage Gold Reserve is more than a savings plan. It is a curated journey toward timeless craftsmanship, allowing every contribution to become part of your future heirloom."
          </p>
        </motion.div>

        {/* SECTION 1: RESERVE PORTFOLIO HERO CARD */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="bg-[#11312B] border border-[#D4AF37]/30 rounded-2xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] rounded-full filter blur-[150px] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            
            {/* Left: Client Details & Value */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <h2 className="font-heading text-3xl text-white">{USER.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-3 py-1 rounded-full">{USER.tier}</span>
                  <span className="text-[10px] font-medium tracking-widest text-white/50 uppercase">Since {USER.memberSince}</span>
                </div>
              </div>

              <div className="mb-12">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-2">Current Reserve Value</p>
                <div className="flex items-end gap-4 mb-2">
                  <h3 className="font-heading text-5xl md:text-6xl text-white">₹{USER.currentReserveValue.toLocaleString('en-IN')}</h3>
                </div>
                <p className="text-white/60 font-medium tracking-widest text-sm">≈ {USER.goldEquivalent}g of 22K Gold</p>
              </div>

              {/* Progress Bar Area */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase mb-1">{USER.activePlan}</p>
                    <p className="text-white/80 font-medium text-xs tracking-wider">{USER.monthsCompleted} of {USER.monthsTotal} months completed</p>
                  </div>
                  <span className="text-[#D4AF37] font-bold text-sm tracking-widest">{USER.maturityPercentage}%</span>
                </div>
                
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-5">
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: `${USER.maturityPercentage}%` }} 
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 w-1/2 blur-sm animate-[translateX_2s_infinite]"></div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.1em] text-white/40 uppercase mb-1">Next Reward Unlock</p>
                    <p className="text-white/90 text-xs font-medium">Exclusive Bespoke Consultation</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.1em] text-white/40 uppercase mb-1">Fee Waiver</p>
                    <p className="text-white/90 text-xs font-medium">Zero Making Charges</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.1em] text-white/40 uppercase mb-1">Maintenance</p>
                    <p className="text-white/90 text-xs font-medium">Free Annual Cleaning</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Actions & Breakdown */}
            <div className="bg-[#0E332E]/50 border border-white/5 rounded-xl p-6 lg:p-8 flex flex-col justify-between backdrop-blur-md">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60 tracking-wider">Monthly Contrib.</span>
                  <span className="text-white font-medium">₹{USER.monthlyContribution.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/60 tracking-wider">Base Savings</span>
                  <span className="text-white font-medium">₹{USER.baseSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#D4AF37] tracking-wider font-bold">Heritage Bonus (8%)</span>
                  <span className="text-[#D4AF37] font-bold">+₹{USER.heritageBonus.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-[#D4AF37] text-white py-4 text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-[#11312B] transition-colors rounded shadow-lg hover:shadow-xl">
                  Pay Monthly Contribution
                </button>
                <button className="w-full border border-white/20 text-white py-3 text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-white/5 transition-colors rounded">
                  Manage AutoPay
                </button>
                <div className="pt-4 space-y-2 text-center mt-2 border-t border-white/10">
                  <button className="w-full text-[9px] font-bold tracking-[0.15em] text-[#D4AF37] uppercase hover:text-white transition-colors">
                    Download Certificate
                  </button>
                  <button className="w-full text-[9px] font-bold tracking-[0.15em] text-[#D4AF37] uppercase hover:text-white transition-colors">
                    View Schedule
                  </button>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* SECTION 2: LIVE GOLD MARKET SNAPSHOT */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="mb-24"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white border border-[#11312B]/10 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500">
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#11312B]/50 uppercase mb-6 flex items-center gap-2">
                <TrendingUp size={14} className="text-[#D4AF37]" /> Live Market Snapshot
              </h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-[#11312B]/50 mb-1">22K Gold</p>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-xl text-[#11312B]">₹{GOLD_RATES['22K'].rate.toLocaleString('en-IN')}</span>
                    {GOLD_RATES['22K'].change > 0 ? <TrendingUp size={12} className="text-green-600"/> : <TrendingDown size={12} className="text-red-600"/>}
                  </div>
                </div>
                <div className="border-l border-r border-[#11312B]/10 px-4">
                  <p className="text-[10px] font-bold tracking-widest text-[#11312B]/50 mb-1">18K Gold</p>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-xl text-[#11312B]">₹{GOLD_RATES['18K'].rate.toLocaleString('en-IN')}</span>
                    {GOLD_RATES['18K'].change > 0 ? <TrendingUp size={12} className="text-green-600"/> : <TrendingDown size={12} className="text-red-600"/>}
                  </div>
                </div>
                <div className="pl-4">
                  <p className="text-[10px] font-bold tracking-widest text-[#11312B]/50 mb-1">24K Gold</p>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-xl text-[#11312B]">₹{GOLD_RATES['24K'].rate.toLocaleString('en-IN')}</span>
                    {GOLD_RATES['24K'].change > 0 ? <TrendingUp size={12} className="text-green-600"/> : <TrendingDown size={12} className="text-red-600"/>}
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl flex items-center justify-between border border-[#11312B]/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp size={14} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#11312B]">Reserve Value Appreciation</p>
                    <p className="text-[10px] text-[#11312B]/50 tracking-wider">Since last contribution</p>
                  </div>
                </div>
                <span className="font-heading text-lg text-green-600">+₹{GOLD_RATES.lastContributionDiff}</span>
              </div>
              <p className="text-[9px] text-[#11312B]/30 mt-4 text-center tracking-widest uppercase">Rates updated daily at 10:00 AM IST</p>
            </div>
          </div>
        </motion.div>

        {/* SECTION 3: YOUR REDEMPTION JOURNEY */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl text-[#11312B] mb-3">Your Future Heirlooms</h2>
            <p className="text-[#11312B]/60 font-medium tracking-wide">Turn your accumulated reserve into Radical Purity.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {HEIRLOOMS.map((item) => (
              <motion.div 
                key={item.id} variants={fadeUp}
                className="bg-white rounded-2xl border border-[#11312B]/10 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col"
              >
                {/* Image Area */}
                <div className="relative aspect-square bg-[#FAF8F5] overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#11312B]/20">
                      <Gem size={48} strokeWidth={1} />
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest text-[#11312B] uppercase shadow-sm">
                    {item.status}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-xl text-[#11312B] mb-1 group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                  <p className="text-xs text-[#11312B]/60 tracking-wider mb-6">{item.weight}</p>
                  
                  <div className="flex justify-between items-end mb-2 mt-auto">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-[#11312B]/50 uppercase">Reserve Coverage</p>
                    <p className="font-bold text-[#11312B] text-sm">{item.coverage}%</p>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full h-1 bg-[#FAF8F5] rounded-full overflow-hidden mb-6 border border-[#11312B]/5">
                    <div className={`h-full rounded-full transition-all duration-1000 ${item.coverage >= 100 ? 'bg-green-500' : 'bg-[#D4AF37]'}`} style={{ width: `${Math.min(item.coverage, 100)}%` }}></div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-heading text-lg text-[#11312B]">₹{item.price.toLocaleString('en-IN')}</span>
                    {item.coverage >= 100 ? (
                      <button className="bg-[#11312B] text-white px-5 py-2.5 text-[9px] font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-colors rounded">
                        Redeem Now
                      </button>
                    ) : (
                      <button className="border border-[#11312B]/20 text-[#11312B] px-5 py-2.5 text-[9px] font-bold tracking-widest uppercase hover:border-[#11312B] transition-colors rounded">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SECTION 4: MILESTONES TIMELINE */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="mb-24 bg-white rounded-2xl border border-[#11312B]/10 p-8 md:p-12 shadow-sm"
        >
          <h2 className="font-heading text-2xl text-[#11312B] mb-10 text-center">Your Journey to Bespoke</h2>
          
          <div className="relative overflow-x-auto pb-6 hide-scrollbar">
            <div className="flex items-center justify-between min-w-[800px] relative px-4">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-8 right-8 h-px bg-[#11312B]/10 -translate-y-1/2 z-0"></div>
              
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex flex-col items-center gap-3 relative z-10 w-32 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                    m.status === 'completed' 
                      ? 'bg-[#11312B] border-[#11312B] text-[#D4AF37]' 
                      : 'bg-white border-[#11312B]/20 text-[#11312B]/20'
                  }`}>
                    {m.status === 'completed' ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                  </div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${m.status === 'completed' ? 'text-[#11312B]' : 'text-[#11312B]/40'}`}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* SECTION 5: CONTRIBUTION LEDGER */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
            <div>
              <h2 className="font-heading text-3xl text-[#11312B] mb-2">Contribution Ledger</h2>
              <p className="text-[#11312B]/60 text-sm tracking-wide">A transparent record of your accumulated gold reserve.</p>
            </div>
            <button className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase hover:text-[#11312B] transition-colors flex items-center gap-2">
              <Download size={14} /> Download Statement
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#11312B]/10 shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center overflow-x-auto border-b border-[#11312B]/10 hide-scrollbar px-6">
              {['All', 'Paid', 'Upcoming', 'Bonus'].map(tab => (
                <button 
                  key={tab} onClick={() => setTxFilter(tab)}
                  className={`px-6 py-4 text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap border-b-2 ${
                    txFilter === tab ? 'border-[#11312B] text-[#11312B]' : 'border-transparent text-[#11312B]/40 hover:text-[#11312B]/70'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table (Desktop) & Cards (Mobile) */}
            <div className="p-6">
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr>
                      <th className="py-4 text-[9px] font-bold tracking-[0.2em] text-[#11312B]/40 uppercase border-b border-[#11312B]/5">Installment</th>
                      <th className="py-4 text-[9px] font-bold tracking-[0.2em] text-[#11312B]/40 uppercase border-b border-[#11312B]/5">Date</th>
                      <th className="py-4 text-[9px] font-bold tracking-[0.2em] text-[#11312B]/40 uppercase border-b border-[#11312B]/5">Transaction ID</th>
                      <th className="py-4 text-[9px] font-bold tracking-[0.2em] text-[#11312B]/40 uppercase border-b border-[#11312B]/5 text-right">Amount</th>
                      <th className="py-4 text-[9px] font-bold tracking-[0.2em] text-[#11312B]/40 uppercase border-b border-[#11312B]/5 text-right">Rate Locked</th>
                      <th className="py-4 text-[9px] font-bold tracking-[0.2em] text-[#11312B]/40 uppercase border-b border-[#11312B]/5 text-right">Gold Weight</th>
                      <th className="py-4 text-[9px] font-bold tracking-[0.2em] text-[#11312B]/40 uppercase border-b border-[#11312B]/5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTx.map((tx, i) => (
                      <tr key={i} className="group hover:bg-[#FAF8F5] transition-colors cursor-default">
                        <td className="py-5 border-b border-[#11312B]/5 text-sm text-[#11312B] font-medium pl-2">{tx.installment !== "-" ? `#${tx.installment}` : tx.installment}</td>
                        <td className="py-5 border-b border-[#11312B]/5 text-sm text-[#11312B]/70">{tx.date}</td>
                        <td className="py-5 border-b border-[#11312B]/5 text-xs text-[#11312B]/50 font-mono">{tx.id}</td>
                        <td className="py-5 border-b border-[#11312B]/5 text-sm text-[#11312B] font-bold text-right">₹{tx.amount.toLocaleString('en-IN')}</td>
                        <td className="py-5 border-b border-[#11312B]/5 text-sm text-[#11312B]/70 text-right">{tx.rateLocked ? `₹${tx.rateLocked.toLocaleString('en-IN')}` : '-'}</td>
                        <td className="py-5 border-b border-[#11312B]/5 text-sm text-[#D4AF37] font-medium text-right">{tx.weight ? `${tx.weight}g` : '-'}</td>
                        <td className="py-5 border-b border-[#11312B]/5 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase ${
                            tx.status === 'Paid' ? 'bg-green-100 text-green-700' :
                            tx.status === 'Upcoming' ? 'bg-[#11312B]/5 text-[#11312B]/50' :
                            'bg-[#D4AF37]/10 text-[#D4AF37]'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile view */}
              <div className="md:hidden space-y-4">
                {filteredTx.map((tx, i) => (
                  <div key={i} className="border border-[#11312B]/10 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#11312B]/50">Inst. {tx.installment}</span>
                      <span className={`px-2 py-1 rounded text-[8px] font-bold tracking-widest uppercase ${
                        tx.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        tx.status === 'Upcoming' ? 'bg-[#11312B]/5 text-[#11312B]/50' :
                        'bg-[#D4AF37]/10 text-[#D4AF37]'
                      }`}>{tx.status}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="font-heading text-xl text-[#11312B]">₹{tx.amount.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-[#11312B]/60">{tx.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#D4AF37]">{tx.weight ? `${tx.weight}g` : '-'}</p>
                        <p className="text-[10px] text-[#11312B]/40">@ {tx.rateLocked ? `₹${tx.rateLocked}` : '-'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 6 & 7: MEMBERSHIP & ACHIEVEMENTS GRID */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          
          {/* Section 6: Loyalty Membership */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            className="bg-[#11312B] text-white rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full filter blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
            
            <h2 className="font-heading text-3xl mb-8 relative z-10">Membership Privileges</h2>
            
            <div className="flex items-center gap-4 mb-10 relative z-10">
              {MEMBERSHIP_TIERS.map((tier, i) => (
                <React.Fragment key={tier.name}>
                  <div className={`flex flex-col items-center gap-2 ${tier.status === 'current' ? 'scale-110 opacity-100' : 'opacity-40'} transition-all`}>
                    <div className={`w-3 h-3 rounded-full ${tier.status === 'current' ? 'bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'bg-white'}`}></div>
                    <span className="text-[9px] font-bold tracking-widest uppercase">{tier.name}</span>
                  </div>
                  {i < MEMBERSHIP_TIERS.length - 1 && <div className="h-px flex-1 bg-white/20 -mt-5"></div>}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {BENEFITS.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Star size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-white/80">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 relative z-10">
              <p className="text-[10px] text-white/50 tracking-widest uppercase mb-2">Progress to Bespoke Circle</p>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-[#D4AF37] rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Section 7: Achievements & Section 8: Upcoming */}
          <div className="flex flex-col gap-8">
            {/* Upcoming Contribution */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
              className="bg-white rounded-2xl border border-[#11312B]/10 p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center shrink-0 border border-[#11312B]/5">
                  <Calendar size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-[#11312B]/50 uppercase mb-1">Next Contribution</p>
                  <h3 className="font-heading text-2xl text-[#11312B] mb-1">₹5,000 <span className="text-sm font-sans text-[#11312B]/50 ml-2">due Aug 1, 2026</span></h3>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded">
                    <ShieldCheck size={12} /> AutoPay Enabled
                  </div>
                </div>
              </div>
              <button className="w-full md:w-auto bg-[#11312B] text-white px-6 py-3 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-colors shadow-md hover:shadow-lg">
                Pay Now
              </button>
            </motion.div>

            {/* Achievements */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="bg-white rounded-2xl border border-[#11312B]/10 p-8 shadow-sm flex-1"
            >
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#11312B]/50 uppercase mb-6 flex items-center gap-2">
                <Award size={14} className="text-[#D4AF37]" /> Key Milestones Achieved
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((ach, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 bg-[#FAF8F5] p-3 rounded-lg border border-[#11312B]/5">
                    <div className="w-6 h-6 rounded-full bg-[#11312B] text-[#D4AF37] flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-xs font-medium text-[#11312B]">{ach}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 9: DOCUMENTS */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="mb-24"
        >
          <h2 className="font-heading text-2xl text-[#11312B] mb-6">Important Documents</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {DOCUMENTS.map((doc, i) => (
              <button key={i} className="bg-white border border-[#11312B]/10 p-5 rounded-xl text-left hover:border-[#D4AF37] hover:shadow-md transition-all group flex flex-col gap-4">
                <Download size={18} className="text-[#11312B]/30 group-hover:text-[#D4AF37] transition-colors" />
                <span className="text-[10px] font-bold tracking-widest text-[#11312B] uppercase leading-relaxed">{doc}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* SECTION 10: CONCIERGE CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
          className="bg-[#0E332E] rounded-2xl overflow-hidden shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 mix-blend-overlay"></div>
          <div className="p-10 md:p-16 text-center relative z-10 max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone size={24} className="text-[#D4AF37]" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">Need Guidance From Your Personal Concierge?</h2>
            <p className="text-white/70 text-sm md:text-base mb-10 leading-relaxed font-medium">
              Our Client Advisors are delighted to help you choose the perfect jewelry to redeem with your Heritage Reserve, arrange a private viewing, or answer any queries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-[#D4AF37] text-white px-8 py-4 text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-[#11312B] transition-colors rounded shadow-lg">
                Book Consultation
              </button>
              <button className="w-full sm:w-auto border border-white/20 text-white px-8 py-4 text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-white/5 transition-colors rounded">
                WhatsApp Concierge
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
