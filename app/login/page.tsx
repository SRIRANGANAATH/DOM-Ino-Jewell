"use client";
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const [tab, setTab] = useState(initialTab);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // For prototype, both login and signup hit the mock auth
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } else {
      setError('Invalid credentials. For demo use admin/admin.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] flex items-center justify-center p-6 pt-24 pb-24">
      <div className="w-full max-w-md">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[#0E332E]/60 hover:text-[#0E332E] transition-colors font-bold tracking-widest text-[10px] uppercase mb-8">
          <ArrowLeft size={16} /> GO BACK
        </button>

        <div className="bg-white p-10 shadow-xl border border-[#0E332E]/5 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#8A7043]"></div>
        
        <div className="flex justify-center gap-8 mb-8 border-b border-gray-100 pb-4">
          <button 
            className={`text-lg font-heading tracking-widest transition-colors ${tab === 'login' ? 'text-[#8A7043] font-bold' : 'text-gray-400'}`}
            onClick={() => setTab('login')}
          >
            SIGN IN
          </button>
          <button 
            className={`text-lg font-heading tracking-widest transition-colors ${tab === 'signup' ? 'text-[#8A7043] font-bold' : 'text-gray-400'}`}
            onClick={() => setTab('signup')}
          >
            REGISTER
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#0E332E]/70 uppercase tracking-widest mb-2">Username or Email</label>
            <input 
              type="text" 
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#8A7043] transition-colors bg-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#0E332E]/70 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#8A7043] transition-colors bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-[#0E332E] text-white py-4 uppercase text-sm tracking-widest font-bold hover:bg-[#8A7043] transition-colors mt-6 shadow-md hover:shadow-lg">
            {tab === 'login' ? 'Access Account' : 'Create Account'}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-8 text-center tracking-wide">For demo purposes: Admin (admin/admin)</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F6F0]"></div>}>
      <LoginContent />
    </Suspense>
  );
}
