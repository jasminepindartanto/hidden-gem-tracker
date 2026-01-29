import React, { useState } from 'react';

// 1. Definisikan tipe prop
interface DestinationFormProps {
  mode?: 'add' | 'edit';
}

// 2. Tangkap prop 'mode'
export const DestinationForm = ({ mode = 'add' }: DestinationFormProps) => {
  const isEdit = mode === 'edit';
  const [isFeatured, setIsFeatured] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const inputClass = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 text-slate-800 font-medium placeholder:text-slate-400 hover:border-slate-300";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2";
  const sectionClass = "bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6 transition-all duration-300 hover:shadow-md";

  return (
    <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* --- KOLOM KIRI --- */}
      <div className="lg:col-span-2 space-y-8">
        <div className={sectionClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-900">General & Location</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className={labelClass}>Destination Name</label>
              <input type="text" id="name" placeholder="e.g. Kopi di Bawah Pohon" className={inputClass} />
            </div>
            <div>
              <label htmlFor="category" className={labelClass}>Category</label>
              <select id="category" className={`${inputClass} cursor-pointer`}>
                <option value="">Select Category</option>
                <option value="nature">Nature</option>
                <option value="culinary">Culinary</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>
            <div className="md:col-span-2">
               <label htmlFor="address" className={labelClass}>Location Address</label>
               <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
                  </span>
                 <input type="text" id="address" placeholder="Jl. Raya Lembang No. 123, Bandung" className={`${inputClass} pl-12`} />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lat" className={labelClass}>Latitude</label>
                <input type="text" id="lat" placeholder="-6.8245" className={inputClass} />
              </div>
              <div>
                <label htmlFor="long" className={labelClass}>Longitude</label>
                <input type="text" id="long" placeholder="107.6191" className={inputClass} />
              </div>
            </div>
             <div className="flex items-end">
                <button type="button" className="w-full bg-emerald-50 text-emerald-600 font-bold py-3.5 rounded-xl hover:bg-emerald-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-emerald-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-4.3-4.3"/><circle cx="11" cy="11" r="8"/></svg>
                    Verify on Map
                </button>
             </div>
          </div>
        </div>

        <div className={sectionClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-900">Destination Details</h2>
          </div>
          <div>
            <label htmlFor="description" className={labelClass}>Detailed Description</label>
            <textarea id="description" rows={6} placeholder="Tell the story..." className={`${inputClass} resize-none leading-relaxed`}></textarea>
          </div>
        </div>
      </div>

      {/* --- KOLOM KANAN --- */}
      <div className="space-y-8">
        <div className={sectionClass}>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Media Gallery</h2>
          <div className="group border-2 border-dashed border-slate-200 rounded-[28px] bg-slate-50/50 p-10 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:border-emerald-400 hover:bg-emerald-50/30">
             <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-emerald-500 transition-transform group-hover:scale-110 group-hover:rotate-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
             </div>
             <p className="text-sm font-bold text-slate-700">Upload Photos</p>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-xl font-bold text-slate-900 mb-6">Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
              <div>
                  <p className="font-bold text-slate-900 text-sm">Featured</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Show on hero section</p>
              </div>
              <button type="button" onClick={() => setIsFeatured(!isFeatured)} className={`relative w-12 h-7 rounded-full transition-all focus:outline-none ${isFeatured ? 'bg-emerald-500 shadow-md shadow-emerald-500/30' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform transform ${isFeatured ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
            </div>

             <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
              <div>
                  <p className="font-bold text-slate-900 text-sm">Visible</p>
                  <p className="text-[10px] text-slate-500 leading-tight">Publish immediately</p>
              </div>
               <button type="button" onClick={() => setIsVisible(!isVisible)} className={`relative w-12 h-7 rounded-full transition-all focus:outline-none ${isVisible ? 'bg-emerald-500 shadow-md shadow-emerald-500/30' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform transform ${isVisible ? 'translate-x-5' : 'translate-x-0'}`}></div>
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Buttons dengan Logika Dinamis */}
      <div className="lg:col-span-3 flex justify-end items-center gap-6 pt-10 border-t border-slate-100">
        <button type="button" onClick={() => window.history.back()} className="px-8 py-3.5 font-bold text-slate-500 hover:text-slate-900 transition-colors">Cancel</button>
        <div className="flex gap-4">
          <button type="button" className="px-8 py-3.5 font-bold text-slate-600 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all">Save Draft</button>
          <button type="submit" className="px-12 py-3.5 font-bold text-white bg-emerald-500 rounded-2xl hover:bg-emerald-600 hover:shadow-emerald-500/20 active:scale-95 transition-all shadow-lg">
              {/* Teks dinamis sesuai mode */}
              {isEdit ? 'Update Destination' : 'Publish Now'}
          </button>
        </div>
      </div>
    </form>
  );
};