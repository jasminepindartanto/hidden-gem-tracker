import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const isLoggedIn = Boolean(context.cookies.get("session")?.value);
  const path = context.url.pathname;

  // Daftar halaman yang boleh diakses tanpa login
  const publicPages = ["/login", "/signup", "/api/auth"];
  const isPublicPage = publicPages.includes(path);
  
  // Kecualikan juga file statis (gambar, favicon, dll) agar tidak kena redirect
  const isStaticFile = path.includes(".") || path.startsWith("/_astro");

  // PROTEKSI: Jika bukan halaman publik, bukan file statis, dan belum login
  if (!isLoggedIn && !isPublicPage && !isStaticFile) {
    return context.redirect("/login");
  }

  // ANTI-LOGIN: Jika sudah login, jangan biarkan masuk ke halaman login/signup lagi
  if (isLoggedIn && isPublicPage) {
    return context.redirect("/dashboard");
  }

  const response = await next();

  // CSP Header tetap diatur di sini
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://maps.googleapis.com",
    ].join("; ")
  );

  return response;
});
