"use client";
import { useEffect, useRef } from "react";

function VerticalWheel({ 
  value, 
  onChange, 
  max = 9 
}: { 
  value: number, 
  onChange: (val: number) => void,
  max?: number
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: max + 1 }, (_, i) => i);
  const itemHeight = 40; // Exactly 40px per item so 3 items = 120px height

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    if (index !== value && index >= 0 && index <= max) {
      onChange(index);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const targetScroll = value * itemHeight;
      if (Math.abs(scrollRef.current.scrollTop - targetScroll) > itemHeight / 2) {
        scrollRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  }, [value]);

  return (
    <div 
      className="h-[120px] overflow-y-auto snap-y snap-mandatory flex flex-col relative z-10 w-12 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {/* Spacer to center the first and last item */}
      <div style={{ minHeight: `${itemHeight}px` }} className="shrink-0"></div>
      
      {items.map((num) => (
        <div 
          key={num} 
          className="snap-center shrink-0 flex justify-center items-center cursor-pointer select-none"
          style={{ height: `${itemHeight}px` }}
          onClick={() => {
            onChange(num);
            scrollRef.current?.scrollTo({ top: num * itemHeight, behavior: 'smooth' });
          }}
        >
          <div className={`text-2xl font-heading transition-all duration-300 ${num === value ? 'text-[#8A7043] scale-110 font-bold' : 'text-[#0E332E]/30 scale-90'}`}>
            {num}
          </div>
        </div>
      ))}
      
      <div style={{ minHeight: `${itemHeight}px` }} className="shrink-0"></div>
    </div>
  );
}

export default function WheelPicker({ 
  value, 
  onChange, 
  min = 5, 
  max = 50 
}: { 
  value: number, 
  onChange: (val: number) => void,
  min?: number,
  max?: number
}) {
  // Split the exact current value into tens and units
  const tens = Math.floor(value / 10);
  const units = value % 10;

  const handleTensChange = (newTens: number) => {
    let newValue = newTens * 10 + units;
    // Enforce min/max boundaries smoothly
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;
    onChange(newValue);
  };

  const handleUnitsChange = (newUnits: number) => {
    let newValue = tens * 10 + newUnits;
    // Enforce min/max boundaries smoothly
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;
    onChange(newValue);
  };

  return (
    <div className="relative flex justify-center items-center bg-white rounded-xl shadow-inner border border-[#0E332E]/10 h-[120px] w-20 overflow-hidden">
      
      {/* Center highlight block (the selected middle row) */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[40px] bg-[#8A7043]/5 border-y border-[#8A7043]/20 pointer-events-none"></div>

      <div className="flex gap-1 relative z-10">
        <VerticalWheel value={tens} onChange={handleTensChange} max={Math.floor(max / 10)} />
        <VerticalWheel value={units} onChange={handleUnitsChange} max={9} />
      </div>

      {/* Fade Gradients for top and bottom to create a cylindrical 3D slot-machine illusion */}
      <div className="absolute left-0 right-0 top-0 h-[40px] bg-gradient-to-b from-white to-transparent pointer-events-none z-20"></div>
      <div className="absolute left-0 right-0 bottom-0 h-[40px] bg-gradient-to-t from-white to-transparent pointer-events-none z-20"></div>
    </div>
  );
}
