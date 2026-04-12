import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ConciergePage() {
  const cases = await prisma.advisoryCase.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Konsiyerj & Danışmanlık</h1>
        </header>
        <div className="space-y-4">
          {cases.map(c => (
            <div key={c.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold">{c.subject}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{c.description}</p>
              </div>
              <span className="text-xs font-medium px-4 py-2 bg-black text-white rounded-full whitespace-nowrap">{c.status}</span>
            </div>
          ))}
          {cases.length === 0 && (
            <p className="text-gray-500">Açık danışmanlık talebi bulunmamaktadır.</p>
          )}
        </div>
      </div>
    </main>
  );
}
