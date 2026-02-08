import fs from "node:fs/promises";
import path from "node:path";
import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  /* =========================
        PARSE DATA
  ========================= */

  const idRaw = formData.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const dtw = formData.get("dtw")?.toString().trim() ?? "";
  const lokasi = formData.get("lokasi")?.toString().trim() ?? "";
  const deskripsi = formData.get("deskripsi_lengkap")?.toString().trim() ?? "";
  const kategori = formData.get("kategori_akses")?.toString().trim() ?? "";

  // SAFE NUMBER PARSE
  const latitudeRaw = formData.get("latitude");
  const longitudeRaw = formData.get("longitude");
  const ratingRaw = formData.get("rating");

  const latitude =
    latitudeRaw && latitudeRaw !== "" ? Number(latitudeRaw) : null;

  const longitude =
    longitudeRaw && longitudeRaw !== "" ? Number(longitudeRaw) : null;

  const rating = ratingRaw && ratingRaw !== "" ? Number(ratingRaw) : null;

  /* =========================
        TAGS (POSTGRES ARRAY)
  ========================= */

  const tagsRaw = formData.get("tags")?.toString() ?? "";

  const tagsArray =
    tagsRaw.length > 0
      ? tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  /* =========================
        IMAGE UPLOAD
  ========================= */

  const fileEntry = formData.get("foto");
  let newImageUrl: string | null = null;

  if (fileEntry instanceof File && fileEntry.size > 0) {
    const buffer = Buffer.from(await fileEntry.arrayBuffer());

    const safeName = fileEntry.name.replace(/[^\w.-]/g, "_");
    const fileName = `${Date.now()}-${safeName}`;

    const uploadDir = path.join(process.cwd(), "public/uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    newImageUrl = `/uploads/${fileName}`;
  }

  /* ambil foto lama kalau edit tanpa upload */
  let finalImage = newImageUrl;

  if (id && !newImageUrl) {
    const old = await sql`
      SELECT url_foto FROM lokasi_wisata WHERE id=${id}
    `;
    finalImage = old[0]?.url_foto ?? null;
  }

  /* =========================
        DATABASE
  ========================= */

  if (id) {
    // UPDATE
    await sql`
      UPDATE lokasi_wisata SET
        dtw=${dtw},
        lokasi=${lokasi},
        latitude=${latitude},
        longitude=${longitude},
        rating=${rating},
        tags=${sql.array(tagsArray)},
        deskripsi_lengkap=${deskripsi},
        kategori_akses=${kategori},
        url_foto=${finalImage}
      WHERE id=${id}
    `;
  } else {
    // INSERT
    await sql`
      INSERT INTO lokasi_wisata
      (dtw, lokasi, latitude, longitude, rating, tags, deskripsi_lengkap, kategori_akses, url_foto)
      VALUES
      (${dtw}, ${lokasi}, ${latitude}, ${longitude}, ${rating}, ${sql.array(tagsArray)}, ${deskripsi}, ${kategori}, ${finalImage})
    `;
  }

  return new Response(null, {
    status: 303,
    headers: { Location: "/admin/destination" },
  });
};

// HANDLER UNTUK DELETE
export const DELETE: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ message: "ID diperlukan" }), {
      status: 400,
    });
  }

  try {
    await sql`DELETE FROM lokasi_wisata WHERE id = ${id}`;
    return new Response(JSON.stringify({ message: "Berhasil dihapus" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saat menghapus:", error);
    return new Response(JSON.stringify({ message: "Gagal menghapus data" }), {
      status: 500,
    });
  }
};
