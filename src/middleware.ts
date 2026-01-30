import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const sessionId = context.cookies.get("session")?.value;
  const path = context.url.pathname;

  const isLoggedIn = Boolean(sessionId);
  
  // 1. PASTIKAN "/auth/login" terdaftar di sini jika Anda menggunakannya
  const publicPages = ["/login", "/signup", "/api/auth", "/auth/login"];
  const isPublicPage = publicPages.some(p => path.startsWith(p));
  const isStaticFile = path.includes(".") || path.startsWith("/_astro");

  // 2. PROTEKSI: Jika belum login, arahkan ke SATU alamat yang pasti (misal: /login)
  if (!isLoggedIn && !isPublicPage && !isStaticFile) {
    return context.redirect("/auth/login"); 
  }

  // 3. ANTI-LOGIN: Jika sudah login, balikkan ke Home
  if (isLoggedIn && isPublicPage && path !== "/api/auth/logout") {
    return context.redirect("/auth/login");
  }

  const response = await next();

  // CSP tetap aktif untuk Google Maps
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://maps.googleapis.com 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://maps.googleapis.com;"
  );

  return response;
});