import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, Save, Info } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CreateListingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) redirect('/login');

  async function createListing(formData: FormData) {
    'use server';

    const sessionInner = await getServerSession(authOptions);
    if (!sessionInner?.user?.email) redirect('/login');

    const userInner = await prisma.user.findUnique({ where: { email: sessionInner.user.email } });
    if (!userInner) redirect('/login');

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const location = formData.get('location') as string;
    const city = formData.get('city') as string;
    const district = formData.get('district') as string;
    const neighborhood = formData.get('neighborhood') as string;
    const propertyType = formData.get('propertyType') as string;
    const listingType = formData.get('listingType') as string;
    const rooms = formData.get('rooms') ? parseInt(formData.get('rooms') as string) : null;
    const bathrooms = formData.get('bathrooms') ? parseInt(formData.get('bathrooms') as string) : null;
    const area = formData.get('area') ? parseFloat(formData.get('area') as string) : null;
    const floor = formData.get('floor') ? parseInt(formData.get('floor') as string) : null;
    const totalFloors = formData.get('totalFloors') ? parseInt(formData.get('totalFloors') as string) : null;
    const buildingAge = formData.get('buildingAge') ? parseInt(formData.get('buildingAge') as string) : null;
    const hasElevator = formData.get('hasElevator') === 'on';
    const hasParking = formData.get('hasParking') === 'on';
    const hasGarden = formData.get('hasGarden') === 'on';

    const photosRaw = formData.get('photos') as string;
    const photos = photosRaw ? photosRaw.split(',').map(u => u.trim()).filter(Boolean) : [];

    if (!title || !description || isNaN(price)) return;

    await prisma.listing.create({
      data: {
        title,
        description,
        price,
        location: location || null,
        city: city || null,
        district: district || null,
        neighborhood: neighborhood || null,
        status: 'PENDING',
        propertyType: propertyType || 'KONUT',
        listingType: listingType || 'SATILIK',
        rooms,
        bathrooms,
        area,
        floor,
        totalFloors,
        buildingAge,
        hasElevator,
        hasParking,
        hasGarden,
        photos,
        ownerId: userInner.id,
      },
    });

    redirect('/my-listings');
  }

  const inputCls =
    'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors';
  const labelCls = 'text-xs font-bold tracking-widest text-gray-500 uppercase';

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-8 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link
            href="/my-listings"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3"
          >
            <ArrowLeft size={14} /> İlanlarıma Dön
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <PlusCircle size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Yeni İlan Ver</h1>
              <p className="text-xs text-gray-400 mt-0.5">Tüm alanları eksiksiz doldurun</p>
            </div>
          </div>
        </div>

        {/* Onay Notu */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
          <Info size={18} className="text-amber-500 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-700 font-medium leading-relaxed">
            İlanınız yayına alınmadan önce admin onayına gönderilecektir. Onay süreci genellikle 24 saat içinde tamamlanır.
          </p>
        </div>

        <form action={createListing} className="space-y-6">

          {/* Temel Bilgiler */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Temel Bilgiler</h2>
            <div className="space-y-1.5">
              <label className={labelCls}>Başlık *</label>
              <input
                name="title"
                required
                placeholder="Örn: Boğaz Manzaralı 4+1 Villa"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Açıklama *</label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Mülk hakkında detaylı açıklama..."
                className={`${inputCls} resize-none`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>İlan Türü</label>
                <select name="listingType" className={inputCls}>
                  <option value="SATILIK">SATILIK</option>
                  <option value="KİRALIK">KİRALIK</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Mülk Tipi</label>
                <select name="propertyType" className={inputCls}>
                  <option value="KONUT">Konut</option>
                  <option value="TİCARİ">Ticari</option>
                  <option value="ARAZI">Arazi</option>
                  <option value="OFİS">Ofis</option>
                  <option value="DEPO">Depo</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Fiyat (₺) *</label>
              <input
                name="price"
                type="number"
                required
                min="0"
                step="any"
                placeholder="0"
                className={inputCls}
              />
            </div>
          </div>

          {/* Lokasyon */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Lokasyon</h2>
            <div className="space-y-1.5">
              <label className={labelCls}>Tam Adres / Açıklama</label>
              <input
                name="location"
                placeholder="Örn: Sarıyer / Yeniköy, İstanbul"
                className={inputCls}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Şehir</label>
                <input name="city" placeholder="İstanbul" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>İlçe</label>
                <input name="district" placeholder="Sarıyer" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Mahalle</label>
                <input name="neighborhood" placeholder="Yeniköy" className={inputCls} />
              </div>
            </div>
          </div>

          {/* Mülk Detayları */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Mülk Detayları</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Oda Sayısı</label>
                <select name="rooms" className={inputCls}>
                  <option value="">-</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n}+1</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Banyo</label>
                <select name="bathrooms" className={inputCls}>
                  <option value="">-</option>
                  {[1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Alan (m²)</label>
                <input
                  name="area"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Bulunduğu Kat</label>
                <input name="floor" type="number" placeholder="-" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Toplam Kat</label>
                <input name="totalFloors" type="number" placeholder="-" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Bina Yaşı</label>
                <input
                  name="buildingAge"
                  type="number"
                  min="0"
                  placeholder="0"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="flex gap-6">
              {[
                { name: 'hasElevator', label: 'Asansör' },
                { name: 'hasParking', label: 'Otopark' },
                { name: 'hasGarden', label: 'Bahçe' },
              ].map(f => (
                <label key={f.name} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={f.name}
                    className="w-4 h-4 accent-[#00C49F]"
                  />
                  <span className="text-sm font-medium text-gray-700">{f.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fotoğraflar */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Fotoğraflar</h2>
            <div className="space-y-1.5">
              <label className={labelCls}>Fotoğraf URL&apos;leri</label>
              <p className="text-xs text-gray-400">Fotoğraf URL&apos;lerini virgülle ayırarak girin</p>
              <textarea
                name="photos"
                rows={3}
                placeholder="https://..., https://..., https://..."
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          {/* İlan Sahibi (readonly) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">İlan Sahibi</h2>
            <div className="space-y-1.5">
              <label className={labelCls}>Hesabınız</label>
              <input
                type="text"
                disabled
                value={user.name ? `${user.name} (${user.email})` : user.email}
                className={`${inputCls} opacity-50 cursor-not-allowed`}
                readOnly
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
            >
              <Save size={16} /> İlanı Onaya Gönder
            </button>
            <Link
              href="/my-listings"
              className="px-6 py-4 border border-gray-200 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              İptal
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
