import { 
  LayoutGrid, Radar, Lock, Shield, Zap, Bell, Globe, Moon, ShieldCheck, 
  Mic, Crosshair, ArrowRight, Activity, TrendingUp, Presentation, 
  Search, MapPin, BarChart3, Filter, PieChart, Layers, Settings, ChevronDown 
} from 'lucide-react';

export default function HomePage() {
  const listings = [
    { id: '1', title: 'Terra Beylikdüzü Hub', price: 4200000, location: 'İstanbul, Beylikdüzü', iq: '98.4', status: 'AKTİF', type: 'SATILIK' },
    { id: '2', title: 'Aqua Marine Villa', price: 12500000, location: 'Muğla, Bodrum', iq: '97.2', status: 'KRİTİK', type: 'KİRALIK' },
    { id: '3', title: 'Sovereign Tower Office', price: 8900000, location: 'Ankara, Çankaya', iq: '99.1', status: 'GÜVENLİ', type: 'SATILIK' }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans antialiased overflow-hidden text-[#0F172A]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
        <div className="h-20 flex items-center px-10 border-b border-gray-50">
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase">SÖYLEMESİBİZDEN</span>
        </div>
        <nav className="flex-1 py-8 px-6 space-y-2 overflow-y-auto">
          <div className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-4 px-5 uppercase">Ana Panel</div>
          <div className="flex items-center gap-4 px-5 py-4 bg-[#F0FDF8] text-[#00C49F] rounded-2xl text-[12px] font-bold tracking-wider cursor-pointer">
            <LayoutGrid size={18} /> MASTER TERMINAL
          </div>
          {[
            { n: 'MARKET RADAR', i: <Radar size={18} /> },
            { n: 'DARK POOL', i: <Lock size={18} /> },
            { n: 'LEGAL VAULT', i: <Shield size={18} /> },
            { n: 'API PORTAL', i: <Zap size={18} /> },
            { n: 'ANALİZ & RAPOR', i: <BarChart3 size={18} /> }
          ].map((item) => (
            <div key={item.n} className="flex items-center gap-4 px-5 py-4 text-gray-400 text-[12px] font-semibold tracking-wider hover:bg-gray-50 rounded-2xl transition-all cursor-pointer">
              {item.i} {item.n}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col bg-[#F8FAFC]">
        {/* NAVBAR */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-12 z-20">
          <div className="flex-1 max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#00C49F] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Varlık, lokasyon veya IQ kodu ara..." 
              className="w-full bg-gray-50 border border-transparent focus:border-[#00C49F]/20 focus:bg-white rounded-full py-2.5 pl-12 pr-6 text-sm font-medium transition-all outline-none shadow-sm"
            />
          </div>
          <div className="flex items-center gap-6 ml-10">
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-100 rounded-full text-[11px] font-bold text-gray-400 bg-white">
              <Globe size={14} className="text-[#00C49F]" />
              <span className="text-[#0F172A]">TR</span><span className="opacity-20">EN</span><span className="opacity-20">AR</span>
            </div>
            <div className="p-2.5 bg-white border border-gray-100 rounded-full text-gray-400 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <Settings size={20} className="text-gray-300 cursor-pointer" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-10">
            <div className="col-span-8 space-y-8">
              {/* FILTER BAR */}
              <div className="flex items-center justify-between bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="flex p-1 bg-gray-50 rounded-full border border-gray-100">
                  <button className="px-8 py-2 text-[11px] font-bold bg-white text-[#0F172A] rounded-full shadow-sm">TÜMÜ</button>
                  <button className="px-8 py-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A]">SATILIK</button>
                  <button className="px-8 py-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A]">KİRALIK</button>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 text-[11px] font-bold text-gray-500 hover:bg-gray-50 rounded-full transition-all">
                  <Filter size={16} /> FİLTRELE
                </button>
              </div>

              <div className="grid gap-6">
                {listings.map((l) => (
                  <div key={l.id} className="group p-8 bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.05)] transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest ${l.type === 'KİRALIK' ? 'bg-blue-50 text-blue-500 border border-blue-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}>{l.type}</span>
                        <div className="flex items-center gap-1.5 text-[#00C49F] bg-[#F0FDF8] px-3 py-1.5 rounded-full border border-[#00C49F]/10 font-bold text-[10px]"><Activity size={12}/> IQ: {l.iq}</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="p-3 bg-gray-50 rounded-2xl text-gray-300 hover:text-[#00C49F] transition-all cursor-pointer"><PieChart size={18} /></div>
                        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-300 group-hover:bg-[#00C49F] group-hover:text-white transition-all"><ArrowRight size={20} /></button>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{l.title}</h2>
                    <p className="text-sm text-gray-400 font-medium flex items-center gap-2 mb-8"><MapPin size={14} className="text-gray-300"/> {l.location}</p>
                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col"><span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">Değerleme</span><span className="text-3xl font-black tracking-tighter">₺ {l.price.toLocaleString('tr-TR')}</span></div>
                      <div className="flex gap-4 text-[11px] font-bold text-[#00C49F] bg-[#F0FDF8] px-5 py-2.5 rounded-2xl border border-[#00C49F]/10">RAPORU GÖRÜNTÜLE</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-4 space-y-8">
              {/* MAP PREVIEW */}
              <div className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#0F172A]">Sovereign Map</h3>
                  <Layers size={18} className="text-gray-300" />
                </div>
                <div className="h-64 bg-[#F8FAFC] rounded-[32px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[#00C49F]/30 transition-all cursor-crosshair">
                   <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
                   <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#00C49F] relative z-10"><MapPin size={22} className="animate-bounce" /></div>
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] relative z-10 mt-4">Harita Modülü Yükleniyor...</span>
                </div>
              </div>

              {/* COMMAND CENTER */}
              <div className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00C49F] animate-pulse"></div> Voice Command</span>
                  <Mic size={18} className="text-gray-200" />
                </div>
                <h3 className="text-2xl font-bold mb-10 leading-tight">Sinirsel Komuta Merkezi</h3>
                <div className="p-5 bg-gray-50 rounded-3xl flex items-center justify-center gap-3 text-[10px] font-bold text-gray-400 border border-gray-100 tracking-widest"><ShieldCheck size={18} className="text-[#00C49F]" /> FEEDBACK: READY</div>
              </div>

              <div className="p-10 bg-gradient-to-br from-[#00C49F] to-[#00A887] rounded-[40px] shadow-lg shadow-[#00C49F]/20 text-white">
                 <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/20 rounded-xl"><TrendingUp size={20} /></div>
                    <span className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full uppercase">Kasa</span>
                 </div>
                 <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">Elite Treasury</h3>
                 <div className="flex items-end justify-between mt-6"><span className="text-4xl font-black">100%</span><span className="text-[10px] font-bold text-right opacity-60">System<br/>Solvency</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
