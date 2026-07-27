export default function DealsLoading() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
        <div className="h-9 w-48 bg-gray-100 rounded animate-pulse" />
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="h-8 w-12 bg-gray-100 rounded mb-2" />
              <div className="h-3 w-24 bg-gray-50 rounded" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {[0, 1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gray-100 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-4 w-48 bg-gray-100 rounded" />
                    <div className="h-3 w-32 bg-gray-50 rounded" />
                  </div>
                </div>
                <div className="h-7 w-20 bg-gray-100 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-50">
                {[0, 1, 2].map(j => (
                  <div key={j} className="space-y-1">
                    <div className="h-3 w-16 bg-gray-50 rounded" />
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
