export default function DashboardLoading() {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0">
        <div className="h-20 border-b border-gray-50 px-8 flex items-center">
          <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="p-4 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-11 bg-gray-50 rounded-xl animate-pulse" />
          ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="h-20 bg-white border-b border-gray-100" />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-4">
              <div className="h-8 w-48 bg-gray-100 rounded animate-pulse" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-40 bg-white rounded-3xl border border-gray-100 animate-pulse" />
              ))}
            </div>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-48 bg-white rounded-3xl border border-gray-100 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
