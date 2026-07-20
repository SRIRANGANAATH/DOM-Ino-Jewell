"use client";

import { useEffect, useRef } from "react";

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      // Use parent dimensions or window
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      gravity: number;
      rotation: number;
      rotationSpeed: number;

      constructor(startX: number, startY: number) {
        this.x = startX;
        this.y = startY;
        this.size = Math.random() * 4 + 2; // Noticeable confetti size
        
        // Explosive outward and upward velocity
        const angle = (Math.random() * Math.PI) / 1.5 + Math.PI / 6; // Spread angle
        const velocity = Math.random() * 15 + 10;
        
        this.speedX = Math.cos(angle) * velocity * (Math.random() > 0.5 ? 1 : -1);
        this.speedY = -Math.sin(angle) * velocity;
        
        this.opacity = 1;
        this.gravity = 0.3; // Gravity pulling it down
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Apply gravity and air resistance (friction)
        this.speedY += this.gravity;
        this.speedX *= 0.98;
        this.speedY *= 0.98;
        
        this.rotation += this.rotationSpeed;

        // Fade out slowly after it starts falling
        if (this.speedY > 0) {
          this.opacity -= 0.005;
        }
      }

      draw() {
        if (!ctx || this.opacity <= 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        
        // Gold / bronze confetti colors
        const colors = [
          `rgba(197, 158, 63, ${this.opacity})`, // Gold
          `rgba(224, 192, 115, ${this.opacity})`, // Light Gold
          `rgba(138, 112, 67, ${this.opacity})`, // Bronze
        ];
        
        ctx.fillStyle = colors[Math.floor(this.x % colors.length)];
        
        // Draw small rectangles (confetti)
        ctx.fillRect(-this.size, -this.size / 2, this.size * 2, this.size);
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      if (!canvas) return;
      // Spawn from the bottom center of the hero section
      const startX = canvas.width / 2;
      const startY = canvas.height;
      
      const numParticles = 150; // Big explosion
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(startX, startY));
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let activeParticles = 0;
      for (const p of particles) {
        p.update();
        p.draw();
        if (p.opacity > 0 && p.y < canvas.height + 100) {
          activeParticles++;
        }
      }
      
      // Stop animating when all particles have faded or fallen out of bounds
      if (activeParticles > 0) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("resize", resize);
    resize();
    initParticles(); // Trigger exactly once on mount
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 15 }} // Make sure it renders above everything
      aria-hidden="true"
    />
  );
}
