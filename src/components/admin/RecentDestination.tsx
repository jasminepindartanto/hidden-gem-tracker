import React from 'react';

export const RecentDestination = () => {
  const data = [
    { name: "The Stone Cafe", category: "Food & Drink", status: "Published", color: "blue" },
    { name: "Orchid Forest", category: "Nature", status: "Pending", color: "emerald" },
    { name: "Lawang Wangi", category: "Art & Culture", status: "Published", color: "purple" }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold border-b border-slate-100">
            <th className="px-6 py-5">Place</th>
            <th className="px-6 py-5">Category</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((item, i) => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-5">
                <p className="font-bold text-slate-700">{item.name}</p>
                <p className="text-[10px] text-slate-400">Added just now</p>
              </td>
              <td className="px-6 py-5">
                <span className={`px-3 py-1 bg-${item.color}-50 text-${item.color}-600 text-[10px] font-bold rounded-full border border-${item.color}-100`}>
                  {item.category}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Published' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                  <span className={`text-sm font-medium ${item.status === 'Published' ? 'text-emerald-600' : 'text-orange-600'}`}>{item.status}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs font-bold text-slate-400 hover:text-emerald-600">Edit</button>
                  <button className="text-xs font-bold text-slate-400 hover:text-red-500">Del</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};