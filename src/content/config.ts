// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import postgres from 'postgres';

// 1. Inisialisasi koneksi Database (untuk produk)
const sql = postgres('postgres://postgres:12345@localhost:5432/hidden');

const produk = defineCollection({
  loader: async () => {
    const data = await sql`SELECT id, nama as title, deskripsi FROM products`;
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

// 2. Definisi Koleksi Reviews (Berbasis Markdown/Content)
const reviews = defineCollection({
  type: 'content', // Gunakan 'content' agar bisa membaca file .md di folder src/content/reviews/
  schema: z.object({
    userName: z.string(),
    userImage: z.string().optional(),
    location: z.string(),
    rating: z.number().min(1).max(5),
    pubDate: z.coerce.date(), // Menggunakan z.coerce.date() agar string tanggal otomatis jadi objek Date
    content: z.string(),
    images: z.array(z.string()).optional(),
  }),
});

// 3. DAFTARKAN KEDUA KOLEKSI DI SINI
export const collections = { 
  produk, 
  reviews 
};