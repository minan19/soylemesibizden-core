'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, Info, AlertTriangle } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });

export default function StopajClient() {
  const [kiraTuru, setKiraTuru] = useState<'isyeri' | 'konut'>('isyeri');
  const [kiracTuru, setKiracTuru] = useState<'kurumsal' | 'bireysel'>('kurumsal');
  const [brutKira, setBrutKira] = useState(20000);
  const [yillikmi, setYillikmi] = useState(false);

  // Stopaj sadece işyeri kiralamada kurumsal kiracı ödediğinde uygulanır
  const stopajOrani = kiraTuru === 'isyeri' && kiracTuru === 'kurumsal' ? 0.20 : 0;

  const result = useMemo(() => {
    const aylikBrut = yillikmi ? brutKira / 12 : brutKira;
    const stopajMiktar = aylikBrut * stopajOrani;
    const netKira = aylikBrut - stopajMiktar;

    const yillikBrut = aylikBrut * 12;
    const yillikStopaj = stopajMiktar * 12;
    const yillikNet = netKira * 12;

    // Mal sahibinin vergi beyannamesinde stopaj mahsup edilir
    // Gelir vergisi hesabı basitleştirilmiş (götürü %15 gider yöntemi)
    const istisna2024 = 33000;
    const giderIndirimi = yillikBrut * 0.15;
    const matrah = Math.max(0, yillikBrut - istisna2024 - giderIndirimi);

    let gelirVergisi = 0;
    if (matrah > 0) {
      if (matrah <= 110000) gelirVergisi = matrah * 0.15;
      else if (matrah <= 230000) gelirVergisi = 16500 + (matrah - 110000) * 0.20;
      else if (matrah <= 870000) gelirVergisi = 40500 + (matrah - 230000) * 0.27;
      else if (matrah <= 3000000) gelirVergisi = 213300 + (matrah - 870000) * 0.35;
      else gelirVergisi = 958800 + (matrah - 3000000) * 0.40;
    }

    // Mahsup sonrası ödenecek gelir vergisi
    const odenenStopaj = yillikStopaj;
    const kalanGV = Math.max(0, gelirVergisi - odenenStopaj);
    const stopajIadesi = Math.max(0, odenenStopaj - gelirVergisi);
    const toplamVergiYuk = gelirVergisi;
    const efektifVergiOrani = yillikBrut > 0 ? (toplamVergiYuk / yillikBrut) * 100 : 0;

    return {
      aylikBrut, stopajMiktar, netKira,
      yillikBrut, yillikStopaj, yillikNet,
      gelirVergisi, kalanGV, stopajIadesi, toplamVergiYuk, efektifVergiOrani,
    };
  }, [brutKira, stopajOrani, yillikmi]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <FileText size={13} /> Stopaj Vergisi Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Stopaj Vergisi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kurumsal kiracının %20 stopaj kesintisi, net/brüt kira farkı ve mal sahibinin yıllık vergi beyannamesi mahsubu.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Kira Bilgileri</h2>

              {/* Kira türü */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Kira Türü</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['isyeri', 'konut'] as const).map(k => (
                    <button key={k} onClick={() => setKiraTuru(k)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all ${kiraTuru === k ? 'bg-[#F0FDF8] border border-[#00C49F]/30 text-[#00C49F]' : 'bg-gray-50 border border-transparent hover:border-gray-200 text-gray-700'}`}>
                      {k === 'isyeri' ? 'İşyeri' : 'Konut'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kiracı türü */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Kiracı Türü</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['kurumsal', 'bireysel'] as const).map(k => (
                    <button key={k} onClick={() => setKiracTuru(k)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all ${kiracTuru === k ? 'bg-[#F0FDF8] border border-[#00C49F]/30 text-[#00C49F]' : 'bg-gray-50 border border-transparent hover:border-gray-200 text-gray-700'}`}>
                      {k === 'kurumsal' ? 'Kurumsal' : 'Bireysel'}
                    </button>
                  ))}
                </div>
                {kiracTuru === 'bireysel' && (
                  <p className="text-[10px] text-amber-600 mt-1.5 leading-relaxed">Bireysel kiracı stopaj kesmez; stopaj yükümlülüğü mal sahibindedir.</p>
                )}
              </div>

              {/* Giriş türü */}
              <div className="flex items-center gap-3">
                <button onClick={() => setYillikmi(false)}
                  className={`flex-1 p-2 rounded-xl text-xs font-bold transition-all ${!yillikmi ? 'bg-[#F0FDF8] border border-[#00C49F]/30 text-[#00C49F]' : 'bg-gray-50 text-gray-600'}`}>
                  Aylık Giriş
                </button>
                <button onClick={() => setYillikmi(true)}
                  className={`flex-1 p-2 rounded-xl text-xs font-bold transition-all ${yillikmi ? 'bg-[#F0FDF8] border border-[#00C49F]/30 text-[#00C49F]' : 'bg-gray-50 text-gray-600'}`}>
                  Yıllık Giriş
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Brüt Kira <span className="font-normal text-gray-400">₺{fmt(yillikmi ? brutKira : brutKira)} ({yillikmi ? 'yıllık' : 'aylık'})</span>
                </label>
                <input type="range" min={1000} max={yillikmi ? 2400000 : 200000} step={yillikmi ? 12000 : 1000} value={brutKira}
                  onChange={e => setBrutKira(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                  <span>₺{fmt(yillikmi ? 1000 : 1000)}</span>
                  <span>₺{fmt(yillikmi ? 2400000 : 200000)}</span>
                </div>
              </div>

              {stopajOrani > 0 && (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <Info size={11} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-700 leading-relaxed">%20 stopaj uygulanıyor. Kiracı her ay net kira öder; %20&apos;yi devlete bildirir.</p>
                </div>
              )}
              {stopajOrani === 0 && (
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <Info size={11} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-700 leading-relaxed">Bu durumda stopaj kesilmez. Gelir vergisi yıllık beyanname ile ödenir.</p>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            {/* Ana Kart */}
            <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
              <p className="text-xs text-white/70 mb-1">Aylık Brüt Kira</p>
              <p className="text-4xl font-black mb-2">₺{fmt(Math.round(result.aylikBrut))}</p>
              {stopajOrani > 0 ? (
                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-white/70">Stopaj Kesintisi (%20)</p>
                    <p className="text-lg font-black text-rose-300">-₺{fmt(Math.round(result.stopajMiktar))}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/70">Net Tahsilat</p>
                    <p className="text-lg font-black">₺{fmt(Math.round(result.netKira))}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-white/70">Stopaj kesintisi yok — brüt = net tahsilat</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Yıllık Brüt Kira</p>
                <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.yillikBrut))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Yıllık Kesilen Stopaj</p>
                <p className="text-xl font-black text-rose-600">₺{fmt(Math.round(result.yillikStopaj))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Hesaplanan Gelir Vergisi</p>
                <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.gelirVergisi))}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Götürü gider yöntemi</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">
                  {result.stopajIadesi > 0 ? 'İade Alınacak Stopaj' : 'Ek Ödenecek Vergi'}
                </p>
                <p className={`text-xl font-black ${result.stopajIadesi > 0 ? 'text-[#00C49F]' : 'text-amber-600'}`}>
                  {result.stopajIadesi > 0 ? '+' : ''}₺{fmt(Math.round(result.stopajIadesi > 0 ? result.stopajIadesi : result.kalanGV))}
                </p>
              </div>
            </div>

            {/* Açıklama */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">Hesaplama Mantığı</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs border-b border-gray-50 pb-1">
                  <span className="text-gray-600">Yıllık Brüt Kira</span>
                  <span className="font-bold">₺{fmt(Math.round(result.yillikBrut))}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-gray-50 pb-1">
                  <span className="text-gray-600">(-) %15 Götürü Gider</span>
                  <span className="font-bold text-rose-500">-₺{fmt(Math.round(result.yillikBrut * 0.15))}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-gray-50 pb-1">
                  <span className="text-gray-600">(-) 2024 İstisna</span>
                  <span className="font-bold text-rose-500">-₺{fmt(33000)}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-gray-50 pb-1">
                  <span className="text-gray-600">Vergi Matrahı</span>
                  <span className="font-bold">₺{fmt(Math.round(Math.max(0, result.yillikBrut * 0.85 - 33000)))}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-gray-50 pb-1">
                  <span className="text-gray-600">Hesaplanan Gelir Vergisi</span>
                  <span className="font-bold">₺{fmt(Math.round(result.gelirVergisi))}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-gray-50 pb-1">
                  <span className="text-gray-600">(-) Mahsup Stopaj</span>
                  <span className="font-bold text-[#00C49F]">-₺{fmt(Math.round(result.yillikStopaj))}</span>
                </div>
                <div className="flex justify-between text-xs font-black">
                  <span className="text-gray-800">{result.stopajIadesi > 0 ? 'İade (GV < Stopaj)' : 'Ek Ödenecek Vergi'}</span>
                  <span className={result.stopajIadesi > 0 ? 'text-[#00C49F]' : 'text-amber-600'}>
                    ₺{fmt(Math.round(result.stopajIadesi > 0 ? result.stopajIadesi : result.kalanGV))}
                  </span>
                </div>
              </div>
            </div>

            {/* Uyarı */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-black">Önemli:</span> Bu hesaplama gösterge amaçlıdır. Gerçek gider yöntemi ve diğer gelirlerle vergi diliminiz değişebilir. Beyanname için mali müşavirle çalışınız.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/kira-geliri-vergisi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <FileText size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kira Geliri Vergisi</p>
                  <p className="text-[10px] text-gray-400">Götürü vs gerçek gider</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
              <Link href="/net-gelir-hesaplayici" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <FileText size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Net Gelir Hesaplayıcı</p>
                  <p className="text-[10px] text-gray-400">Aidat ve gider düşümü</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
