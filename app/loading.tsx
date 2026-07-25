export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 h-80 animate-pulse" />
      {/* Stats skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="h-8 w-16 bg-gray-100 rounded mb-2" />
              <div className="h-4 w-24 bg-gray-50 rounded" />
            </div>
          ))}
        </div>
        <div className="h-6 w-48 bg-gray-100 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="h-40 bg-gray-100 rounded-xl mb-4" />
              <div className="h-5 w-3/4 bg-gray-100 rounded mb-2" />
              <div className="h-4 w-full bg-gray-50 rounded mb-3" />
              <div className="h-6 w-32 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
