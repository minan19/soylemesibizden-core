export default function AdminDashboardLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded-xl w-48" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="h-8 bg-gray-200 rounded-xl w-16 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-24" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-40" />
              {Array.from({ length: 5 }).map((_, j) => (
                <div key={j} className="h-12 bg-gray-50 rounded-xl" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
