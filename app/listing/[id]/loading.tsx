export default function ListingLoading() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="h-5 w-32 bg-gray-100 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
            <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse space-y-3">
              <div className="h-8 w-3/4 bg-gray-100 rounded" />
              <div className="h-4 w-full bg-gray-50 rounded" />
              <div className="h-4 w-full bg-gray-50 rounded" />
              <div className="h-4 w-2/3 bg-gray-50 rounded" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="h-10 w-40 bg-gray-100 rounded mb-4" />
              <div className="h-12 bg-gray-100 rounded-xl" />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-50 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
