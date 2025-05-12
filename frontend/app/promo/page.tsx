'use client';

import Image from 'next/image';
import Link from 'next/link';
import CopyButton from './CopyButton';

export default function PromoPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black text-white overflow-hidden">
      <div className="max-w-md w-full mx-auto text-center flex flex-col items-center space-y-8">
        {/* Logo */}
        <div className="relative w-64 h-64 mb-4">
          <img
            src="https://forever-faded.s3.amazonaws.com/FFlogo.jpg"
            alt="Forever Faded Logo"
            width={256}
            height={256}
            style={{ borderRadius: '50%', objectFit: 'cover', width: '256px', height: '256px' }}
          />
        </div>

        {/* Promo Code */}
        <div className="w-full">
          <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-2">SUMMER20</h1>
          <p className="text-lg mb-4">20% off your next visit</p>
          
          {/* Copy Button */}
          <CopyButton 
            textToCopy="SUMMER20"
            className="gold-gradient-bg text-black font-bold py-2 px-6 rounded-lg mb-8 hover:bg-[#c4a137] transition-colors"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link 
            href="https://foreverfadedmke.com/" 
            target="_blank"
            className="bg-white text-black font-bold py-3 px-6 rounded-lg flex-1 flex items-center justify-center hover:bg-gray-200 transition-colors"
            rel="noopener noreferrer"
          >
            Visit Website
          </Link>
          <Link 
            href="https://getsquire.com/booking/book/forever-faded-llc-waukesha" 
            target="_blank"
            className="gold-gradient-bg text-black font-bold py-3 px-6 rounded-lg flex-1 flex items-center justify-center hover:bg-[#c4a137] transition-colors"
            rel="noopener noreferrer"
          >
            Book Now
          </Link>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-8">
          Valid for services at Forever Faded Barbershop.
          <br />
          Use this code at checkout.
        </p>
      </div>
    </main>
  );
} 