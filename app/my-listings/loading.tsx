export default function MyListingsLoading() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-9 w-40 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-56 bg-gray-50 rounded animate-pulse" />
          </div>
          <div className="h-10 w-28 bg-gray-100 rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="h-8 w-12 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-24 bg-gray-50 rounded" />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 bg-gray-100 rounded" />
                  <div className="h-3 w-1/3 bg-gray-50 rounded" />
                  <div className="h-3 w-1/2 bg-gray-50 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-gray-100 rounded-lg" />
                  <div className="h-8 w-20 bg-gray-100 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
