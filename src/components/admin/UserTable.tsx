import React, { useState } from 'react';

const userData = [
  { id: 1, name: "Asep Sunandar", email: "asep@example.com", role: "Admin", destinations: ["Tebing Karaton", "Kopi Selasar"], color: "bg-emerald-100 text-emerald-600" },
  { id: 2, name: "Siti Aminah", email: "siti.a@provider.com", role: "Admin", destinations: ["Stone Garden"], color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "Budi Santoso", email: "budi.s@web.id", role: "User", destinations: ["Curug Tilu", "Maribaya"], color: "bg-orange-100 text-orange-600" },
  { id: 4, name: "Dewi Lestari", email: "dewi.l@mail.com", role: "User", destinations: ["Tahura Juanda"], color: "bg-purple-100 text-purple-600" },
];

export const UserTable = () => {
  const [search, setSearch] = useState("");
  const filtered = userData.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search bar container */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold border-b border-slate-50">
                <th className="px-8 py-5">User Name</th>
                <th className="px-8 py-5">Contact Info</th>
                <th className="px-8 py-5 text-center">Role</th>
                <th className="px-8 py-5">Security</th>
                <th className="px-8 py-5">Reviewed Destinations</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 group transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${user.color}`}>{user.name.charAt(0)}</div>
                      <span className="font-bold text-slate-800 text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500">{user.email}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${user.role === 'Admin' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5"><span className="text-slate-300 tracking-widest text-lg">••••••••</span></td>
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-2">
                      {user.destinations.map((dest, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-full border border-slate-100">{dest}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      {/* FIXED: Href diarahkan ke rute edit */}
                      <a 
                        href="/admin/users/edit" 
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-90"
                        title="Edit User"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      </a>
                      <button 
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                        title="Delete User"
                        onClick={() => confirm('Yakin ingin menghapus data ini?')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
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