import type { APIRoute } from "astro";

export const GET: APIRoute = ({ cookies, redirect }) => {
  // 1. Hapus cookie session dari sisi server agar aman
  cookies.delete("session", { 
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax"
  });
  
  // 2. Gunakan redirect ke alamat yang terdaftar di Middleware (misal: /login)
  const response = redirect("/auth/login?message=logout_success");

  // 3. Tambahkan header anti-cache agar user tidak bisa tekan tombol 'Back'
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
};