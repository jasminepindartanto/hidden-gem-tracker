import React from 'react';
import { toast } from "sonner";

interface Review {
  id: number;
  nama_user: string;  // Sesuai dengan skema database Anda
  dtw_name: string;
  rating_user: number; // Sesuai dengan skema database Anda
  komentar: string;    // Sesuai dengan skema database Anda
}

export const ReviewTable = ({ data }: { data: Review[] }) => {
  const handleDelete = async (id: number) => {
    if (!confirm("Hapus ulasan ini?")) return;
    
    const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success("Review deleted");
      window.location.reload();
    } else {
      toast.error("Gagal menghapus ulasan");
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
                {/* Perbaikan: Gunakan nama_user */}
                <p className="font-bold text-slate-800 text-sm">{review.nama_user}</p>
                <p className="text-xs text-emerald-600 font-medium">{review.dtw_name}</p>
              </td>
              <td className="px-6 py-4 text-center">
                {/* Perbaikan: Gunakan rating_user */}
                <span className="text-sm font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                  ⭐ {review.rating_user}
                </span>
              </td>
              <td className="px-6 py-4">
                {/* Perbaikan: Gunakan komentar */}
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