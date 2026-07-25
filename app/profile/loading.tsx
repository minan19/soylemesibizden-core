export default function ProfileLoading() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-8 py-10 space-y-8 animate-pulse">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gray-100" />
          <div className="flex-1 space-y-2">
            <div className="h-7 w-48 bg-gray-100 rounded" />
            <div className="h-4 w-64 bg-gray-50 rounded" />
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center space-y-1">
                <div className="h-8 w-12 bg-gray-100 rounded mx-auto" />
                <div className="h-3 w-10 bg-gray-50 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-16" />
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 h-64" />
        </div>
      </div>
    </main>
  );
}
