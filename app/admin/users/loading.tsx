export default function AdminUsersLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded-xl w-56" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-xl" />
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-16" />
                <div className="h-3 bg-gray-100 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-12 bg-gray-50 border-b border-gray-100" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 border-b border-gray-50 px-5 flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="flex-1 h-4 bg-gray-100 rounded" />
              <div className="w-32 h-4 bg-gray-100 rounded" />
              <div className="w-16 h-6 bg-gray-100 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
