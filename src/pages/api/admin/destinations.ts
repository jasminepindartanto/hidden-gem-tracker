import type { APIRoute } from "astro";
import sql from "@/lib/db";

// HANDLER UNTUK DELETE
export const DELETE: APIRoute = async ({ url }) => {
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ message: "ID diperlukan" }), { status: 400 });
  }

  try {
    await sql`DELETE FROM lokasi_wisata WHERE id = ${id}`;
    return new Response(JSON.stringify({ message: "Berhasil dihapus" }), { status: 200 });
  } catch (error) {
    console.error("Error saat menghapus:", error);
    return new Response(JSON.stringify({ message: "Gagal menghapus data" }), { status: 500 });
  }
};

// HANDLER UNTUK UPDATE (PUT)
export const PUT: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Pastikan ID ada
    if (!data.id) {
        return new Response(JSON.stringify({ error: "ID tidak ditemukan" }), { status: 400 });
    }

    // Penanganan Tags: Jika datang sebagai string, ubah jadi array
    const tagsArray = typeof data.tags === 'string' 
        ? data.tags.split(",").map((t: string) => t.trim()) 
        : data.tags;

    await sql`
      UPDATE lokasi_wisata SET 
        dtw = ${data.dtw},
        lokasi = ${data.lokasi},
        rating = ${parseFloat(data.rating) || 0},
        tags = ${tagsArray}
      WHERE id = ${data.id}
    `;

    return new Response(JSON.stringify({ message: "Success update data" }), { status: 200 });
  } catch (error) {
    console.error("Gagal update:", error);
    return new Response(JSON.stringify({ error: "Gagal update database" }), { status: 500 });
  }
};