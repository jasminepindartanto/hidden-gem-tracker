import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const PUT: APIRoute = async ({ request }) => {
  const data = await request.json();
  try {
    await sql`
      UPDATE lokasi_wisata SET 
        dtw = ${data.dtw},
        lokasi = ${data.lokasi},
        rating = ${data.rating},
        tags = ${data.tags}
      WHERE id = ${data.id}
    `;
    return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Gagal update" }), { status: 500 });
  }
};