import React from 'react';
// Fungsi untuk Menghapus (Delete)
const handleDelete = async (id: number) => {
    if (!confirm("Hapus ulasan ini secara permanen?")) return;

    const res = await fetch(`/api/admin/reviews?id=${id}`, { 
        method: 'DELETE' 
    });

    if (res.ok) {
        window.location.reload(); // Refresh halaman setelah hapus
    }
};

// Fungsi untuk Menyembunyikan (Hide/Update Status)
const handleHide = async (id: number) => {
    const res = await fetch(`/api/admin/reviews`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'hidden' })
    });

    if (res.ok) {
        window.location.reload();
    }
};

export const ReviewDetailModal = ({ review, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop dengan blur halus */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header Modal */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-slate-50">
            <h2 className="text-xl font-bold text-slate-900">Review Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>

        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Info Pengulas & Isi Review */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-xl border-4 border-white shadow-sm">
                           {review.reviewer[0]}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{review.reviewer}</h3>
                            <p className="text-xs text-slate-400">Submitted on {review.date}</p>
                            
                            {/* Badge Status Dinamis */}
                            <span className={`inline-block mt-2 px-3 py-1 border rounded-full text-[10px] font-bold uppercase ${
                              review.status === 'Visible' 
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                : 'bg-red-50 text-red-600 border-red-100'
                            }`}>
                              {review.status}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-bold text-emerald-600">{review.destination}</h4>
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed italic">
                            "{review.text}"
                        </p>
                    </div>
                </div>

                {/* Preview Foto Besar di Modal */}
                <div className="w-full md:w-48 aspect-square rounded-3xl bg-slate-100 overflow-hidden border border-slate-50 shadow-inner">
                    <img src={review.image} className="w-full h-full object-cover" />
                </div>
            </div>
        </div>

        {/* Footer Actions: Sesuai permintaan (Hanya Delete & Hide) */}
        <div className="px-8 py-6 bg-slate-50/50 flex justify-start items-center gap-4">
            <button 
                onClick={() => handleDelete(review.id)} // GANTI item.id JADI review.id
                className="..."
            >
                Delete Permanently
            </button>

            <button 
                onClick={() => handleHide(review.id)} // GANTI item.id JADI review.id
                className="..."
            >
                Hide Review
            </button>
        </div>
      </div>
    </div>
  );
};