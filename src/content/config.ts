import { defineCollection, z } from 'astro:content';
import postgres from 'postgres'; // Pastikan sudah install: pnpm add postgres


const dbUrl = import.meta.env.DATABASE_URL;

// 1. Inisialisasi koneksi (Ganti dengan URL DB kamu)
const sql = postgres('postgres://postgres:12345@localhost:5432/hidden');

const produk = defineCollection({
  // 2. Gunakan loader kustom
  loader: async () => {
    const data = await sql`SELECT id, nama as title, deskripsi FROM products`;
    
    // Astro mewajibkan setiap data punya properti 'id' yang unik
    return data.map((item) => ({
      id: item.id.toString(),
      ...item
    }));
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    deskripsi: z.string(),
  })
});

export const collections = { produk };