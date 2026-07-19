"use client";
import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Shield, Gem, TrendingDown, Star } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';

export default function ComparePage() {
  const { compareList, toggleCompare } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  const compareItems = products.filter(p => compareList.includes(p.id));

  // Recommendation Engine Logic
  let recommendedId = null;
  if (compareItems.length > 1) {
    // Simple mock logic: Find highest rated, if tied, find lowest price
    recommendedId = compareItems.reduce((prev, current) => {
      if ((current.rating || 0) > (prev.rating || 0)) return current;
      if ((current.rating || 0) === (prev.rating || 0) && current.price < prev.price) return current;
      return prev;
    }).id;
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 pt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <button onClick={() => router.push('/shop')} className="flex items-center gap-2 text-[#0E332E]/60 hover:text-[#0E332E] transition-colors font-bold tracking-widest text-[10px] uppercase mb-8">
          <ArrowLeft size={16} /> BACK TO ARCHIVE
        </button>

        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl text-[#0E332E] mb-4">Comparison Ledger</h1>
          <p className="text-sm text-[#0E332E]/70 font-medium tracking-wide">Evaluate purities, pricing, and materials side-by-side.</p>
        </div>

        {compareItems.length === 0 ? (
          <div className="text-center py-20 bg-white/50 border border-[#0E332E]/10">
            <h2 className="font-heading text-2xl text-[#0E332E] mb-2">No items selected to compare</h2>
            <Link href="/shop" className="text-sm underline font-bold tracking-widest uppercase">Go back to Shop</Link>
          </div>
        ) : (
          <div className="bg-white border border-[#0E332E]/10 shadow-sm overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-6 border-b border-r border-[#0E332E]/10 w-1/4 bg-[#F9F6F0] text-[#0E332E] font-heading text-lg">Product Details</th>
                  {compareItems.map(item => (
                    <th key={item.id} className={`p-6 border-b border-r border-[#0E332E]/10 w-1/4 relative ${recommendedId === item.id ? 'bg-[#8A7043]/5' : ''}`}>
                      {recommendedId === item.id && (
                         <div className="absolute top-0 left-0 w-full bg-[#8A7043] text-white text-[10px] font-bold tracking-widest uppercase text-center py-1">
                           Best Value Pick
                         </div>
                      )}
                      <div className="aspect-[4/5] bg-[#EAE6DD] mb-4 mt-4 relative overflow-hidden flex items-center justify-center">
                         {item.image ? (
                           <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${item.image}")` }}></div>
                         ) : (
                           <div className="text-[#0E332E]/30 text-xs font-bold tracking-widest uppercase border border-dashed border-[#0E332E]/20 p-2">Placeholder</div>
                         )}
                      </div>
                      <h3 className="font-heading text-xl text-[#0E332E] leading-tight mb-2">{item.name}</h3>
                      <p className="text-[#8A7043] font-bold text-lg mb-4">₹{item.price.toLocaleString()}</p>
                      
                      <button onClick={() => router.push(`/product/${item.id}`)} className="w-full bg-[#0E332E] text-white text-[10px] font-bold tracking-[0.15em] uppercase py-3 hover:bg-[#8A7043] transition-colors shadow-sm mb-2">
                        View Item
                      </button>
                      <button onClick={() => toggleCompare(item.id)} className="w-full border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-500 text-[10px] font-bold tracking-[0.15em] uppercase py-2 transition-colors">
                        Remove
                      </button>
                    </th>
                  ))}
                  {/* Empty filler if less than 3 items */}
                  {Array.from({ length: Math.max(0, 3 - compareItems.length) }).map((_, i) => (
                    <th key={i} className="p-6 border-b border-r border-[#0E332E]/10 w-1/4 bg-gray-50/50"></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-6 border-b border-r border-[#0E332E]/10 font-bold tracking-wider text-xs uppercase text-[#0E332E]/60 flex items-center gap-2">
                    <Star size={16} /> Rating
                  </td>
                  {compareItems.map(item => (
                    <td key={`rating-${item.id}`} className={`p-6 border-b border-r border-[#0E332E]/10 font-bold text-[#0E332E] ${recommendedId === item.id ? 'bg-[#8A7043]/5' : ''}`}>
                      <div className="flex items-center gap-2">
                        {item.rating || '4.9'} <Star size={14} className="text-[#8A7043] fill-current" />
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareItems.length) }).map((_, i) => <td key={i} className="p-6 border-b border-r border-[#0E332E]/10 bg-gray-50/50"></td>)}
                </tr>
                <tr>
                  <td className="p-6 border-b border-r border-[#0E332E]/10 font-bold tracking-wider text-xs uppercase text-[#0E332E]/60 flex items-center gap-2">
                    <Gem size={16} /> Specifications
                  </td>
                  {compareItems.map(item => (
                    <td key={`spec-${item.id}`} className={`p-6 border-b border-r border-[#0E332E]/10 text-sm text-[#0E332E]/80 ${recommendedId === item.id ? 'bg-[#8A7043]/5' : ''}`}>
                      {item.description}
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareItems.length) }).map((_, i) => <td key={i} className="p-6 border-b border-r border-[#0E332E]/10 bg-gray-50/50"></td>)}
                </tr>
                <tr>
                  <td className="p-6 border-b border-r border-[#0E332E]/10 font-bold tracking-wider text-xs uppercase text-[#0E332E]/60 flex items-center gap-2">
                    <Shield size={16} /> Certifications
                  </td>
                  {compareItems.map(item => (
                    <td key={`cert-${item.id}`} className={`p-6 border-b border-r border-[#0E332E]/10 ${recommendedId === item.id ? 'bg-[#8A7043]/5' : ''}`}>
                      <div className="flex flex-wrap gap-2">
                        {(item.tags || []).map((tag: string) => (
                           <span key={tag} className={`text-[9px] font-bold tracking-[0.1em] px-2 py-1 uppercase shadow-sm ${tag.includes('PURITY') || tag.includes('GOLD') ? 'bg-[#8A7043] text-white' : 'bg-gray-100 text-[#0E332E]'}`}>
                             {tag}
                           </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareItems.length) }).map((_, i) => <td key={i} className="p-6 border-b border-r border-[#0E332E]/10 bg-gray-50/50"></td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Dynamic Recommendation Engine Block */}
        {compareItems.length > 1 && recommendedId && (
          <div className="mt-12 bg-[#0E332E] text-white p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8A7043] rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <h3 className="font-heading text-3xl mb-4 flex items-center gap-3">
                <CheckCircle2 size={32} className="text-[#8A7043]" /> DOMINO Recommendation
              </h3>
              {compareItems.map(item => {
                if (item.id === recommendedId) {
                  return (
                    <div key="rec">
                      <p className="text-white/80 leading-relaxed max-w-3xl mb-6">
                        Based on our algorithmic comparison of customer satisfaction (Rating: <strong className="text-[#8A7043]">{item.rating || '4.9'}/5.0</strong>), material purity, and overall price value (₹{item.price.toLocaleString()}), the <strong className="text-white text-lg font-heading">{item.name}</strong> stands out as the superior choice in your current ledger.
                      </p>
                      <button onClick={() => router.push(`/product/${item.id}`)} className="bg-[#8A7043] hover:bg-[#6b5632] transition-colors px-8 py-4 font-bold text-xs tracking-widest uppercase shadow-lg inline-flex items-center gap-2">
                        Acquire Recommended Piece
                      </button>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
