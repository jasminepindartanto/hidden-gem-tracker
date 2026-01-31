import type { APIRoute } from "astro";
import sql from "@/lib/db";
import { hashPassword, comparePassword } from "@/lib/auth";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const email = form.get("email")?.toString() || "";
  const password = form.get("password")?.toString() || "";
  const displayName = form.get("displayName")?.toString() || "";
  const mode = form.get("mode")?.toString() || "";

  if (!email || !password || (mode === "signup" && !displayName)) {
    return new Response("Data tidak valid", { status: 400 });
  }

  // Konfigurasi Cookie yang AMAN untuk Localhost & Terbaca di seluruh Path
  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: false, // Set FALSE jika masih pakai http://localhost
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24, // 1 hari
  };

  // --- SKENARIO 1: DAFTAR (SIGN UP) ---
  if (mode === "signup") {
    try {
      const hashed = await hashPassword(password);
      const result = await sql`
        INSERT INTO users (email, password, display_name, role)
        VALUES (${email}, ${hashed}, ${displayName}, 'user')
        RETURNING id
      `;
      
      const newUser = result[0]; 
      cookies.set("session", String(newUser.id), cookieOptions);
      return redirect("/"); 
    } catch (e) {
      return new Response("Email sudah terdaftar", { status: 400 });
    }
  }

  // --- SKENARIO 2: MASUK (SIGN IN) ---
  const [foundUser] = await sql<{ id: number; password: string; role: string }[]>`
    SELECT id, password, role FROM users WHERE email = ${email}
  `;

  if (!foundUser) {
    return redirect("/login?error=unauthorized&message=User tidak ditemukan");
  }

  const isValid = await comparePassword(password, foundUser.password);

  if (!isValid) {
    return redirect("/login?error=unauthorized&message=Password salah");
  }

  // PERBAIKAN: Gunakan foundUser.id (sesuai variabel hasil query)
  cookies.set("session", String(foundUser.id), cookieOptions);

  // Jika admin, arahkan ke dashboard admin
  if (foundUser.role === 'admin') {
    return redirect("/admin");
  }

  return redirect("/");
};