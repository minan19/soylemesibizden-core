export default function AdminListingsLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between">
          <div className="h-8 bg-gray-200 rounded-xl w-48" />
          <div className="h-10 bg-gray-200 rounded-xl w-32" />
        </div>
        <div className="flex gap-3">
          <div className="h-9 bg-gray-200 rounded-xl w-20" />
          <div className="h-9 bg-gray-200 rounded-xl w-28" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-12 bg-gray-50 border-b border-gray-100" />
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-16 border-b border-gray-50 px-5 flex items-center gap-4">
              <div className="flex-1 h-4 bg-gray-100 rounded" />
              <div className="w-24 h-4 bg-gray-100 rounded" />
              <div className="w-20 h-4 bg-gray-100 rounded" />
              <div className="w-16 h-4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
