import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function DealsPage() {
  const deals = await prisma.dealRoom.findMany({
    orderBy: { createdAt: 'desc' },
    include: { listing: true }
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Anlaşma Odaları</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deals.map(deal => (
            <div key={deal.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">{deal.listing.title}</h2>
                <span className="text-xs font-medium px-3 py-1 bg-black text-white rounded-full">{deal.status}</span>
              </div>
              <p className="text-sm text-gray-500 font-mono">ID: {deal.id}</p>
            </div>
          ))}
          {deals.length === 0 && (
            <p className="text-gray-500">Açık anlaşma odası bulunmamaktadır.</p>
          )}
        </div>
      </div>
    </main>
  );
}
