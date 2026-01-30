import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const data = await request.formData();
    
    // 1. Ambil data mentah dari form
    const lokasiIdRaw = data.get("lokasi_id");
    const userIdRaw = data.get("user_id");
    const namaUserRaw = data.get("nama_user");
    const komentarRaw = data.get("komentar");
    const ratingRaw = data.get("rating");

    // 2. Konversi tipe data agar aman
    const lokasiId = Number(lokasiIdRaw);
    const userId = userIdRaw ? Number(userIdRaw) : null;
    const namaUser = String(namaUserRaw);
    const rating = Number(ratingRaw);
    const komentar = komentarRaw ? String(komentarRaw) : null;

    // 3. Validasi data wajib
    if (!lokasiId || !namaUser || !rating) {
      return new Response(
        JSON.stringify({ message: "Data tidak lengkap. Pastikan destinasi, nama, dan rating terisi." }), 
        { status: 400 }
      );
    }

    // 4. Jalankan Query (Gunakan nama kolom rating_user sesuai skema Anda)
    await sql`
      INSERT INTO ulasan (user_id, lokasi_id, nama_user, komentar, rating, tanggal)
      VALUES (${userId}, ${lokasiId}, ${namaUser}, ${komentar}, ${rating}, NOW())
    `;

    // 5. Redirect ke halaman ulasan dengan status sukses
    return redirect("/reviews?success=true", 303); 

  } catch (error: any) {
    console.error("Database Error:", error);
    return new Response(
      JSON.stringify({ message: "Gagal menyimpan ulasan", error: error.message }),
      { status: 500 }
    );
  }
};