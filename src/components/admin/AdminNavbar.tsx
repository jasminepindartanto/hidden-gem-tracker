import React, { useEffect, useState } from 'react';

// Interface sesuai struktur Header.astro
interface User {
  display_name: string;
  role: string;
}

export const AdminNavbar = () => {
  const [currentPath, setCurrentPath] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    // Tarik data profil dari database via API
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setUser(data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: "Destinations", href: "/admin/destination" },
    { label: "Reviews", href: "/admin/reviews" },
  ];

  // Logika Inisial Nama (Sama dengan Header.astro)
  const initials = user?.display_name
    ? user.display_name.split(" ").map((n: string) => n[0]).join("").toUpperCase()
    : "??";

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Sisi Kiri: Brand */}
          <div className="flex items-center gap-8">
            <span className="font-bold text-emerald-600 text-xl tracking-tight">Dashboard Admin</span>
            
            {/* Navigasi Desktop */}
            <div className="hidden md:flex gap-1">
              {navItems.map(item => {
                const isActive = item.href === "/admin" 
                  ? currentPath === "/admin" || currentPath === "/admin/"
                  : currentPath.startsWith(item.href);

                return (
                  <a 
                    key={item.label} 
                    href={item.href} 
                    className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
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

          {/* Sisi Kanan: Profil & Logout (Struktur Header.astro) */}
          <div className="flex items-center gap-5">
            {!loading && user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pr-4 border-r border-slate-100">
                  <div className="text-right hidden sm:block">
                    <p className="text-[13px] font-bold text-slate-900 leading-tight">{user.display_name}</p>
                    <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-black">{user.role}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-emerald-500 border border-emerald-300 flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-white">{initials}</span>
                  </div>
                </div>

                {/* Tombol Logout mengarah ke API Route (Lebih Aman) */}
                <a 
                  href="/api/auth/logout" 
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Keluar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                </a>
              </div>
            ) : !loading && (
              <a href="/admin/auth/me" className="text-xs font-bold text-emerald-600 px-4 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-50 transition-all">
                Masuk
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};