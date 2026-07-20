"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroCarousel from '@/components/home/HeroCarousel';

export default function HomePage() {
  const [rates, setRates] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch live gold rates
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/gold-rates');
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.error('Failed to fetch rates', err);
      }
    };
    
    // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchRates();
    fetchProducts();
    const interval = setInterval(fetchRates, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredProduct = products.length > 0 ? products.find(p => p.id === '8') || products[0] : null;

  return (
    <main>
      <HeroCarousel />
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* We use a placeholder background color if the image is missing, but assume public/images/hero-pearl-necklace.jpg will be added */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/hero.png")', backgroundColor: '#e2dfd9' }}
        >
          {/* Light overlay for text readability */}
          <div className="absolute inset-0 bg-white/40"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-[#8A7043] tracking-[0.2em] uppercase text-sm font-bold mb-6">Heritage Minimalism</h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-[#0B2B26]" style={{ fontFamily: 'var(--font-heading)' }}>
            Artisanal Grace,<br/>Absolute Honesty
          </h1>
          <p className="text-[#4A5568] text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Every creation is a narrative of slow luxury. Crafted in the finest purity gold, verified for provenance, and priced with transparent integrity.
          </p>
          <Link href="/shop" className="inline-block bg-[#0B2B26] text-[#F9F6F0] px-8 py-4 uppercase text-sm tracking-widest font-bold hover:bg-[#071f1b] transition-colors">
            Explore the Collection
          </Link>
        </div>
      </section>

      {/* Gold Rates Banner */}
      <div className="border-b border-[#e5e5e5] bg-[#F9F6F0] py-4">
        <div className="container flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center gap-4 mb-2 md:mb-0">
            <span className="text-[#8A7043] font-bold uppercase tracking-wider text-xs">Today's Accredited Rate</span>
            {rates.length > 0 && (
              <div className="flex gap-4 font-bold text-[#0B2B26]">
                <span>22K Gold: ₹{rates[0].price.toLocaleString()}/g</span>
                <span className="text-gray-300">|</span>
                <span>24K Gold: ₹{rates[1].price.toLocaleString()}/g</span>
              </div>
            )}
          </div>
          <div className="text-xs text-[#4A5568] flex items-center gap-2">
            <span className="live-indicator"></span>
            Rates are updated in real-time in accordance with the London Bullion Market Association (LBMA) standards.
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="bg-white py-20 px-4">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:border-r md:border-gray-200 pr-8">
            <h3 className="text-2xl mb-6 text-[#0B2B26]" style={{ fontFamily: 'var(--font-heading)' }}>Pure Craftsmanship</h3>
            <p className="text-[#4A5568] leading-relaxed text-sm">
              All designs are cast in 100% ethically sourced recycled gold. We refuse mass assembly lines, employing multi-generational master smiths instead.
            </p>
          </div>
          <div className="md:border-r md:border-gray-200 pr-8">
            <h3 className="text-2xl mb-6 text-[#0B2B26]" style={{ fontFamily: 'var(--font-heading)' }}>Full Transparency</h3>
            <p className="text-[#4A5568] leading-relaxed text-sm">
              We break down the cost of every single gram of gold, diamond weight, and artisan labor so you know exactly where your investment resides.
            </p>
          </div>
          <div>
            <h3 className="text-2xl mb-6 text-[#0B2B26]" style={{ fontFamily: 'var(--font-heading)' }}>The Forever Heritage</h3>
            <p className="text-[#4A5568] leading-relaxed text-sm">
              Registered with state certifications, every item is backed by our lifetime buyback guarantee and gold purity certification.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="bg-[#0B2B26] text-[#F9F6F0] mb-16">
        <div className="container py-20 px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-[500px] bg-[#d9d9d9] relative">
             <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${featuredProduct?.image || '/images/Necklace.jpg'})` }}
            ></div>
          </div>
          <div className="pl-0 md:pl-10">
            <h4 className="text-[#C59E3F] tracking-widest uppercase text-xs font-bold mb-6">Featured Story</h4>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {featuredProduct ? featuredProduct.name : 'The Aura Necklace:'}<br/>Elegance Redefined
            </h2>
            <p className="text-gray-300 leading-relaxed mb-10 max-w-md">
              {featuredProduct ? featuredProduct.description : 'Carved delicately with high-polished geometry, the Elegant Gold Necklace is built for slow lifetimes. Cast with a traditional BIS Hallmark ensuring authentic 22K pure yellow gold.'}
            </p>
            <div className="flex gap-4">
              <Link href={featuredProduct ? `/product/${featuredProduct.id}` : '/shop'} className="bg-[#C59E3F] flex items-center justify-center hover:bg-[#b58d2f] text-white px-8 py-4 uppercase text-xs tracking-widest font-bold transition-colors">
                Browse Piece
              </Link>
              <Link href="/about" className="border flex items-center justify-center border-white text-white hover:bg-white/10 px-8 py-4 uppercase text-xs tracking-widest font-bold transition-colors">
                Our Heritage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
