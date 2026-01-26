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
    return new Response("Invalid form", { status: 400 });
  }

  // =====================
  // SIGN UP
  // =====================
  
  if (mode === "signup") {
    const hashed = await hashPassword(password);

    // Ambil hasil query sebagai array dan ambil elemen pertama
    const result = await sql`
      INSERT INTO users (email, password, display_name)
      VALUES (${email}, ${hashed}, ${displayName})
      RETURNING id
    `;
    
    const newUser = result[0]; // Ini akan menghilangkan error .id

    cookies.set("session", String(newUser.id), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return redirect("/");
  }

  // =====================
  // SIGN IN
  // =====================
  // Beri nama berbeda agar tidak konflik dengan newUser
  const [foundUser] = await sql<{ id: number; password: string }[]>`
    SELECT id, password FROM users WHERE email = ${email}
  `;

  if (!foundUser) {
    return new Response("User not found", { status: 401 });
  }

  const valid = await comparePassword(password, foundUser.password);

  if (!valid) {
    return new Response("Wrong password", { status: 401 });
  }

  cookies.set("session", String(foundUser.id), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  return redirect("/");
};