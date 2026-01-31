// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import sql from "@/lib/db"; 

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;

  // ⛔ API HARUS LEWAT TANPA REDIRECT
  if (path.startsWith("/api/")) {
    return next();
  }

  const sessionId = context.cookies.get("session")?.value;
  const isLoggedIn = Boolean(sessionId);

  const publicPages = ["/login", "/signup", "/auth/login", "/admin/auth"];
  const isPublicPage = publicPages.some(p => path === p || path.startsWith(p + "/"));

  let userRole = null;
  if (sessionId) {
    const users = await sql`
      SELECT role FROM users 
      WHERE id::text = ${sessionId} OR email = ${sessionId}
    `;
    if (users.length > 0) {
      userRole = users[0].role?.toLowerCase();
    }
  }

  // Proteksi admin
  if (path.startsWith("/admin") && !isPublicPage) {
    if (!isLoggedIn) {
      return context.redirect("/auth/login");
    }
    if (userRole !== "admin") {
      return context.redirect("/?error=unauthorized");
    }
  }

  // Jangan redirect API
  if (isLoggedIn && isPublicPage) {
    const target = userRole === "admin" ? "/admin" : "/";
    return context.redirect(target);
  }

  return next();
});
