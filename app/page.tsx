import SovereignMap from '@/components/SovereignMap';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const listings = await prisma.listing.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  });

  const mapLocations = listings
    .filter(l => l.location)
    .map(l => {
      const coords = l.location?.split(',').map(Number);
      if (coords && coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        return { title: l.title, lat: coords[0], lng: coords[1] };
      }
      return null;
    })
    .filter(Boolean) as Array<{ title: string; lat: number; lng: number }>;

  return (
    <main className="min-h-screen bg-white text-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex justify-between items-center border-b border-gray-100 pb-6">
          <h1 className="text-4xl font-bold tracking-tight">Söylemesi Bizden</h1>
          <div className="text-sm font-medium px-4 py-2 bg-black text-white rounded-full">Sovereign Portal</div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">Kritik Lokasyonlar</h2>
            <SovereignMap locations={mapLocations} />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Güncel Varlıklar</h2>
            <div className="space-y-4">
              {listings.map(listing => (
                <div key={listing.id} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-lg">{listing.title}</h3>
                  <p className="text-gray-500 font-mono mt-1">{listing.price.toLocaleString('tr-TR')} ₺</p>
                </div>
              ))}
              {listings.length === 0 && (
                <div className="p-6 bg-gray-50 rounded-xl text-gray-500 text-sm border border-dashed border-gray-200">
                  Veritabanı aktif. İlan bekleniyor.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
