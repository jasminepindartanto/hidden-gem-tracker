import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const GET: APIRoute = async ({ cookies }) => {
  const sessionId = cookies.get("session")?.value; // Sesuaikan dengan middleware
  
  if (!sessionId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const users = await sql`SELECT display_name, role FROM users WHERE id::text = ${sessionId} LIMIT 1`;
  
  if (users.length === 0) return new Response(null, { status: 404 });

  // Kirim objek pertama saja
  return new Response(JSON.stringify(users[0]), { status: 200 });
};