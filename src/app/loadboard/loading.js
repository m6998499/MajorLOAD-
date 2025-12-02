export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Skeleton Banner */}
      <div className="bg-slate-900 h-40 w-full animate-pulse flex items-center justify-center">
        <div className="text-slate-700 font-bold text-xl">Loading...</div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Skeleton Welcome Text */}
        <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-6"></div>

        {/* Skeleton Alert Box */}
        <div className="h-24 w-full bg-slate-200 rounded animate-pulse mb-8"></div>

        {/* Skeleton Load List */}
        <div className="space-y-4">
          <div className="h-20 w-full bg-white rounded shadow animate-pulse"></div>
          <div className="h-20 w-full bg-white rounded shadow animate-pulse"></div>
          <div className="h-20 w-full bg-white rounded shadow animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
