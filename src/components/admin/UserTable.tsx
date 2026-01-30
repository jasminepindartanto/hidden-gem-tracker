// src/components/admin/UserTable.tsx
import React from 'react';
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  display_name: string;
  role: string;
  tanggal: Date;
}

interface Props {
  users: User[];
}

export const UserTable = ({ users }: Props) => {
  const handleDelete = async (id: number, name: string) => {
    // Konfirmasi sebelum menghapus
    if (!confirm(`Apakah Anda yakin ingin menghapus user "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE', // Kirim metode DELETE ke API
      });

      if (res.ok) {
        toast.success("User berhasil dihapus");
        window.location.reload(); // Refresh halaman untuk memperbarui tabel
      } else {
        toast.error("Gagal menghapus user");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">User</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Role</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Joined Date</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-bold text-slate-800">{user.display_name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                  user.role === 'admin' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                  {user.role.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {new Date(user.tanggal).toLocaleDateString('id-ID')}
              </td>
              <td className="px-6 py-4 text-right">
                {/* Tombol Edit: Arahkan ke halaman edit dengan ID user */}
                <a 
                  href={`/admin/users/edit?id=${user.id}`} 
                  className="text-xs font-bold text-emerald-600 hover:underline mr-4 transition-all"
                >
                  Edit
                </a>
                {/* Tombol Delete: Jalankan fungsi hapus */}
                <button 
                  onClick={() => handleDelete(user.id, user.display_name)}
                  className="text-xs font-bold text-red-500 hover:underline transition-all"
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