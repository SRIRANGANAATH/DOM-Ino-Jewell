"use client";
import { ArrowLeft, Hammer, Leaf, ShieldCheck, Gem, Heart, Droplets, Diamond, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function AboutPage() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 100);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
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
    <div className="min-h-screen bg-[#FAF7F2] pb-24 pt-4 overflow-hidden text-[#233746]">
      <div className="w-full px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16 pt-8">
          <div className={`flex-1 text-center md:text-left max-w-2xl mx-auto md:mx-0 transition-all duration-[1200ms] ease-out transform ${isHeaderVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'}`}>
            <h3 className="font-bold tracking-[0.2em] text-[#C8A46B] text-[10px] uppercase mb-6">Our Heritage</h3>
            <h1 className="font-heading text-5xl md:text-6xl text-[#233746] mb-6 leading-tight">A Legacy of Radical<br className="hidden md:block"/>Integrity</h1>
            <p className="text-sm text-[#233746]/80 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
              How a family-run metallurgy atelier in Northern Italy became the touchstone for transparent, minimalist, high-purity goldcraft.
            </p>
          </div>
          <div className={`hidden md:block flex-1 transition-all duration-[1200ms] ease-out transform ${isHeaderVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}>
            <img src="/images/about1.jpeg" alt="About DOMINO Heritage" className="w-full object-cover shadow-2xl border border-[#233746]/10 p-2 bg-[#FAF7F2]" style={{ aspectRatio: '4/3' }} />
          </div>
        </div>

        {/* Split Section */}
        <div ref={sectionRef} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 py-10">
          <div className={`space-y-6 order-2 md:order-2 pl-0 md:pl-8 transition-all duration-[1200ms] ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}>
            <h4 className="font-bold tracking-[0.2em] text-[#C8A46B] text-[10px] uppercase mb-4">Chapter I — 1921</h4>
            <h2 className="font-heading text-4xl text-[#233746] mb-6">The Sacred Metallurgy</h2>
            <div className="space-y-6 text-[#233746]/80 text-sm leading-relaxed">
              <p>
                Our story began as a small metallurgical workshop in Milan. Founded by Tommaso Dom Ino, the shop was built on a simple, stubborn code: metal must never be lied about, watered down, or hidden behind heavy ornamentation. He believed gold is a living, breathing artifact that speaks best when polished into simple, architectural forms.
              </p>
              <p>
                While other jewelers used heavy baroque filigree to conceal alloy flaws, Tommaso exposed every line, celebrating structural honesty and certified purity.
              </p>
            </div>
          </div>
          <div className={`bg-black shadow-2xl relative overflow-hidden flex items-center justify-center border border-[#233746]/5 p-2 order-1 md:order-1 transition-all duration-[1200ms] ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'}`} style={{ aspectRatio: '4/3' }}>
            <img src="/images/Scared Metallurgy.avif" alt="Sacred Metallurgy" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* The Century of Minimalist Devotion Section */}
        <div className="mb-24 relative pt-12">
          
          <h2 className="font-heading text-4xl md:text-5xl text-[#233746] text-center mb-6">The Century of Minimalist Devotion</h2>
          <div className="flex items-center justify-center gap-4 mb-20 text-[#233746]/70 text-sm font-medium">
            <span>A legacy of purity, precision, and purpose — crafted across generations.</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
            
            {/* Left Column: Our Heritage */}
            <div className="lg:col-span-3 space-y-6 mt-2">
              <h4 className="font-bold tracking-[0.2em] text-[#C8A46B] text-xs uppercase">Our Heritage</h4>
              <h3 className="font-heading text-[28px] text-[#233746] leading-tight mb-4">Crafted by Time,<br/><i className="font-serif italic font-light">Perfected</i> by Trust.</h3>
              
              <hr className="w-12 border-[#C8A46B] opacity-50 my-6" />

              <p className="text-[#233746]/80 text-sm leading-loose max-w-[280px]">
                From a humble workshop to a modern symbol of transparency and artistry — our journey is rooted in values that never fade.
              </p>
              <div className="pt-4 text-center opacity-90 max-w-[220px] mx-auto lg:mx-0">
                 {/* Sketch simulation placeholder */}
                 <div className="w-full h-40 bg-gradient-to-t from-[#FAF7F2] to-[#E5DFD3] rounded-[24px] mb-4 relative overflow-hidden border border-[#233746]/5">
                    <img src="/images/about1.jpeg" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40 grayscale sepia-[.3]" />
                 </div>
                 <span className="font-heading text-3xl text-[#C8A46B] block mb-1">Dom Ino</span>
                 <span className="text-[10px] font-bold tracking-[0.2em] text-[#233746]/60 uppercase">Since 1921</span>
              </div>
            </div>

            {/* Middle Column: Timeline */}
            <div className="lg:col-span-6 relative">
              {/* Thicker, more prominent timeline line */}
              <div className="absolute left-[5.5rem] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#FAF7F2] via-[#C8A46B]/40 to-[#FAF7F2]"></div>
              
              <div className="space-y-12 py-2">
                
                {/* 1921 */}
                <div className="relative flex items-start gap-8 group">
                  <div className="w-[4.5rem] shrink-0 text-right pt-2.5 z-10">
                    <span className="font-heading text-3xl font-semibold text-[#233746] transition-colors duration-500 group-hover:text-[#C8A46B]">1921</span>
                  </div>
                  {/* Glowing Milestone Circle */}
                  <div className="absolute left-[5.5rem] -translate-x-1/2 top-4 w-4 h-4 bg-[#C8A46B] rounded-full ring-4 ring-[#FAF7F2] shadow-[0_0_12px_rgba(200,164,107,0.6)] z-10 transition-transform duration-500 group-hover:scale-125"></div>
                  
                  <div className="flex-1 flex flex-col sm:flex-row gap-6 bg-white p-5 rounded-[24px] shadow-xl shadow-[#C8A46B]/5 border border-[#C8A46B]/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#C8A46B]/60 group-hover:shadow-2xl group-hover:shadow-[#C8A46B]/10">
                     <div className="flex-1 space-y-3 pt-1">
                       <h5 className="font-bold text-[#233746] text-lg font-heading tracking-wide">The Tommaso Workshop</h5>
                       <p className="text-[13px] text-[#233746]/70 leading-relaxed font-medium">
                         Founding of the first metallurgy crucible, casting certified pure-alloy bands for the region's prominent artisans.
                       </p>
                       <div className="inline-flex items-center gap-2 bg-[#FAF7F2] text-[#C8A46B] px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mt-2 border border-[#C8A46B]/20">
                         <Hammer size={14} /> Foundation of Craftsmanship
                       </div>
                     </div>
                     <div className="w-full sm:w-[140px] shrink-0 overflow-hidden rounded-xl border border-[#233746]/5 bg-[#FAF7F2]">
                        <img src="/images/person.jpg" className="w-full h-32 sm:h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105 sepia-[.15] contrast-[1.05]" /> 
                     </div>
                  </div>
                </div>

                {/* 1968 */}
                <div className="relative flex items-start gap-8 group">
                  <div className="w-[4.5rem] shrink-0 text-right pt-2.5 z-10">
                    <span className="font-heading text-3xl font-semibold text-[#233746] transition-colors duration-500 group-hover:text-[#C8A46B]">1968</span>
                  </div>
                  <div className="absolute left-[5.5rem] -translate-x-1/2 top-4 w-4 h-4 bg-[#C8A46B] rounded-full ring-4 ring-[#FAF7F2] shadow-[0_0_12px_rgba(200,164,107,0.6)] z-10 transition-transform duration-500 group-hover:scale-125"></div>
                  
                  <div className="flex-1 flex flex-col sm:flex-row gap-6 bg-white p-5 rounded-[24px] shadow-xl shadow-[#C8A46B]/5 border border-[#C8A46B]/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#C8A46B]/60 group-hover:shadow-2xl group-hover:shadow-[#C8A46B]/10">
                     <div className="flex-1 space-y-3 pt-1">
                       <h5 className="font-bold text-[#233746] text-lg font-heading tracking-wide">Heritage Minimalism</h5>
                       <p className="text-[13px] text-[#233746]/70 leading-relaxed font-medium">
                         Tommaso's granddaughter, Luisa Dom Ino, launches the modern collection, merging high-key geometry with ancestral gold smelting standards.
                       </p>
                       <div className="inline-flex items-center gap-2 bg-[#FAF7F2] text-[#C8A46B] px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mt-2 border border-[#C8A46B]/20">
                         <Diamond size={14} /> Tradition Meets Innovation
                       </div>
                     </div>
                     <div className="w-full sm:w-[140px] shrink-0 overflow-hidden rounded-xl border border-[#233746]/5 bg-[#FAF7F2]">
                        <img src="/images/Necklace.jpg" className="w-full h-32 sm:h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105 sepia-[.15] contrast-[1.05]" /> 
                     </div>
                  </div>
                </div>

                {/* 2021 */}
                <div className="relative flex items-start gap-8 group">
                  <div className="w-[4.5rem] shrink-0 text-right pt-2.5 z-10">
                    <span className="font-heading text-3xl font-semibold text-[#233746] transition-colors duration-500 group-hover:text-[#C8A46B]">2021</span>
                  </div>
                  <div className="absolute left-[5.5rem] -translate-x-1/2 top-4 w-4 h-4 bg-[#C8A46B] rounded-full ring-4 ring-[#FAF7F2] shadow-[0_0_12px_rgba(200,164,107,0.6)] z-10 transition-transform duration-500 group-hover:scale-125"></div>
                  
                  <div className="flex-1 flex flex-col sm:flex-row gap-6 bg-white p-5 rounded-[24px] shadow-xl shadow-[#C8A46B]/5 border border-[#C8A46B]/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#C8A46B]/60 group-hover:shadow-2xl group-hover:shadow-[#C8A46B]/10">
                     <div className="flex-1 space-y-3 pt-1">
                       <h5 className="font-bold text-[#233746] text-lg font-heading tracking-wide">Transparency Pledge</h5>
                       <p className="text-[13px] text-[#233746]/70 leading-relaxed font-medium">
                         DOM INO declares full audit protocols: making every invoice of recycled material, labor breakdown, and mining provenance completely public.
                       </p>
                       <div className="inline-flex items-center gap-2 bg-[#FAF7F2] text-[#C8A46B] px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mt-2 border border-[#C8A46B]/20">
                         <ShieldCheck size={14} /> Built on Ethics, Driven by Trust
                       </div>
                     </div>
                     <div className="w-full sm:w-[140px] shrink-0 overflow-hidden rounded-xl border border-[#233746]/5 bg-[#FAF7F2]">
                        <img src="/images/Scared Metallurgy.avif" className="w-full h-32 sm:h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105 sepia-[.15] contrast-[1.05]" /> 
                     </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Our Promise */}
            <div className="lg:col-span-3 space-y-10 lg:pl-4 mt-2">
              <h4 className="font-bold tracking-[0.2em] text-[#C8A46B] text-xs uppercase">Our Promise</h4>
              
              <blockquote className="font-heading text-2xl text-[#233746] leading-relaxed relative pl-4 border-l-2 border-[#C8A46B]/30">
                <i className="font-serif italic font-light tracking-wide text-[26px]">"Jewelry is not just an ornament. It's a story of craft, culture, and commitment."</i>
              </blockquote>
              
              <div className="space-y-8 pt-8 border-t border-[#233746]/10">
                <div className="flex items-center gap-5 text-[#233746]/90 group">
                  <div className="p-2.5 rounded-full bg-white shadow-sm border border-[#C8A46B]/20 text-[#C8A46B] group-hover:bg-[#C8A46B] group-hover:text-white transition-colors duration-300">
                    <Leaf size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] font-medium tracking-wide leading-tight">Sustainable<br/>Materials</span>
                </div>
                <div className="flex items-center gap-5 text-[#233746]/90 group">
                  <div className="p-2.5 rounded-full bg-white shadow-sm border border-[#C8A46B]/20 text-[#C8A46B] group-hover:bg-[#C8A46B] group-hover:text-white transition-colors duration-300">
                    <ShieldCheck size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] font-medium tracking-wide leading-tight">Ethical<br/>Craftsmanship</span>
                </div>
                <div className="flex items-center gap-5 text-[#233746]/90 group">
                  <div className="p-2.5 rounded-full bg-white shadow-sm border border-[#C8A46B]/20 text-[#C8A46B] group-hover:bg-[#C8A46B] group-hover:text-white transition-colors duration-300">
                    <Gem size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] font-medium tracking-wide leading-tight">Timeless<br/>Minimalism</span>
                </div>
                <div className="flex items-center gap-5 text-[#233746]/90 group">
                  <div className="p-2.5 rounded-full bg-white shadow-sm border border-[#C8A46B]/20 text-[#C8A46B] group-hover:bg-[#C8A46B] group-hover:text-white transition-colors duration-300">
                    <Heart size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] font-medium tracking-wide leading-tight">For Generations,<br/>Not Just Moments</span>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-center mt-20 mb-8">
             <Link href="/shop" className="inline-flex items-center gap-3 bg-[#233746] text-[#FAF7F2] px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#C8A46B] hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-[#C8A46B]/10 rounded-sm">
               Explore Our Craftsmanship <ArrowRight size={16} />
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
