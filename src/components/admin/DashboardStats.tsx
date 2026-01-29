import React from 'react';

export const DashboardStats = () => {
  const stats = [
    {
      label: "Total Users",
      value: "1,204",
      change: "+12%",
      trend: "up",
      description: "vs. previous month"
    },
    {
      label: "Pending Places",
      value: "56",
      change: "5%",
      trend: "alert",
      description: "Requiring approval"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{stat.label}</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-slate-900 leading-none">{stat.value}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
              stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
            }`}>
              {stat.trend === 'up' ? '↗' : '!'} {stat.change}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-4 font-medium">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};