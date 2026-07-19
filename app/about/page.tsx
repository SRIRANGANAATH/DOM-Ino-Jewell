"use client";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function AboutPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    // Trigger header entrance animation shortly after load
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 100);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 pt-8 overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        

        {/* Page Header */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
          <div className={`flex-1 text-center md:text-left max-w-2xl mx-auto md:mx-0 transition-all duration-[1200ms] ease-out transform ${isHeaderVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'}`}>
            <h3 className="font-bold tracking-[0.2em] text-[#8A7043] text-[10px] uppercase mb-6">Our Heritage</h3>
            <h1 className="font-heading text-5xl md:text-6xl text-[#0E332E] mb-6 leading-tight">A Legacy of Radical<br className="hidden md:block"/>Integrity</h1>
            <p className="text-sm text-[#0E332E]/70 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
              How a family-run metallurgy atelier in Northern Italy became the touchstone for transparent, minimalist, high-purity goldcraft.
            </p>
          </div>
          <div className={`hidden md:block flex-1 transition-all duration-[1200ms] ease-out transform ${isHeaderVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}>
            <img src="/images/about1.jpeg" alt="About DOMINO Heritage" className="w-full object-cover shadow-2xl border border-[#0E332E]/10 p-2 bg-[#F9F6F0]" style={{ aspectRatio: '4/3' }} />
          </div>
        </div>

        {/* Split Section */}
        <div ref={sectionRef} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 overflow-hidden py-10">
          
          <div className={`space-y-6 order-2 md:order-2 pl-0 md:pl-8 transition-all duration-[1200ms] ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}>
            <h4 className="font-bold tracking-[0.2em] text-[#8A7043] text-[10px] uppercase mb-4">Chapter I — 1921</h4>
            <h2 className="font-heading text-4xl text-[#0E332E] mb-6">The Sacred Metallurgy</h2>
            <div className="space-y-6 text-[#0E332E]/70 text-sm leading-relaxed">
              <p>
                Our story began as a small metallurgical workshop in Milan. Founded by Tommaso Dom Ino, the shop was built on a simple, stubborn code: metal must never be lied about, watered down, or hidden behind heavy ornamentation. He believed gold is a living, breathing artifact that speaks best when polished into simple, architectural forms.
              </p>
              <p>
                While other jewelers used heavy baroque filigree to conceal alloy flaws, Tommaso exposed every line, celebrating structural honesty and certified purity.
              </p>
            </div>
          </div>

          <div className={`bg-black shadow-2xl relative overflow-hidden flex items-center justify-center border border-[#0E332E]/5 p-2 order-1 md:order-1 transition-all duration-[1200ms] ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'}`} style={{ aspectRatio: '4/3' }}>
            <img 
              src="/images/Scared Metallurgy.avif" 
              alt="Sacred Metallurgy" 
              className="w-full h-full object-contain"
            />
          </div>

        </div>

        {/* Timeline Section */}
        <div className="mb-32 max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl text-[#0E332E] text-center mb-20">The Century of Minimalist Devotion</h2>
          
          <div className="relative border-l border-[#E5DFD3] ml-4 md:ml-12 pl-12 space-y-20">
            
            {/* 1921 */}
            <div className="relative">
              <div className="absolute -left-[54px] top-1 w-3 h-3 bg-[#8A7043] rounded-full ring-4 ring-[#F9F6F0]"></div>
              <h4 className="font-heading text-2xl text-[#8A7043] mb-2">1921</h4>
              <h5 className="font-bold text-[#0E332E] text-sm tracking-wide mb-3">The Tommaso Workshop</h5>
              <p className="text-sm text-[#0E332E]/60 leading-relaxed">
                Founding of the first metallurgy crucible, casting certified pure-alloy bands for the region's prominent artisans.
              </p>
            </div>

            {/* 1968 */}
            <div className="relative">
              <div className="absolute -left-[54px] top-1 w-3 h-3 bg-[#8A7043] rounded-full ring-4 ring-[#F9F6F0]"></div>
              <h4 className="font-heading text-2xl text-[#8A7043] mb-2">1968</h4>
              <h5 className="font-bold text-[#0E332E] text-sm tracking-wide mb-3">The Dawn of Heritage Minimalism</h5>
              <p className="text-sm text-[#0E332E]/60 leading-relaxed">
                Tommaso's granddaughter, Luisa Dom Ino, launches the modern collection, merging high-key geometry with ancestral gold smelting standards.
              </p>
            </div>

            {/* 2021 */}
            <div className="relative">
              <div className="absolute -left-[54px] top-1 w-3 h-3 bg-[#8A7043] rounded-full ring-4 ring-[#F9F6F0]"></div>
              <h4 className="font-heading text-2xl text-[#8A7043] mb-2">2021</h4>
              <h5 className="font-bold text-[#0E332E] text-sm tracking-wide mb-3">The Radical Transparency Pledge</h5>
              <p className="text-sm text-[#0E332E]/60 leading-relaxed">
                DOM INO declares full audit protocols: making every invoice of recycled material, labor breakdown, and mining provenance completely public.
              </p>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-16 border-t border-[#E5DFD3] max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl text-[#0E332E] mb-6">Discover the Historic Archives</h2>
          <p className="text-sm text-[#0E332E]/60 leading-relaxed mb-10 px-6">
            Explore our collection of hand-finished, high-purity gold and gemstone jewelry. Each piece carries an indelible laser seal indicating its provenance and serial number.
          </p>
          <Link href="/shop" className="inline-block bg-[#0E332E] text-white px-12 py-5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#8A7043] transition-colors shadow-xl">
            Discover Our Archive
          </Link>
        </div>

      </div>
    </div>
  );
}
