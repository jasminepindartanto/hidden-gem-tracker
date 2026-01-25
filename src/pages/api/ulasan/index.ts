import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const POST: APIRoute = async ({ request, redirect }) => { // Tambahkan redirect di sini
  try {
    const formData = await request.formData();

    const lokasiIdRaw = formData.get("lokasi_id");
    const namaUserRaw = formData.get("nama_user");
    const ratingRaw = formData.get("rating");
    const komentarRaw = formData.get("komentar");

    if (!lokasiIdRaw || !namaUserRaw || !ratingRaw) {
      return new Response(
        JSON.stringify({ message: "Data tidak lengkap" }),
        { status: 400 }
      );
    }

    const lokasiId = Number(lokasiIdRaw);
    const namaUser = String(namaUserRaw);
    const rating = Number(ratingRaw);
    const komentar = komentarRaw ? String(komentarRaw) : null;


    if (!lokasiId || !namaUser || !rating) {
      return new Response(JSON.stringify({ message: "Data tidak lengkap" }), {
        status: 400,
      });
    }

    await sql`
      INSERT INTO ulasan (lokasi_id, nama_user, rating, komentar)
      VALUES (${lokasiId}, ${namaUser}, ${rating}, ${komentar})
    `;

   return redirect("/reviews", 303); 

  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Server Error", error: error.message }),
      { status: 500 }
    );
  }
};
