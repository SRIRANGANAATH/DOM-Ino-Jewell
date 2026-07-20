"use client";

import { useState } from 'react';
import { Search, ChevronLeft, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  product: {
    name: string;
    description: string;
    purity: string;
    quantity: number;
    image: string;
  };
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'DOM-82910',
    date: '15 Oct 2026',
    total: 164000,
    status: 'Processing',
    product: {
      name: 'Aurelia Gold Necklace',
      description: 'Hand-cast heritage collection piece with intricate detailing.',
      purity: '22K Gold',
      quantity: 1,
      image: '/images/account_product.jpg'
    }
  },
  {
    id: 'DOM-82744',
    date: '02 Oct 2026',
    total: 320500,
    status: 'Shipped',
    product: {
      name: 'Celeste Diamond Ring',
      description: 'Brilliant cut solitaire with platinum setting.',
      purity: 'VVS1, E Color',
      quantity: 1,
      image: '/images/person.jpg'
    }
  },
  {
    id: 'DOM-81992',
    date: '12 Sep 2026',
    total: 85000,
    status: 'Delivered',
    product: {
      name: 'Heritage Bangle',
      description: 'Solid gold classic bangle, minimalist design.',
      purity: '24K Gold',
      quantity: 2,
      image: '/images/account_product.jpg'
    }
  },
  {
    id: 'DOM-80122',
    date: '05 Aug 2026',
    total: 45000,
    status: 'Cancelled',
    product: {
      name: 'Luna Pearl Earrings',
      description: 'Freshwater pearls with yellow gold drops.',
      purity: '18K Gold',
      quantity: 1,
      image: '/images/person.jpg'
    }
  }
];

const FILTERS = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function MyOrdersPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesFilter = activeFilter === 'All' || order.status === activeFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'Processing': return { icon: <Clock size={14} />, color: 'text-amber-600', bg: 'bg-amber-600/10', action: 'Track Order' };
      case 'Shipped': return { icon: <Package size={14} />, color: 'text-blue-600', bg: 'bg-blue-600/10', action: 'Track Shipment' };
      case 'Delivered': return { icon: <CheckCircle size={14} />, color: 'text-green-600', bg: 'bg-green-600/10', action: 'Buy Again' };
      case 'Cancelled': return { icon: <XCircle size={14} />, color: 'text-red-600', bg: 'bg-red-600/10', action: 'Order Again' };
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 pt-8">
      <div className="w-full px-6 md:px-12 xl:px-24 max-w-[1500px] mx-auto">
        
        {/* Back Link */}
        <Link href="/account" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0E332E]/60 uppercase hover:text-[#8A7043] transition-colors mb-8">
          <ChevronLeft size={14} /> Back to Account
        </Link>

        {/* Page Header */}
        <div className="text-center md:text-left mb-10">
          <h1 className="font-heading text-3xl text-[#0E332E] mb-2">My Orders</h1>
          <p className="text-sm text-[#0E332E]/70 font-medium">Track, manage and revisit your jewellery purchases.</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <input 
              type="text" 
              placeholder="Search by Order ID or Product Name" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#8A7043]/30 rounded-full py-3 pl-12 pr-4 text-sm text-[#0E332E] outline-none focus:border-[#8A7043] shadow-sm transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0E332E]/40" size={18} />
          </div>

          {/* Filter Tabs */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              {FILTERS.map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-colors border ${
                    activeFilter === filter 
                      ? 'bg-[#8A7043] text-white border-[#8A7043]' 
                      : 'bg-white text-[#0E332E]/60 border-[#8A7043]/20 hover:border-[#8A7043]/50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => {
              const statusConfig = getStatusConfig(order.status);
              
              return (
                <div key={order.id} className="bg-white border border-[#8A7043]/30 rounded-xl p-5 md:p-6 shadow-sm flex flex-col hover:border-[#8A7043]/60 transition-colors">
                  
                  {/* TOP ROW */}
                  <div className="flex flex-wrap justify-between items-center border-b border-[#0E332E]/10 pb-4 mb-4 gap-4">
                    <div className="flex items-center gap-6 md:gap-12 flex-wrap">
                      <div>
                        <p className="text-[9px] font-bold tracking-[0.15em] text-[#0E332E]/50 uppercase mb-1">Order ID</p>
                        <p className="font-heading text-sm text-[#0E332E]">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold tracking-[0.15em] text-[#0E332E]/50 uppercase mb-1">Order Date</p>
                        <p className="font-medium text-sm text-[#0E332E]">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold tracking-[0.15em] text-[#0E332E]/50 uppercase mb-1">Total Amount</p>
                        <p className="font-bold text-sm text-[#0E332E]">₹{order.total.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.color}`}>
                      {statusConfig.icon}
                      <span className="text-[10px] font-bold tracking-widest uppercase">{order.status}</span>
                    </div>
                  </div>

                  {/* MIDDLE SECTION */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Left: Product Image */}
                    <div className="w-[100px] h-[100px] shrink-0 bg-[#F4F1EB] rounded-lg overflow-hidden border border-[#0E332E]/5">
                      <img src={order.product.image} alt={order.product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Center: Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg text-[#0E332E] mb-1 truncate">{order.product.name}</h3>
                      <p className="text-sm text-[#0E332E]/70 mb-2 truncate">{order.product.description}</p>
                      <div className="flex items-center gap-4 text-xs font-medium text-[#0E332E]/80">
                        <span className="bg-[#F9F6F0] px-2 py-1 rounded border border-[#8A7043]/10">{order.product.purity}</span>
                        <span>Qty: {order.product.quantity}</span>
                      </div>
                    </div>

                    {/* Right: Primary Action */}
                    <div className="w-full md:w-auto mt-4 md:mt-0 shrink-0">
                      <button className={`w-full md:w-auto px-6 py-3 border inline-flex items-center justify-center text-[10px] font-bold tracking-widest uppercase transition-colors rounded ${
                        order.status === 'Processing' || order.status === 'Shipped' 
                          ? 'border-[#8A7043] text-[#8A7043] hover:bg-[#8A7043] hover:text-white' 
                          : 'bg-[#8A7043] text-white border-[#8A7043] hover:bg-[#0E332E] hover:border-[#0E332E]'
                      }`}>
                        {statusConfig.action}
                      </button>
                    </div>
                  </div>

                  {/* BOTTOM ROW */}
                  <div className="border-t border-[#0E332E]/5 mt-5 pt-4 flex flex-wrap items-center gap-4 md:gap-8">
                    <button className="text-[10px] font-bold tracking-widest text-[#8A7043] uppercase hover:text-[#0E332E] transition-colors">
                      View Details
                    </button>
                    <button className="text-[10px] font-bold tracking-widest text-[#8A7043] uppercase hover:text-[#0E332E] transition-colors">
                      Download Invoice
                    </button>
                    {(order.product.purity.includes('VVS') || order.product.name.includes('Diamond')) && (
                      <button className="text-[10px] font-bold tracking-widest text-[#8A7043] uppercase hover:text-[#0E332E] transition-colors">
                        View Certificate
                      </button>
                    )}
                  </div>

                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white/50 border border-[#0E332E]/10 rounded-xl shadow-sm">
              <Package size={48} className="text-[#0E332E]/20 mx-auto mb-4" />
              <h2 className="font-heading text-xl text-[#0E332E] mb-2">No orders found</h2>
              <p className="text-sm text-[#0E332E]/60">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>

      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
