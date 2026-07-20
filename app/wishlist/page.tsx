"use client";
import { useEffect, useState } from 'react';
import { Heart, Star, ShoppingBag, Trash2, ArrowLeft, TrendingUp, Bell, Package, Check, Mail, Link as LinkIcon, Store, MessageCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';

export default function WishlistPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [rates, setRates] = useState<any>(null);
  const { wishlist, removeFromWishlist } = useStore();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
      
    fetch('/api/true-rates')
      .then(res => res.json())
      .then(data => setRates(data));
  }, []);

  const wishlistedItems = products.filter(p => wishlist.includes(p.id));
  const totalValue = wishlistedItems.reduce((sum, item) => sum + item.price, 0);

  const generateShareText = () => {
    if (wishlistedItems.length === 0) return "Check out The Jewellery Archive!";
    const itemNames = wishlistedItems.map(item => item.name).join(', ');
    return `Check out my jewelry wishlist: ${itemNames}. Total value: ₹${totalValue.toLocaleString()}!`;
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + '/shop' : '';

  const handleWhatsApp = () => {
    if (wishlistedItems.length === 0) {
      alert("Your wishlist is empty! Add some items before sharing.");
      return;
    }
    const text = generateShareText();
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank');
  };

  const handleEmail = () => {
    if (wishlistedItems.length === 0) {
      alert("Your wishlist is empty! Add some items before sharing.");
      return;
    }
    const text = generateShareText();
    window.location.href = `mailto:?subject=${encodeURIComponent("My Jewellery Wishlist")}&body=${encodeURIComponent(text + '\n\n' + shareUrl)}`;
  };

  const handleCopyLink = () => {
    if (wishlistedItems.length === 0) {
      alert("Your wishlist is empty! Add some items before sharing.");
      return;
    }
    const text = generateShareText();
    navigator.clipboard.writeText(text + ' ' + shareUrl);
    alert("Wishlist details copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24">
      <div className="w-full px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto pt-12">
        

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-5xl text-[#8A7043] mb-3">Wishlist</h1>
          <p className="text-[#0E332E]/70 font-medium">Your Favourite Jewellery Collection</p>
        </div>

        {/* Live Rates Banner */}
        <div className="bg-[#F4F1EB] border border-[#E5DFD3] p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 shadow-sm gap-4">
          <div className="flex items-center gap-4">
            <TrendingUp size={24} className="text-[#8A7043]" />
            <div className="text-sm font-bold text-[#0E332E]">
              <span className="text-[#0E332E]/50 uppercase text-[10px] tracking-widest block mb-1">Today's Rate</span>
              22K: ₹{rates?.gold?.['22K']?.toLocaleString() || '9,220'} <span className="text-gray-300 mx-3">|</span> 24K: ₹{rates?.gold?.['24K']?.toLocaleString() || '10,050'}
            </div>
          </div>
          <Link href="/sourcing" className="text-[10px] font-bold tracking-[0.2em] text-[#8A7043] uppercase underline hover:opacity-70 transition-opacity">
            BREAKDOWN
          </Link>
        </div>

        {/* Value Dashboard */}
        <div className="bg-white border border-[#E5DFD3] p-8 md:p-10 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="font-heading text-3xl text-[#8A7043] mb-2">{wishlist.length} Saved Items</h2>
              <p className="text-[10px] text-[#0E332E]/40 tracking-widest uppercase">Updated 2 hours ago</p>
            </div>
            <div className="mt-6 md:mt-0 md:text-right">
              <p className="text-[10px] text-[#0E332E]/40 tracking-widest uppercase mb-2">Total Value</p>
              <p className="font-bold text-3xl text-[#0E332E]">₹{totalValue.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <button onClick={handleCopyLink} className="bg-[#8A7043] text-white py-4 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#0E332E] transition-colors shadow-sm">
              SHARE WISHLIST
            </button>
            <Link href="/shop" className="block w-full">
              <button className="w-full border-2 border-[#8A7043] text-[#8A7043] py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#8A7043] hover:text-white transition-colors">
                CONTINUE SHOPPING
              </button>
            </Link>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3 mb-16">
          <div className="bg-[#F4F1EB] p-5 flex items-center justify-between cursor-pointer border border-[#E5DFD3] hover:bg-[#EAE6DD] transition-colors shadow-sm">
            <div className="flex items-center gap-5 text-sm text-[#0E332E] font-medium">
              <Bell size={18} className="text-[#0E332E]" />
              Gold Necklace dropped by ₹3,200
            </div>
            <ChevronRight size={18} className="text-[#0E332E]/30" />
          </div>
          <div className="bg-[#F4F1EB] p-5 flex items-center justify-between cursor-pointer border border-[#E5DFD3] hover:bg-[#EAE6DD] transition-colors shadow-sm">
            <div className="flex items-center gap-5 text-sm text-[#0E332E] font-medium">
              <Package size={18} className="text-[#0E332E]" />
              Bracelet back in stock
            </div>
            <ChevronRight size={18} className="text-[#0E332E]/30" />
          </div>
        </div>

        {/* Wishlist Grid */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white/50 border border-[#0E332E]/10 flex flex-col items-center mb-16">
            <Heart size={48} className="text-[#0E332E]/20 mb-6" />
            <h2 className="font-heading text-2xl text-[#0E332E] mb-2">Your wishlist is empty</h2>
            <p className="text-[#0E332E]/60 text-sm">Discover our hand-cast designs and curate your collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {wishlistedItems.map(product => (
              <div key={product.id} className="bg-white border border-[#E5DFD3] shadow-sm p-4 flex flex-col group relative">
                
                <Link href={`/product/${product.id}`} className="block relative bg-[#F4F1EB] aspect-square mb-4 overflow-hidden">
                  {product.image ? (
                     <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url("${product.image}")` }}></div>
                  ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-[#0E332E]/20 text-[10px] font-bold tracking-widest uppercase border border-dashed border-[#0E332E]/10 m-2">Placeholder</div>
                  )}
                </Link>

                {/* Floating Heart / Delete */}
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeFromWishlist(product.id); }}
                  className="absolute bottom-20 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 shadow-sm hover:scale-110 hover:shadow-md transition-all z-10"
                >
                  <Heart size={14} className="text-[#8A7043] fill-current hover:text-red-500" />
                </button>

                <div className="mt-auto px-1">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-heading text-sm text-[#0E332E] leading-tight hover:text-[#8A7043] cursor-pointer transition-colors truncate mb-1.5">{product.name}</h3>
                  </Link>
                  <p className="font-bold text-[#0E332E] text-xs text-gray-500">₹{product.price.toLocaleString()}</p>
                </div>
                
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTAs */}
        <div className="space-y-6">
          <div className="bg-[#F4F1EB] border border-[#E5DFD3] p-12 text-center shadow-sm">
             <h2 className="font-heading text-2xl text-[#8A7043] mb-2">Share Your Selection</h2>
             <p className="text-xs text-[#0E332E]/60 mb-8">Let someone know what's on your mind</p>
             <div className="flex justify-center gap-6">
                <button onClick={handleWhatsApp} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform text-[#0E332E]" title="Share on WhatsApp">
                  <MessageCircle size={20} />
                </button>
                <button onClick={handleEmail} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform text-[#0E332E]" title="Share via Email">
                  <Mail size={20} />
                </button>
                <button onClick={handleCopyLink} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform text-[#0E332E]" title="Copy to Clipboard">
                  <LinkIcon size={20} />
                </button>
             </div>
          </div>

          <div className="bg-[#F4F1EB] border border-[#E5DFD3] p-12 text-center shadow-sm">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#E5DFD3]">
               <Store size={24} className="text-[#8A7043]" />
             </div>
             <h2 className="font-heading text-2xl text-[#8A7043] mb-4">Ready to Try Them In Person?</h2>
             <p className="text-xs text-[#0E332E]/60 mb-8 max-w-sm mx-auto leading-relaxed">
               Visit our flagship store for a personalized consultation and a private viewing of your wishlist.
             </p>
             <Link href="/shop" className="inline-block bg-[#8A7043] text-white px-10 py-4 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-[#0E332E] transition-colors shadow-md">
               BOOK APPOINTMENT
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
