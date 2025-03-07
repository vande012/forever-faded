'use client';

export default function Error() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-2 text-gray-600">Failed to load the article. Please try again later.</p>
      </div>
    </div>
  );
}