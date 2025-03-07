export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="mb-8">
          <div className="h-10 w-2/3 bg-gray-200 rounded"></div>
          <div className="mt-4 flex items-center">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="mx-2 text-gray-400">•</div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-96 w-full bg-gray-200 rounded-lg mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }