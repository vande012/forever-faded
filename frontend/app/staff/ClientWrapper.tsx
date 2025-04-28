'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Loading component
function StaffPageLoading() {
  return <div className="bg-[#1d1d1d] min-h-screen flex items-center justify-center">
    <div className="text-white text-xl">Loading team information...</div>
  </div>;
}

// Dynamically import the staff page content
const StaffPageContent = dynamic(() => import('./StaffPageContent'), {
  ssr: false,
  loading: () => <StaffPageLoading />
})

export default function ClientWrapper() {
  return <StaffPageContent />
} 