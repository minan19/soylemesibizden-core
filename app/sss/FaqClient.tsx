'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  cat: string;
}

const FAQS: FaqItem[] = [
  {
    cat: 'Genel',
    q: 'Söylemesi Bizden nedir?',
    a: 'Söylemesi Bizden, Türkiye\'nin önde gelen gayrimenkul ve varlık yönetim platformudur. Satılık ve kiralık gayrimenkul ilanları, değerleme araçları, piyasa analizi ve danışmanlık hizmetleri sunar.',
  },
  {
    cat: 'Genel',
    q: 'Platformu kullanmak için kayıt olmam gerekiyor mu?',
    a: 'İlanları görüntülemek için kayıt gerekmez. Ancak ilan vermek, teklif yapmak, favori kaydetmek veya danışmanlık talebi oluşturmak için ücretsiz hesap oluşturmanız gerekir.',
  },
  {
    cat: 'İlan Verme',
    q: 'İlan nasıl veririm?',
    a: 'Sağ üstteki "İlan Ver" butonuna tıklayın veya ilanlarım sayfasına gidin. İlan formu üzerinden tüm detayları doldurup gönderin. İlanınız admin onayından sonra yayınlanır.',
  },
  {
    cat: 'İlan Verme',
    q: 'İlan yayınlanması ne kadar sürer?',
    a: 'İlanınız gönderildikten sonra ekibimiz tarafından incelenir. Ortalama onay süresi 24 saattir. Acil durumlarda iletişim sayfamızdan bize ulaşabilirsiniz.',
  },
  {
    cat: 'İlan Verme',
    q: 'Fotoğraf ekleyebilir miyim?',
    a: 'Evet, ilan oluştururken fotoğraf URL\'leri ekleyebilirsiniz. En iyi sonuç için yüksek çözünürlüklü, iyi aydınlatılmış fotoğraflar kullanmanızı öneririz.',
  },
  {
    cat: 'Satın Alma & Kiralama',
    q: 'İlan sahibiyle nasıl iletişime geçerim?',
    a: 'İlan detay sayfasında "Başvuru Yap" formunu doldurabilir veya sahibinin telefon numarasına doğrudan ulaşabilirsiniz. Ayrıca teklif gönderme özelliğini kullanabilirsiniz.',
  },
  {
    cat: 'Satın Alma & Kiralama',
    q: 'Teklif nasıl veririm?',
    a: 'İlan detay sayfasında "Teklif Yap" seçeneğine tıklayın ve tutarı belirtin. Teklifiniz ilan sahibine iletilir ve kabul/red yanıtını alırsınız.',
  },
  {
    cat: 'Satın Alma & Kiralama',
    q: 'Görüntüleme talebi nasıl oluştururum?',
    a: 'İlan sayfasında "Görüntüleme Talebi" formunu bulabilirsiniz. Tarih ve saat aralığı seçerek randevu talebinde bulunun.',
  },
  {
    cat: 'Güvenlik',
    q: 'İlanlar doğrulanıyor mu?',
    a: 'Ekibimiz tüm ilanları yayınlanmadan önce inceler. Onaylı ilanlar "Onaylı" rozeti taşır. Şüpheli bir ilan gördüğünüzde bize bildirin.',
  },
  {
    cat: 'Güvenlik',
    q: 'Bilgilerim güvende mi?',
    a: 'Tüm verileriniz SSL şifrelemesi ile korunur. Şifreleriniz güçlü hashing algoritmaları ile saklanır. Kişisel bilgileriniz üçüncü taraflarla paylaşılmaz.',
  },
  {
    cat: 'Araçlar',
    q: 'Değerleme aracı nasıl çalışır?',
    a: 'Değerleme aracı, benzer nitelikteki aktif ilanları analiz ederek mülkünüzün piyasa değerini tahmin eder. Şehir, mülk tipi, oda sayısı ve alan bilgilerini girerek tahmini değer aralığı alabilirsiniz.',
  },
  {
    cat: 'Araçlar',
    q: 'Konut kredisi hesaplayıcı nasıl kullanılır?',
    a: 'Hesaplama Araçları sayfasında mülk fiyatı, peşinat, faiz oranı ve vade girerek aylık taksit miktarını hesaplayabilirsiniz. Kira vs Satın Al ve Kira Getirisi araçları da mevcuttur.',
  },
];

const CATEGORIES = Array.from(new Set(FAQS.map(f => f.cat)));

export default function FaqClient() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filtered = activeCategory === 'Tümü' ? FAQS : FAQS.filter(f => f.cat === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {['Tümü', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpen(null); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
              activeCategory === cat
                ? 'bg-[#00C49F] text-white border-[#00C49F]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-[#00C49F]/50 hover:text-[#00C49F]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ items */}
      <div className="space-y-2">
        {filtered.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0FDF8] text-[#00C49F] shrink-0">
                  {faq.cat}
                </span>
                <span className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#00C49F] transition-colors">
                  {faq.q}
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 shrink-0 ml-3 transition-transform ${open === idx ? 'rotate-180' : ''}`}
              />
            </button>
            {open === idx && (
              <div className="px-5 pb-5 pt-0 border-t border-gray-50">
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
