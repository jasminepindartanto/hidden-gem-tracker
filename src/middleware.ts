// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import sql from "@/lib/db"; 

export const onRequest = defineMiddleware(async (context, next) => {
  // Gunakan nama 'session' secara konsisten
  const sessionId = context.cookies.get("session")?.value;
  const path = context.url.pathname;
  const isLoggedIn = Boolean(sessionId);
  
  // 2. Tambahkan /admin/auth ke publicPages agar tidak terjadi loop redirect
  const publicPages = ["/login", "/signup", "/api/auth", "/auth/login", "/admin/auth", "/api/auth/me"];
  const isPublicPage = publicPages.some(p => path === p || path.startsWith(p + "/"));

  let userRole = null;
  if (sessionId) {
    // Sesuaikan query: apakah sessionId berisi ID (integer) atau Email (string)?
    const users = await sql`SELECT role FROM users WHERE id::text = ${sessionId} OR email = ${sessionId}`;
    if (users.length > 0) {
      userRole = users[0].role?.toLowerCase(); // Ubah ke lowercase agar pengecekan aman
    }
  }

  // 3. LOGIKA PROTEKSI ADMIN
  if (path.startsWith("/admin") && !isPublicPage) {
    if (!isLoggedIn) {
      return context.redirect("/auth/login"); // Arahkan ke login utama
    }
    
    // Pastikan userRole dicek dengan benar (case-insensitive)
    if (userRole !== 'admin') {
      return context.redirect("/?error=unauthorized");
    }
  }

  // 4. Mencegah Loop: Jika sudah login, jangan boleh ke halaman login lagi
  if (isLoggedIn && isPublicPage && path !== "/api/auth/logout") {
    // Jika admin, arahkan ke dashboard. Jika user biasa, ke home.
    const target = (userRole === 'admin') ? "/admin" : "/";
    return context.redirect(target);
  }

  const response = await next();
  
  // Headers CSP tetap sama
  return response;
});