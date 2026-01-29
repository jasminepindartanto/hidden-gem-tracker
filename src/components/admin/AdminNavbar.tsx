import React, { useEffect, useState } from 'react';

export const AdminNavbar = () => {
  const [currentPath, setCurrentPath] = useState('');

  // Mendeteksi halaman aktif saat ini di sisi client
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: "Destinations", href: "/admin/destination" },
    { label: "Reviews", href: "/admin/reviews" },
  ];

  const handleLogout = () => {
    // Menghapus cookie session untuk keamanan
    document.cookie = "admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/admin/auth";
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <span className="font-bold text-emerald-600 text-xl tracking-tight">HB Admin</span>
            
            {/* Navigasi Desktop */}
            <div className="hidden md:flex gap-1">
              {navItems.map(item => {
                // LOGIKA: Dashboard hanya aktif jika URL pas /admin. 
                // Menu lain tetap pakai startsWith agar sub-halaman (edit/add) tetap aktif.
                const isActive = item.href === "/admin" 
                  ? currentPath === "/admin" || currentPath === "/admin/"
                  : currentPath.startsWith(item.href);

                return (
                  <a 
                    key={item.label} 
                    href={item.href} 
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      isActive 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Profil User */}
            <div className="flex items-center gap-3 pr-5 border-r border-slate-100">
               <div className="text-right hidden sm:block">
                 <p className="text-xs font-bold text-slate-900 leading-tight">Admin User</p>
                 <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Super Admin</p>
               </div>
               <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                  <span className="text-xs font-bold text-slate-400">AU</span>
               </div>
            </div>

            {/* Tombol Logout */}
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};