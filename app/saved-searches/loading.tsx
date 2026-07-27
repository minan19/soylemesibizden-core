export default function SavedSearchesLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] animate-pulse">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <div className="h-8 bg-gray-200 rounded-xl w-56" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-48" />
                <div className="h-3 bg-gray-100 rounded w-64" />
                <div className="h-7 bg-gray-100 rounded w-28 mt-2" />
              </div>
              <div className="h-8 w-8 bg-gray-100 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
