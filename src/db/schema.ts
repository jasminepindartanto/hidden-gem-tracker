import { pgTable, serial, text, varchar, date } from 'drizzle-orm/pg-core';

export const lokasiWisata = pgTable('lokasi_wisata', {
  id: serial('id').primaryKey(),
  provinsi: varchar('provinsi', { length: 20 }),
  kotakabupaten: varchar('kotakabupaten', { length: 35 }),
  dtw: varchar('dtw', { length: 50 }),
  latitude: varchar('latitude', { length: 100 }),
  longitude: varchar('longitude', { length: 100 }),
  tanggal: date('tanggal'), // Garis merah hilang karena 'date' sudah di-import di atas
  url_foto: text('url_foto'), // Kolom baru untuk link gambar
  deskripsi_lengkap: text('deskripsi_lengkap'), // Kolom baru untuk isi blog
});