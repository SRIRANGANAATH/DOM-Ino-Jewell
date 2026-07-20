"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Edit2, Trash2, Image as ImageIcon, ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: 0, image: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this exquisite piece?")) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...editForm })
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
    }
    closeForm();
    fetchProducts();
  };

  const startEdit = (product: any) => {
    setEditingId(product.id);
    setEditForm({ name: product.name, description: product.description, price: product.price, image: product.image });
    setIsFormOpen(true);
  };

  const openNew = () => {
    setEditingId(null);
    setEditForm({ name: '', description: '', price: 0, image: '' });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleLogout = () => {
    document.cookie = 'auth_token=; Max-Age=0; path=/;';
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] pb-24">
      {/* Admin Header */}
      <div className="bg-[#0E332E] text-white p-6 sticky top-0 z-40 shadow-xl border-b border-[#8A7043]/30">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button onClick={() => router.push('/')} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-bold tracking-widest text-[10px] uppercase">
              <ArrowLeft size={16} /> EXIT DASHBOARD
            </button>
            <h1 className="font-heading text-2xl tracking-wide">DOMINO <span className="text-[#8A7043]">Admin Center</span></h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded transition-colors text-sm font-medium tracking-widest uppercase"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl mt-10 px-6">
        
        <div className="flex justify-between items-end mb-8 border-b border-[#0E332E]/10 pb-4">
          <h2 className="text-2xl font-heading text-[#0E332E]">Inventory Overview</h2>
          <button onClick={openNew} className="flex items-center gap-2 bg-[#8A7043] text-white px-5 py-2.5 text-sm font-bold tracking-widest uppercase hover:bg-[#6b5632] transition-colors shadow-md">
            <Plus size={18} /> Add Piece
          </button>
        </div>

        {/* Edit / Add Form (Glassmorphism Modal-like style inline) */}
        {isFormOpen && (
          <div className="bg-white p-8 shadow-xl border-t-4 border-[#8A7043] mb-12 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-lg font-heading text-[#0E332E] mb-6">{editingId ? 'Modify Collection Piece' : 'Introduce New Piece'}</h3>
            <form onSubmit={handleEditSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0E332E]/60 uppercase tracking-widest mb-1">Title</label>
                  <input className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#8A7043] bg-transparent" placeholder="e.g. The Aura Necklace" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0E332E]/60 uppercase tracking-widest mb-1">Price (₹)</label>
                  <input className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#8A7043] bg-transparent" type="number" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: Number(e.target.value)})} required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0E332E]/60 uppercase tracking-widest mb-1">Image Path</label>
                  <input className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#8A7043] bg-transparent" placeholder="/images/Necklace.jpg" value={editForm.image} onChange={(e) => setEditForm({...editForm, image: e.target.value})} required />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-bold text-[#0E332E]/60 uppercase tracking-widest mb-1">Description</label>
                <textarea className="w-full border border-gray-300 p-3 outline-none focus:border-[#8A7043] bg-transparent flex-1 resize-none min-h-[100px]" placeholder="Piece narrative..." value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} required />
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeForm} className="px-6 py-2 text-sm font-bold tracking-widest uppercase text-gray-500 hover:text-gray-800 transition-colors">Cancel</button>
                <button type="submit" className="bg-[#0E332E] text-white px-8 py-2 text-sm font-bold tracking-widest uppercase hover:bg-[#0a2420] transition-colors shadow-md">
                  {editingId ? 'Save Changes' : 'Publish Piece'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 group overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                {p.image ? (
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${p.image}')` }}></div>
                ) : (
                  <ImageIcon className="text-gray-300" size={48} />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                   <button onClick={() => startEdit(p)} className="bg-white/90 text-[#0E332E] p-3 rounded-full hover:bg-white hover:scale-110 transition-all shadow-lg" title="Edit">
                     <Edit2 size={18} />
                   </button>
                   <button onClick={() => handleDelete(p.id)} className="bg-red-500/90 text-white p-3 rounded-full hover:bg-red-600 hover:scale-110 transition-all shadow-lg" title="Delete">
                     <Trash2 size={18} />
                   </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-[#0E332E] truncate">{p.name}</h3>
                <p className="text-[#8A7043] font-semibold mt-1">₹{p.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20 bg-white shadow-sm border border-gray-100">
            <p className="text-gray-400 font-heading text-xl">The collection is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}
