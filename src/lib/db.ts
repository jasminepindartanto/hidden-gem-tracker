import postgres from "postgres";

// Astro 5 menggunakan import.meta.env untuk membaca .env
const sql = postgres(import.meta.env.DATABASE_URL);

export default sql;
