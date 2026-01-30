// src/components/admin/RecentDestination.tsx
import React from "react";
import type { Destination } from "@/types/destination";

interface Props {
  data: Destination[];
}

export const RecentDestination = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return (
      <p className="p-6 text-slate-500 text-sm">
        Tidak ada destinasi terbaru.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold border-b border-slate-100">
            <th className="px-6 py-5">Destinasi (DTW)</th>
            <th className="px-6 py-5">Lokasi</th>
            <th className="px-6 py-5">Rating</th>
            <th className="px-6 py-5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-slate-50/50 transition-colors group"
            >
              <td className="px-6 py-5">
                <p className="font-bold text-slate-700">{item.dtw}</p>
                <p className="text-[10px] text-slate-400">
                  {item.tags || "No Tags"}
                </p>
              </td>
              <td className="px-6 py-5 text-sm text-slate-500">
                {item.lokasi}
              </td>
              <td className="px-6 py-5">
                <span className="text-sm font-bold text-emerald-600">
                  ⭐ {Number(item.rating).toFixed(1)}
                </span>
              </td>
              <td className="px-6 py-5 text-right">
                {/* Menggunakan tag <a> agar bisa mengarah ke URL edit dengan ID spesifik */}
                <a 
                  href={`/admin/destination/edit?id=${item.id}`} 
                  className="inline-block text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
