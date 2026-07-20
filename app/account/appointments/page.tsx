import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ChevronLeft, CalendarPlus, Mail, Info, RefreshCw, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Your Private Viewings - DOMINO',
};

// Mock Data
const appointments = [
  {
    id: '1',
    status: 'Upcoming', // 'Upcoming' or 'Past'
    state: 'Confirmed',
    date: '2026-10-25',
    displayDate: 'Wednesday, Oct 25th',
    time: '2:30 PM',
    location: 'Mayfair Flagship Store, London',
    directionsUrl: '#',
    artisan: 'Elena Rostova',
    artisanInitials: 'ER',
    piece: {
      name: 'Aurelia Gold Necklace',
      specs: '18K Gold • 14.2g',
      price: '₹1,55,000',
      image: '/images/Aurelia Gold Necklace.jpg',
      tags: ['CERTIFIED', 'HERITAGE']
    }
  },
  {
    id: '4',
    status: 'Past',
    state: 'Completed',
    date: '2026-09-12',
    displayDate: 'Tuesday, Sept 12th',
    time: '10:00 AM',
    location: 'Paris Boutique',
    directionsUrl: '#',
    artisan: 'Jean-Luc Dubois',
    artisanInitials: 'JD',
    piece: {
      name: 'Antique Filigree Bangle',
      specs: '22K Gold • 24.5g',
      price: '₹1,95,000',
      image: '/images/Antique Filigree Bangle.avif',
      tags: ['EXCLUSIVE', '22K PURITY']
    }
  }
];

export default async function AppointmentsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const params = await searchParams;
  const activeView = params.view === 'past' ? 'past' : 'upcoming';

  const upcomingViewings = appointments.filter(a => a.status === 'Upcoming');
  const pastViewings = appointments.filter(a => a.status === 'Past');
  
  const currentViewings = activeView === 'upcoming' ? upcomingViewings : pastViewings;

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24 pt-8">
      <div className="w-full px-6 md:px-12 xl:px-24 max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/account" className="inline-flex items-center text-[#8A7043] text-[10px] uppercase tracking-[0.2em] font-bold mb-6 hover:text-[#0E332E] transition-colors">
            <ChevronLeft size={14} className="mr-1" /> Back to Account
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl text-[#0E332E] mb-3">Your Private Viewings</h1>
          <p className="text-[#0E332E]/70 max-w-2xl text-sm leading-relaxed">Manage your intimate consultations and revisit pieces crafted with radical purity.</p>
        </div>

        {/* URL-Driven Tabs */}
        <div className="flex border-b border-[#0E332E]/10 mb-8 overflow-x-auto no-scrollbar" role="tablist">
          <Link 
            href="?view=upcoming"
            role="tab"
            aria-selected={activeView === 'upcoming'}
            className={`min-h-[44px] flex items-center justify-center pb-3 px-2 mr-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] border-b-2 transition-colors whitespace-nowrap ${activeView === 'upcoming' ? 'border-[#8A7043] text-[#0E332E]' : 'border-transparent text-[#0E332E]/50 hover:text-[#0E332E]/80'}`}
          >
            Upcoming Viewings {upcomingViewings.length > 0 && <span className="ml-1.5 opacity-70">({upcomingViewings.length})</span>}
          </Link>
          <Link 
            href="?view=past"
            role="tab"
            aria-selected={activeView === 'past'}
            className={`min-h-[44px] flex items-center justify-center pb-3 px-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] border-b-2 transition-colors whitespace-nowrap ${activeView === 'past' ? 'border-[#8A7043] text-[#0E332E]' : 'border-transparent text-[#0E332E]/50 hover:text-[#0E332E]/80'}`}
          >
            Past Consultations {pastViewings.length > 0 && <span className="ml-1.5 opacity-70">({pastViewings.length})</span>}
          </Link>
        </div>

        {/* Tab Content (Appointments List) */}
        <div className="animate-in fade-in duration-500">
          {currentViewings.length > 0 ? (
            <div className="space-y-6 md:space-y-8">
              {currentViewings.map((appt) => (
                <div key={appt.id} className="bg-white border border-[#8A7043]/20 rounded-none md:rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                  {/* Left Side: Visual Anchor */}
                  <div className="md:w-[40%] xl:w-1/3 relative bg-[#F0EBE1] flex flex-col p-6 items-center justify-center min-h-[250px] md:min-h-full">
                    <div className="w-full aspect-square relative mb-6 mix-blend-multiply">
                      <Image 
                        src={appt.piece.image} 
                        alt={appt.piece.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                    <div className="text-center w-full mt-auto">
                      <h3 className="font-heading text-lg text-[#0E332E] mb-2">{appt.piece.name}</h3>
                      <p className="text-[10px] text-[#0E332E]/60 uppercase tracking-[0.2em] mb-3">{appt.piece.specs} &bull; {appt.piece.price}</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {appt.piece.tags.map(tag => (
                          <span key={tag} className="text-[8px] bg-white/50 border border-[#8A7043]/30 text-[#8A7043] px-2 py-1 uppercase tracking-widest rounded-sm">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Details & Actions */}
                  <div className="md:w-[60%] xl:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <span className={`text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded bg-opacity-10 ${appt.state === 'Confirmed' ? 'bg-[#8A7043] text-[#8A7043]' : 'bg-[#0E332E] text-[#0E332E]'}`}>
                          {appt.state}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-8">
                        <div>
                          <p className="text-[9px] font-bold tracking-[0.2em] text-[#8A7043] uppercase flex items-center gap-2 mb-2">
                            <Calendar size={12} /> Date
                          </p>
                          <p className="text-sm text-[#0E332E] font-medium">{appt.displayDate}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold tracking-[0.2em] text-[#8A7043] uppercase flex items-center gap-2 mb-2">
                            <Clock size={12} /> Time
                          </p>
                          <p className="text-sm text-[#0E332E] font-medium">{appt.time}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-[9px] font-bold tracking-[0.2em] text-[#8A7043] uppercase flex items-center gap-2 mb-2">
                            <MapPin size={12} /> Location
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <p className="text-sm text-[#0E332E] font-medium">{appt.location}</p>
                            <a href={appt.directionsUrl} className="text-[9px] font-bold text-[#8A7043] uppercase tracking-[0.2em] hover:underline">Get Directions</a>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 border-t border-[#0E332E]/10 pt-6 mb-8">
                        <div className="w-10 h-10 rounded-full bg-[#8A7043] flex items-center justify-center text-white font-heading font-bold text-sm tracking-wider">
                          {appt.artisanInitials}
                        </div>
                        <div>
                          <p className="text-[9px] font-bold tracking-[0.2em] text-[#8A7043] uppercase mb-1">Assigned Artisan</p>
                          <p className="text-sm font-medium text-[#0E332E]">{appt.artisan}</p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-center">
                      {activeView === 'upcoming' ? (
                        <>
                          <Link href="/book" className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-6 bg-[#0E332E] text-white text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-[#0a2420] transition-colors rounded">
                            Modify / Reschedule
                          </Link>
                          <a href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:DOMINO Private Viewing%0ADESCRIPTION:Viewing for ${appt.piece.name}%0ALOCATION:${appt.location}%0ADTSTART:20261025T143000Z%0ADTEND:20261025T153000Z%0AEND:VEVENT%0AEND:VCALENDAR`} download="domino_viewing.ics" className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-4 text-[#0E332E] border border-[#0E332E]/20 text-[9px] font-bold tracking-[0.2em] uppercase gap-2 hover:bg-[#0E332E]/5 transition-colors rounded">
                            <CalendarPlus size={14} /> Add to Calendar
                          </a>
                          <a href="mailto:concierge@domino.com" className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-4 text-[#0E332E] border border-[#0E332E]/20 text-[9px] font-bold tracking-[0.2em] uppercase gap-2 hover:bg-[#0E332E]/5 transition-colors rounded">
                            <Mail size={14} /> Contact Boutique
                          </a>
                        </>
                      ) : (
                        <>
                          <Link href={`/product/${appt.id}`} className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-6 bg-[#0E332E] text-white text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-[#0a2420] transition-colors rounded">
                            Inquire to Purchase
                          </Link>
                          <Link href="/book" className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-4 text-[#0E332E] border border-[#0E332E]/20 text-[9px] font-bold tracking-[0.2em] uppercase gap-2 hover:bg-[#0E332E]/5 transition-colors rounded">
                            <RefreshCw size={14} /> Request Another Viewing
                          </Link>
                          <a href="mailto:feedback@domino.com?subject=Artisan%20Feedback" className="w-full sm:w-auto min-h-[44px] flex items-center justify-center px-4 text-[#0E332E] border border-[#0E332E]/20 text-[9px] font-bold tracking-[0.2em] uppercase gap-2 hover:bg-[#0E332E]/5 transition-colors rounded">
                            <MessageSquare size={14} /> Leave Feedback
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Tab-Specific Empty States */
            <div className="bg-white border border-[#8A7043]/20 rounded-xl p-8 md:p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
              {activeView === 'upcoming' ? (
                <>
                  <div className="w-20 h-20 mb-6 opacity-40 flex items-center justify-center text-[#8A7043]">
                    <Calendar size={56} strokeWidth={1} />
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl text-[#0E332E] mb-4">Your private viewing journey awaits.</h3>
                  <p className="text-[#0E332E]/60 max-w-md mx-auto mb-10 text-sm leading-relaxed">Schedule an intimate consultation with our master artisans to experience the radical purity of our collections.</p>
                  <Link href="/book" className="px-8 py-4 bg-[#0E332E] text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#0a2420] transition-colors rounded shadow-lg hover:shadow-xl">
                    Book a Private Viewing
                  </Link>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mb-6 opacity-40 flex items-center justify-center text-[#8A7043]">
                    <Info size={56} strokeWidth={1} />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl text-[#0E332E] mb-4">You have not completed any private viewings yet.</h3>
                  <p className="text-[#0E332E]/60 max-w-sm mx-auto mb-10 text-sm leading-relaxed">Discover our pieces and reserve your dedicated time with an artisan.</p>
                  <Link href="/shop" className="px-8 py-4 border border-[#8A7043] text-[#8A7043] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#8A7043] hover:text-white transition-colors rounded">
                    Explore Collections
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
