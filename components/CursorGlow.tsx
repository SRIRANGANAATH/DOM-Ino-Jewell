"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  // Only render on client to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] mix-blend-screen z-[40]"
      style={{ 
        background: "radial-gradient(circle, rgba(197, 158, 63, 0.15) 0%, rgba(197, 158, 63, 0) 70%)"
      }}
      animate={{
        x: mousePosition.x - 250,
        y: mousePosition.y - 250,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 25,
        mass: 0.5,
      }}
    />
  );
}
