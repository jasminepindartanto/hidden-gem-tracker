import React, { useState } from 'react';
import { toast } from "sonner";

// Definisikan tipe data sesuai skema tabel lokasi_wisata
interface Destination {
  id: number;
  dtw: string;
  lokasi: string;
  tags: string;
  url_foto: string;
  rating: number;
}

interface Props {
  data: Destination[];
}

export const DestinationTable = ({ data }: Props) => {
  const [search, setSearch] = useState("");

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Hapus destinasi "${name}"?`)) return;

    const res = await fetch(`/api/admin/destinations?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success("Berhasil dihapus");
      window.location.reload(); // Refresh data
    }
  };

  const filtered = data.filter(d => 
    d.dtw.toLowerCase().includes(search.toLowerCase()) || 
    d.lokasi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <input 
          type="text"
          placeholder="Search by name or location..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold border-b border-slate-50">
                <th className="px-8 py-5">Thumbnail</th>
                <th className="px-8 py-5">Destination Name (DTW)</th>
                <th className="px-8 py-5">Rating</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <img src={item.url_foto} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                  </td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-800 text-sm">{item.dtw}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.lokasi}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">
                      ⭐ {Number(item.rating).toFixed(1)}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* Tombol Edit dengan Ikon Pensil */}
                      <a 
                        href={`/admin/destination/edit?id=${item.id}`} 
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-95"
                        title="Edit Destination"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                          <path d="m15 5 4 4"/>
                        </svg>
                      </a>

                      {/* Tombol Delete dengan Ikon Tempat Sampah */}
                      <button 
                        onClick={() => handleDelete(item.id, item.dtw)}
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                        title="Delete Destination"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"/>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                          <line x1="10" x2="10" y1="11" y2="17"/>
                          <line x1="14" x2="14" y1="11" y2="17"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};