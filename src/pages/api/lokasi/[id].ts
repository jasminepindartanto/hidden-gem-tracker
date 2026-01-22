import type { APIRoute } from 'astro';
import sql from '../../../lib/db';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) return new Response(JSON.stringify({ error: "ID diperlukan" }), { status: 400 });

  try {
    const data = await sql`SELECT * FROM lokasi_wisata WHERE id = ${id}`;
    if (data.length === 0) return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });

    return new Response(JSON.stringify(data[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}