import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative h-[75vh] w-full flex flex-col items-center justify-center px-4 overflow-hidden shadow-2xl border-y border-[#0B2B26]/5">
        <Skeleton className="absolute inset-0 z-0" />
        <div className="relative z-10 max-w-3xl flex flex-col items-center space-y-6 w-full">
          <Skeleton className="h-4 w-32 mb-6" />
          <Skeleton className="h-16 md:h-24 w-3/4 max-w-md" />
          <Skeleton className="h-16 md:h-24 w-1/2 max-w-xs mb-6" />
          <Skeleton className="h-20 w-full max-w-2xl mb-10" />
          <Skeleton className="h-14 w-48" />
        </div>
      </div>

      {/* Ticker Skeleton */}
      <div className="border-b border-[#e5e5e5] bg-[#F9F6F0] py-4">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <Skeleton className="h-6 w-64 mb-2 md:mb-0" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </main>
  );
}
