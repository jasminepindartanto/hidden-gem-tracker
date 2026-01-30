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

  const cookieOptions = {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
    // maxAge: 60 * 60 * 24,
  };

  // =====================
  // SKENARIO 1: DAFTAR (SIGN UP)
  // =====================
  if (mode === "signup") {
    const hashed = await hashPassword(password);

    // 1. SIMPAN DULU KE DATABASE
    const result = await sql`
      INSERT INTO users (email, password, display_name, role)
      VALUES (${email}, ${hashed}, ${displayName}, 'user')
      RETURNING id
    `;
    
    // 2. AMBIL ID NYA
    const newUser = result[0]; 

    // 3. SET COOKIE
    cookies.set("session", String(newUser.id), cookieOptions);

    // 4. TERAKHIR BARU REDIRECT
    return redirect("/"); 
  }

  // =====================
  // SKENARIO 2: MASUK (SIGN IN)
  // =====================
  const [foundUser] = await sql<{ id: number; password: string }[]>`
    SELECT id, password FROM users WHERE email = ${email}
  `;

  if (!foundUser) {
    return new Response("User tidak ditemukan", { status: 401 });
  }

  const valid = await comparePassword(password, foundUser.password);

  if (!valid) {
    return new Response("Password salah", { status: 401 });
  }

  cookies.set("session", String(foundUser.id), cookieOptions);

  return redirect("/");
};