"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, Info, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNavbar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'HOME', path: '/', icon: Home },
    { name: 'SHOP', path: '/shop', icon: Store },
    { name: 'ABOUT', path: '/about', icon: Info },
    { name: 'WISHLIST', path: '/wishlist', icon: Heart },
    { name: 'ACCOUNT', path: '/account', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-[#F9F6F0]/85 backdrop-blur-xl border-t border-[#0E332E]/10 z-50 pb-safe">
      <div className="flex justify-around items-center py-3 max-w-7xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.path} className={`flex flex-col items-center gap-1 relative w-16 transition-colors duration-300 ${isActive ? 'text-[#8A7043]' : 'text-[#0E332E]/60 hover:text-[#0E332E]'}`}>
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-active"
                  className="absolute -top-3 left-[15%] right-[15%] h-[3px] bg-[#8A7043] rounded-b-full" 
                />
              )}
              <Icon size={22} className={isActive ? "fill-[#8A7043]/10" : ""} />
              <span className="text-[0.65rem] font-bold tracking-wider">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
