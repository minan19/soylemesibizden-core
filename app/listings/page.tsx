import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ListingsPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' },
    include: { owner: true }
  });

  return (
    <main className="min-h-screen bg-white text-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Kritik Varlıklar</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(listing => (
            <div key={listing.id} className="p-6 border border-gray-100 rounded-2xl hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold">{listing.title}</h2>
              <p className="text-gray-500 mt-2 line-clamp-2">{listing.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">{listing.price.toLocaleString('tr-TR')} ₺</span>
                <span className="text-xs font-medium px-3 py-1 bg-gray-100 rounded-full">{listing.status}</span>
              </div>
            </div>
          ))}
          {listings.length === 0 && (
            <p className="text-gray-500">Henüz ilan bulunmamaktadır.</p>
          )}
        </div>
      </div>
    </main>
  );
}
