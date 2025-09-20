interface EmptyStateProps {
  isLoading: boolean;
  hasSearchQuery: boolean;
}

export default function EmptyState({ isLoading, hasSearchQuery }: EmptyStateProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-[200px]">
        <div className="text-center">
          <div className="text-gray-400 font-polysans text-lg mb-2">
            Loading fractions...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[200px]">
      <div className="text-center">
        <div className="text-gray-400 font-polysans text-lg mb-2">
          No fraction found
        </div>
        <div className="text-gray-500 font-polysans">
          {hasSearchQuery
            ? "Try adjusting your search query"
            : "Create your first fraction to get started"}
        </div>
      </div>
    </div>
  );
}
