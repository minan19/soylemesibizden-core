export default function ListingsLoading() {
  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="border-b border-gray-100 pb-6">
          <div className="h-8 w-56 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 border border-gray-100 rounded-2xl space-y-3 animate-pulse">
              <div className="h-6 w-3/4 bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-50 rounded" />
              <div className="h-4 w-2/3 bg-gray-50 rounded" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 w-32 bg-gray-100 rounded" />
                <div className="h-6 w-20 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
