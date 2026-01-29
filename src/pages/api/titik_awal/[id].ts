import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  
  // Validasi ID agar tidak undefined
  if (!id) return new Response(null, { status: 400 });

  try {
    await sql`DELETE FROM titik_awal WHERE id = ${id}`;
    return new Response(null, { status: 204 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};