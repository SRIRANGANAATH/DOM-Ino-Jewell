import Link from 'next/link';
import { Heart, ChevronLeft } from 'lucide-react';

export const metadata = { title: 'Your Wishlist - DOMINO' };

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 pt-8">
      <div className="w-full px-6 md:px-12 xl:px-24 max-w-[1200px] mx-auto text-center flex flex-col items-center justify-center min-h-[60vh]">
        <Link href="/account" className="inline-flex items-center text-[#8A7043] text-[10px] uppercase tracking-[0.2em] font-bold mb-10 hover:text-[#0E332E] transition-colors absolute top-8 left-6 md:left-12 xl:left-24">
          <ChevronLeft size={14} className="mr-1" /> Back to Account
        </Link>
        <div className="w-20 h-20 mb-6 opacity-40 flex items-center justify-center text-[#8A7043]">
          <Heart size={56} strokeWidth={1} />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-[#0E332E] mb-4">Your Wishlist</h1>
        <p className="text-[#0E332E]/70 max-w-md mx-auto mb-10 text-sm leading-relaxed">Your curated collection of artisanal pieces is currently empty.</p>
        <Link href="/shop" className="px-8 py-4 bg-[#0E332E] text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#0a2420] transition-colors rounded shadow-lg hover:shadow-xl">
          Explore Collections
        </Link>
      </div>
    </div>
  );
}
