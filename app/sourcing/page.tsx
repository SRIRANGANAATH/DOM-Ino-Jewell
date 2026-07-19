"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Odometer from '@/components/Odometer';
import { VerticalWheel } from '@/components/MultiWheelPicker';

export default function SourcingPage() {
  const [rates, setRates] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [goldWeight, setGoldWeight] = useState(10);
  const [unit, setUnit] = useState<'gram' | 'savaran'>('gram');
  const [purity, setPurity] = useState<18 | 22 | 24>(22);
  const [gemstone, setGemstone] = useState('none');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/true-rates')
      .then(res => res.json())
      .then(data => {
        setRates(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
      <div className="text-[#0E332E] font-heading text-xl animate-pulse">Connecting to live global markets...</div>
    </div>;
  }

  // Options for wheels
  const gramsOptions = Array.from({length: 46}, (_, i) => ({ value: i + 5, label: `${i + 5}` }));
  const savaranOptions = Array.from({length: 46}, (_, i) => {
    const val = i + 5;
    const sav = val / 8;
    return { value: val, label: Number.isInteger(sav) ? sav.toString() : sav.toFixed(2) };
  });
  
  const unitOptions = [
    { value: 'gram', label: 'Gram' },
    { value: 'savaran', label: 'Savaran' }
  ];
  const purityOptions = [
    { value: 18, label: '18 crt' },
    { value: 22, label: '22 crt' },
    { value: 24, label: '24 crt' }
  ];

  // Calculations
  const purityMultiplier = purity === 24 ? 1.09 : purity === 18 ? 0.81 : 1;
  const rawGoldCost = Math.round(goldWeight * (rates?.gold?.[`${purity}K`] || (9220 * purityMultiplier))); // Fallback if API fails
  const laborCost = goldWeight * 850; // Fixed 850 INR per gram labor
  const refiningCost = 3500; // Flat fee
  
  let gemstoneCost = 0;
  let gemstoneLabel = '';
  if (gemstone === 'emerald') {
    gemstoneCost = rates?.emerald?.['ZAMBIAN_NATURAL'] || 35000;
    gemstoneLabel = 'Ethical Gemstone (1 ct)';
  } else if (gemstone === 'diamond') {
    gemstoneCost = rates?.diamond?.['GIA_TRIPLE_EXCELLENT'] || 250000;
    gemstoneLabel = 'Conflict-Free Diamond (1 ct)';
  }

  const trueSubtotal = rawGoldCost + laborCost + refiningCost + gemstoneCost;
  const markup = Math.round(trueSubtotal * 0.25);
  const estimatedRetail = trueSubtotal + markup;

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24">
      
      {/* Page Header */}
      <div className="text-center pt-20 pb-16 px-4">
        <h2 className="text-[#8A7043] font-bold tracking-[0.2em] uppercase text-xs mb-4">Radical Honesty</h2>
        <h1 className="font-heading text-5xl text-[#0E332E] mb-6">The Sourcing & Cost Hub</h1>
        <p className="text-[#0E332E]/70 font-medium tracking-wide max-w-2xl mx-auto leading-relaxed">
          Traditional luxury marks up jewelry by up to 1000% while keeping artisans and materials hidden. We do things differently. Here is the direct breakdown of every single rupee.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[#0E332E]/60 hover:text-[#0E332E] transition-colors font-bold tracking-widest text-[10px] uppercase mt-2 mb-8">
          <ArrowLeft size={16} /> GO BACK
        </button>

        {/* Interactive Valuation Block */}
        <div className="bg-[#F4F1EB] p-8 md:p-12 mb-20 shadow-sm border border-[#0E332E]/5">
          <h2 className="font-heading text-3xl text-[#0E332E] text-center mb-12">Interactive Valuation Breakdown</h2>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Controls */}
            <div className="space-y-10">
              <h3 className="font-bold tracking-[0.15em] text-xs text-[#8A7043] border-b border-[#0E332E]/10 pb-4 uppercase">
                Configure Specifications
              </h3>
              
              <div className="space-y-6">
                
                <div className="flex justify-between items-center text-[#0E332E] font-medium text-sm">
                  <span>Configure Weight & Purity</span>
                </div>
                
                <div className="w-full flex flex-col items-center bg-[#0E332E]/5 rounded-xl py-6 border border-[#0E332E]/10">
                  <div className="relative flex justify-center items-center bg-white rounded-xl shadow-inner border border-[#0E332E]/10 h-[120px] overflow-hidden px-4 md:px-8 gap-4 md:gap-8">
                    
                    {/* Center highlight block */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[40px] bg-[#8A7043]/5 border-y border-[#8A7043]/20 pointer-events-none"></div>

                    {/* Number Reel (Left Side) */}
                    <div className="flex flex-col items-center z-10 relative">
                      <VerticalWheel 
                        value={goldWeight} 
                        options={unit === 'gram' ? gramsOptions : savaranOptions} 
                        onChange={setGoldWeight} 
                        widthClass="w-16" 
                      />
                    </div>

                    {/* Unit Reel (Middle) */}
                    <div className="flex flex-col items-center z-10 relative">
                      <VerticalWheel 
                        value={unit} 
                        options={unitOptions} 
                        onChange={setUnit} 
                        widthClass="w-20 md:w-24" 
                      />
                    </div>

                    {/* Carat Reel (Right Side) */}
                    <div className="flex flex-col items-center z-10 relative">
                      <VerticalWheel 
                        value={purity} 
                        options={purityOptions} 
                        onChange={(val) => setPurity(val as any)} 
                        widthClass="w-20 md:w-24" 
                      />
                    </div>

                    {/* Fade Gradients */}
                    <div className="absolute left-0 right-0 top-0 h-[40px] bg-gradient-to-b from-white to-transparent pointer-events-none z-20"></div>
                    <div className="absolute left-0 right-0 bottom-[0px] h-[40px] bg-gradient-to-t from-white to-transparent pointer-events-none z-20"></div>
                  </div>

                  {/* LABELS BELOW */}
                  <div className="flex justify-center gap-4 md:gap-8 px-4 md:px-8 mt-4 w-full">
                    <div className="w-16 text-center text-[10px] font-bold tracking-widest text-[#0E332E]/60 uppercase">Value</div>
                    <div className="w-20 md:w-24 text-center text-[10px] font-bold tracking-widest text-[#0E332E]/60 uppercase">Unit</div>
                    <div className="w-20 md:w-24 text-center text-[10px] font-bold tracking-widest text-[#0E332E]/60 uppercase">Carat</div>
                  </div>
                </div>

                {/* Summary Display */}
                <div className="bg-white border border-[#0E332E]/10 rounded-xl p-4 text-center shadow-sm text-[#0E332E] font-medium tracking-wide">
                  {goldWeight} grams , {Number.isInteger(goldWeight / 8) ? (goldWeight / 8) : (goldWeight / 8).toFixed(2)} savaran , {purity} crt
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[#0E332E] font-medium text-sm">
                  Gemstone Sourcing
                </div>
                <div className="relative">
                  <select 
                    value={gemstone}
                    onChange={(e) => setGemstone(e.target.value)}
                    className="w-full bg-white border border-[#0E332E]/20 p-4 outline-none focus:border-[#8A7043] appearance-none text-sm text-[#0E332E] cursor-pointer"
                  >
                    <option value="none">None — Pure Gold</option>
                    <option value="emerald">Ethical Zambian Emerald (Certified Natural)</option>
                    <option value="diamond">Conflict-Free Diamond (GIA Triple Excellent)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0E332E]/50 pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            {/* Right Ledger */}
            <div className="bg-[#0E332E] text-white p-8 lg:p-10 shadow-xl relative overflow-hidden">
               {/* Aesthetic decorative element */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A7043] rounded-full filter blur-3xl opacity-10"></div>
               
               <h3 className="font-bold tracking-[0.15em] text-xs text-[#8A7043] mb-8 uppercase">
                 Live Transparent Ledger
               </h3>

               <div className="space-y-6 text-sm font-medium border-b border-white/10 pb-8 mb-8">
                 <div className="flex justify-between items-center gap-4">
                   <span className="text-white/80">Raw Gold Sourcing ({goldWeight}g • {purity}K)</span>
                   <span className="font-mono flex items-center gap-0.5 shrink-0"><span>₹</span><Odometer value={rawGoldCost} /></span>
                 </div>
                 <div className="flex justify-between items-center gap-4">
                   <span className="text-white/80">Artisanal Labor ({goldWeight}g)</span>
                   <span className="font-mono flex items-center gap-0.5 shrink-0"><span>₹</span><Odometer value={laborCost} /></span>
                 </div>
                 <div className="flex justify-between items-center gap-4">
                   <span className="text-white/80">Refining & Hallmarking</span>
                   <span className="font-mono flex items-center gap-0.5 shrink-0"><span>₹</span><Odometer value={refiningCost} /></span>
                 </div>
                 {gemstone !== 'none' && (
                   <div className="flex justify-between items-center gap-4 text-[#8A7043]">
                     <span>{gemstoneLabel}</span>
                     <span className="font-mono flex items-center gap-0.5 shrink-0"><span>₹</span><Odometer value={gemstoneCost} /></span>
                   </div>
                 )}
               </div>

               <div className="space-y-4 mb-12">
                 <div className="flex justify-between items-center gap-4 font-bold text-lg">
                   <span>True Sourcing Subtotal</span>
                   <span className="font-mono text-white flex items-center gap-0.5 shrink-0"><span>₹</span><Odometer value={trueSubtotal} /></span>
                 </div>
                 <div className="flex justify-between items-center gap-4 text-[#8A7043] italic text-sm">
                   <span>DOM INO 25% Admin/Markup</span>
                   <span className="font-mono flex items-center gap-0.5 shrink-0"><span>₹</span><Odometer value={markup} /></span>
                 </div>
               </div>

               <div className="border-t border-[#8A7043]/30 pt-8">
                 <span className="block text-[10px] tracking-[0.2em] text-[#8A7043] uppercase mb-1">Estimated Retail Value</span>
                 <div className="flex flex-wrap items-center gap-2">
                   <div className="text-4xl lg:text-5xl font-heading text-[#C59E3F] flex items-center gap-1 shrink-0">
                     <span>₹</span>
                     <Odometer value={estimatedRetail} />
                   </div>
                   <span className="text-[10px] text-white/50 tracking-wider">VAT & Hallmarking Charges Included</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Path of Sourcing */}
        <div className="text-center mb-24">
          <h2 className="font-heading text-3xl text-[#0E332E] mb-12">The Ethical Path of Sourcing</h2>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white p-10 border border-[#0E332E]/5 shadow-sm text-left">
               <span className="text-3xl font-heading text-[#8A7043] mb-6 block">01</span>
               <h3 className="font-heading text-xl text-[#0E332E] mb-4">Ethical Mine Cooperatives</h3>
               <p className="text-sm text-[#0E332E]/70 leading-relaxed">
                 We trace gold mining cooperatives in Peru and East Africa that ensure equitable pay, safe tunnel structures, and zero mercury pollution.
               </p>
             </div>
             <div className="bg-white p-10 border border-[#0E332E]/5 shadow-sm text-left">
               <span className="text-3xl font-heading text-[#8A7043] mb-6 block">02</span>
               <h3 className="font-heading text-xl text-[#0E332E] mb-4">The LBMA Certified Refinery</h3>
               <p className="text-sm text-[#0E332E]/70 leading-relaxed">
                 Materials are melted and processed in London Bullion Market certified refineries, maintaining clean recycling streams.
               </p>
             </div>
             <div className="bg-white p-10 border border-[#0E332E]/5 shadow-sm text-left">
               <span className="text-3xl font-heading text-[#8A7043] mb-6 block">03</span>
               <h3 className="font-heading text-xl text-[#0E332E] mb-4">Artisanal Casting</h3>
               <p className="text-sm text-[#0E332E]/70 leading-relaxed">
                 Master jewelers hand-polish every item in our Milanese studio, ensuring that each piece gets a deep personal signature.
               </p>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#0E332E]/10 pt-12 pb-12 text-center">
          <h4 className="font-bold tracking-[0.2em] text-[#8A7043] text-xs uppercase mb-8">Explore The Platform</h4>
          <div className="flex justify-center gap-6 text-[10px] font-bold tracking-[0.15em] text-[#0E332E] uppercase">
            <Link href="/" className="hover:text-[#8A7043] transition-colors">Home</Link>
            <span className="text-gray-300">|</span>
            <Link href="/shop" className="hover:text-[#8A7043] transition-colors">Shop</Link>
            <span className="text-gray-300">|</span>
            <Link href="/wishlist" className="hover:text-[#8A7043] transition-colors">Wishlist</Link>
            <span className="text-gray-300">|</span>
            <Link href="/login" className="hover:text-[#8A7043] transition-colors">Account</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
