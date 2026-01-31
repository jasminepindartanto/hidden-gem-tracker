import React, { useState } from 'react';

interface DestinationFormProps {
  mode?: 'add' | 'edit';
  initialData?: any;
}

export const DestinationForm = ({ mode = 'add', initialData }: DestinationFormProps) => {
  const isEdit = mode === 'edit';
  const [isFeatured, setIsFeatured] = useState(initialData?.featured || false);

  // Perbaikan fungsi val: Menangani array taqs agar bisa muncul di input teks
  const val = (key: string) => {
    const value = initialData?.[key];
    if (key === 'taqs' && Array.isArray(value)) {
      return value.join(', '); // Ubah ['A', 'B'] jadi "A, B"
    }
    return value || '';
  };

  const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 text-slate-800 font-medium placeholder:text-slate-400 hover:border-slate-300";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2";
  const sectionClass = "bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6 transition-all duration-300 hover:shadow-md";

  return (
    <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20" method="POST">
      {isEdit && <input type="hidden" name="id" value={initialData?.id} />}

      {/* --- KOLOM KIRI (UTAMA) --- */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Section 1: General & Location */}
        <div className={sectionClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-900">General & Location</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="dtw_id" className={labelClass}>Destination Name</label>
              <input id="dtw_id" name="dtw" defaultValue={val('dtw')} className={inputClass} required />
            </div>

            <div>
              <label htmlFor="taqs_id" className={labelClass}>Category / Tags (Pisahkan dengan koma)</label>
              <input id="taqs_id" name="taqs" defaultValue={val('tags')} className={inputClass} placeholder="Contoh: Alam, Kuliner" />
            </div>

            <div>
              <label htmlFor="rating_id" className={labelClass}>Rating</label>
              <input id="rating_id" name="rating" type="number" step="0.1" defaultValue={val('rating')} className={inputClass} />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="lokasi_id" className={labelClass}>Location Address</label>
              <input id="lokasi_id" name="lokasi" defaultValue={val('lokasi')} className={inputClass} />
            </div>

            <div>
              <label htmlFor="lat_id" className={labelClass}>Latitude</label>
              <input id="lat_id" name="latitude" defaultValue={val('latitude')} className={inputClass} />
            </div>

            <div>
              <label htmlFor="long_id" className={labelClass}>Longitude</label>
              <input id="long_id" name="longitude" defaultValue={val('longitude')} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Section 2: Deskripsi */}
        <div className={sectionClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-900">Description</h2>
          </div>
          <div>
            <label htmlFor="desc_id" className={labelClass}>Detailed Description</label>
            <textarea id="desc_id" name="deskripsi_lengkap" rows={8} defaultValue={val('deskripsi_lengkap')} className={`${inputClass} resize-none`}></textarea>
          </div>
        </div>
      </div>

      {/* --- KOLOM KANAN (SIDEBAR) --- */}
      <div className="space-y-8">
        {/* Section 3: Media */}
        <div className={sectionClass}>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Media Gallery</h2>
          <div>
            <label htmlFor="photo_id" className={labelClass}>Photo URL</label>
            <input id="photo_id" name="url_foto" defaultValue={val('url_foto')} className={inputClass} />
          </div>
        </div>

        {/* Section 4: Settings (Sekarang berada di luar Section 1) */}
        <div className={sectionClass}>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
              <div>
                  <p className="font-bold text-slate-900 text-sm">Featured</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Show on hero section</p>
              </div>
              <button 
                type="button" 
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

      {/* Action Buttons */}
      <div className="lg:col-span-3 flex justify-end items-center gap-6 pt-10 border-t border-slate-100">
        <button type="button" onClick={() => window.history.back()} className="px-8 py-3.5 font-bold text-slate-500">Cancel</button>
        <button type="submit" className="px-12 py-3.5 font-bold text-white bg-emerald-500 rounded-2xl hover:bg-emerald-600 shadow-lg transition-all active:scale-95">
            {isEdit ? 'Update Destination' : 'Publish Now'}
        </button>
      </div>
    </form>
  );
};