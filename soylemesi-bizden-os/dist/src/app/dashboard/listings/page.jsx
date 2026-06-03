'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SovereignDashboard;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
function SovereignDashboard() {
    const router = (0, navigation_1.useRouter)();
    const [user, setUser] = (0, react_1.useState)(null);
    const [listings, setListings] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [currency, setCurrency] = (0, react_1.useState)('TRY');
    const [activeTab, setActiveTab] = (0, react_1.useState)('ALL');
    const [selectedAsset, setSelectedAsset] = (0, react_1.useState)(null);
    const [isGeneratingReport, setIsGeneratingReport] = (0, react_1.useState)(false);
    const [reportProgress, setReportProgress] = (0, react_1.useState)(0);
    const [isMeasureMode, setIsMeasureMode] = (0, react_1.useState)(false);
    const [activeImageIdx, setActiveImageIdx] = (0, react_1.useState)(0);
    const [isEditMode, setIsEditMode] = (0, react_1.useState)(false);
    const [editFormData, setEditFormData] = (0, react_1.useState)({});
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [showFilters, setShowFilters] = (0, react_1.useState)(false);
    const [advancedFilters, setAdvancedFilters] = (0, react_1.useState)({ minPrice: '', maxPrice: '', minArea: '', maxArea: '' });
    const rates = { TRY: 1, USD: 0.031, EUR: 0.029 };
    const eliteCategories = ["Daire", "Villa", "Müstakil Ev", "Residence", "Loft Daire", "Yalı", "Yalı Dairesi", "Köşk", "Çiftlik Evi", "Arsa", "Ticari"];
    const [formData, setFormData] = (0, react_1.useState)({
        title: '', transactionType: 'SALE', subCategory: 'Daire', city: '', district: '',
        ada: '', parsel: '', area: '', price: '', rentPrice: '', roomCount: '', buildingAge: '', zoningStatus: ''
    });
    (0, react_1.useEffect)(() => {
        const token = localStorage.getItem('sovereign_token');
        const userData = localStorage.getItem('sovereign_user');
        if (!token || !userData) {
            setUser({ id: 'sovereign_executive', name: 'Executive' });
        }
        else {
            setUser(JSON.parse(userData));
        }
        fetchListings();
    }, [router]);
    const fetchListings = async () => {
        try {
            const res = await fetch('http://localhost:4000/listings');
            if (res.ok) {
                const data = await res.json();
                setListings(data.reverse());
            }
        }
        catch (e) {
        }
        finally {
            setLoading(false);
        }
    };
    const handleAddAsset = async (e) => {
        e.preventDefault();
        const newAsset = { ...formData, id: Math.random().toString(36).substr(2, 9), ownerId: user?.id };
        setListings(prev => [newAsset, ...prev]);
        setFormData(prev => ({ ...prev, title: '', price: '', rentPrice: '', area: '', ada: '', parsel: '', city: '' }));
        try {
            await fetch('http://localhost:4000/listings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAsset),
            });
        }
        catch (error) { }
    };
    const handleUpdateAsset = async () => {
        setListings(prev => prev.map(item => item.id === selectedAsset.id ? { ...item, ...editFormData } : item));
        setSelectedAsset({ ...selectedAsset, ...editFormData });
        setIsEditMode(false);
        try {
            await fetch(`http://localhost:4000/listings/${selectedAsset.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editFormData),
            });
        }
        catch (error) { }
    };
    const handleDeleteAsset = async (id) => {
        if (!confirm("İmha edilsin mi?"))
            return;
        setListings(prev => prev.filter(item => item.id !== id));
        setSelectedAsset(null);
        try {
            await fetch(`http://localhost:4000/listings/${id}`, { method: 'DELETE' });
        }
        catch (e) { }
    };
    const openCommandCenter = (item) => {
        setSelectedAsset(item);
        setEditFormData(item);
        setIsMeasureMode(false);
        setIsEditMode(false);
        setActiveImageIdx(0);
    };
    const formatValue = (val) => {
        const converted = (val || 0) * rates[currency];
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: currency }).format(converted).replace('TRY', '₺');
    };
    const handleGenerateReport = () => {
        setIsGeneratingReport(true);
        setReportProgress(0);
        const interval = setInterval(() => {
            setReportProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 8;
            });
        }, 50);
    };
    const calculateROI = (price, rentPrice) => {
        if (!price || !rentPrice || Number(price) === 0 || Number(rentPrice) === 0)
            return null;
        const annualRent = Number(rentPrice) * 12;
        const roi = (annualRent / Number(price)) * 100;
        const amortization = Number(price) / annualRent;
        return { roi: roi.toFixed(1), amortization: amortization.toFixed(1) };
    };
    const filteredListings = listings.filter((item) => {
        if (activeTab !== 'ALL') {
            if (item.transactionType !== activeTab && item.transactionType !== 'BOTH')
                return false;
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchTitle = item.title?.toLowerCase().includes(query);
            const matchCity = item.city?.toLowerCase().includes(query);
            const matchAda = item.ada?.includes(query);
            if (!matchTitle && !matchCity && !matchAda)
                return false;
        }
        if (advancedFilters.minPrice && Number(item.price) < Number(advancedFilters.minPrice))
            return false;
        if (advancedFilters.maxPrice && Number(item.price) > Number(advancedFilters.maxPrice))
            return false;
        if (advancedFilters.minArea && Number(item.area) < Number(advancedFilters.minArea))
            return false;
        if (advancedFilters.maxArea && Number(item.area) > Number(advancedFilters.maxArea))
            return false;
        return true;
    });
    const totalValue = filteredListings.reduce((s, i) => s + (Number(i.price) || 0), 0);
    const totalArea = filteredListings.reduce((s, i) => s + (Number(i.area) || 0), 0);
    const avgUnitPrice = totalValue / (totalArea || 1);
    const calculateScore = (price, area) => {
        if (!price || !area || avgUnitPrice === 0)
            return { label: 'ANALİZ EDİLİYOR', color: 'text-slate-400', bg: 'bg-slate-50' };
        const unit = price / area;
        if (unit < avgUnitPrice * 0.8)
            return { label: 'YÜKSEK FIRSAT', color: 'text-green-600', bg: 'bg-green-50' };
        if (unit > avgUnitPrice * 1.2)
            return { label: 'PREMIUM VARLIK', color: 'text-orange-600', bg: 'bg-orange-50' };
        return { label: 'PAZAR DENGESİ', color: 'text-blue-600', bg: 'bg-blue-50' };
    };
    const assetTypes = filteredListings.reduce((acc, item) => {
        const isCommercial = item.subCategory === 'Ticari' || item.subCategory === 'Arsa';
        const type = isCommercial ? 'Ticari/Arsa' : 'Konut/Yaşam';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});
    const totalAssetsCount = filteredListings.length || 1;
    const commercialPercent = ((assetTypes['Ticari/Arsa'] || 0) / totalAssetsCount) * 100;
    const residentialPercent = ((assetTypes['Konut/Yaşam'] || 0) / totalAssetsCount) * 100;
    if (loading)
        return <div className="min-h-screen flex items-center justify-center font-black text-blue-600 text-4xl animate-pulse italic tracking-[0.5em]">SOVEREIGN IQ BOOTING...</div>;
    return (<div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      <div className="max-w-[1850px] mx-auto bg-white shadow-2xl rounded-[3rem] lg:rounded-[5rem] p-6 lg:p-16 border border-slate-100 relative overflow-hidden">
        
        
        <header className="mb-10 border-b border-slate-50 pb-10 flex flex-col xl:flex-row justify-between items-center gap-8 relative z-30">
          <div className="flex-1 text-center xl:text-left">
            <h1 className="text-6xl lg:text-7xl font-black italic tracking-tighter leading-none mb-2 text-slate-900">SOVEREIGN</h1>
            <p className="text-[10px] tracking-[0.5em] font-black text-slate-400 uppercase">Decision Support & Asset Intelligence</p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-slate-900 text-white px-10 py-6 rounded-[3rem] text-center shadow-3xl border-b-[8px] border-blue-600 min-w-[300px] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl font-black italic">IQ</div>
               <p className="text-[9px] font-black uppercase text-blue-500 mb-1 tracking-[0.4em]">Portfolio Appraisal</p>
               <p className="text-3xl lg:text-4xl font-black tracking-tighter">{formatValue(totalValue)}</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center xl:justify-end gap-4 items-center">
            <button onClick={handleGenerateReport} className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 active:scale-95 transition-all hidden md:block">
               Executive Report
            </button>
            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
               {['TRY', 'USD', 'EUR'].map((c) => (<button key={c} onClick={() => setCurrency(c)} className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all ${currency === c ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-400'}`}>{c}</button>))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 relative z-10">
          <div className="xl:col-span-3 space-y-8">
            
            
            <div className="w-full h-72 bg-slate-50 rounded-[4rem] relative overflow-hidden border border-slate-100 shadow-inner group">
               <div className="absolute inset-0 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/13/4741/3141.png')] opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-slate-100">
                     <p className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase italic">Sovereign Geo-Intel Active</p>
                  </div>
               </div>
            </div>

            
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
               <div className="flex justify-between items-end mb-4">
                  <p className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">Varlık Sınıfı Dağılımı</p>
                  <p className="text-[10px] font-black text-slate-900 uppercase">Analiz: %100</p>
               </div>
               
               <div className="w-full h-4 rounded-full overflow-hidden flex mb-6">
                  {filteredListings.length > 0 ? (<>
                        <div className="bg-blue-600 h-full transition-all" style={{ width: `${residentialPercent}%` }} title={`Konut/Yaşam: %${residentialPercent.toFixed(1)}`}></div>
                        <div className="bg-orange-500 h-full transition-all" style={{ width: `${commercialPercent}%` }} title={`Ticari/Arsa: %${commercialPercent.toFixed(1)}`}></div>
                     </>) : (<div className="bg-slate-100 h-full w-full"></div>)}
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-50 pt-6">
                  <div className="text-center">
                     <p className="text-[9px] font-black text-blue-600 uppercase mb-1 tracking-widest">m² Ortalaması</p>
                     <p className="text-xl font-black text-blue-900">{formatValue(avgUnitPrice)}</p>
                  </div>
                  <div className="text-center border-x border-slate-50">
                     <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">Aktif Varlık</p>
                     <p className="text-xl font-black text-slate-900">{filteredListings.length} Unit</p>
                  </div>
                  <div className="text-center">
                     <p className="text-[9px] font-black text-orange-500 uppercase mb-1 tracking-widest">Ticari / Arsa Hacmi</p>
                     <p className="text-xl font-black text-orange-900">% {commercialPercent.toFixed(1)}</p>
                  </div>
               </div>
            </div>

            
            <div className="bg-white rounded-[3rem] p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
               <div className="flex-1 bg-slate-50 rounded-full flex items-center px-6 border border-slate-100 focus-within:border-blue-400 transition-all">
                  <span className="text-slate-400 mr-3">🔍</span>
                  <input type="text" placeholder="Başlık, Şehir veya Ada/Parsel ile İstihbarat Ara..." className="w-full bg-transparent py-4 outline-none text-sm font-bold text-slate-700 placeholder:text-slate-400" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
               </div>
               <div className="flex items-center gap-2">
                 <div className="flex bg-slate-50 p-1.5 rounded-full border border-slate-100">
                    {['ALL', 'SALE', 'RENT'].map(tab => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-full text-[9px] font-black tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>{tab}</button>))}
                 </div>
                 <button onClick={() => setShowFilters(!showFilters)} className={`px-6 py-4 rounded-full text-[10px] font-black tracking-widest transition-all uppercase flex items-center gap-2 ${showFilters ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Matrix ⧉</button>
               </div>
            </div>

            
            {showFilters && (<div className="bg-slate-900 rounded-[3rem] p-8 border border-slate-800 shadow-2xl animate-fade-in">
                  <p className="text-[9px] font-black tracking-[0.4em] text-blue-500 uppercase mb-6">Advanced Filter Matrix</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                     <div><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Min Fiyat</p><input type="number" placeholder="0" className="w-full bg-slate-800 text-white p-4 rounded-2xl text-sm outline-none border border-slate-700" value={advancedFilters.minPrice} onChange={e => setAdvancedFilters({ ...advancedFilters, minPrice: e.target.value })}/></div>
                     <div><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Max Fiyat</p><input type="number" placeholder="Limit Yok" className="w-full bg-slate-800 text-white p-4 rounded-2xl text-sm outline-none border border-slate-700" value={advancedFilters.maxPrice} onChange={e => setAdvancedFilters({ ...advancedFilters, maxPrice: e.target.value })}/></div>
                     <div><p className="text-[9px] font-black text-slate-400 uppercase mb-2">Min m²</p><input type="number" placeholder="0" className="w-full bg-slate-800 text-white p-4 rounded-2xl text-sm outline-none border border-slate-700" value={advancedFilters.minArea} onChange={e => setAdvancedFilters({ ...advancedFilters, minArea: e.target.value })}/></div>
                     <div className="flex items-end"><button onClick={() => setAdvancedFilters({ minPrice: '', maxPrice: '', minArea: '', maxArea: '' })} className="w-full bg-slate-800 text-slate-400 hover:text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-700 hover:border-slate-500 transition-all">Sıfırla</button></div>
                  </div>
               </div>)}

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
              {filteredListings.length === 0 ? (<div className="col-span-2 py-20 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
                    <p className="text-xl font-black text-slate-400 italic">Varlık Bulunamadı. Kriterleri veya Arama Kaydını Değiştirin.</p>
                 </div>) : (filteredListings.map((item) => {
            const score = calculateScore(Number(item.price), Number(item.area));
            const roiData = calculateROI(item.price, item.rentPrice);
            return (<div key={item.id} onClick={() => openCommandCenter(item)} className="bg-white rounded-[4rem] p-10 border border-slate-100 shadow-xl hover:shadow-2xl transition-all group border-t-8 border-t-blue-600 relative overflow-hidden cursor-pointer">
                      <div className={`absolute top-0 right-10 ${score.bg} px-6 py-2 rounded-b-2xl border border-t-0 border-slate-100 shadow-sm`}>
                         <p className={`text-[8px] font-black uppercase tracking-widest ${score.color}`}>{score.label}</p>
                      </div>
                      <div className="flex justify-between items-start mb-8 mt-4">
                        <div>
                          <span className="bg-slate-900 text-white text-[8px] font-black px-4 py-1.5 rounded-full uppercase mb-4 inline-block tracking-widest">{item.subCategory}</span>
                          <h3 className="text-3xl font-black text-slate-900 mb-1 truncate max-w-xs">{item.title}</h3>
                          <p className="text-[11px] text-slate-400 font-bold uppercase">{item.city} | {item.area} m²</p>
                        </div>
                        <div className="text-right">
                           <p className="text-3xl font-black text-blue-600 tracking-tighter">{formatValue(item.price)}</p>
                           {roiData && <p className="text-[9px] font-black text-green-600 uppercase tracking-widest mt-1">ROI: %{roiData.roi}</p>}
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                         <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100"><p className="text-[8px] font-black text-blue-600 uppercase tracking-widest italic">TAPU MÜHÜRLÜ</p></div>
                         <p className="text-[9px] font-black text-slate-400 uppercase">Ada: {item.ada || '--'}</p>
                      </div>
                    </div>);
        }))}
            </div>
          </div>

          
          <div className="space-y-8">
            <div className="p-10 bg-slate-900 rounded-[4rem] text-white shadow-2xl border border-slate-800 relative overflow-hidden">
              <h2 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] border-b border-slate-800 pb-8 mb-8 text-center">Asset DNA Entry</h2>
              <form onSubmit={handleAddAsset} className="space-y-5">
                <div className="w-full border-2 border-dashed border-slate-700 bg-slate-800/50 rounded-[2rem] p-6 text-center hover:bg-slate-800 hover:border-blue-500 transition-all cursor-pointer group">
                   <p className="text-3xl mb-2 group-hover:scale-110 transition-transform">📸</p>
                   <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Görsel / Belge Sürükle</p>
                </div>
                <select className="w-full bg-slate-800 p-5 rounded-2xl text-[10px] font-black uppercase text-white outline-none border border-slate-700" value={formData.transactionType} onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })}>
                  <option value="SALE">Sadece Satılık</option>
                  <option value="RENT">Sadece Kiralık</option>
                  <option value="BOTH">🔥 Hem Satılık Hem Kiralık</option>
                </select>
                <select className="w-full bg-slate-800 p-5 rounded-2xl text-[10px] font-black uppercase text-white outline-none border border-slate-700" value={formData.subCategory} onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}>
                  {eliteCategories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
                </select>
                <input type="text" required placeholder="Asset Title" className="w-full bg-slate-800 text-white p-5 rounded-xl text-sm outline-none border border-slate-700 focus:border-blue-500" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
                <div className="grid grid-cols-1 gap-3">
                   {formData.transactionType !== 'RENT' && (<input type="number" required placeholder="Satış Fiyatı (TRY)" className="w-full bg-slate-800 text-blue-400 font-black p-5 rounded-xl text-sm outline-none border border-slate-700 shadow-inner" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}/>)}
                   {formData.transactionType !== 'SALE' && (<input type="number" placeholder="Aylık Kira Getirisi (TRY)" className="w-full bg-slate-800 text-orange-400 font-black p-5 rounded-xl text-sm outline-none border border-slate-700 shadow-inner" value={formData.rentPrice} onChange={(e) => setFormData({ ...formData, rentPrice: e.target.value })}/>)}
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <input type="number" required placeholder="m²" className="bg-slate-800 text-white p-5 rounded-xl text-sm outline-none border border-slate-700" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}/>
                   <input type="text" placeholder="Ada/Parsel" className="bg-slate-800 text-white p-5 rounded-xl text-sm outline-none border border-slate-700" value={formData.ada} onChange={(e) => setFormData({ ...formData, ada: e.target.value })}/>
                </div>
                <input type="text" required placeholder="City / District" className="w-full bg-slate-800 text-white p-5 rounded-xl text-sm outline-none border border-slate-700 focus:border-blue-500" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}/>
                <button type="submit" className="w-full bg-blue-600 text-white py-8 rounded-full font-black uppercase text-xs tracking-[0.3em] shadow-xl active:scale-95 transition-all mt-4">SEAL ASSET DNA</button>
              </form>
            </div>
          </div>
        </div>

        
        {selectedAsset && (<div className="fixed inset-0 bg-slate-900/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 overflow-y-auto">
            <div className="bg-white w-full max-w-6xl rounded-[5rem] overflow-hidden shadow-2xl relative my-auto border border-white/10">
              <button onClick={() => setSelectedAsset(null)} className="absolute top-12 right-12 text-slate-400 hover:text-slate-900 font-black text-2xl transition-all z-50">✕</button>
              
              <div className="p-12 lg:p-20">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-10 mb-10 gap-6">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-4 mb-6">
                         <span className="bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest inline-block">COMMAND CENTER</span>
                         <button onClick={() => setIsEditMode(!isEditMode)} className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${isEditMode ? 'bg-orange-500 text-white border-orange-500' : 'border-slate-200 text-slate-500 hover:border-slate-400'}`}>
                           {isEditMode ? 'İptal Et' : 'Düzenle ⚙️'}
                         </button>
                      </div>
                      {isEditMode ? (<input type="text" className="w-full text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 border-b-2 border-blue-500 focus:outline-none bg-slate-50 rounded-xl px-4 py-2" value={editFormData.title} onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}/>) : (<h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-2">{selectedAsset.title}</h2>)}
                      <p className="text-lg text-slate-400 font-bold uppercase tracking-widest mt-4">{selectedAsset.city} | {selectedAsset.area} m²</p>
                    </div>
                    <div className="text-left md:text-right">
                      {isEditMode ? (<div className="flex items-center gap-2">
                           <span className="text-3xl font-black text-slate-400">₺</span>
                           <input type="number" className="w-48 text-5xl lg:text-6xl font-black text-blue-600 border-b-2 border-blue-500 focus:outline-none bg-slate-50 rounded-xl px-4 py-2" value={editFormData.price} onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}/>
                        </div>) : (<p className="text-5xl lg:text-6xl font-black text-blue-600 tracking-tighter">{formatValue(selectedAsset.price)}</p>)}
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Verified Market Price</p>
                    </div>
                 </div>

                 
                 <div className="mb-12">
                    <div className="w-full h-[400px] bg-slate-900 rounded-[3rem] relative overflow-hidden group flex flex-col shadow-inner transition-all duration-500">
                       <div className="flex-1 flex items-center justify-center relative">
                          <div className={`absolute inset-0 transition-all duration-700 ${isMeasureMode ? 'bg-blue-900/40 opacity-100' : 'bg-slate-800 opacity-60 mix-blend-overlay'}`}></div>
                          {isMeasureMode && (<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px]">
                                <div className="absolute top-[30%] left-[20%] w-[60%] h-[40%] border-2 border-blue-400 border-dashed flex items-center justify-center bg-blue-500/10">
                                   <p className="text-blue-300 font-black text-xs tracking-widest bg-slate-900/80 px-4 py-2 rounded-lg backdrop-blur-sm">L: 14.2m × W: 8.5m (NET: 120.7m²)</p>
                                </div>
                             </div>)}
                          <div className="z-10 text-center">
                             <p className="text-white/50 font-black tracking-[0.5em] uppercase text-[10px] mb-4">Sovereign Visual Core</p>
                             <p className="text-white text-4xl font-black italic">{isMeasureMode ? 'BLUEPRINT SCAN ACTIVE' : `CAM 0${activeImageIdx + 1} - 360° VIEW`}</p>
                          </div>
                       </div>
                       <div className="h-20 bg-slate-950/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-8">
                          <div className="flex gap-6">
                             <button onClick={() => setIsMeasureMode(!isMeasureMode)} className={`${isMeasureMode ? 'text-blue-400' : 'text-white/70'} hover:text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all`}><span className="text-xl">📐</span> Ölçüm Modu</button>
                          </div>
                          <div className="flex gap-3">
                             {[0, 1, 2, 3].map((idx) => (<button key={idx} onClick={() => { setActiveImageIdx(idx); setIsMeasureMode(false); }} className={`w-12 h-10 rounded-lg border-2 transition-all ${activeImageIdx === idx && !isMeasureMode ? 'border-blue-500 bg-blue-500/20' : 'border-white/10 bg-white/5 hover:border-white/30'}`}></button>))}
                          </div>
                       </div>
                    </div>
                 </div>

                 
                 {calculateROI(selectedAsset.price, selectedAsset.rentPrice) && (<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                       <div className="bg-green-50/50 p-8 rounded-[2.5rem] border border-green-100 flex items-center justify-between">
                          <div>
                             <p className="text-[9px] font-black text-green-600 uppercase mb-2 tracking-[0.2em]">Yıllık Getiri Oranı (ROI)</p>
                             <p className="text-4xl font-black text-green-900">% {calculateROI(selectedAsset.price, selectedAsset.rentPrice)?.roi}</p>
                          </div>
                          <span className="text-5xl opacity-20">📈</span>
                       </div>
                       <div className="bg-orange-50/50 p-8 rounded-[2.5rem] border border-orange-100 flex items-center justify-between">
                          <div>
                             <p className="text-[9px] font-black text-orange-600 uppercase mb-2 tracking-[0.2em]">Amortisman Süresi</p>
                             <p className="text-4xl font-black text-orange-900">{calculateROI(selectedAsset.price, selectedAsset.rentPrice)?.amortization} <span className="text-lg">Yıl</span></p>
                          </div>
                          <span className="text-5xl opacity-20">⏳</span>
                       </div>
                    </div>)}

                 
                 <div className="mt-12 flex justify-end gap-6 items-center border-t border-slate-100 pt-8">
                    {isEditMode ? (<button onClick={handleUpdateAsset} className="bg-green-600 text-white px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] shadow-2xl hover:scale-105 transition-all">Mühürle (Kaydet)</button>) : (<>
                         <button onClick={() => handleDeleteAsset(selectedAsset.id)} className="text-red-400 hover:text-red-600 font-black uppercase text-xs tracking-widest transition-all px-6">Terminate</button>
                         <button onClick={() => setSelectedAsset(null)} className="bg-slate-900 text-white px-16 py-6 rounded-full font-black uppercase text-xs tracking-[0.3em] shadow-2xl hover:scale-105 transition-all">Close Center</button>
                       </>)}
                 </div>
              </div>
            </div>
          </div>)}

        
        {isGeneratingReport && (<div className="fixed inset-0 bg-slate-900/95 backdrop-blur-3xl z-[150] flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-3xl rounded-[4rem] p-16 shadow-2xl relative overflow-hidden border border-slate-100">
               {reportProgress < 100 ? (<div className="text-center space-y-10">
                     <h3 className="text-4xl font-black text-slate-900 uppercase tracking-widest">Sovereign AI Derliyor</h3>
                     <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-blue-600 transition-all" style={{ width: `${reportProgress}%` }}></div></div>
                  </div>) : (<div className="text-center">
                     <div className="w-32 h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 text-6xl shadow-inner">✓</div>
                     <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-6">RAPOR HAZIR</h3>
                     <div className="flex gap-6 justify-center mt-10">
                        <button onClick={() => setIsGeneratingReport(false)} className="bg-slate-100 text-slate-500 px-12 py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em]">Kapat</button>
                     </div>
                  </div>)}
            </div>
          </div>)}

      </div>
    </div>);
}
//# sourceMappingURL=page.jsx.map