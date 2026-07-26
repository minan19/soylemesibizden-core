import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Edit, Save } from 'lucide-react';

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  ACTIVE: { label: 'Aktif', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  PENDING: { label: 'Onay Bekliyor', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  SOLD: { label: 'Satıldı / Kiralandı', cls: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) redirect('/login');

  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: { owner: true },
  });

  if (!listing) notFound();

  // Only allow owner or admin
  if (listing.ownerId !== user.id && user.role !== 'ADMIN') {
    redirect('/my-listings');
  }

  async function updateListing(formData: FormData) {
    'use server';

    const sessionInner = await getServerSession(authOptions);
    if (!sessionInner?.user?.email) redirect('/login');

    const userInner = await prisma.user.findUnique({ where: { email: sessionInner.user.email } });
    if (!userInner) redirect('/login');

    const listingInner = await prisma.listing.findUnique({ where: { id: params.id } });
    if (!listingInner) notFound();

    if (listingInner.ownerId !== userInner.id && userInner.role !== 'ADMIN') {
      redirect('/my-listings');
    }

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

    await prisma.listing.update({
      where: { id: params.id },
      data: {
        title,
        description,
        price,
        location: location || null,
        city: city || null,
        district: district || null,
        neighborhood: neighborhood || null,
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
        // status intentionally omitted — only admin can change status
      },
    });

    redirect('/my-listings');
  }

  const inputCls =
    'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors';
  const labelCls = 'text-xs font-bold tracking-widest text-gray-500 uppercase';

  const statusInfo = STATUS_LABELS[listing.status] ?? STATUS_LABELS['PENDING'];

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
              <Edit size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight">İlanı Düzenle</h1>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.cls}`}>
                  {statusInfo.label}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{listing.title}</p>
            </div>
          </div>
        </div>

        <form action={updateListing} className="space-y-6">

          {/* Temel Bilgiler */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Temel Bilgiler</h2>
            <div className="space-y-1.5">
              <label className={labelCls}>Başlık *</label>
              <input
                name="title"
                required
                placeholder="Örn: Boğaz Manzaralı 4+1 Villa"
                defaultValue={listing.title}
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
                defaultValue={listing.description}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>İlan Türü</label>
                <select name="listingType" defaultValue={listing.listingType} className={inputCls}>
                  <option value="SATILIK">SATILIK</option>
                  <option value="KİRALIK">KİRALIK</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Mülk Tipi</label>
                <select name="propertyType" defaultValue={listing.propertyType} className={inputCls}>
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
                defaultValue={listing.price}
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
                defaultValue={listing.location ?? ''}
                className={inputCls}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Şehir</label>
                <input
                  name="city"
                  placeholder="İstanbul"
                  defaultValue={listing.city ?? ''}
                  className={inputCls}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>İlçe</label>
                <input
                  name="district"
                  placeholder="Sarıyer"
                  defaultValue={listing.district ?? ''}
                  className={inputCls}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Mahalle</label>
                <input
                  name="neighborhood"
                  placeholder="Yeniköy"
                  defaultValue={listing.neighborhood ?? ''}
                  className={inputCls}
                />
              </div>
            </div>
          </div>

          {/* Mülk Detayları */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Mülk Detayları</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Oda Sayısı</label>
                <select
                  name="rooms"
                  defaultValue={listing.rooms?.toString() ?? ''}
                  className={inputCls}
                >
                  <option value="">-</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n}+1</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Banyo</label>
                <select
                  name="bathrooms"
                  defaultValue={listing.bathrooms?.toString() ?? ''}
                  className={inputCls}
                >
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
                  defaultValue={listing.area ?? ''}
                  className={inputCls}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Bulunduğu Kat</label>
                <input
                  name="floor"
                  type="number"
                  placeholder="-"
                  defaultValue={listing.floor ?? ''}
                  className={inputCls}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Toplam Kat</label>
                <input
                  name="totalFloors"
                  type="number"
                  placeholder="-"
                  defaultValue={listing.totalFloors ?? ''}
                  className={inputCls}
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Bina Yaşı</label>
                <input
                  name="buildingAge"
                  type="number"
                  min="0"
                  placeholder="0"
                  defaultValue={listing.buildingAge ?? ''}
                  className={inputCls}
                />
              </div>
            </div>
            <div className="flex gap-6">
              {[
                { name: 'hasElevator', label: 'Asansör', checked: listing.hasElevator },
                { name: 'hasParking', label: 'Otopark', checked: listing.hasParking },
                { name: 'hasGarden', label: 'Bahçe', checked: listing.hasGarden },
              ].map(f => (
                <label key={f.name} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={f.name}
                    defaultChecked={f.checked}
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
                defaultValue={listing.photos.join(', ')}
                placeholder="https://..., https://..., https://..."
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>

          {/* İlan Sahibi (readonly) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">İlan Sahibi</h2>
            <div className="space-y-1.5">
              <label className={labelCls}>Mevcut Sahip</label>
              <input
                type="text"
                disabled
                value={
                  listing.owner.name
                    ? `${listing.owner.name} (${listing.owner.email})`
                    : listing.owner.email
                }
                className={`${inputCls} opacity-50 cursor-not-allowed`}
                readOnly
              />
            </div>
            <p className="text-xs text-gray-400">
              * İlan durumu yalnızca admin tarafından değiştirilebilir.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
            >
              <Save size={16} /> Değişiklikleri Kaydet
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
