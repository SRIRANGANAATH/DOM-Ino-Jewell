"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/picture/home/hero/slide1.png",
    subLabel: "CRAFTING RADICAL PURITY",
    headline: "The Lustre Series.",
    bodyText:
      "Hand-selected South Sea pearls paired with intricate pave diamond florals, presented in bespoke artisanal casing.",
    primaryCta: "Explore The Collection",
    primaryLink: "/shop",
    secondaryCta: "Inquire for Bespoke",
    secondaryLink: "/contact",
    layout: "slide1",
  },
  {
    id: 2,
    image: "/picture/home/hero/slide2.jpg",
    subLabel: "ICONIC INTERLOCKING DESIGN",
    headline: "The Trinity Unity Ring.",
    bodyText:
      "Three bands of hallmark-certified gold, intertwined to symbolize timeless endurance and architectural purity.",
    primaryCta: "Discover the Ring",
    primaryLink: "/shop",
    layout: "slide2",
  },
  {
    id: 3,
    image: "/picture/home/hero/slide3.jpg",
    subLabel: "ELEMENTAL ARCHITECTURE",
    headline: "Fluidity in 22K Gold.",
    bodyText:
      "We strip away the superfluous, transforming pure elemental gold into timeless, wearable sculptures.",
    primaryCta: "Explore Our Philosophy",
    primaryLink: "/about",
    secondaryCta: "View All Pieces",
    secondaryLink: "/shop",
    layout: "slide3",
  },
  {
    id: 4,
    image: "/picture/home/hero/slide4.jpg",
    subLabel: "THE DOMINO LOOKBOOK",
    headline: "Curated Elegance.",
    bodyText:
      "Layered chains, baroque pearls, and statement signets styled for modern intimacy.",
    primaryCta: "Shop the Lookbook",
    primaryLink: "/shop",
    secondaryCta: "Book a Private Viewing",
    secondaryLink: "/account/appointments",
    layout: "slide4",
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 60 }, [
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const renderSlideContent = (slide: typeof slides[0], index: number) => {
    const isActive = index === selectedIndex;

    const contentAnimation: any = {
      initial: { opacity: 0, y: 20 },
      animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
      transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
    };

    switch (slide.layout) {
      case "slide1":
        return (
          <div className="relative w-full h-full flex items-end sm:items-center justify-start p-6 sm:p-16 lg:p-24 pb-24">
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent pointer-events-none" />
            <motion.div
              {...contentAnimation}
              className="relative z-10 max-w-xl text-left"
            >
              <h3 className="text-[#D4AF37] tracking-widest uppercase text-xs font-bold mb-4">
                {slide.subLabel}
              </h3>
              <h2
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-[#FAF8F5]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {slide.headline}
              </h2>
              <p className="text-[#FAF8F5] text-sm md:text-base mb-8 max-w-md leading-relaxed font-light">
                {slide.bodyText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={slide.primaryLink}
                  className="bg-[#11312B] text-[#FAF8F5] px-8 py-4 uppercase text-xs tracking-widest font-bold hover:bg-[#0E332E] transition-colors text-center"
                >
                  {slide.primaryCta}
                </Link>
                {slide.secondaryCta && slide.secondaryLink && (
                  <Link
                    href={slide.secondaryLink}
                    className="border border-[#FAF8F5] text-[#FAF8F5] px-8 py-4 uppercase text-xs tracking-widest font-bold hover:bg-white/10 transition-colors text-center"
                  >
                    {slide.secondaryCta}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        );
      case "slide2":
        return (
          <div className="relative w-full h-full flex items-end sm:items-center justify-end p-6 sm:p-16 lg:p-24 pb-24 bg-[#FAF8F5]/40">
            <motion.div
              {...contentAnimation}
              className="relative z-10 max-w-lg text-right sm:text-left sm:ml-auto"
            >
              <h3 className="text-[#D4AF37] tracking-widest uppercase text-xs font-bold mb-4">
                {slide.subLabel}
              </h3>
              <h2
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-[#11312B]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {slide.headline}
              </h2>
              <p className="text-[#11312B] text-sm md:text-base mb-8 max-w-md leading-relaxed font-medium sm:ml-auto">
                {slide.bodyText}
              </p>
              <Link
                href={slide.primaryLink}
                className="inline-block bg-[#11312B] text-[#FAF8F5] px-8 py-4 uppercase text-xs tracking-widest font-bold hover:bg-[#0E332E] transition-colors"
              >
                {slide.primaryCta}
              </Link>
            </motion.div>
          </div>
        );
      case "slide3":
        return (
          <div className="relative w-full h-full flex items-center justify-start p-6 sm:p-16 lg:p-24">
            <motion.div
              {...contentAnimation}
              className="relative z-10 max-w-xl text-left bg-[#FAF8F5]/80 sm:bg-transparent p-6 sm:p-0 backdrop-blur-sm sm:backdrop-blur-none"
            >
              <h3 className="text-[#11312B] tracking-widest uppercase text-xs font-bold mb-4">
                {slide.subLabel}
              </h3>
              <h2
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-[#11312B]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {slide.headline}
              </h2>
              <p className="text-[#11312B] text-sm md:text-base mb-8 max-w-md leading-relaxed font-medium">
                {slide.bodyText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={slide.primaryLink}
                  className="bg-[#11312B] text-[#FAF8F5] px-8 py-4 uppercase text-xs tracking-widest font-bold hover:bg-[#0E332E] transition-colors text-center"
                >
                  {slide.primaryCta}
                </Link>
                {slide.secondaryCta && slide.secondaryLink && (
                  <Link
                    href={slide.secondaryLink}
                    className="border border-[#11312B] text-[#11312B] px-8 py-4 uppercase text-xs tracking-widest font-bold hover:bg-black/5 transition-colors text-center"
                  >
                    {slide.secondaryCta}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        );
      case "slide4":
        return (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <motion.div
              {...contentAnimation}
              className="absolute inset-0 m-auto flex flex-col justify-center items-center bg-[#11312B] text-[#FAF8F5] p-6 sm:p-10 max-w-sm sm:max-w-md border border-[#D4AF37]/30 shadow-2xl h-fit text-center z-10"
            >
              <h3 className="text-[#D4AF37] tracking-widest uppercase text-xs font-bold mb-4">
                {slide.subLabel}
              </h3>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {slide.headline}
              </h2>
              <p className="text-sm mb-8 leading-relaxed font-light text-[#FAF8F5]/90">
                {slide.bodyText}
              </p>
              <div className="flex flex-col gap-3 w-full">
                <Link
                  href={slide.primaryLink}
                  className="bg-[#FAF8F5] text-[#11312B] px-6 py-4 uppercase text-xs tracking-widest font-bold hover:bg-white transition-colors w-full"
                >
                  {slide.primaryCta}
                </Link>
                {slide.secondaryCta && slide.secondaryLink && (
                  <Link
                    href={slide.secondaryLink}
                    className="border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-4 uppercase text-xs tracking-widest font-bold hover:bg-[#D4AF37]/10 transition-colors w-full"
                  >
                    {slide.secondaryCta}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] min-h-[600px] overflow-hidden bg-[#FAF8F5]">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0 h-full"
            >
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority={index === 0}
                className={
                  slide.layout === "slide2"
                    ? "object-cover sm:object-contain sm:object-left"
                    : "object-cover"
                }
              />
              {renderSlideContent(slide, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-8 z-20 pointer-events-none">
        {/* Progress Bar */}
        <div className="flex gap-2 pointer-events-auto">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="h-12 flex items-center group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-0.5 transition-all duration-500 ease-in-out ${
                  index === selectedIndex
                    ? "w-12 bg-[#D4AF37]"
                    : "w-6 bg-[#11312B]/40 group-hover:bg-[#11312B]/80 group-hover:w-8"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-4 pointer-events-auto">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 flex items-center justify-center text-[#11312B] hover:text-[#D4AF37] transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
          <button
            onClick={scrollNext}
            className="w-12 h-12 flex items-center justify-center text-[#11312B] hover:text-[#D4AF37] transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
}
