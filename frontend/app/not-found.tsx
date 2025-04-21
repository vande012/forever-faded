import Link from 'next/link';
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Forever Faded',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: true
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-center text-4xl font-extrabold gold-gradient-text">404</h1>
          <h2 className="mt-2 text-center text-2xl font-bold text-white">Page Not Found</h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link 
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black gold-gradient-bg"
          >
            Return Home
          </Link>
          
          <Link 
            href="/book-now"
            className="w-full flex justify-center py-2 px-4 border border-[#D4AF37] rounded-md shadow-sm text-sm font-medium gold-border-btn"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    </div>
  );
} 