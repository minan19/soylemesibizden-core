import prisma from '@/lib/prisma';
import Link from 'next/link';
import {
  Search,
  Home,
  Building2,
  MapPin,
  Key,
  ShieldCheck,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  FileText,
  Handshake,
  Phone,
  Mail,
} from 'lucide-react';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import CompareButton from '@/components/CompareButton';
import RecentlyViewed from '@/components/RecentlyViewed';
import ForYouSection from '@/components/ForYouSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [totalListings, activeListings, totalUsers, totalOffers, featuredListings, cityCounts] =
    await Promise.all([
      prisma.listing.count(),
      prisma.listing.count({ where: { status: 'ACTIVE' } }),
      prisma.user.count(),
      prisma.offer.count(),
      prisma.listing.findMany({
        take: 6,
        where: { status: 'ACTIVE' },
        orderBy: { views: 'desc' },
        select: {
          id: true, title: true, price: true, status: true, listingType: true,
          propertyType: true, city: true, district: true, neighborhood: true,
          rooms: true, area: true, isVerified: true, photos: true, views: true,
          createdAt: true,
        },
      }),
      prisma.listing.groupBy({
        by: ['city'],
        where: { status: 'ACTIVE', city: { in: ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Bodrum', 'Mersin', 'Adana'] } },
        _count: true,
      }),
    ]);

  const cityCountMap = new Map(cityCounts.map(c => [c.city!, c._count]));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* ─── HERO ──────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#00C49F] opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#00C49F] opacity-10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">

          {/* Label pill */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-semibold">
              <Star className="w-4 h-4 text-[#00C49F]" />
              Türkiye&apos;nin Güvenilir Gayrimenkul Platformu
            </span>
          </div>

          {/* Headline */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Türkiye&apos;nin En Güvenilir<br />
              <span className="text-[#00C49F]">Gayrimenkul Platformu</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
              Milyonlarca ilan arasından hayalinizdeki mülkü bulun
            </p>
          </div>

          {/* Search Form with Autocomplete */}
          <div className="max-w-2xl mx-auto">
            <SearchAutocomplete />
            <div className="flex items-center justify-center gap-4 mt-3">
              {['SATILIK', 'KİRALIK', 'KONUT', 'TİCARİ'].map(t => (
                <a
                  key={t}
                  href={t === 'SATILIK' || t === 'KİRALIK' ? `/listings?listingType=${encodeURIComponent(t)}` : `/listings?propertyType=${encodeURIComponent(t)}`}
                  className="text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1.5 rounded-full transition-colors"
                >
                  {t}
                </a>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              '✓ Doğrulanmış İlanlar',
              '✓ Güvenli İletişim',
              '✓ Uzman Danışmanlık',
            ].map((badge) => (
              <span key={badge} className="text-white/75 text-sm font-medium">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(
            [
              {
                label: 'Toplam İlan',
                value: totalListings.toLocaleString('tr-TR'),
                Icon: Building2,
                color: 'text-blue-500',
                bg: 'bg-blue-50',
              },
              {
                label: 'Aktif İlan',
                value: activeListings.toLocaleString('tr-TR'),
                Icon: CheckCircle,
                color: 'text-[#00C49F]',
                bg: 'bg-green-50',
              },
              {
                label: 'Kayıtlı Kullanıcı',
                value: `${totalUsers.toLocaleString('tr-TR')}+`,
                Icon: Users,
                color: 'text-purple-500',
                bg: 'bg-purple-50',
              },
              {
                label: 'İşlem Hacmi',
                value: `${totalOffers.toLocaleString('tr-TR')}+`,
                Icon: TrendingUp,
                color: 'text-orange-500',
                bg: 'bg-orange-50',
              },
            ] as const
          ).map(({ label, value, Icon, color, bg }) => (
            <div
              key={label}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
                <p className="text-sm text-gray-500 font-medium mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUICK CATEGORIES ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategoriye Göre Ara</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(
            [
              {
                label: 'KONUT',
                desc: 'Daire, villa, müstakil',
                Icon: Home,
                href: '/listings?propertyType=KONUT',
                iconBg: 'bg-blue-50',
                iconColor: 'text-blue-500',
                border: 'border-blue-100',
                hoverBorder: 'hover:border-blue-300',
              },
              {
                label: 'TİCARİ',
                desc: 'Ofis, dükkan, depo',
                Icon: Building2,
                href: '/listings?propertyType=TİCARİ',
                iconBg: 'bg-purple-50',
                iconColor: 'text-purple-500',
                border: 'border-purple-100',
                hoverBorder: 'hover:border-purple-300',
              },
              {
                label: 'ARAZI',
                desc: 'Arsa, tarla, bahçe',
                Icon: MapPin,
                href: '/listings?propertyType=ARAZI',
                iconBg: 'bg-green-50',
                iconColor: 'text-green-500',
                border: 'border-green-100',
                hoverBorder: 'hover:border-green-300',
              },
              {
                label: 'KİRALIK',
                desc: 'Tüm kiralık ilanlar',
                Icon: Key,
                href: '/listings?listingType=KİRALIK',
                iconBg: 'bg-orange-50',
                iconColor: 'text-orange-500',
                border: 'border-orange-100',
                hoverBorder: 'hover:border-orange-300',
              },
            ] as const
          ).map(({ label, desc, Icon, href, iconBg, iconColor, border, hoverBorder }) => (
            <Link
              key={label}
              href={href}
              className={`group bg-white border ${border} ${hoverBorder} rounded-2xl p-6 flex flex-col items-center gap-3 text-center hover:shadow-lg transition-all hover:-translate-y-0.5`}
            >
              <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center`}>
                <Icon className={`w-7 h-7 ${iconColor}`} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm tracking-wide">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#00C49F] transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Güncel İlanlar</h2>
          <Link
            href="/listings"
            className="text-[#00C49F] font-semibold text-sm hover:underline flex items-center gap-1"
          >
            Tümünü Gör
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredListings.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-12 text-center">
            <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 font-medium">Henüz ilan bulunmuyor.</p>
            <p className="text-gray-300 text-sm mt-1">İlk ilanı siz ekleyin!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredListings.map((listing) => {
              const isNew = new Date().getTime() - new Date(listing.createdAt).getTime() < 3 * 24 * 60 * 60 * 1000;
              const locationParts = [listing.neighborhood, listing.district, listing.city].filter(Boolean);
              return (
                <div
                  key={listing.id}
                  className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-0.5 flex flex-col"
                >
                  {/* Photo */}
                  <Link href={`/listing/${listing.id}`} className="block w-full h-44 overflow-hidden relative bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0">
                    {listing.photos && listing.photos.length > 0 ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={listing.photos[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-10 h-10 text-slate-300" />
                      </div>
                    )}
                    {isNew && !listing.isVerified && (
                      <span className="absolute top-3 right-3 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        YENİ
                      </span>
                    )}
                    {listing.isVerified && (
                      <span className="absolute top-3 left-3 bg-white/90 text-[#00C49F] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <CheckCircle className="w-3 h-3" />
                        Doğrulandı
                      </span>
                    )}
                    {listing.photos && listing.photos.length > 1 && (
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        +{listing.photos.length - 1}
                      </span>
                    )}
                  </Link>

                  <div className="p-5 flex flex-col flex-1">
                    {/* Type badges row */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        listing.listingType === 'KİRALIK' ? 'bg-blue-50 text-blue-600' : 'bg-[#F0FDF8] text-[#00C49F]'
                      }`}>
                        {listing.listingType}
                      </span>
                      {listing.propertyType && (
                        <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                          {listing.propertyType}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <Link href={`/listing/${listing.id}`}>
                      <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-[#00C49F] transition-colors">
                        {listing.title}
                      </h3>
                    </Link>

                    {/* Location */}
                    {locationParts.length > 0 && (
                      <p className="text-gray-400 text-xs font-medium flex items-center gap-1 mb-3">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {locationParts.join(', ')}
                      </p>
                    )}

                    {/* Specs */}
                    <div className="flex gap-2 flex-wrap mb-3">
                      {listing.rooms != null && (
                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md font-medium">{listing.rooms} oda</span>
                      )}
                      {listing.area != null && (
                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md font-medium">{listing.area} m²</span>
                      )}
                    </div>

                    {/* Price + actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
                      <Link href={`/listing/${listing.id}`}>
                        <p className="text-[#00C49F] font-bold text-xl leading-none">
                          {listing.price.toLocaleString('tr-TR')}
                          <span className="text-base ml-0.5">₺</span>
                        </p>
                        {listing.area && listing.area > 0 && (
                          <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                            {Math.round(listing.price / listing.area).toLocaleString('tr-TR')} ₺/m²
                          </p>
                        )}
                      </Link>
                      <CompareButton listingId={listing.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─── RECENTLY VIEWED ──────────────────────────────────────── */}
      <RecentlyViewed />

      {/* ─── FOR YOU ──────────────────────────────────────────────── */}
      <ForYouSection />

      {/* ─── WHY US ────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Neden Söylemesi Bizden?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Türkiye&apos;nin en güvenilir gayrimenkul platformunda alım-satım ve kiralama
              işlemlerinizi güvenle yapın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(
              [
                {
                  Icon: ShieldCheck,
                  title: 'Doğrulanmış İlanlar',
                  desc: 'Tüm ilanlar yayına girmeden önce uzman ekibimiz tarafından kontrol edilir.',
                  iconColor: 'text-[#00C49F]',
                  iconBg: 'bg-green-50',
                },
                {
                  Icon: Search,
                  title: 'Akıllı Arama',
                  desc: 'Gelişmiş filtrelerle bütçe, konum ve özellik bazlı tam eşleşme yapın.',
                  iconColor: 'text-blue-500',
                  iconBg: 'bg-blue-50',
                },
                {
                  Icon: Users,
                  title: 'Güvenli İletişim',
                  desc: 'Satıcı ve alıcılar arasında şifreli, güvenli mesajlaşma altyapısı.',
                  iconColor: 'text-purple-500',
                  iconBg: 'bg-purple-50',
                },
                {
                  Icon: TrendingUp,
                  title: 'Piyasa Analizi',
                  desc: 'Bölgeye göre m² fiyatı, değer trendi ve karşılaştırmalı analizler.',
                  iconColor: 'text-orange-500',
                  iconBg: 'bg-orange-50',
                },
              ] as const
            ).map(({ Icon, title, desc, iconColor, iconBg }) => (
              <div
                key={title}
                className="bg-[#F8FAFC] rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Nasıl Çalışır?</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Üç adımda hayalinizdeki mülke kavuşun veya ilanınızı yayınlayın.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              Icon: Search,
              title: 'Arayın',
              desc: 'Gelişmiş filtrelerle bütçe, konum, oda sayısı ve özellik bazlı arama yapın. 13\'ten fazla filtre seçeneği.',
              href: '/search',
              cta: 'Aramaya Başla',
              color: 'text-blue-500',
              bg: 'bg-blue-50',
              border: 'border-blue-100',
            },
            {
              step: '02',
              Icon: FileText,
              title: 'Teklif Verin',
              desc: 'Beğendiğiniz ilana teklif gönderin. Satıcı teklifinizi değerlendirir ve anında bildirim alırsınız.',
              href: '/listings',
              cta: 'İlanları Gör',
              color: 'text-[#00C49F]',
              bg: 'bg-[#F0FDF8]',
              border: 'border-[#00C49F]/20',
            },
            {
              step: '03',
              Icon: Handshake,
              title: 'Anlaşın',
              desc: 'Teklif kabul edilince anlaşma odası açılır. Güvenli ortamda süreci tamamlayın.',
              href: '/deals',
              cta: 'Anlaşmalarım',
              color: 'text-purple-500',
              bg: 'bg-purple-50',
              border: 'border-purple-100',
            },
          ].map(({ step, Icon, title, desc, href, cta, color, bg, border }) => (
            <div key={step} className={`bg-white border ${border} rounded-2xl p-7 flex flex-col gap-5 hover:shadow-lg transition-all`}>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-gray-100 leading-none">{step}</span>
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
              <Link href={href} className={`inline-flex items-center gap-1.5 text-sm font-semibold ${color} hover:underline mt-auto`}>
                {cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── POPULAR CITIES ───────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Şehre Göre İlanlar</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { city: 'İstanbul', icon: '🏙️' },
              { city: 'Ankara', icon: '🏛️' },
              { city: 'İzmir', icon: '🌊' },
              { city: 'Antalya', icon: '🌴' },
              { city: 'Bursa', icon: '🏔️' },
              { city: 'Bodrum', icon: '⛵' },
              { city: 'Mersin', icon: '🌅' },
              { city: 'Adana', icon: '🌾' },
            ].map(({ city, icon }) => (
              <Link
                key={city}
                href={`/sehir/${encodeURIComponent(city)}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-[#00C49F] hover:text-[#00C49F] hover:shadow-sm transition-all"
              >
                <span>{icon}</span>
                {city}
                {cityCountMap.has(city) && (
                  <span className="text-xs font-bold text-[#00C49F] bg-[#F0FDF8] px-1.5 py-0.5 rounded-full">
                    {cityCountMap.get(city)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Glow accent */}
          <div className="absolute right-0 top-0 w-72 h-72 bg-[#00C49F] rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              İlanınızı Yayınlayın
            </h2>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Milyonlarca potansiyel alıcıya ulaşın. Ücretsiz ilan oluşturun,
              hızlıca satış yapın.
            </p>
          </div>
          <Link
            href="/create-listing"
            className="relative z-10 bg-[#00C49F] hover:bg-[#00a882] text-white font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-colors whitespace-nowrap flex-shrink-0 shadow-lg shadow-[#00C49F]/30"
          >
            Ücretsiz İlan Ver
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ─── VALUATION CTA ─────────────────────────────────────────── */}
      <section className="bg-[#F0FDF8] border-y border-[#00C49F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-2">Ücretsiz Araç</p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Mülkünüzün Piyasa Değerini Öğrenin</h2>
            <p className="text-sm text-gray-500 max-w-md">
              Gerçek piyasa verisine dayalı anlık değerleme. Şehir, mülk tipi ve alan bilgisiyle dakikalar içinde sonuç alın.
            </p>
          </div>
          <Link
            href="/valuation"
            className="flex items-center gap-2 bg-[#00C49F] hover:bg-[#00a882] text-white font-bold px-6 py-3.5 rounded-2xl transition-colors whitespace-nowrap shadow-lg shadow-[#00C49F]/20"
          >
            Değerleme Yap
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <p className="font-black text-gray-900 tracking-tight text-lg mb-2">SÖYLEMESİ BİZDEN</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Türkiye&apos;nin güvenilir gayrimenkul & varlık yönetim platformu.
              </p>
              <div className="flex flex-col gap-2 text-xs text-gray-400">
                <a href="mailto:info@soylemesibizden.com" className="flex items-center gap-2 hover:text-[#00C49F] transition-colors">
                  <Mail size={12} /> info@soylemesibizden.com
                </a>
                <a href="tel:+902121234567" className="flex items-center gap-2 hover:text-[#00C49F] transition-colors">
                  <Phone size={12} /> +90 212 123 45 67
                </a>
              </div>
            </div>
            {/* İlanlar */}
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-900 uppercase mb-4">İlanlar</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { href: '/listings?listingType=SATILIK', label: 'Satılık İlanlar' },
                  { href: '/listings?listingType=KİRALIK', label: 'Kiralık İlanlar' },
                  { href: '/listings?propertyType=KONUT', label: 'Konut' },
                  { href: '/listings?propertyType=TİCARİ', label: 'Ticari' },
                  { href: '/search', label: 'Gelişmiş Arama' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-[#00C49F] transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
            {/* Platform */}
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-900 uppercase mb-4">Platform</p>
              <div className="flex flex-col gap-2.5">
                {[
                  { href: '/dashboard', label: 'Dashboard' },
                  { href: '/my-listings', label: 'İlanlarım' },
                  { href: '/offers', label: 'Teklifler' },
                  { href: '/favorites', label: 'Favoriler' },
                  { href: '/market-radar', label: 'Piyasa Radarı' },
                  { href: '/valuation', label: 'Değerleme Aracı' },
                  { href: '/hesaplama', label: 'Hesaplama Araçları' },
                  { href: '/saved-searches', label: 'Kayıtlı Aramalar' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-[#00C49F] transition-colors">{l.label}</Link>
                ))}
              </div>
            </div>
            {/* Şehirler */}
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-900 uppercase mb-4">Popüler Şehirler</p>
              <div className="flex flex-col gap-2.5">
                {['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Bodrum'].map(city => (
                  <Link key={city} href={`/sehir/${encodeURIComponent(city)}`} className="text-sm text-gray-400 hover:text-[#00C49F] transition-colors">{city}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Söylemesi Bizden. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/agents" className="hover:text-[#00C49F] transition-colors">Danışmanlar</Link>
              <Link href="/concierge" className="hover:text-[#00C49F] transition-colors">Danışmanlık</Link>
              <Link href="/sss" className="hover:text-[#00C49F] transition-colors">SSS</Link>
              <Link href="/contact" className="hover:text-[#00C49F] transition-colors">İletişim</Link>
              <Link href="/deals" className="hover:text-[#00C49F] transition-colors">Anlaşmalar</Link>
              <Link href="/profile/settings" className="hover:text-[#00C49F] transition-colors">Hesap</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: 'Söylemesi Bizden',
            url: 'https://soylemesibizden-core.vercel.app',
            description: 'Türkiye\'nin en güvenilir gayrimenkul platformu. Satılık ve kiralık konut, ticari alan, arazi ilanları.',
            areaServed: {
              '@type': 'Country',
              name: 'Türkiye',
            },
            numberOfEmployees: { '@type': 'QuantitativeValue', value: '50+' },
          }),
        }}
      />
    </main>
  );
}
