"use client";
import { useEffect, useState } from 'react';
import { Heart, Star, ShoppingBag, ArrowLeft, Check, Shield } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useParams, useRouter } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { wishlist, addToWishlist, removeFromWishlist } = useStore();

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
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${product.image}")` }}></div>
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

            <p className="text-2xl lg:text-3xl font-bold text-[#0E332E] mb-8">₹{product.price.toLocaleString()}</p>
            
            <div className="bg-[#F0EBE1] border border-[#E5DFD3] p-6 mb-8 text-sm text-[#0E332E]/80 leading-relaxed font-medium">
              <span className="font-bold text-[#0E332E] block mb-2 font-heading text-lg">Piece Description</span>
              {product.description}
            </div>

            <div className="space-y-4 mt-auto">
              <button className="w-full bg-[#0E332E] text-white text-sm font-bold tracking-[0.15em] uppercase py-5 hover:bg-[#8A7043] transition-colors shadow-md flex items-center justify-center gap-3">
                <ShoppingBag size={18} /> Add to Cart — ₹{product.price.toLocaleString()}
              </button>
              <Link href={`/book/${product.id}`} className="block w-full">
                <button className="w-full border-2 border-[#0E332E] text-[#0E332E] text-sm font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#0E332E] hover:text-white transition-colors">
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
    </div>
  );
}
