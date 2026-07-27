'use server';

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Save } from 'lucide-react';
import PhotoUrlInput from '@/components/PhotoUrlInput';

async function createListing(formData: FormData) {
  'use server';

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const location = formData.get('location') as string;
  const city = formData.get('city') as string;
  const district = formData.get('district') as string;
  const status = formData.get('status') as string;
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
  const ownerEmail = formData.get('ownerEmail') as string;

  const photosRaw = formData.get('photos') as string;
  const photos = photosRaw ? photosRaw.split(',').map(u => u.trim()).filter(Boolean) : [];

  if (!title || !description || isNaN(price) || !ownerEmail) return;

  let owner = await prisma.user.findUnique({ where: { email: ownerEmail } });
  if (!owner) {
    owner = await prisma.user.create({
      data: { email: ownerEmail, name: ownerEmail.split('@')[0], role: 'USER' },
    });
  }

  await prisma.listing.create({
    data: {
      title, description, price,
      location: location || null,
      city: city || null,
      district: district || null,
      status: status || 'ACTIVE',
      propertyType: propertyType || 'KONUT',
      listingType: listingType || 'SATILIK',
      rooms, bathrooms, area, floor, totalFloors, buildingAge,
      hasElevator, hasParking, hasGarden,
      photos,
      ownerId: owner.id,
    },
  });

  redirect('/listings');
}

export default async function CreateListingPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });

  const inputCls = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors";
  const labelCls = "text-xs font-bold tracking-widest text-gray-500 uppercase";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Admin Panel
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Yeni İlan Oluştur</h1>
              <p className="text-xs text-gray-400 mt-0.5">Admin · Tüm alanları doldurun</p>
            </div>
          </div>
        </div>

        <form action={createListing} className="space-y-6">

          {/* Temel Bilgiler */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Temel Bilgiler</h2>
            <div className="space-y-1.5">
              <label className={labelCls}>Başlık *</label>
              <input name="title" required placeholder="Örn: Boğaz Manzaralı 4+1 Villa" className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className={labelCls}>Açıklama *</label>
              <textarea name="description" required rows={4} placeholder="Mülk hakkında detaylı açıklama..." className={`${inputCls} resize-none`} />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Fiyat (₺) *</label>
                <input name="price" type="number" required min="0" step="any" placeholder="0" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Durum</label>
                <select name="status" className={inputCls}>
                  <option value="ACTIVE">AKTİF</option>
                  <option value="PENDING">BEKLEMEDE</option>
                  <option value="SOLD">SATILDI</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lokasyon */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Lokasyon</h2>
            <div className="space-y-1.5">
              <label className={labelCls}>Tam Adres / Açıklama</label>
              <input name="location" placeholder="Örn: Sarıyer / Yeniköy, İstanbul" className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className={labelCls}>Şehir</label>
                <input name="city" placeholder="İstanbul" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>İlçe</label>
                <input name="district" placeholder="Sarıyer" className={inputCls} />
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
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}+1</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Banyo</label>
                <select name="bathrooms" className={inputCls}>
                  <option value="">-</option>
                  {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className={labelCls}>Alan (m²)</label>
                <input name="area" type="number" min="0" step="any" placeholder="0" className={inputCls} />
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
                <input name="buildingAge" type="number" min="0" placeholder="0" className={inputCls} />
              </div>
            </div>
            <div className="flex gap-6">
              {[
                { name: 'hasElevator', label: 'Asansör' },
                { name: 'hasParking', label: 'Otopark' },
                { name: 'hasGarden', label: 'Bahçe' },
              ].map(f => (
                <label key={f.name} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name={f.name} className="w-4 h-4 accent-[#00C49F]" />
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
              <p className="text-xs text-gray-400">Her fotoğraf için URL girin. Önizleme otomatik görünür.</p>
              <PhotoUrlInput name="photos" />
            </div>
          </div>

          {/* İlan Sahibi */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">İlan Sahibi</h2>
            <div className="space-y-1.5">
              <label className={labelCls}>E-posta Adresi *</label>
              {users.length > 0 ? (
                <select name="ownerEmail" required className={inputCls}>
                  <option value="">Kullanıcı seçin...</option>
                  {users.map(u => (
                    <option key={u.id} value={u.email}>
                      {u.name ? `${u.name} (${u.email})` : u.email}
                    </option>
                  ))}
                </select>
              ) : (
                <input name="ownerEmail" type="email" required placeholder="ornek@email.com" className={inputCls} />
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors">
              <Save size={16} /> İlanı Yayınla
            </button>
            <Link href="/listings" className="px-6 py-4 border border-gray-200 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              İptal
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
