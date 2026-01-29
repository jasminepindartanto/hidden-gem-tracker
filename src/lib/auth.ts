import type { APIRoute } from "astro";
import bcrypt from "bcryptjs";
import sql from "@/lib/db";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashed: string
) {
  return bcrypt.compare(password, hashed);
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const form = await request.formData();

  const mode = form.get("mode");
  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();
  const displayName = form.get("displayName");
  

  if (!email || !password) {
    return new Response("Invalid input", { status: 400 });
  }


  // ======================
  // SIGN UP
  // ======================
  if (mode === "signup") {
  const email = form.get("email");
  const password = form.get("password");
  const displayName = form.get("displayName");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof displayName !== "string"
  ) {
    return new Response("Invalid input", { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (email, password, display_name)
    VALUES (${email}, ${hashed}, ${displayName})
  `;

  return new Response("Signup success");
  }


  // ======================
  // SIGN IN
  // ======================
  const [user] = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (!user) {
    return new Response("User not found", { status: 401 });
  }

  const valid = await bcrypt.compare(
    password.toString(),
    user.password
  );

  if (!valid) {
    return new Response("Wrong password", { status: 401 });
  }

  cookies.set("session", user.id, { path: "/" });

  return new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });
};
