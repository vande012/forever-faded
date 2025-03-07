import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#1d1d1d] p-8 rounded-xl shadow-2xl flex flex-col items-center">
        {/* Modern spinner animation */}
        <div className="relative w-20 h-20 mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-l-transparent border-r-indigo-500 border-b-indigo-500 animate-spin"></div>
          
          {/* Middle ring - spins in opposite direction */}
          <div className="absolute inset-2 rounded-full border-4 border-t-indigo-400 border-l-indigo-400 border-r-transparent border-b-transparent animate-spin-slow-reverse"></div>
          
          {/* Inner dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <p className="text-gray-300 font-medium tracking-wider">LOADING</p>
        
        {/* Animated dots */}
        <div className="flex mt-2 space-x-1">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;