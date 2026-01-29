import React, { useState } from 'react';
import { ReviewDetailModal } from './ReviewDetailModal';

// Data dummy disesuaikan dengan 2 status: Visible & Removed
const reviewData = [
  { 
    id: 1, reviewer: "Budi Santoso", destination: "Kawah Putih", rating: 5, date: "Oct 12, 2023", 
    status: "Visible", 
    image: "https://images.unsplash.com/photo-1596402184320-417d717867cd?w=400",
    text: "Absolutely stunning. The sulfur mist adds a mystical feel. Make sure to come early before the crowds arrive. The transport from the parking lot to the crater is well-organized, although the smell can be quite strong—bringing a mask is a must!" 
  },
  { 
    id: 2, reviewer: "Siti Aminah", destination: "Tebing Keraton", rating: 4, date: "Oct 11, 2023", 
    status: "Removed", 
    image: "https://images.unsplash.com/photo-1580493026131-0f7239062334?w=400",
    text: "A bit crowded during weekends but the view is worth it. Best visited during sunrise for the best lighting." 
  },
  { 
    id: 3, reviewer: "John Doe", destination: "Stone Garden", rating: 3, date: "Oct 10, 2023", 
    status: "Removed", 
    image: "https://images.unsplash.com/photo-1542662565-7e4b66bae529?w=400",
    text: "Disappointed. The local guide was very pushy and the facilities were lacking maintenance." 
  },
];

export const ReviewTable = () => {
  const [selectedReview, setSelectedReview] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-50">
                <th className="px-8 py-5">Reviewer</th>
                <th className="px-8 py-5">Destination</th>
                <th className="px-8 py-5">Rating</th>
                <th className="px-8 py-5">Photo</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reviewData.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50/50 group transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3 font-bold text-slate-800 text-sm">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">{review.reviewer[0]}</div>
                        {review.reviewer}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-600">{review.destination}</td>
                  <td className="px-8 py-5">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-100 shadow-sm">
                      <img src={review.image} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  {/* Status Badge disesuaikan: Visible (Emerald) & Removed (Red) */}
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${
                        review.status === 'Visible' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-red-50 text-red-600 border-red-100'
                    }`}>{review.status}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => setSelectedReview(review)}
                      className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl font-bold text-xs transition-all active:scale-95"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReview && (
        <ReviewDetailModal 
          review={selectedReview} 
          onClose={() => setSelectedReview(null)} 
        />
      )}
    </div>
  );
};