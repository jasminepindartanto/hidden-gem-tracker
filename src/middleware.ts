import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const isLoggedIn = Boolean(context.cookies.get("session")?.value);

  // proteksi halaman
  if (
    context.url.pathname.startsWith("/") &&
    !isLoggedIn
  ) {
    return context.redirect("/login");
  }

  // lanjut request
  const response = await next();

  // SET CSP DI SINI
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' https://maps.googleapis.com https://maps.gstatic.com 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://maps.googleapis.com",
    ].join("; ")
  );

  return response;
});
