"use client";

import { useEffect, useRef, useState } from 'react';
import {
  Heart, ShoppingBag, Calendar, PiggyBank, Bell, Headset,
  Star, Award, Check, CheckCircle, MapPin, Clock, Edit2, Wallet, Search, User, ChevronRight, Menu, Package
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Odometer from '@/components/Odometer';
import Link from 'next/link';

function ContributionWheel({ value, onChange }: { value: number, onChange: (v: number) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemHeight = 36;
  const options = Array.from({ length: 100 }, (_, i) => i + 1);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const index = Math.round(scrollRef.current.scrollTop / itemHeight);
    if (index >= 0 && index < options.length) {
      if (options[index] !== value) {
        onChange(options[index]);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const index = options.indexOf(value);
      if (index !== -1) {
        const targetScroll = index * itemHeight;
        if (Math.abs(scrollRef.current.scrollTop - targetScroll) > itemHeight / 2) {
          scrollRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }
    }
  }, [value]);

  return (
    <div className="relative w-full h-full flex justify-center items-center overflow-hidden rounded-xl">
      <div className="absolute top-1/2 -translate-y-1/2 w-full h-[36px] border-y border-[#8A7043]/30 bg-[#8A7043]/10 pointer-events-none z-0"></div>
      <div
        className="h-full overflow-y-auto snap-y snap-mandatory flex flex-col relative z-10 w-full [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <div style={{ minHeight: '42px' }} className="shrink-0 pointer-events-none"></div>
        {options.map((opt) => (
          <div
            key={opt}
            className="snap-center shrink-0 flex justify-center items-center cursor-pointer select-none"
            style={{ height: `${itemHeight}px` }}
            onClick={() => {
              onChange(opt);
              const idx = options.indexOf(opt);
              scrollRef.current?.scrollTo({ top: idx * itemHeight, behavior: 'smooth' });
            }}
          >
            <div className={`font-heading transition-all duration-300 ${opt === value ? 'text-[#8A7043] scale-110 font-bold text-[24px]' : 'text-white/30 scale-90 text-[16px]'}`}>
              {opt}
            </div>
          </div>
        ))}
        <div style={{ minHeight: '42px' }} className="shrink-0 pointer-events-none"></div>
      </div>
      <div className="absolute left-0 right-0 top-0 h-[30px] bg-gradient-to-b from-[#0E332E] to-transparent pointer-events-none z-20"></div>
      <div className="absolute left-0 right-0 bottom-0 h-[30px] bg-gradient-to-t from-[#0E332E] to-transparent pointer-events-none z-20"></div>
    </div>
  );
}

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1 });

    if (domRef.current) observer.observe(domRef.current);
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1200ms] ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const [contribution, setContribution] = useState(5000);
  const [inputValue, setInputValue] = useState("5000");
  const [goldRate, setGoldRate] = useState(7250);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState("Eleanor Harrington");
  const [userImage, setUserImage] = useState("/images/person.jpg");
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showRebookModal, setShowRebookModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setUserImage(imageUrl);
    }
  };

  useEffect(() => {
    fetch('/api/true-rates')
      .then(res => res.json())
      .then(data => {
        if (data.gold && data.gold['22K']) {
          setGoldRate(data.gold['22K']);
        }
      })
      .catch(console.error);
  }, []);

  const monthlyContribution = contribution;
  const baseSavings = 516000;
  const yearlyContribution = monthlyContribution * 12;
  const interestBonus = Math.round(yearlyContribution * 0.08);
  const finalValue = Math.round(baseSavings + yearlyContribution + interestBonus);
  const goldEquivalent = (finalValue / goldRate).toFixed(2);

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 overflow-hidden pt-8">
      <div className="w-full px-6 md:px-12 xl:px-24 max-w-[1500px] mx-auto space-y-6">

        {/* ROW 1: Profile & Gold Savings */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          {/* Profile Section (Left) */}
          <div className="flex flex-col justify-start">
            <FadeInSection>
              <h1 className="font-heading text-3xl text-[#0E332E] mb-6 lg:text-left text-center">Account</h1>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-4 border-[#8A7043] overflow-hidden bg-[#F0EBE1] shadow-lg">
                    <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    className="hidden" 
                  />
                  <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-1 right-1 bg-[#8A7043] flex items-center justify-center text-white p-2 rounded-full border-2 border-[#F9F6F0] shadow-sm hover:scale-110 transition-transform">
                    <Edit2 size={14} />
                  </button>
                </div>

                <div className="flex flex-col items-center sm:items-start pt-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-2 mb-2">
                      <input 
                        type="text" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        className="font-heading text-xl text-[#0E332E] border-b-2 border-[#8A7043] bg-transparent outline-none px-1 py-0.5"
                        autoFocus
                      />
                      <button 
                        onClick={() => setIsEditingName(false)}
                        className="bg-[#8A7043] text-white p-1 rounded hover:bg-[#0E332E] transition-colors"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <h2 className="font-heading text-2xl text-[#0E332E] mb-2">{userName}</h2>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[9px] font-bold tracking-widest text-[#8A7043] uppercase">Gold Member</span>
                    <span className="w-1.5 h-1.5 bg-[#8A7043] rounded-full"></span>
                    <span className="text-[10px] font-medium text-[#0E332E]/60">Since Nov 2021</span>
                  </div>
                  <button 
                    onClick={() => setIsEditingName(!isEditingName)}
                    className="px-6 py-2 border inline-flex items-center justify-center border-[#8A7043] text-[#8A7043] text-[9px] font-bold tracking-widest uppercase hover:bg-[#8A7043] hover:text-white transition-colors"
                  >
                    {isEditingName ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Gold Savings Plan (Right) */}
          <div className="flex flex-col h-full">
            <FadeInSection delay={100}>
              <div className="bg-[#0E332E] rounded-xl p-6 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-between min-h-[350px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#8A7043] rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>

                {/* TOP ROW: Title & Input */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 relative z-10">
                  <div className="flex-1">
                    <h4 className="text-[9px] font-bold tracking-[0.2em] text-[#8A7043] uppercase mb-1">Gold Savings Plan</h4>
                    <h3 className="font-heading text-2xl text-white">Heritage Loyalty</h3>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-3 mt-2 md:mt-0">
                    <div className="bg-white/5 rounded-lg border border-white/20 p-2 md:p-3 flex flex-col justify-center min-w-[140px] flex-1 md:flex-none">
                      <label className="text-[8px] font-bold tracking-[0.1em] text-white/60 uppercase mb-1">Monthly Contribution</label>
                      <div className="flex items-center">
                        <span className="text-[#8A7043] font-heading text-lg mr-1">₹</span>
                        <input
                          type="number"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="5000"
                          className="bg-transparent text-white font-heading text-lg w-full outline-none placeholder:text-white/20"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (inputValue && !isNaN(Number(inputValue))) {
                          setContribution(Number(inputValue));
                        }
                      }}
                      className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-[#8A7043] hover:border-[#8A7043] transition-colors shrink-0"
                    >
                      <Check size={18} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* MIDDLE ROW: Calculation & Projected Value */}
                <div className="grid md:grid-cols-3 gap-4 mb-6 relative z-10">

                  {/* Calculation Breakdown (Left, takes up 2 cols) */}
                  <div className="md:col-span-2 bg-black/20 rounded-lg p-3 md:p-4 text-[10px] md:text-[11px] text-white/70 tracking-wide border border-white/5 flex flex-col justify-center space-y-2">
                    <div className="flex justify-between">
                      <span>Base Savings:</span>
                      <span className="flex items-baseline gap-[2px]">₹<Odometer value={baseSavings} /></span>
                    </div>
                    <div className="flex justify-between">
                      <span>12-Month Contribution:</span>
                      <span className="flex items-baseline gap-[2px]">₹<Odometer value={yearlyContribution} /></span>
                    </div>
                    <div className="flex justify-between text-[#8A7043] font-bold">
                      <span>Heritage Bonus (8% APY):</span>
                      <span className="flex items-baseline gap-[2px]">+ ₹<Odometer value={interestBonus} /></span>
                    </div>
                  </div>

                  {/* Projected Value (Right, takes up 1 col) */}
                  <div className="bg-black/20 rounded-lg border border-white/10 p-3 md:p-4 flex flex-col items-center justify-center text-center">
                    <h5 className="text-[9px] font-bold tracking-[0.1em] text-white/60 uppercase mb-2">Projected Value (1 Yr)</h5>
                    <div className="text-xl md:text-2xl font-heading text-white flex items-baseline gap-1">
                      ₹<Odometer value={finalValue} />
                    </div>
                    <div className="text-[#8A7043] font-bold mt-1 text-xs tracking-wider">
                      ~{goldEquivalent}g
                    </div>
                  </div>
                </div>

                {/* BOTTOM ROW: Maturity */}
                <div className="relative z-10">
                  <div className="flex justify-between text-[10px] font-bold tracking-[0.15em] text-[#8A7043] uppercase mb-2">
                    <span className="text-white/90 tracking-widest">Maturity Progress</span>
                    <span className="text-white font-bold">85%</span>
                  </div>
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[#8A7043] w-[85%] rounded-full relative">
                      <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/30"></div>
                    </div>
                  </div>
                  <p className="text-[9px] text-white/50 italic tracking-wide">Next reward unlock: Exclusive Bespoke Consultation</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* ROW 2: Member Privileges & Recent Order */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          {/* Member Privileges */}
          <FadeInSection delay={200}>
            <div className="bg-white border border-[#8A7043]/30 rounded-xl p-6 shadow-sm h-full flex flex-col">
              <h3 className="font-heading text-xl text-[#0E332E] mb-4 border-b border-[#0E332E]/10 pb-3">Membership Privileges</h3>

              <div className="flex flex-col gap-4 flex-1 justify-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#8A7043]/10 flex items-center justify-center text-[#8A7043]">
                    <Star size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.15em] text-[#8A7043] uppercase mb-1">Total Points</div>
                    <div className="font-heading text-xl text-[#0E332E]">4,200</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#8A7043]/10 flex items-center justify-center text-[#8A7043]">
                    <Award size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-[0.15em] text-[#8A7043] uppercase mb-1">Current Status</div>
                    <div className="font-heading text-xl text-[#0E332E]">Tier 3 (Gold)</div>
                  </div>
                </div>

                <div className="h-px w-full bg-[#0E332E]/10 my-1"></div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#8A7043]" />
                    <span className="text-xs text-[#0E332E] font-medium">Priority Bespoke Appointments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#8A7043]" />
                    <span className="text-xs text-[#0E332E] font-medium">Exclusive Birthday Offers</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Recent Order */}
          <FadeInSection delay={300}>
            <div className="bg-white border border-[#8A7043]/30 rounded-xl p-6 shadow-sm h-full flex flex-col">
              <div className="flex justify-between items-end border-b border-[#0E332E]/10 pb-3 mb-4">
                <h3 className="font-heading text-xl text-[#0E332E]">Recent Orders</h3>
                <Link href="/account/orders" className="text-[9px] font-bold tracking-[0.15em] text-[#8A7043] uppercase cursor-pointer hover:underline">View All</Link>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {/* Order Item 1 */}
                <div className="border border-[#0E332E]/10 p-3 flex items-center gap-3 rounded-lg bg-[#F9F6F0]/50 hover:bg-[#F9F6F0] transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-white shrink-0 border border-[#0E332E]/5 rounded overflow-hidden">
                    <img src="/images/account_product.jpg" alt="Aurelia Gold Necklace" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[8px] font-bold tracking-[0.2em] text-[#0E332E]/60 uppercase mb-0.5">#DOM-82910</div>
                    <h4 className="font-heading text-sm text-[#0E332E]">Aurelia Gold Necklace</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-bold tracking-widest text-[#8A7043] uppercase bg-[#8A7043]/10 px-2 py-1 rounded">In Transit</span>
                  </div>
                </div>

                {/* Order Item 2 */}
                <div className="border border-[#0E332E]/10 p-3 flex items-center gap-3 rounded-lg bg-[#F9F6F0]/50 hover:bg-[#F9F6F0] transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-white shrink-0 border border-[#0E332E]/5 rounded overflow-hidden">
                    <div className="w-full h-full bg-[#0E332E]/5 flex items-center justify-center">
                      <ShoppingBag size={16} className="text-[#8A7043]/50" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[8px] font-bold tracking-[0.2em] text-[#0E332E]/60 uppercase mb-0.5">#DOM-82744</div>
                    <h4 className="font-heading text-sm text-[#0E332E]">Celeste Diamond Ring</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-bold tracking-widest text-[#0E332E]/50 uppercase bg-[#0E332E]/5 px-2 py-1 rounded">Delivered</span>
                  </div>
                </div>

                {/* Order Item 3 */}
                <div className="border border-[#0E332E]/10 p-3 flex items-center gap-3 rounded-lg bg-[#F9F6F0]/50 hover:bg-[#F9F6F0] transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-white shrink-0 border border-[#0E332E]/5 rounded overflow-hidden">
                    <div className="w-full h-full bg-[#0E332E]/5 flex items-center justify-center">
                      <ShoppingBag size={16} className="text-[#8A7043]/50" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[8px] font-bold tracking-[0.2em] text-[#0E332E]/60 uppercase mb-0.5">#DOM-81992</div>
                    <h4 className="font-heading text-sm text-[#0E332E]">Heritage Bangle</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-bold tracking-widest text-[#0E332E]/50 uppercase bg-[#0E332E]/5 px-2 py-1 rounded">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* ROW 3: Appointments */}
        <div className="w-full">
          <FadeInSection delay={400}>
            <div className="bg-white border border-[#8A7043]/30 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-end border-b border-[#0E332E]/10 pb-3 mb-4">
                <h3 className="font-heading text-xl text-[#0E332E]">Appointments</h3>
                <Link href="/book" className="text-[9px] font-bold tracking-[0.15em] text-[#8A7043] uppercase cursor-pointer hover:underline">Book New</Link>
              </div>

              <div className="flex flex-col gap-3">
                {/* Appointment 1 */}
                <div className="border border-[#0E332E]/10 p-4 flex flex-col md:flex-row justify-between items-center gap-4 rounded-lg bg-[#F9F6F0]/30">
                  <div className="flex-1 flex flex-col sm:flex-row items-center justify-start gap-4 w-full">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-[#8A7043] shrink-0" size={16} />
                      <span className="text-xs font-medium text-[#0E332E]">Mayfair Flagship Store, London</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-[#0E332E]/10"></div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#8A7043] shrink-0" size={16} />
                      <span className="text-xs font-medium text-[#0E332E]">Wednesday, Oct 25th at 2:30 PM</span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-4 w-full md:w-auto">
                    <button onClick={() => setShowRescheduleModal(true)} className="px-5 py-2 inline-flex items-center justify-center border border-[#8A7043] text-[#8A7043] text-[9px] font-bold tracking-widest uppercase hover:bg-[#8A7043] hover:text-white transition-colors rounded">
                      Reschedule
                    </button>
                  </div>
                </div>

                {/* Appointment 2 */}
                <div className="border border-[#0E332E]/10 p-4 flex flex-col md:flex-row justify-between items-center gap-4 rounded-lg bg-[#F9F6F0]/30">
                  <div className="flex-1 flex flex-col sm:flex-row items-center justify-start gap-4 w-full opacity-60">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-[#8A7043] shrink-0" size={16} />
                      <span className="text-xs font-medium text-[#0E332E]">Virtual Consultation</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-[#0E332E]/10"></div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#8A7043] shrink-0" size={16} />
                      <span className="text-xs font-medium text-[#0E332E]">Past: Sept 12th at 10:00 AM</span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-4 w-full md:w-auto">
                    <button onClick={() => setShowRebookModal(true)} className="px-5 py-2 inline-flex items-center justify-center bg-[#8A7043] text-white text-[9px] font-bold tracking-widest uppercase hover:bg-[#0E332E] transition-colors rounded">
                      Rebook
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* ROW 4: Icon Grid Menu */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pb-12">
          <FadeInSection delay={500}>
            <Link href="/account/wishlist" className="bg-white border border-[#8A7043]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#8A7043] hover:shadow-md transition-all cursor-pointer group h-full">
              <Heart className="text-[#8A7043] mb-2 group-hover:scale-110 transition-transform" size={20} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#0E332E] uppercase">Wishlist</span>
            </Link>
          </FadeInSection>
          <FadeInSection delay={550}>
            <Link href="/account/orders" className="bg-white border border-[#8A7043]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#8A7043] hover:shadow-md transition-all cursor-pointer group h-full">
              <ShoppingBag className="text-[#8A7043] mb-2 group-hover:scale-110 transition-transform" size={20} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#0E332E] uppercase">My Orders</span>
            </Link>
          </FadeInSection>
          <FadeInSection delay={600}>
            <Link href="/account/appointments" className="bg-white border border-[#8A7043]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#8A7043] hover:shadow-md transition-all cursor-pointer group h-full">
              <Calendar className="text-[#8A7043] mb-2 group-hover:scale-110 transition-transform" size={20} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#0E332E] uppercase">Appointments</span>
            </Link>
          </FadeInSection>
          <FadeInSection delay={650}>
            <Link href="/account/savings" className="bg-white border border-[#8A7043]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#8A7043] hover:shadow-md transition-all cursor-pointer group h-full">
              <PiggyBank className="text-[#8A7043] mb-2 group-hover:scale-110 transition-transform" size={20} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#0E332E] uppercase">Savings</span>
            </Link>
          </FadeInSection>
          <FadeInSection delay={700}>
            <Link href="/account/alerts" className="bg-white border border-[#8A7043]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#8A7043] hover:shadow-md transition-all cursor-pointer group h-full">
              <Bell className="text-[#8A7043] mb-2 group-hover:scale-110 transition-transform" size={20} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#0E332E] uppercase">Alerts</span>
            </Link>
          </FadeInSection>
          <FadeInSection delay={750}>
            <Link href="/account/support" className="bg-white border border-[#8A7043]/30 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#8A7043] hover:shadow-md transition-all cursor-pointer group h-full">
              <Headset className="text-[#8A7043] mb-2 group-hover:scale-110 transition-transform" size={20} strokeWidth={1.5} />
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#0E332E] uppercase">Support</span>
            </Link>
          </FadeInSection>
        </div>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#F9F6F0] p-6 rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="font-heading text-2xl text-[#0E332E] mb-4">Reschedule Appointment</h3>
            <p className="text-sm text-[#0E332E]/70 mb-4">Change the details of your appointment at the Mayfair Flagship Store.</p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-[10px] font-bold tracking-widest text-[#8A7043] uppercase block mb-1">New Date</label>
                <input type="date" className="w-full bg-white border border-[#0E332E]/10 rounded-lg p-2 text-sm text-[#0E332E] outline-none focus:border-[#8A7043]" />
              </div>
              <div>
                <label className="text-[10px] font-bold tracking-widest text-[#8A7043] uppercase block mb-1">New Time</label>
                <input type="time" className="w-full bg-white border border-[#0E332E]/10 rounded-lg p-2 text-sm text-[#0E332E] outline-none focus:border-[#8A7043]" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowRescheduleModal(false)} className="px-4 py-2 border border-[#0E332E]/20 text-[#0E332E] text-xs font-bold uppercase tracking-wider rounded hover:bg-black/5 transition-colors">Cancel</button>
              <button onClick={() => { alert('Appointment Rescheduled!'); setShowRescheduleModal(false); }} className="px-4 py-2 bg-[#0E332E] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#0a2420] transition-colors">Confirm New Time</button>
            </div>
          </div>
        </div>
      )}

      {/* Rebook Modal */}
      {showRebookModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#F9F6F0] p-6 rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <h3 className="font-heading text-2xl text-[#0E332E] mb-2">Confirm Rebooking</h3>
            <p className="text-sm text-[#0E332E]/70 mb-6">Are you sure you want to rebook the "Virtual Consultation"? We will place a new schedule for you.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowRebookModal(false)} className="px-6 py-2 border border-[#0E332E]/20 text-[#0E332E] text-xs font-bold uppercase tracking-wider rounded hover:bg-black/5 transition-colors">Cancel</button>
              <button onClick={() => { alert('Successfully Rebooked!'); setShowRebookModal(false); }} className="px-6 py-2 bg-[#8A7043] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#7a6239] transition-colors">Yes, Rebook</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
