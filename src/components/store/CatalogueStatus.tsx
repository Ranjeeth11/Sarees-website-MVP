export function CatalogueStatus({
  loading,
  error,
  retry,
}: {
  loading: boolean;
  error: boolean;
  retry: () => void;
}) {
  if (loading)
    return (
      <p className="py-12 text-center text-muted-foreground" role="status">
        Loading sarees…
      </p>
    );
  if (error)
    return (
      <div className="py-12 text-center" role="alert">
        <p>Unable to load sarees.</p>
        <button onClick={retry} className="mt-4 underline">
          Try again
        </button>
      </div>
    );
  return null;
}
