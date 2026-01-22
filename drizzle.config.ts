import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // Ganti dengan lokasi folder skema kamu
  out: './drizzle',             // Folder tempat file migrasi akan dibuat
  dialect: 'postgresql',        // Karena kamu menggunakan PostgreSQL
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Mengambil URL dari .env kamu
  },
});