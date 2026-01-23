import type { APIRoute } from "astro";
import sql from "@/lib/db";

// POST: Menyimpan ulasan baru dari user ke database
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { lokasiId, namaUser, rating, komentar } = data;

    // Validasi data sederhana
    if (!lokasiId || !namaUser || !rating) {
      return new Response(JSON.stringify({ message: "Data tidak lengkap" }), { status: 400 });
    }

    // Insert ke tabel ulasan di PostgreSQL
    await sql`
      INSERT INTO ulasan (lokasi_id, nama_user, rating, komentar)
      VALUES (${lokasiId}, ${namaUser}, ${rating}, ${komentar})
    `;

    return new Response(JSON.stringify({ message: "Ulasan berhasil dikirim!" }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server Error", error }), { status: 500 });
  }
};