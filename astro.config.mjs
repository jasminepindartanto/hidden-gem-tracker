import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@inox-tools/sitemap-ext";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { analyzer } from "vite-bundle-analyzer";
import { env } from "./src/env";

export default defineConfig({
  /* ================= IMAGE (INI YANG PENTING) ================= */
  image: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4321",
        pathname: "/uploads/**",
      },
    ],
    domains: ["public-files.gumroad.com"],
  },

  /* ================= SERVER ================= */
  output: "server",
  trailingSlash: "never",

  security: {
    checkOrigin: false,
  },

  site: env().SITE_URL,

  /* ================= MARKDOWN ================= */
  markdown: {
    rehypePlugins: [rehypeSanitize(defaultSchema)],
  },

  /* ================= INTEGRATIONS ================= */
  integrations: [
    react({
      include: [
        "**/components/image-viewer.tsx",
        "**/components/slide/slide-viewer.tsx",
      ],
    }),

    mdx({
      rehypePlugins: [rehypeSanitize(defaultSchema)],
    }),

    sitemap({
      includeByDefault: true,
    }),
  ],

  /* ================= ADAPTER ================= */
  adapter: vercel({
    imageService: true,
  }),

  /* ================= VITE ================= */
  vite: {
    plugins: [
      tailwindcss({ applyBaseStyles: false }),
      process.env.ANALYZE &&
        analyzer({
          analyzerMode: "static",
          reportFilename: "dist/bundle-report.html",
          openAnalyzer: false,
        }),
    ].filter(Boolean),
  },
});
