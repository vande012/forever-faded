export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="mt-2 h-6 w-96 bg-gray-200 rounded animate-pulse"></div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="mt-2 h-6 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="mt-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="ml-2 h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }