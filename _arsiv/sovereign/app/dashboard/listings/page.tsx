'use client';
import { useEffect, useState } from 'react';

export default function SovereignDashboard() {
  interface ListingItem { id: string; title: string; area?: number; cost?: number; status?: string; }
  const [data, setData] = useState<{ totalCapital: number; marketIndex: number; listings: ListingItem[] }>({ totalCapital: 0, marketIndex: 0, listings: [] });

  useEffect(() => {
    const fetchSovereignStatus = async () => {
      try {
        const res = await fetch('http://localhost:4000/intelligence/status');
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (e) {
        console.log("Veri bekleniyor...");
      }
    };
    fetchSovereignStatus();
    const interval = setInterval(fetchSovereignStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  // Devasa rakamları güvenli bir şekilde formatla
  const formatCurrency = (val: number | undefined) => {
    if (!val) return 'Yükleniyor...';
    const num = Number(val);
    if (num >= 1e12) return (num / 1e12).toFixed(2) + ' Trilyon ₺';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + ' Milyar ₺';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + ' Milyon ₺';
    return num.toLocaleString() + ' ₺';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-[3rem] p-8 md:p-16 border border-slate-100">
        <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black tracking-tighter italic italic">SOVEREIGN <span className="text-blue-600 not-italic">IQ</span></h1>
            <p className="text-[10px] tracking-[0.4em] font-bold text-slate-300 mt-2 uppercase">Autonomous Intelligence Engine</p>
          </div>
          <div className="bg-blue-600 text-white px-10 py-8 rounded-[2.5rem] shadow-xl shadow-blue-100 text-center min-w-[320px]">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-2">Live Portfolio Value</p>
            <p className="text-4xl md:text-5xl font-black tracking-tighter">
              {data.totalCapital > 0 ? formatCurrency(data.totalCapital) : 'Hesaplanıyor...'}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4 flex items-center gap-2">
               <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span> Asset Ledger
            </h2>
            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
              {data.listings && data.listings.length > 0 ? data.listings.map((item) => (
                <div key={item.id} className="p-6 bg-slate-50 rounded-3xl flex justify-between items-center border border-transparent hover:border-blue-100 transition-all">
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{item.area?.toLocaleString()} m² Arazi</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-blue-600">{formatCurrency(item.cost)}</p>
                    <p className="text-[9px] font-black text-slate-300 uppercase mt-1">{item.status}</p>
                  </div>
                </div>
              )) : <p className="text-slate-300 italic">Otonom tarama devam ediyor...</p>}
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 font-mono text-center md:text-left">Market Index</h2>
                <p className="text-4xl font-black tracking-tighter text-blue-400">₺{data.marketIndex?.toLocaleString() || '45,000'}</p>
             </div>
             <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4">System Status</h2>
                <div className="flex items-center gap-3 text-sm font-bold text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  AUTONOMOUS ACTIVE
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
