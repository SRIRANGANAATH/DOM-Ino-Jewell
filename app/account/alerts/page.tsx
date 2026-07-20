"use client";

import { useState } from 'react';
import { 
  ChevronLeft, Package, CheckCircle2, Heart, Award, 
  Tag, Calendar, Bell, Check, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type AlertCategory = 'All' | 'Orders' | 'Offers' | 'Wishlist' | 'Membership' | 'Appointments';

interface Alert {
  id: string;
  category: AlertCategory;
  title: string;
  description: string;
  timestamp: string;
  status?: string;
  action: string;
  isRead: boolean;
  icon: any;
}

const INITIAL_ALERTS: Alert[] = [
  {
    id: 'a1',
    category: 'Orders',
    title: 'Order Shipped',
    description: 'Aurelia Gold Necklace',
    timestamp: '2 hours ago',
    status: 'In Transit',
    action: 'View Order',
    isRead: false,
    icon: Package
  },
  {
    id: 'a5',
    category: 'Offers',
    title: 'Special Offer',
    description: '15% off Diamond Jewellery',
    timestamp: 'Today',
    action: 'Shop Now',
    isRead: false,
    icon: Tag
  },
  {
    id: 'a6',
    category: 'Appointments',
    title: 'Appointment Reminder',
    description: 'Tomorrow at 2:30 PM',
    timestamp: 'Tomorrow',
    action: 'Reschedule',
    isRead: false,
    icon: Calendar
  },
  {
    id: 'a2',
    category: 'Orders',
    title: 'Order Delivered',
    description: 'Heritage Bangle',
    timestamp: 'Yesterday',
    status: 'Delivered',
    action: 'Rate Product',
    isRead: true,
    icon: CheckCircle2
  },
  {
    id: 'a3',
    category: 'Wishlist',
    title: 'Back in Stock',
    description: 'Diamond Tennis Bracelet is back in stock',
    timestamp: '3 days ago',
    action: 'View Product',
    isRead: true,
    icon: Heart
  },
  {
    id: 'a4',
    category: 'Membership',
    title: 'Tier Unlocked',
    description: 'Gold Tier unlocked',
    timestamp: '1 week ago',
    action: 'Explore Benefits',
    isRead: true,
    icon: Award
  }
];

const FILTERS: AlertCategory[] = ['All', 'Orders', 'Offers', 'Wishlist', 'Membership', 'Appointments'];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [activeFilter, setActiveFilter] = useState<AlertCategory>('All');

  const filteredAlerts = alerts.filter(alert => {
    return activeFilter === 'All' || alert.category === activeFilter;
  });

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 pt-8">
      <div className="w-full px-6 md:px-12 xl:px-24 max-w-[1200px] mx-auto">
        
        {/* Back Link */}
        <Link href="/account" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0E332E]/60 uppercase hover:text-[#8A7043] transition-colors mb-8">
          <ChevronLeft size={14} /> Back to Account
        </Link>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h1 className="font-heading text-3xl text-[#0E332E] mb-2 flex items-center gap-3">
              Alerts
              {alerts.some(a => !a.isRead) && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#8A7043] inline-block animate-pulse"></span>
              )}
            </h1>
            <p className="text-sm text-[#0E332E]/70 font-medium">Stay updated with your orders and exclusive offers.</p>
          </div>
          <button 
            onClick={markAllAsRead}
            disabled={!alerts.some(a => !a.isRead)}
            className="flex items-center gap-2 px-5 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase transition-colors border border-[#8A7043] text-[#8A7043] hover:bg-[#8A7043] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#8A7043]"
          >
            <Check size={14} /> Mark all as read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="w-full overflow-x-auto pb-4 mb-8 hide-scrollbar">
          <div className="flex items-center gap-3 min-w-max">
            {FILTERS.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-colors border ${
                  activeFilter === filter 
                    ? 'bg-[#0E332E] text-white border-[#0E332E]' 
                    : 'bg-white text-[#0E332E]/60 border-[#0E332E]/10 hover:border-[#8A7043]/50 hover:text-[#0E332E]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map(alert => {
                const Icon = alert.icon;
                
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={alert.id} 
                    onClick={() => markAsRead(alert.id)}
                    className={`bg-white border p-5 md:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6 cursor-pointer relative overflow-hidden group ${
                      alert.isRead ? 'border-[#0E332E]/10' : 'border-[#8A7043]/40'
                    }`}
                  >
                    {!alert.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8A7043]"></div>
                    )}
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      alert.isRead ? 'bg-[#F9F6F0] text-[#0E332E]/40' : 'bg-[#8A7043]/10 text-[#8A7043]'
                    }`}>
                      <Icon size={20} />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className={`font-heading text-lg ${alert.isRead ? 'text-[#0E332E]' : 'text-[#8A7043] font-semibold'}`}>
                          {alert.title}
                        </h3>
                        {alert.status && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase bg-[#F9F6F0] border border-[#0E332E]/10 text-[#0E332E]/60">
                            {alert.status}
                          </span>
                        )}
                        {!alert.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#8A7043] inline-block ml-1"></span>
                        )}
                      </div>
                      <p className="text-sm text-[#0E332E]/70 mb-2 truncate">{alert.description}</p>
                      <p className="text-[10px] font-bold tracking-widest text-[#0E332E]/40 uppercase">
                        {alert.timestamp}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0 mt-4 md:mt-0 border-t border-[#0E332E]/5 md:border-0 flex justify-end">
                      <button className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#0E332E] group-hover:text-[#8A7043] transition-colors">
                        {alert.action} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-24 bg-white/50 border border-[#0E332E]/10 rounded-xl"
              >
                <Bell size={48} className="text-[#0E332E]/20 mx-auto mb-4" />
                <h2 className="font-heading text-xl text-[#0E332E] mb-2">You're all caught up!</h2>
                <p className="text-sm text-[#0E332E]/60">You have no new alerts in this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
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
