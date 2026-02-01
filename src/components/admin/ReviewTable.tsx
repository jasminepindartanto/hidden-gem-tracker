import React from 'react';
import { toast } from "sonner";

// 1. Sesuaikan Interface dengan Nama Kolom Database Anda
interface Review {
  id: number;
  user_id: number;
  lokasi_id: number;
  nama_user: string;   // Sesuai skema
  komentar: string;    // Sesuai skema
  rating: number; // Sesuai skema (Sebelumnya: rating)
  dtw_name?: string;   // Opsional: hasil JOIN dari tabel lokasi_wisata
}

export const ReviewTable = ({ data }: { data: Review[] }) => {
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus ulasan ini secara permanen?")) return;
    
    try {
      const res = await fetch(`/api/admin/review?id=${id}`, { method: 'DELETE' });
      
      if (res.status === 404) {
        console.error("Error: File API tidak ditemukan di src/pages/api/admin/review.ts");
        toast.error("Endpoint API tidak ditemukan!");
        return;
      }

      if (res.ok) {
        toast.success("Berhasil dihapus");
        window.location.reload();
      }
    } catch (error) {
      console.error("Gagal melakukan fetch:", error);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            <th className="px-6 py-4">User & Destination</th>
            <th className="px-6 py-4 text-center">Rating</th>
            <th className="px-6 py-4">Comment</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((review) => (
            <tr key={review.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                {/* Menampilkan nama_user sesuai database */}
                <p className="font-bold text-slate-800 text-sm">{review.nama_user}</p>
                <p className="text-xs text-emerald-600 font-medium">{review.dtw_name || `Location ID: ${review.lokasi_id}`}</p>
              </td>
              <td className="px-6 py-4 text-center">
                {/* Perbaikan: Menggunakan rating_user */}
                <span className="text-sm font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                  ⭐ {review.rating}
                </span>
              </td>
              <td className="px-6 py-4">
                {/* Menampilkan komentar sesuai database */}
                <p className="text-sm text-slate-600 line-clamp-2 max-w-md italic">
                  "{review.komentar}"
                </p>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};