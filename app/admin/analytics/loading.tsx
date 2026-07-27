export default function AdminAnalyticsLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] animate-pulse">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="h-8 bg-gray-200 rounded-xl w-56" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              <div className="w-8 h-8 bg-gray-100 rounded-xl" />
              <div className="h-6 bg-gray-200 rounded w-20" />
              <div className="h-3 bg-gray-100 rounded w-28" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 h-32" />
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 h-48" />
          <div className="bg-white rounded-2xl border border-gray-100 p-6 h-48" />
        </div>
      </div>
    </div>
  );
}
