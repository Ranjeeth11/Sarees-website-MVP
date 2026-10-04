export function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8"
      aria-label="Loading sarees"
      role="status"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[4/5] rounded-sm bg-secondary" />
          <div className="mt-4 h-2.5 w-16 rounded-full bg-secondary" />
          <div className="mt-3 h-5 w-4/5 rounded-full bg-secondary" />
          <div className="mt-5 h-11 rounded-sm bg-secondary" />
        </div>
      ))}
    </div>
  );
}
