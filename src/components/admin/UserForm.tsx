import React, { useState } from 'react';
import { toast } from "sonner";

interface UserFormProps {
  mode?: 'add' | 'edit';
  initialData?: any;
}

export const UserForm = ({ mode = 'add', initialData = null }: UserFormProps) => {
  const isEdit = mode === 'edit';
  
  // Logic State untuk menampung input
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    display_name: initialData?.display_name || '',
    email: initialData?.email || '',
    password: '',
    confirmPassword: '',
    role: initialData?.role || 'user'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sederhana untuk password baru
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/users', {
      method: method,
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      toast.success(isEdit ? "User updated!" : "User created!");
      window.location.href = "/admin/users";
    } else {
      toast.error("Operation failed. Please try again.");
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 pr-12 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-800 font-medium placeholder:text-slate-400";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2 ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="display_name" className={labelClass}>Full Name</label>
        <input 
          id="display_name"
          name="display_name"
          type="text" 
          placeholder="e.g. Ridwan Kamil" 
          className={inputClass} 
          value={formData.display_name}
          onChange={(e) => setFormData({...formData, display_name: e.target.value})}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Email Address</label>
        <input 
          id="email"
          name="email"
          type="email" 
          placeholder="email@example.com" 
          className={inputClass} 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          disabled={isEdit}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className={labelClass}>{isEdit ? 'New Password' : 'Password'}</label>
          <input 
            id="password"
            name="password"
            type="password" 
            placeholder="••••••••" 
            className={inputClass} 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required={!isEdit}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className={labelClass}>Confirm Password</label>
          <input 
            id="confirmPassword"
            name="confirmPassword"
            type="password" 
            placeholder="••••••••" 
            className={inputClass} 
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required={!isEdit}
          />
        </div>
      </div>
      <div>
        <label htmlFor="role" className={labelClass}>User Role</label>
        <select 
          id="role"
          name="role"
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
          className={`${inputClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1.25rem_center] bg-[length:1.25em]`}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <a href="/admin/users" className="px-6 py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
          Cancel
        </a>
        <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
          {isEdit ? 'Save Changes' : 'Create User'}
        </button>
      </div>
    </form>
  );
};