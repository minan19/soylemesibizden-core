export default function ValuationLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] animate-pulse">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div className="h-8 bg-gray-200 rounded-xl w-48" />
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="h-5 bg-gray-200 rounded w-40" />
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
