"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, Info, Heart, User } from 'lucide-react';

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
    <nav className="md:hidden fixed bottom-0 w-full bg-[#F9F6F0] border-t border-black/5 z-50">
      <div className="flex justify-around items-center py-2 max-w-7xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.path} className={`flex flex-col items-center gap-1 relative w-16 ${isActive ? 'text-[#0E332E]' : 'text-[#4A5568]'}`}>
              {isActive && (
                <div className="absolute -top-2 left-[10%] right-[10%] h-[2px] bg-[#C59E3F]" />
              )}
              <Icon size={24} />
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
