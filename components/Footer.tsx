import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#11312B] text-[#FAF8F5] pt-20 pb-10 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="font-heading text-3xl tracking-wide text-[#D4AF37]">DOM INO</h2>
            <p className="text-[#FAF8F5]/70 text-sm leading-relaxed max-w-sm">
              Heritage minimalism and pure craftsmanship in every creation. A legacy of radical integrity since 1921.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-[#FAF8F5]/20 flex items-center justify-center text-xs font-bold tracking-wider hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#11312B] transition-colors duration-300">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#FAF8F5]/20 flex items-center justify-center text-xs font-bold tracking-wider hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#11312B] transition-colors duration-300">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#FAF8F5]/20 flex items-center justify-center text-xs font-bold tracking-wider hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#11312B] transition-colors duration-300">
                X
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold tracking-[0.2em] text-[#D4AF37] text-[10px] uppercase mb-6">Collections</h3>
            <ul className="space-y-4">
              <li><Link href="/shop" className="text-sm text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors">High Jewelry</Link></li>
              <li><Link href="/shop" className="text-sm text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors">Fine Jewelry</Link></li>
              <li><Link href="/shop" className="text-sm text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors">Bridal Collection</Link></li>
              <li><Link href="/shop" className="text-sm text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors">The Heritage Archive</Link></li>
            </ul>
          </div>

          {/* Client Care */}
          <div>
            <h3 className="font-bold tracking-[0.2em] text-[#D4AF37] text-[10px] uppercase mb-6">Client Care</h3>
            <ul className="space-y-4">
              <li><Link href="/account/support" className="text-sm text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors">Contact Concierge</Link></li>
              <li><Link href="/account/appointments" className="text-sm text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors">Book an Appointment</Link></li>
              <li><Link href="/account/orders" className="text-sm text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors">Track Order</Link></li>
              <li><Link href="/about" className="text-sm text-[#FAF8F5]/80 hover:text-[#D4AF37] transition-colors">Our Promise</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="font-bold tracking-[0.2em] text-[#D4AF37] text-[10px] uppercase mb-6">The Inner Circle</h3>
            <p className="text-[#FAF8F5]/70 text-sm leading-relaxed mb-4">
              Subscribe to receive exclusive access to new collections and private events.
            </p>
            <form className="flex border-b border-[#FAF8F5]/30 pb-2 focus-within:border-[#D4AF37] transition-colors">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent w-full outline-none text-sm text-[#FAF8F5] placeholder:text-[#FAF8F5]/40"
              />
              <button type="submit" className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#FAF8F5]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FAF8F5]/50 text-xs">
            &copy; {new Date().getFullYear()} DOM INO. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[#FAF8F5]/50 text-xs hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[#FAF8F5]/50 text-xs hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
            <Link href="#" className="text-[#FAF8F5]/50 text-xs hover:text-[#D4AF37] transition-colors">Legal Mentions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
