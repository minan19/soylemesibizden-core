export default function NotificationsLoading() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-8 py-10 space-y-6">
        <div className="h-9 w-48 bg-gray-100 rounded animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 animate-pulse">
              <div className="w-9 h-9 rounded-xl bg-gray-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
                <div className="h-3 w-1/2 bg-gray-50 rounded" />
              </div>
              <div className="h-3 w-16 bg-gray-50 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
