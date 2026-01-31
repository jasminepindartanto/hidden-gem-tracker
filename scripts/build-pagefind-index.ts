import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { createIndex, type PagefindIndex } from "pagefind";
import sql from "../src/lib/db"; // Pastikan path ini benar sesuai lokasi db.ts Anda

type ContentItem = {
  id: string;
  title: string;
  description: string;
  body: string;
  tags: string[];
  pubDate?: string;
  type: "card" | "blog" | "slide" | "destination";
  url: string;
  filePath: string;
};

// 1. Fungsi membaca file lokal (.md)
function readContentCollection(
  collectionPath: string,
  type: "card" | "blog" | "slide",
): ContentItem[] {
  const fullPath = join(process.cwd(), "src", "content", collectionPath);
  if (!existsSync(fullPath)) return [];

  const items: ContentItem[] = [];
  const entries = readdirSync(fullPath, { recursive: true, withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".md")) {
      const filePath = join((entry as any).path ?? entry.parentPath, entry.name);
      const content = readFileSync(filePath, "utf-8");
      const { data, content: body } = matter(content);
      const id = entry.name.replace(/\.md$/, "");
      const url = `/${type === "blog" ? "blogs" : type + "s"}/${id}`;

      items.push({ id, title: data.title || "", description: data.description || "", body, tags: data.tags || [], pubDate: data.pubDate, type, url, filePath });
    }
  }
  return items;
}

// 2. Fungsi membaca data dari Database SQL (Destinasi Wisata)
async function readDatabaseDestinations(): Promise<ContentItem[]> {
  try {
    const destinations = await sql`SELECT id, dtw, deskripsi_lengkap, author, tanggal FROM lokasi_wisata`;
    return destinations.map(dest => ({
      id: dest.id.toString(),
      title: dest.dtw,
      description: dest.deskripsi_lengkap?.substring(0, 160) || "",
      body: dest.deskripsi_lengkap || "",
      tags: ["Wisata", "Bandung"],
      pubDate: dest.tanggal,
      type: "blog", // Diarahkan ke blogs agar sesuai dengan route /blogs/[id]
      url: `/blogs/${dest.id}`,
      filePath: "database"
    }));
  } catch (e) {
    console.error("Gagal mengambil data DB:", e);
    return [];
  }
}

// 3. Fungsi pembantu untuk memasukkan item ke Pagefind
async function addItemsToIndex(items: ContentItem[], index: PagefindIndex) {
  for (const item of items) {
    await index.addCustomRecord({
      url: item.url,
      content: `<h1>${item.title}</h1><p>${item.description}</p><div>${item.body}</div>`,
      language: "id",
      meta: {
        title: item.title,
        description: item.description,
        keywords: item.tags.join(", "),
        type: item.type,
      },
      filters: { type: [item.type] },
    });
  }
}

// 4. Fungsi Utama Build
async function main() {
  console.log("Memulai proses indexing...");

  const cards = readContentCollection("cards", "card");
  const blogs = readContentCollection("blogs", "blog");
  const slides = readContentCollection("slides", "slide");
  const dbDestinations = await readDatabaseDestinations();

  const allItems = [...cards, ...blogs, ...slides, ...dbDestinations];
  console.log(`Ditemukan ${allItems.length} total item untuk diindeks.`);

  try {
    const { index } = await createIndex({});
    if (!index) throw new Error("Gagal inisialisasi Pagefind index");

    await addItemsToIndex(allItems, index);

    const outputPath = join(process.cwd(), "public", "_pagefind");
    await index.writeFiles({ outputPath });

    console.log(`Indeks berhasil dibuat di: ${outputPath}`);
    process.exit(0);
  } catch (error) {
    console.error("Error build index:", error);
    process.exit(1);
  }
}

main();