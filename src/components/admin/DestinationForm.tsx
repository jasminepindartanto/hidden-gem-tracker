import React, { useState } from 'react';

interface DestinationFormProps {
  mode?: 'add' | 'edit';
  initialData?: any;
}

export const DestinationForm = ({ mode = 'add', initialData }: DestinationFormProps) => {
  const isEdit = mode === 'edit';
  
  // Inisialisasi State
  const [isFeatured, setIsFeatured] = useState(initialData?.featured === 'true' || initialData?.featured === true);
  const [kategoriAkses, setKategoriAkses] = useState(initialData?.kategori_akses || 'non-hidden');

  // Helper untuk mengambil nilai awal
  const val = (key: string) => {
    const value = initialData?.[key];
    // Menangani array tags/taqs agar menjadi string dipisah koma
    if ((key === 'tags' || key === 'taqs') && Array.isArray(value)) {
      return value.join(', ');
    }
    return value || '';
  };

  const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 text-slate-800 font-medium placeholder:text-slate-400 hover:border-slate-300";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2 cursor-pointer";
  const sectionClass = "bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6";

  return (
    <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20" method="POST">
      {/* ID Hidden hanya untuk mode Edit */}
      {isEdit && <input type="hidden" name="id" value={initialData?.id} />}

      <div className="lg:col-span-2 space-y-8">
        <div className={sectionClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-900">General & Location</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="dtw_name" className={labelClass}>Destination Name</label>
              <input id="dtw_name" name="dtw" defaultValue={val('dtw')} className={inputClass} required />
            </div>

            <div>
              <label htmlFor="tags_input" className={labelClass}>Category / Tags (Gunakan Koma)</label>
              <input id="tags_input" name="tags" defaultValue={val('tags')} className={inputClass} placeholder="Alam, Kuliner" />
            </div>

            <div>
              <label htmlFor="rating_val" className={labelClass}>Rating</label>
              <input id="rating_val" name="rating" type="number" step="0.1" defaultValue={val('rating')} className={inputClass} />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="lokasi_input" className={labelClass}>Location Address</label>
              <input id="lokasi_input" name="lokasi" defaultValue={val('lokasi')} className={inputClass} />
            </div>

            <div>
              <label htmlFor="lat_input" className={labelClass}>Latitude</label>
              <input id="lat_input" name="latitude" defaultValue={val('latitude')} className={inputClass} />
            </div>

            <div>
              <label htmlFor="long_input" className={labelClass}>Longitude</label>
              <input id="long_input" name="longitude" defaultValue={val('longitude')} className={inputClass} />
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-900">Description</h2>
          </div>
          <label htmlFor="desc_input" className={labelClass}>Detailed Description</label>
          <textarea id="desc_input" name="deskripsi_lengkap" rows={8} defaultValue={val('deskripsi_lengkap')} className={`${inputClass} resize-none`}></textarea>
        </div>
      </div>

      <div className="space-y-8">
        <div className={sectionClass}>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Media Gallery</h2>
          <label htmlFor="photo_url" className={labelClass}>Photo URL</label>
          <input id="photo_url" name="url_foto" defaultValue={val('url_foto')} className={inputClass} />
        </div>

        <div className={sectionClass}>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Settings</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="akses_select" className={labelClass}>Kategori Akses</label>
              <select 
                id="akses_select"
                name="kategori_akses" 
                value={kategoriAkses} 
                onChange={(e) => setKategoriAkses(e.target.value)}
                className={inputClass}
              >
                <option value="non-hidden">Populer (Non-Hidden)</option>
                <option value="hidden">Hidden Gem (Efek Mengkilat)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
              <div>
                  <p id="featured_label" className="font-bold text-slate-900 text-sm">Featured</p>
                  <p className="text-[10px] text-slate-500">Show on hero section</p>
              </div>
              <button 
                type="button" 
                aria-labelledby="featured_label"
                onClick={() => setIsFeatured(!isFeatured)} 
                className={`relative w-12 h-7 rounded-full transition-all ${isFeatured ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${isFeatured ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
              <input type="hidden" name="featured" value={isFeatured ? 'true' : 'false'} />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 flex justify-end items-center gap-6 pt-10 border-t border-slate-100">
        <button 
          type="button" 
          onClick={() => { window.location.href = '/admin'; }} 
          className="px-8 py-3.5 font-bold text-slate-500 hover:text-slate-700"
        >
          Cancel
        </button>
        <button type="submit" className="px-12 py-3.5 font-bold text-white bg-emerald-500 rounded-2xl hover:bg-emerald-600 shadow-lg active:scale-95 transition-all">
            {isEdit ? 'Update Destination' : 'Publish Now'}
        </button>
      </div>
    </form>
  );
};