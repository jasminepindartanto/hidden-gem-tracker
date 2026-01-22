import type { APIRoute } from 'astro';
import sql from '../../../lib/db';

export const GET: APIRoute = async () => {
  try {
    const data = await sql`SELECT * FROM lokasi_wisata ORDER BY id ASC`;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}