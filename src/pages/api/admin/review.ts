// src/pages/api/admin/review.ts
import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const DELETE: APIRoute = async ({ url }) => {
  try {
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ error: "ID Kosong" }), { status: 400 });
    }

    // DEBUG: Cek apakah ID benar-benar masuk ke server
    console.log("Menghapus ID:", id);

    // EKSEKUSI: Pastikan nama tabel 'reviews' sesuai dengan di DB Anda
    const result = await sql`DELETE FROM ulasan WHERE id = ${id}`;

    return new Response(JSON.stringify({ message: "Berhasil" }), { status: 200 });
  } catch (error: any) {
    // Pesan ini akan muncul di TERMINAL VS CODE Anda
    console.error("DATABASE ERROR:", error.message); 
    
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};