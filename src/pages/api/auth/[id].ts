import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params; // Ambil ID dari params

  // 1. Validasi ID agar TypeScript tidak error ts(2769)
  if (!id) {
    return new Response(JSON.stringify({ message: "ID is required" }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // 2. Query ke database menggunakan ID yang sudah divalidasi
    const users = await sql`
      SELECT id, email, display_name, tanggal 
      FROM users 
      WHERE id = ${id}
    `;

    // 3. Cek apakah user ditemukan
    if (users.length === 0) {
      return new Response(JSON.stringify({ message: "User not found" }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    const user = users[0];

    // 4. Kirim data user sebagai JSON
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: "Server Error", error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};