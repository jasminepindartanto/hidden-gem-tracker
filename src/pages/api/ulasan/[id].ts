import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ message: "ID Lokasi diperlukan" }),
      { status: 400 }
    );
  }

  try {
    const ulasan = await sql`
      SELECT * FROM ulasan
      WHERE lokasi_id = ${id}
      ORDER BY tanggal DESC
    `;

    return new Response(JSON.stringify(ulasan), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Server Error", error: error.message }),
      { status: 500 }
    );
  }
};
