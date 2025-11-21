export default function SymptomCheckUI() {
  return (
    <div className="flex min-h-screen justify-center bg-slate-100 py-10">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-md">
        {/* Title */}
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Pengecekan Gejala
        </h1>

        {/* Form Scroll */}
        <div className="custom-scroll max-h-[65vh] space-y-7 overflow-y-auto pr-2">
          {/* Question 1 */}
          <div className="flex flex-col gap-2">
            <label className="leading-relaxed font-medium text-gray-700">
              Apakah Anda merasakan nyeri atau sensasi terbakar saat buang air
              kecil?
            </label>
            <select className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition outline-none focus:bg-white focus:ring-2 focus:ring-teal-600">
              <option value="">Pilih opsi</option>
              <option value="Ya">Ya</option>
              <option value="Tidak">Tidak</option>
            </select>
          </div>

          {/* Question 2 */}
          <div className="flex flex-col gap-2">
            <label className="leading-relaxed font-medium text-gray-700">
              Apakah keluar cairan kental seperti nanah (berwarna kuning/hijau)
              dari alat kelamin?
            </label>
            <select className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition outline-none focus:bg-white focus:ring-2 focus:ring-teal-600">
              <option value="">Pilih opsi</option>
              <option value="Ya">Ya</option>
              <option value="Tidak">Tidak</option>
            </select>
          </div>

          {/* Question 3 */}
          <div className="flex flex-col gap-2">
            <label className="leading-relaxed font-medium text-gray-700">
              Apakah terdapat luka terbuka (seperti sariawan) di area kelamin
              yang TIDAK terasa nyeri?
            </label>
            <select className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition outline-none focus:bg-white focus:ring-2 focus:ring-teal-600">
              <option value="">Pilih opsi</option>
              <option value="Ya">Ya</option>
              <option value="Tidak">Tidak</option>
            </select>
          </div>

          {/* Question 4 */}
          <div className="flex flex-col gap-2">
            <label className="leading-relaxed font-medium text-gray-700">
              Apakah muncul ruam kemerahan di tubuh, khususnya di telapak tangan
              atau kaki?
            </label>
            <select className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition outline-none focus:bg-white focus:ring-2 focus:ring-teal-600">
              <option value="">Pilih opsi</option>
              <option value="Ya">Ya</option>
              <option value="Tidak">Tidak</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="sticky bottom-0 mt-6 bg-white pt-6">
          <button className="w-full rounded-xl bg-teal-700 py-3 text-lg font-medium text-white shadow-sm transition hover:bg-teal-800">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
