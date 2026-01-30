// src/components/admin/DashboardStats.tsx
interface StatsProps {
  stats: {
    total_destinations: number;
    total_users: number;
  };
}

export const DashboardStats = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-slate-50 rounded-xl">
        <p className="text-sm text-slate-500">Total Destinasi</p>
        <p className="text-2xl font-bold">{stats?.total_destinations || 0}</p>
      </div>
      <div className="p-4 bg-slate-50 rounded-xl">
        <p className="text-sm text-slate-500">Total Pengguna</p>
        <p className="text-2xl font-bold">{stats?.total_users || 0}</p>
      </div>
    </div>
  );
};