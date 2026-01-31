export type Destination = {
  id: number;

  provinsi: string;
  kotakabupaten: string;

  dtw: string;

  latitude: number;
  longitude: number;

  deskripsi_lengkap: string;
  url_foto: string | null;

  author: string | null;

  lokasi: string;

  tags: string | null;

  rating: number;     // NUMERIC(2,1) → JS number
  tanggal: string; 
};
