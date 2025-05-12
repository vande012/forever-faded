'use client';

import Image from 'next/image';
import Link from 'next/link';
import CopyButton from './CopyButton';

export default function PromoPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black text-white overflow-hidden">
  <div className="max-w-md w-full mx-auto text-center flex flex-col items-center space-y-4 sm:space-y-4 px-2" style={{ maxHeight: '100vh' }}>
    {/* Logo */}
    <div className="relative w-40 h-40 sm:w-64 sm:h-64 mb-2 sm:mb-4 flex-shrink-0">
      <img
        src="https://forever-faded.s3.amazonaws.com/FFlogo.jpg"
        alt="Forever Faded Logo"
        width={160}
        height={160}
        style={{ borderRadius: '50%', objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>

    {/* Promo Code */}
    <div className="w-full">
      <h1 className="text-3xl sm:text-5xl font-bold gold-gradient-text mb-1 sm:mb-2">SUMMER20</h1>
      <p className="text-base sm:text-lg mb-2 sm:mb-4">20% off your next visit</p>
      <CopyButton 
        textToCopy="SUMMER20"
        className="gold-gradient-bg text-black font-bold py-2 px-4 sm:px-6 rounded-lg mb-4 sm:mb-8 hover:bg-[#c4a137] transition-colors w-full"
      />
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 w-full">
      
      <Link 
        href="https://getsquire.com/booking/book/forever-faded-llc-waukesha" 
        target="_blank"
        className="gold-gradient-bg text-black font-bold py-3 px-4 sm:px-6 rounded-lg flex-1 flex items-center justify-center hover:bg-[#c4a137] transition-colors w-full"
        rel="noopener noreferrer"
      >
        Book Now
      </Link>
    </div>

    {/* Footer */}
    <p className="text-xs sm:text-sm text-gray-400 mt-4 sm:mt-8">
      Valid for services at Forever Faded Barbershop.<br />
      Use this code at checkout.
    </p>
  </div>
</main>
  );
} 