import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    orderBy: { createdAt: 'desc' },
    include: { listing: true, user: true }
  });

  return (
    <main className="min-h-screen bg-white text-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Teklifler</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="p-6 border border-gray-100 rounded-2xl hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-2xl font-bold">{offer.amount.toLocaleString('tr-TR')} ₺</span>
                <span className="text-xs font-medium px-3 py-1 bg-gray-100 rounded-full">{offer.status}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mt-4">İlan: {offer.listing.title}</p>
              <p className="text-xs text-gray-500 mt-1">Kullanıcı ID: {offer.userId}</p>
            </div>
          ))}
          {offers.length === 0 && (
            <p className="text-gray-500">Henüz teklif bulunmamaktadır.</p>
          )}
        </div>
      </div>
    </main>
  );
}
