"use client";
import { useEffect, useState } from 'react';
import { Heart, Star, ShoppingBag, ArrowLeft, Check, Shield, X, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { wishlist, addToWishlist, removeFromWishlist } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.id === id);
        setProduct(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center">
      <div className="text-[#0E332E] font-heading text-xl animate-pulse">Loading archive...</div>
    </div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-[#F9F6F0] flex flex-col items-center justify-center gap-4">
      <div className="text-[#0E332E] font-heading text-2xl">Piece not found.</div>
      <button onClick={() => router.back()} className="text-sm underline font-bold tracking-widest uppercase">Go Back</button>
    </div>;
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleWishlistAdd = () => {
    if (!isWishlisted) {
      addToWishlist(product.id);
    }
    router.push('/wishlist');
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Purchase successful! This is a prototype.");
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 pt-8">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Back Button */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[#0E332E]/60 hover:text-[#0E332E] transition-colors font-bold tracking-widest text-[10px] uppercase mb-8">
          <ArrowLeft size={16} /> BACK TO ARCHIVE
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Image Gallery Side */}
          <div className="space-y-4">
            <div className="bg-[#EAE6DD] h-64 md:h-auto md:aspect-square relative flex items-center justify-center overflow-hidden">
              {product.image ? (
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }}></div>
              ) : (
                 <div className="text-[#0E332E]/30 text-lg font-heading tracking-widest border-2 border-dashed border-[#0E332E]/20 p-12">
                   Image Placeholder
                 </div>
              )}
              {/* Floating Wishlist Button */}
              <button 
                onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id)}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.9)] z-10
                ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-[#8A7043]'}`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-current text-red-500' : ''} />
              </button>
            </div>
          </div>

          {/* Product Details Side */}
          <div className="flex flex-col py-4">
            
            <div className="mb-6 flex gap-2">
              {(product.tags || []).map((tag: string) => (
                <span key={tag} className={`text-[10px] font-bold tracking-[0.1em] px-3 py-1 uppercase shadow-sm ${tag.includes('PURITY') || tag.includes('GOLD') ? 'bg-[#8A7043] text-white' : 'bg-white border border-gray-200 text-[#0E332E]'}`}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-heading text-4xl lg:text-5xl text-[#0E332E] mb-2 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-[#8A7043]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating || 5) ? "fill-current" : "opacity-30"} />
                ))}
              </div>
              <span className="text-xs font-bold tracking-widest text-[#0E332E]/60 uppercase">{product.rating || '4.9'} Rating</span>
            </div>

            <p className="text-2xl lg:text-3xl font-bold text-[#0E332E] mb-8">₹{product.price.toLocaleString('en-IN')}</p>
            
            <div className="bg-[#F0EBE1] border border-[#E5DFD3] p-6 mb-8 text-sm text-[#0E332E]/80 leading-relaxed font-medium">
              <span className="font-bold text-[#0E332E] block mb-2 font-heading text-lg">Piece Description</span>
              {product.description}
            </div>

            <div className="space-y-4 mt-auto">
              {/* Changed Add to Cart -> Wishlist, added Buy Now */}
              <div className="grid grid-cols-2 gap-4">
                <button onClick={handleWishlistAdd} className="w-full border-2 border-[#0E332E] text-[#0E332E] text-xs font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#0E332E] hover:text-white transition-colors shadow-sm flex items-center justify-center gap-2">
                  <Heart size={16} /> Save to Wishlist
                </button>
                <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-[#0E332E] text-white text-xs font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#8A7043] transition-colors shadow-md flex items-center justify-center gap-2">
                  <CreditCard size={16} /> Buy Now
                </button>
              </div>
              
              <Link href={`/book/${product.id}`} className="block w-full">
                <button className="w-full border-2 border-[#0E332E]/20 text-[#0E332E]/70 text-xs font-bold tracking-[0.15em] uppercase py-4 hover:border-[#0E332E] hover:text-[#0E332E] transition-colors">
                  Book Store Visit
                </button>
              </Link>
            </div>
            
            <div className="mt-8 space-y-3">
               <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-[#0E332E]/70 uppercase">
                 <Shield size={16} className="text-[#8A7043]" /> Transparent Sourcing Guarantee
               </div>
               <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-[#0E332E]/70 uppercase">
                 <Check size={16} className="text-[#8A7043]" /> Lifetime Maintenance
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-[#0E332E]/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row z-10"
            >
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#0E332E]/50 hover:text-[#0E332E] transition-colors z-20"
              >
                <X size={20} />
              </button>

              {/* Product Summary Side */}
              <div className="w-full md:w-2/5 bg-[#F9F6F0] p-8 border-b md:border-b-0 md:border-r border-[#0E332E]/10 flex flex-col">
                <h3 className="font-heading text-xl text-[#0E332E] mb-6">Order Summary</h3>
                <div className="aspect-square bg-white rounded-xl mb-6 flex items-center justify-center p-4 shadow-sm relative overflow-hidden">
                   {product.image ? (
                     <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }}></div>
                   ) : (
                     <Shield className="text-[#0E332E]/20 w-16 h-16" />
                   )}
                </div>
                <h4 className="font-bold text-[#0E332E] text-lg mb-2">{product.name}</h4>
                <p className="text-xs text-[#0E332E]/60 mb-6 flex-1">{product.description}</p>
                
                <div className="pt-6 border-t border-[#0E332E]/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#0E332E]/50 uppercase">Subtotal</span>
                    <span className="text-sm font-bold text-[#0E332E]">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold tracking-widest text-[#0E332E]/50 uppercase">Shipping</span>
                    <span className="text-sm font-bold text-[#8A7043]">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-[#0E332E]/10">
                    <span className="text-sm font-bold tracking-widest text-[#0E332E] uppercase">Total</span>
                    <span className="text-xl font-heading text-[#0E332E]">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Form Side */}
              <div className="w-full md:w-3/5 p-8 bg-white">
                <h3 className="font-heading text-xl text-[#0E332E] mb-6">Delivery Details</h3>
                <form onSubmit={handlePurchase} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.15em] text-[#0E332E]/50 uppercase mb-2">First Name</label>
                      <input type="text" required className="w-full border border-[#0E332E]/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#8A7043] focus:ring-1 focus:ring-[#8A7043] transition-all bg-[#F9F6F0]/50" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.15em] text-[#0E332E]/50 uppercase mb-2">Last Name</label>
                      <input type="text" required className="w-full border border-[#0E332E]/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#8A7043] focus:ring-1 focus:ring-[#8A7043] transition-all bg-[#F9F6F0]/50" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.15em] text-[#0E332E]/50 uppercase mb-2">Email</label>
                      <input type="email" required className="w-full border border-[#0E332E]/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#8A7043] focus:ring-1 focus:ring-[#8A7043] transition-all bg-[#F9F6F0]/50" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold tracking-[0.15em] text-[#0E332E]/50 uppercase mb-2">Phone</label>
                      <input type="tel" required className="w-full border border-[#0E332E]/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#8A7043] focus:ring-1 focus:ring-[#8A7043] transition-all bg-[#F9F6F0]/50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold tracking-[0.15em] text-[#0E332E]/50 uppercase mb-2">Shipping Address</label>
                    <textarea required rows={3} className="w-full border border-[#0E332E]/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#8A7043] focus:ring-1 focus:ring-[#8A7043] transition-all resize-none bg-[#F9F6F0]/50"></textarea>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#0E332E]/10">
                    <button type="submit" className="w-full bg-[#0E332E] text-white text-xs font-bold tracking-[0.15em] uppercase py-4 rounded-lg hover:bg-[#8A7043] hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <Shield size={14} /> Confirm Purchase — ₹{product.price.toLocaleString('en-IN')}
                    </button>
                    <p className="text-center text-[10px] text-[#0E332E]/40 font-medium mt-3">
                      Secured by DOMINO Encrypted Checkout.
                    </p>
                  </div>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
