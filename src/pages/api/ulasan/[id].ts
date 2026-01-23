import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: "ID Lokasi diperlukan" }), { status: 400 });
  }

  try {
    // Mengambil ulasan yang terhubung ke lokasi_id tertentu
    const ulasan = await sql`
      SELECT * FROM ulasan 
      WHERE lokasi_id = ${id} 
      ORDER BY tanggal DESC
    `;

    return new Response(JSON.stringify(ulasan), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Gagal mengambil data", error }), { status: 500 });
  }
};