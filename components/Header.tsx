"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, LogIn, UserPlus, User, X, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('auth_token'));
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'ABOUT', path: '/about' },
    { name: 'WISHLIST', path: '/wishlist' },
    { name: 'ACCOUNT', path: '/account' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#F9F6F0]/90 backdrop-blur-xl shadow-md py-0' : 'bg-[#F9F6F0]/95 backdrop-blur-md shadow-sm py-1'} flex flex-col`}>
      <div className="w-full px-4 md:px-12 lg:px-16 flex justify-between items-center h-[85px]">

        {/* Left Side: Tagline */}
        <div className="flex-1 flex justify-center items-center overflow-hidden pr-2">
          <span className="text-[10px] sm:text-[12px] md:text-[15px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8A7043] via-[#b89a5e] to-[#0E332E] italic font-serif tracking-wider md:tracking-widest whitespace-nowrap">
            Crafting Radical Purity.
          </span>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="flex items-center gap-1 md:gap-1.5 flex-shrink-0 text-center px-1 md:px-2 hover:opacity-80 transition-opacity">
          <span className="font-heading text-2xl md:text-4xl font-bold tracking-[0.1em] md:tracking-[0.15em] text-[#8A7043]">DOM</span>
          <img src="/images/logo3.png" alt="Domino Logo" className="h-8 md:h-12 w-auto object-contain translate-y-[2px]" />
          <span className="font-heading text-2xl md:text-4xl font-bold tracking-[0.1em] md:tracking-[0.15em] text-[#8A7043]">INO</span>
        </Link>

        {/* Right Side: Search & Login */}
        <div className="flex gap-6 lg:gap-10 items-center flex-1 justify-end pl-2">

          {/* Spinning Coin */}
          <div className="hidden sm:block w-9 h-9 md:w-12 md:h-12 relative shrink-0" style={{ perspective: '1000px' }}>
            <div className="w-full h-full animate-spin-slow-3d relative" style={{ transformStyle: 'preserve-3d' }}>
              <img src="/picture/shop/gold coin.jpg" alt="Gold Coin Front" className="absolute w-full h-full rounded-full object-cover" style={{ backfaceVisibility: 'hidden' }} />
              <img src="/picture/shop/gold 2.jpg" alt="Gold Coin Back" className="absolute w-full h-full rounded-full object-cover" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
            </div>
          </div>

          {/* Search Bar / Icon */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="absolute right-8 top-1/2 -translate-y-1/2 bg-white shadow-xl border border-[#0E332E]/10 rounded-lg overflow-hidden flex flex-col w-[300px]"
                >
                  <form onSubmit={handleSearch} className="flex items-center px-3 py-2 border-b border-[#0E332E]/10">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search collections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-sm px-2 py-1 text-[#0E332E] placeholder:text-[#0E332E]/40 font-medium"
                    />
                  </form>
                  <div className="p-2 bg-[#FAF8F5]">
                    <p className="text-[10px] uppercase tracking-widest text-[#8A7043] font-bold mb-2 px-2 flex items-center gap-1"><TrendingUp size={12}/> Trending Suggestions</p>
                    <ul className="text-xs font-medium text-[#4A5568] flex flex-col">
                      <li className="px-2 py-1.5 hover:bg-white hover:text-[#0B2B26] cursor-pointer transition-colors rounded">22K Gold Chains</li>
                      <li className="px-2 py-1.5 hover:bg-white hover:text-[#0B2B26] cursor-pointer transition-colors rounded">Bridal Sets</li>
                      <li className="px-2 py-1.5 hover:bg-white hover:text-[#0B2B26] cursor-pointer transition-colors rounded">Diamond Studs</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="text-[#0E332E]/80 hover:text-[#8A7043] transition-colors relative z-10 p-1"
            >
              {isSearchOpen ? <X size={22} /> : <Search size={22} />}
            </button>
          </div>

          {/* Auth */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/login" className="group flex items-center gap-1.5 text-[#0E332E]/80 hover:text-[#8A7043] transition-colors whitespace-nowrap">
                <LogIn size={20} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden sm:inline-block text-xs lg:text-sm font-semibold tracking-wider uppercase">Login</span>
              </Link>
              <Link href="/login?tab=signup" className="hidden md:flex items-center gap-1.5 text-xs lg:text-sm font-semibold tracking-wider uppercase text-white bg-[#0E332E] px-4 py-2 hover:bg-[#8A7043] transition-colors shadow-sm">
                <UserPlus size={16} />
                Sign Up
              </Link>
            </div>
          ) : (
            <Link href="/admin" className="group flex items-center gap-2 text-[#0E332E]/80 hover:text-[#8A7043] transition-colors whitespace-nowrap" title="Go to Admin Dashboard">
              <div className="w-8 h-8 rounded-full bg-[#8A7043] text-white flex items-center justify-center font-bold text-xs shadow-md group-hover:scale-105 transition-transform">
                <User size={16} />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Row: Navigation */}
      <div className="w-full px-6 md:px-12 lg:px-16 pb-4 hidden md:flex justify-start border-t border-[#0E332E]/5 pt-4 mt-2">
        <nav className="flex gap-6 lg:gap-12 items-center overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`group relative text-[11px] lg:text-[13px] uppercase tracking-[0.2em] font-bold transition-all duration-300 whitespace-nowrap py-1
                ${pathname === item.path ? 'text-[#8A7043]' : 'text-[#0E332E]/70 hover:text-[#0E332E]'}
              `}
            >
              {item.name}
              <span className={`absolute left-0 bottom-0 w-full h-[1.5px] bg-[#8A7043] transition-transform duration-500 ease-out origin-left 
                ${pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
              `}></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
