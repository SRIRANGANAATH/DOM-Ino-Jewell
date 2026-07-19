"use client";
import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, User, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function BookAppointmentPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [form, setForm] = useState({
    location: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === id);
        setProduct(found);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (loading) return <div className="min-h-screen bg-[#F9F6F0]"></div>;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center gap-4">
        <div className="text-[#0E332E] font-heading text-2xl">Piece not found.</div>
        <button onClick={() => router.back()} className="text-sm underline font-bold tracking-widest uppercase">Go Back</button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 size={80} className="text-[#8A7043] mb-8" />
        <h1 className="font-heading text-4xl lg:text-5xl text-[#0E332E] mb-4">Your Private Viewing is Confirmed.</h1>
        <p className="text-[#0E332E]/70 max-w-lg mb-8 leading-relaxed">
          Thank you, {form.name}. We look forward to welcoming you to our {form.location} boutique on {form.date} at {form.time}. Your requested piece, the <strong>{product.name}</strong>, will be prepared for your arrival.
        </p>
        <Link href="/shop" className="bg-[#0E332E] text-white px-10 py-4 font-bold tracking-widest text-xs uppercase hover:bg-[#8A7043] transition-colors shadow-lg">
          Return to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 pt-8">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[#0E332E]/60 hover:text-[#0E332E] transition-colors font-bold tracking-widest text-[10px] uppercase mb-8">
          <ArrowLeft size={16} /> GO BACK
        </button>

        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl text-[#0E332E] mb-3">Book a Private Viewing</h1>
          <p className="text-sm text-[#0E332E]/70 font-medium">Experience DOMINO craftsmanship in person with a dedicated artisan.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Form Side */}
          <div className="md:col-span-3 bg-white p-8 lg:p-12 shadow-xl border border-[#0E332E]/5 relative">
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="space-y-6">
                <h3 className="font-bold tracking-[0.2em] text-xs text-[#8A7043] border-b border-gray-100 pb-3 uppercase">
                  1. Select Boutique & Timing
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-[#0E332E]/60 uppercase tracking-widest mb-2 flex items-center gap-2"><MapPin size={12} /> DOMINO Boutique Location</label>
                    <select required value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#8A7043] transition-colors bg-transparent text-[#0E332E]">
                      <option value="" disabled>Select a location...</option>
                      <option value="Mumbai Flagship (Bandra)">Mumbai Flagship (Bandra)</option>
                      <option value="Delhi Heritage Studio (Chanakyapuri)">Delhi Heritage Studio (Chanakyapuri)</option>
                      <option value="Bangalore Galleria (UB City)">Bangalore Galleria (UB City)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-[#0E332E]/60 uppercase tracking-widest mb-2 flex items-center gap-2"><Calendar size={12} /> Date</label>
                    <input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#8A7043] transition-colors bg-transparent text-[#0E332E]" />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-[#0E332E]/60 uppercase tracking-widest mb-2 flex items-center gap-2"><Clock size={12} /> Time Preference</label>
                    <select required value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#8A7043] transition-colors bg-transparent text-[#0E332E]">
                      <option value="" disabled>Select a time...</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <h3 className="font-bold tracking-[0.2em] text-xs text-[#8A7043] border-b border-gray-100 pb-3 uppercase">
                  2. Your Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-[#0E332E]/60 uppercase tracking-widest mb-2 flex items-center gap-2"><User size={12} /> Full Name</label>
                    <input type="text" placeholder="Your name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#8A7043] transition-colors bg-transparent text-[#0E332E]" />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-[#0E332E]/60 uppercase tracking-widest mb-2">Email Address</label>
                    <input type="email" placeholder="email@example.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#8A7043] transition-colors bg-transparent text-[#0E332E]" />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-[#0E332E]/60 uppercase tracking-widest mb-2">Phone Number</label>
                    <input type="tel" placeholder="+91 " required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#8A7043] transition-colors bg-transparent text-[#0E332E]" />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button type="submit" className="w-full bg-[#0E332E] text-white py-5 font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#8A7043] transition-colors shadow-lg">
                  Confirm Appointment
                </button>
                <p className="text-center text-[9px] text-[#0E332E]/50 uppercase tracking-widest mt-4">
                  A representative will contact you shortly to finalize details.
                </p>
              </div>

            </form>
          </div>

          {/* Product Summary Side */}
          <div className="md:col-span-2">
            <div className="bg-[#0E332E] p-8 text-white shadow-xl relative overflow-hidden h-full">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A7043] rounded-full filter blur-3xl opacity-20"></div>
               
               <h3 className="font-bold tracking-[0.2em] text-[10px] text-[#8A7043] mb-6 uppercase">
                 Requested Piece for Viewing
               </h3>
               
               <div className="aspect-[4/5] bg-[#F9F6F0]/10 mb-6 relative overflow-hidden border border-white/10">
                 {product.image ? (
                   <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${product.image}")` }}></div>
                 ) : (
                   <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs tracking-widest">NO IMAGE</div>
                 )}
               </div>

               <h4 className="font-heading text-2xl mb-2">{product.name}</h4>
               <p className="text-white/60 text-xs tracking-wide mb-6">{product.description}</p>
               
               <div className="flex justify-between items-end border-t border-white/10 pt-6">
                 <div>
                   <span className="block text-[9px] tracking-[0.1em] text-[#8A7043] uppercase mb-1">Estimated Retail</span>
                   <p className="font-bold text-lg">₹{product.price.toLocaleString()}</p>
                 </div>
                 <div className="flex gap-1">
                   {(product.tags || []).slice(0, 1).map((tag: string) => (
                     <span key={tag} className="text-[8px] font-bold tracking-widest border border-[#8A7043]/50 text-[#8A7043] px-2 py-1 uppercase">
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
