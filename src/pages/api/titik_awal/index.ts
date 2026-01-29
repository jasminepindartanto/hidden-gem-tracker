import type { APIRoute } from "astro";
import sql from "@/lib/db";

// GET: Mengambil semua daftar titik awal untuk dropdown
export const GET: APIRoute = async () => {
  try {
    const data = await sql`SELECT * FROM titik_awal ORDER BY nama_lokasi ASC`;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};

// POST: Menambah titik awal baru dari form admin
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { nama_lokasi, latitude, longitude, keterangan } = body;

    // Validasi tipe data agar tidak error ts(2345)
    const result = await sql`
      INSERT INTO titik_awal (nama_lokasi, latitude, longitude, keterangan)
      VALUES (${nama_lokasi}, ${Number(latitude)}, ${Number(longitude)}, ${keterangan || ""})
      RETURNING id
    `;

    return new Response(JSON.stringify(result[0]), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};