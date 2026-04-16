export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-[#00C49F] rounded-full animate-spin" />
        <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase">Yükleniyor</span>
      </div>
    </div>
  );
}
