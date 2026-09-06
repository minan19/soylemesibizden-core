'use client';

import { useState, useMemo } from 'react';

type EsyaKey = keyof typeof ESYA_GRUPLARI;

const ESYA_GRUPLARI = {
  kucuk: { label: 'Küçük Eşya (1+1 veya stüdyo)', nakliyeAdet: 1, ortalamaTutar: 8000, aciklama: 'Az eşya, küçük araç' },
  orta: { label: 'Orta Eşya (2+1 standart)', nakliyeAdet: 1, ortalamaTutar: 14000, aciklama: 'Ortalama 1 kamyon' },
  buyuk: { label: 'Büyük Eşya (3+1 veya villa)', nakliyeAdet: 2, ortalamaTutar: 25000, aciklama: 'Birden fazla araç' },
};

const EKSTRA_HIZMETLER = [
  { key: 'paketleme', label: 'Profesyonel Paketleme', fiyat: 2500 },
  { key: 'montaj', label: 'Mobilya Söküm/Montaj', fiyat: 1500 },
  { key: 'temizlik', label: 'Eski Ev Temizliği', fiyat: 2000 },
  { key: 'depolama', label: 'Geçici Depolama (1 ay)', fiyat: 3500 },
  { key: 'sigorta', label: 'Eşya Taşıma Sigortası', fiyat: 1000 },
  { key: 'asansor', label: 'Yük Asansörü Kirası', fiyat: 1200 },
];

const MESAFE_KATSAYI: Record<string, number> = {
  'Aynı İlçe': 1.0,
  'Aynı Şehir': 1.3,
  'Komşu Şehir (< 200 km)': 1.8,
  'Şehirlerarası (200–500 km)': 2.5,
  'Uzak Şehir (500+ km)': 3.5,
};

export default function TasinmaClient() {
  const [esya, setEsya] = useState<EsyaKey>('orta');
  const [mesafe, setMesafe] = useState('Aynı Şehir');
  const [kat, setKat] = useState(3);
  const [ekstralar, setEkstralar] = useState<Set<string>>(new Set());
  const [pazarlik, setPazarlik] = useState(10);

  const toggleEkstra = (key: string) => {
    setEkstralar(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const hesap = useMemo(() => {
    const grup = ESYA_GRUPLARI[esya];
    const mesafeKat = MESAFE_KATSAYI[mesafe] ?? 1.0;
    const katEkstra = kat > 3 ? (kat - 3) * 300 : 0;
    const nakliyeTemel = grup.ortalamaTutar * mesafeKat + katEkstra;
    const ekstraTopLam = EKSTRA_HIZMETLER.reduce((s, e) => s + (ekstralar.has(e.key) ? e.fiyat : 0), 0);
    const araToplam = nakliyeTemel + ekstraTopLam;
    const pazarlikIndirim = araToplam * (pazarlik / 100);
    const toplam = araToplam - pazarlikIndirim;

    return { nakliyeTemel, ekstraTopLam, araToplam, pazarlikIndirim, toplam };
  }, [esya, mesafe, kat, ekstralar, pazarlik]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Eşya Büyüklüğü */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Taşınma Detayları</h2>

        <div className="space-y-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-2">Eşya Büyüklüğü</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.entries(ESYA_GRUPLARI) as [EsyaKey, typeof ESYA_GRUPLARI[EsyaKey]][]).map(([key, g]) => (
                <button key={key} onClick={() => setEsya(key)}
                  className={`border rounded-xl p-3 text-left transition-all ${esya === key ? 'border-[#00C49F] bg-[#F0FDF8]' : 'border-gray-200 bg-white'}`}>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{g.label}</p>
                  <p className="text-[10px] text-gray-400">{g.aciklama}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-2">Taşınma Mesafesi</label>
            <select value={mesafe} onChange={e => setMesafe(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {Object.keys(MESAFE_KATSAYI).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Kat: {kat}. kat</label>
            <input type="range" min={1} max={20} step={1} value={kat} onChange={e => setKat(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
            <p className="text-[10px] text-gray-400 mt-1">3. kat üzeri için asansör/merdiven ekstra ücreti uygulanır.</p>
          </div>
        </div>
      </div>

      {/* Ekstra Hizmetler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Ekstra Hizmetler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EKSTRA_HIZMETLER.map(e => (
            <button key={e.key} onClick={() => toggleEkstra(e.key)}
              className={`border rounded-xl p-3 text-left transition-all flex items-center justify-between ${ekstralar.has(e.key) ? 'border-[#00C49F] bg-[#F0FDF8]' : 'border-gray-200 bg-white'}`}>
              <p className="text-xs font-black text-gray-900">{e.label}</p>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${ekstralar.has(e.key) ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-500'}`}>
                {e.fiyat.toLocaleString('tr-TR')} ₺
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pazarlık */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <label className="text-xs font-black text-gray-700 block mb-1">Pazarlık İndirimi: %{pazarlik}</label>
        <input type="range" min={0} max={25} step={5} value={pazarlik} onChange={e => setPazarlik(Number(e.target.value))}
          className="w-full accent-[#00C49F]" />
        <p className="text-[10px] text-gray-400 mt-1">Nakliye firmalarıyla genellikle %10–20 pazarlık yapılabilir.</p>
      </div>

      {/* Sonuç */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Taşınma Maliyet Özeti</h2>

        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600 font-bold">Nakliye Temel Ücreti</span>
            <span className="font-black text-gray-900">{Math.round(hesap.nakliyeTemel).toLocaleString('tr-TR')} ₺</span>
          </div>
          {hesap.ekstraTopLam > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 font-bold">Ekstra Hizmetler</span>
              <span className="font-black text-gray-900">{hesap.ekstraTopLam.toLocaleString('tr-TR')} ₺</span>
            </div>
          )}
          {pazarlik > 0 && (
            <div className="flex justify-between text-xs">
              <span className="text-emerald-600 font-bold">Pazarlık İndirimi (-%{pazarlik})</span>
              <span className="font-black text-emerald-600">-{Math.round(hesap.pazarlikIndirim).toLocaleString('tr-TR')} ₺</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="text-sm font-black text-gray-900">Toplam Tahmini Maliyet</span>
            <span className="text-sm font-black text-[#00C49F]">{Math.round(hesap.toplam).toLocaleString('tr-TR')} ₺</span>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl px-4 py-3">
          <p className="text-[11px] text-amber-700 font-bold">💡 En az 3 firmadan teklif alın, referanslı firmayı tercih edin. Eşya sigortasını sözleşmede belirtin.</p>
        </div>
      </div>

    </div>
  );
}
