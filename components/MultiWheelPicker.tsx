"use client";
import { useEffect, useRef } from "react";

export function VerticalWheel({ 
  value, 
  options, 
  onChange,
  widthClass = "w-16"
}: { 
  value: string | number, 
  options: {value: string | number, label: string}[],
  onChange: (val: any) => void,
  widthClass?: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemHeight = 40;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    if (index >= 0 && index < options.length) {
      if (options[index].value !== value) {
        onChange(options[index].value);
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const index = options.findIndex(o => o.value === value);
      if (index !== -1) {
        const targetScroll = index * itemHeight;
        if (Math.abs(scrollRef.current.scrollTop - targetScroll) > itemHeight / 2) {
          scrollRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }
    }
  }, [value, options]);

  return (
    <div 
      className={`h-[120px] overflow-y-auto snap-y snap-mandatory flex flex-col relative z-10 ${widthClass} [&::-webkit-scrollbar]:hidden`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <div style={{ minHeight: `${itemHeight}px` }} className="shrink-0 pointer-events-none"></div>
      
      {options.map((opt) => (
        <div 
          key={String(opt.value)} 
          className="snap-center shrink-0 flex justify-center items-center cursor-pointer select-none"
          style={{ height: `${itemHeight}px` }}
          onClick={() => {
            onChange(opt.value);
            const idx = options.findIndex(o => o.value === opt.value);
            scrollRef.current?.scrollTo({ top: idx * itemHeight, behavior: 'smooth' });
          }}
        >
          <div className={`text-2xl font-heading transition-all duration-300 ${opt.value === value ? 'text-[#8A7043] scale-110 font-bold' : 'text-[#0E332E]/30 scale-90'}`}>
            {opt.label}
          </div>
        </div>
      ))}
      
      <div style={{ minHeight: `${itemHeight}px` }} className="shrink-0 pointer-events-none"></div>
    </div>
  );
}
