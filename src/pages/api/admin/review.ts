import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const DELETE: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id");
  if (!id) return new Response(null, { status: 400 });

  try {
    await sql`DELETE FROM ulasan WHERE id = ${id}`;
    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
};