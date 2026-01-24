import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  response.headers.set(
    "Content-Security-Policy",
    `
      script-src 'self'
        https://maps.googleapis.com
        https://maps.gstatic.com
        'unsafe-eval'
        'unsafe-inline';

      style-src 'self'
        'unsafe-inline'
        https://fonts.googleapis.com;

      img-src 'self'
        data:
        https://maps.gstatic.com
        https://maps.googleapis.com;
    `.replace(/\s+/g, " ").trim()
  );

  return response;
});
