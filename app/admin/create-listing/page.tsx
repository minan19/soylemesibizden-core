'use server';

import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Save } from 'lucide-react';

async function createListing(formData: FormData) {
  'use server';

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const location = formData.get('location') as string;
  const status = formData.get('status') as string;
  const ownerEmail = formData.get('ownerEmail') as string;

  if (!title || !description || isNaN(price) || !ownerEmail) return;

  let owner = await prisma.user.findUnique({ where: { email: ownerEmail } });
  if (!owner) {
    owner = await prisma.user.create({
      data: { email: ownerEmail, name: ownerEmail.split('@')[0], role: 'USER' },
    });
  }

  await prisma.listing.create({
    data: {
      title,
      description,
      price,
      location: location || null,
      status: status || 'ACTIVE',
      ownerId: owner.id,
    },
  });

  redirect('/listings');
}

export default async function CreateListingPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });

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
              <p className="text-xs text-gray-400 mt-0.5">Admin · Zorunlu alanlar ile tam kayıt</p>
            </div>
          </div>
        </div>

        <form action={createListing} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Temel Bilgiler</h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Başlık *</label>
              <input
                name="title"
                required
                placeholder="Örn: Boğaz Manzaralı Villa"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Açıklama *</label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Varlık hakkında detaylı açıklama..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Fiyat (₺) *</label>
                <input
                  name="price"
                  type="number"
                  required
                  min="0"
                  step="any"
                  placeholder="0"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Durum</label>
                <select
                  name="status"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors"
                >
                  <option value="ACTIVE">AKTİF</option>
                  <option value="PENDING">BEKLEMEDE</option>
                  <option value="SOLD">SATILDI</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Lokasyon</label>
              <input
                name="location"
                placeholder="Örn: Sarıyer / Yeniköy, İstanbul"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">İlan Sahibi</h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">E-posta Adresi *</label>
              {users.length > 0 ? (
                <select
                  name="ownerEmail"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors"
                >
                  <option value="">Kullanıcı seçin...</option>
                  {users.map(u => (
                    <option key={u.id} value={u.email}>
                      {u.name ? `${u.name} (${u.email})` : u.email}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name="ownerEmail"
                  type="email"
                  required
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors"
                />
              )}
              <p className="text-[10px] text-gray-400">Listede yoksa e-posta yazın — yeni kullanıcı otomatik oluşturulur.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
            >
              <Save size={16} /> İlanı Kaydet
            </button>
            <Link
              href="/listings"
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
