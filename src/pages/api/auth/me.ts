// src/pages/api/auth/me.ts
import type { APIRoute } from "astro";
import sql from "@/lib/db";

export const GET: APIRoute = async ({ cookies }) => {
  const sessionId = cookies.get("session")?.value;

  if (!sessionId) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  const users = await sql`
    SELECT id, display_name, email, role
    FROM users
    WHERE id::text = ${sessionId} OR email = ${sessionId}
    LIMIT 1
  `;

  if (users.length === 0) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  const user = users[0];

  return new Response(
    JSON.stringify({
      id: user.id,
      name: user.display_name, // ⬅️ INI KUNCI
      email: user.email,
      role: user.role
    }),
    { status: 200 }
  );
};
