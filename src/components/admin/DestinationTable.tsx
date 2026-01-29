import React, { useState } from 'react';

const dummyData = [
  { id: 1, name: "Kawah Putih Secret Path", location: "Ciwidey, South Bandung", category: "Nature", reviews: 1204, status: "Published", img: "https://images.unsplash.com/photo-1580496513926-809493108173?w=100&h=100&fit=crop" },
  { id: 2, name: "Tebing Karaton Edge", location: "Dago Pakar, North Bandung", category: "Adventure", reviews: 852, status: "Published", img: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=100&h=100&fit=crop" },
  { id: 3, name: "Ciburial Night Market", location: "Ciburial Village", category: "Culinary", reviews: 56, status: "Pending", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop" },
  { id: 4, name: "Old Braga Secret Library", location: "Braga Street", category: "History", reviews: 210, status: "Published", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=100&h=100&fit=crop" },
];

export const DestinationTable = () => {
  const [search, setSearch] = useState("");
  const filtered = dummyData.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar Tetap Sama */}
      <div className="relative max-w-2xl">
        <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </span>
        <input 
          type="text"
          placeholder="Search destinations..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[28px] outline-none focus:border-emerald-500 transition-all text-sm shadow-sm"
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
                <th className="px-8 py-5">Destination Name</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Total Reviews</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <img src={item.img} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                  </td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.location}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100">{item.category}</span>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-sm font-medium text-slate-600">{item.reviews.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-4">
                    <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${item.status === 'Published' ? 'text-emerald-500' : 'text-slate-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Published' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* PERBAIKAN: Ubah button menjadi link <a> untuk routing edit */}
                      <a 
                        href="/admin/destination/edit" 
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-90"
                        title="Edit Destination"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      </a>
                      <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Tetap Sama */}
      </div>
    </div>
  );
};