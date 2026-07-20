"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, LogIn, UserPlus, User, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('auth_token'));
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
    <header className="sticky top-0 z-50 bg-[#F9F6F0]/95 backdrop-blur-md border-b border-[#0E332E]/10 shadow-sm flex flex-col">
      <div className="w-full px-6 md:px-12 lg:px-16 flex justify-between items-center h-[85px]">

        {/* Left Side: Tagline Only */}
        <div className="flex-1 flex justify-start items-center overflow-hidden pr-2">
          <span className="hidden lg:block text-[13px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8A7043] via-[#b89a5e] to-[#0E332E] italic font-serif tracking-widest whitespace-nowrap">
            Crafting Radical Purity.
          </span>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="flex items-center gap-1.5 flex-shrink-0 text-center px-2 hover:opacity-80 transition-opacity">
          <span className="font-heading text-3xl md:text-4xl font-bold tracking-[0.15em] text-[#8A7043]">DOM</span>
          <img src="/images/logo3.png" alt="Domino Logo" className="h-10 md:h-12 w-auto object-contain translate-y-[2px]" />
          <span className="font-heading text-3xl md:text-4xl font-bold tracking-[0.15em] text-[#8A7043]">INO</span>
        </Link>

        {/* Right Side: Search & Login */}
        <div className="flex gap-6 lg:gap-10 items-center flex-1 justify-end pl-2">

          {/* Search Bar / Icon */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center animate-in slide-in-from-right-4 fade-in duration-300">
                <input
                  type="text"
                  autoFocus
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-32 md:w-48 lg:w-64 border-b-2 border-[#8A7043] bg-transparent outline-none text-sm px-2 py-1 text-[#0E332E] placeholder:text-[#0E332E]/40 font-medium transition-all"
                />
                <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-3 text-[#0E332E]/70 hover:text-[#8A7043] transition-colors">
                  <X size={22} />
                </button>
              </form>
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="text-[#0E332E]/80 hover:text-[#8A7043] transition-colors">
                <Search size={22} />
              </button>
            )}
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
