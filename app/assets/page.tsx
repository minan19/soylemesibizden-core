import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AssetsPage() {
  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  return (
    <main className="min-h-screen bg-white text-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Varlık Yönetimi</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map(asset => (
            <div key={asset.id} className="p-6 border border-gray-100 rounded-2xl">
              <h2 className="text-sm font-medium text-gray-500">{asset.type}</h2>
              <p className="text-2xl font-bold mt-2">{asset.value.toLocaleString('tr-TR')} ₺</p>
              <p className="text-sm text-gray-900 mt-4 border-t border-gray-50 pt-4">{asset.location || 'Lokasyon Belirtilmedi'}</p>
            </div>
          ))}
          {assets.length === 0 && (
            <p className="text-gray-500">Sistemde kayıtlı varlık bulunmamaktadır.</p>
          )}
        </div>
      </div>
    </main>
  );
}
