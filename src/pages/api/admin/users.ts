import type { APIRoute } from "astro";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    await sql`
      INSERT INTO users (email, password, display_name, role, tanggal)
      VALUES (${data.email}, ${hashedPassword}, ${data.display_name}, ${data.role}, NOW())
    `;
    return new Response(JSON.stringify({ message: "User created" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  const data = await request.json();
  try {
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      await sql`UPDATE users SET display_name=${data.display_name}, role=${data.role}, password=${hashedPassword} WHERE id=${data.id}`;
    } else {
      await sql`UPDATE users SET display_name=${data.display_name}, role=${data.role} WHERE id=${data.id}`;
    }
    return new Response(JSON.stringify({ message: "User updated" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id"); // Ambil ID dari URL

  if (!id) {
    return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), { status: 400 });
  }

  try {
    // Hapus user dari database
    await sql`DELETE FROM users WHERE id = ${id}`;
    return new Response(JSON.stringify({ message: "User deleted" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Gagal menghapus data" }), { status: 500 });
  }
};