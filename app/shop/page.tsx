"use client";
import { useEffect, useState } from 'react';
import { Heart, Star, Search, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlist, addToWishlist, removeFromWishlist, compareList, toggleCompare } = useStore();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  const handleWishlistClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlist.includes(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
      router.push('/wishlist');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 relative">
      
      {/* Floating Compare Action Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-[#0E332E] text-white px-6 py-4 shadow-2xl flex items-center gap-6 z-50 animate-in slide-in-from-bottom-10 border border-[#8A7043]/30 backdrop-blur-lg rounded-none">
          <span className="font-bold tracking-widest text-sm whitespace-nowrap">{compareList.length} ITEM{compareList.length > 1 ? 'S' : ''} SELECTED</span>
          {compareList.length > 1 ? (
            <button onClick={() => router.push('/compare')} className="bg-[#8A7043] hover:bg-[#6b5632] transition-colors px-6 py-2.5 font-bold text-xs tracking-widest uppercase flex items-center gap-2 shadow-md">
              Compare <ArrowRight size={14} />
            </button>
          ) : (
            <span className="text-[10px] text-white/50 italic whitespace-nowrap">Select 1 more</span>
          )}
        </div>
      )}

      {/* Page Header */}
      <div className="text-center pt-6 pb-6 px-4">
        <h1 className="font-heading text-4xl text-[#0E332E] mb-2">The Jewellery Archive</h1>
        <p className="text-sm text-[#0E332E]/70 font-medium tracking-wide">Explore hand-cast designs engineered for permanence.</p>
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16">
        

        {/* Transparent Integrity Banner */}
        <div className="bg-[#F0EBE1] border border-[#E5DFD3] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 shadow-sm">
          <p className="text-xs text-[#0E332E]/80">
            <span className="font-bold text-[#0E332E]">Transparent Integrity:</span> All of our designs feature a public invoice. To audit our pricing, raw materials, or craftsman labor, <Link href="/sourcing" className="underline font-semibold hover:text-[#8A7043] transition-colors">Learn More</Link>.
          </p>
          <Link href="/sourcing" className="text-xs font-bold tracking-widest text-[#8A7043] whitespace-nowrap uppercase hover:opacity-70 transition-opacity">
            THE SOURCING HUB &rarr;
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col xl:flex-row justify-between items-center mb-12 gap-6">
          <div className="relative w-full xl:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search archive..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F0EBE1] text-xs font-semibold py-3.5 pl-12 pr-4 outline-none border border-transparent focus:border-[#8A7043] transition-colors placeholder:text-[#0E332E]/40 text-[#0E332E]" 
            />
          </div>
          
          <div className="flex gap-1.5 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 scrollbar-hide">
            {['ALL', 'NECKLACE', 'EARRINGS', 'RING', 'BRACELET'].map(filter => (
              <button 
                key={filter} 
                onClick={() => setActiveCategory(filter)}
                className={`text-[10px] font-bold tracking-[0.15em] px-6 py-3 uppercase ${activeCategory === filter ? 'bg-[#0E332E] text-white' : 'bg-[#F0EBE1] text-[#0E332E]/70 hover:bg-[#E5DFD3]'} transition-colors whitespace-nowrap`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full xl:w-auto">
             <button className="w-full xl:w-48 flex justify-between items-center bg-[#F0EBE1] text-[11px] tracking-wider font-bold py-3.5 px-5 text-[#0E332E]/80 uppercase hover:bg-[#E5DFD3] transition-colors">
               All Purities
               <ChevronDown size={16} className="text-[#0E332E]/50" />
             </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-10 gap-y-16">
          {products
            .filter(p => activeCategory === 'ALL' || p.name.toUpperCase().includes(activeCategory))
            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(product => (
            <div key={product.id} className="group flex flex-col">
              
              {/* Image Box - Wrapped in Link for detail view, updated height for mobile */}
              <Link href={`/product/${product.id}`} className="block relative bg-[#EAE6DD] h-64 md:h-auto md:aspect-[4/5] mb-5 flex items-center justify-center p-4 overflow-hidden">
                {product.image ? (
                   <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${product.image}")` }}></div>
                ) : (
                   <div className="text-[#0E332E]/30 text-xs font-bold tracking-widest uppercase border-2 border-dashed border-[#0E332E]/20 px-6 py-4">Image Placeholder</div>
                )}
                
                {/* Wishlist Button */}
                <button 
                  onClick={(e) => handleWishlistClick(e, product.id)}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all z-10 
                  ${wishlist.includes(product.id) ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-[#8A7043]'}`}
                >
                  <Heart size={15} className={`${wishlist.includes(product.id) ? 'fill-current text-red-500' : ''} transition-colors`} />
                </button>

                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                   {(product.tags || []).map((tag: string) => (
                     <span key={tag} className={`text-[9px] font-bold tracking-[0.1em] px-2.5 py-1.5 uppercase shadow-sm ${tag.includes('PURITY') || tag.includes('GOLD') ? 'bg-[#8A7043] text-white' : 'bg-white text-[#0E332E]'}`}>
                       {tag}
                     </span>
                   ))}
                </div>
              </Link>

              {/* Product Info */}
              <div className="flex justify-between items-start mb-1.5">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-heading text-[22px] text-[#0E332E] leading-tight pr-4 hover:text-[#8A7043] cursor-pointer transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-1.5 text-[#8A7043] mt-1">
                  <Star size={13} className="fill-current" />
                  <span className="text-xs font-bold tracking-wider text-[#0E332E]">{product.rating || '4.9'}</span>
                </div>
              </div>
              <p className="text-[#0E332E]/50 text-xs font-medium tracking-wide mb-3">{product.description}</p>
              <p className="font-bold text-[#0E332E] mb-6 tracking-wider text-base">₹{product.price.toLocaleString()}</p>

              {/* Action Buttons */}
              <div className="mt-auto space-y-2">
                <Link href={`/book/${product.id}`} className="block w-full">
                  <button className="w-full bg-[#0E332E] text-white text-[11px] font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#8A7043] transition-colors shadow-sm">
                    BOOK STORE VISIT
                  </button>
                </Link>
                <div className="flex gap-2">
                  <Link href={`/product/${product.id}`} className="flex-1 block">
                    <button className="w-full border border-[#0E332E]/10 text-[10px] font-bold tracking-[0.15em] text-[#0E332E]/70 uppercase py-3.5 hover:border-[#0E332E] transition-colors bg-white shadow-sm">
                      VIEW DETAILS
                    </button>
                  </Link>
                  <label className="flex items-center justify-center gap-2 border border-[#0E332E]/10 bg-white px-5 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                    <input 
                      type="checkbox" 
                      className="accent-[#8A7043] w-3.5 h-3.5 cursor-pointer" 
                      checked={compareList.includes(product.id)}
                      onChange={() => toggleCompare(product.id)}
                    />
                    <span className="text-[10px] font-bold tracking-[0.15em] text-[#0E332E]/60 uppercase">COMPARE</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
