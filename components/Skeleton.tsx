export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-[#e2dfd9] via-[#FAF8F5] to-[#e2dfd9] bg-[length:200%_100%] rounded-md ${className}`}
      style={{
        animation: "shimmer 2s infinite linear",
      }}
    />
  );
}
