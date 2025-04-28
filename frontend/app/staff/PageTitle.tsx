'use client'

import React, { useEffect, useState, useRef } from 'react'

export default function PageTitle() {
  // Add a timestamp that won't cause hydration issues
  const [mounted, setMounted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    setMounted(true);
    // Log the current content of the heading
    if (headingRef.current) {
      console.log("PageTitle content after mount:", headingRef.current.innerText);
      
      // Set up a mutation observer to track changes to the heading
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'characterData' || mutation.type === 'childList') {
            console.log("Heading was changed to:", headingRef.current?.innerText);
            console.log("Changed by:", mutation);
          }
        });
      });
      
      observer.observe(headingRef.current, { 
        characterData: true, 
        childList: true,
        subtree: true
      });
      
      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      {/* Hidden timestamp that forces updates */}
      {mounted && <div style={{ display: 'none' }}>{Date.now()}</div>}
      <h1 
        ref={headingRef}
        id="staff-page-heading"
        data-testid="staff-heading"
        className="text-6xl md:text-8xl font-bold mb-4 text-[#D4AF37]"
      >
        Meet the Skilled Team at Forever Faded
      </h1>
    </>
  )
} 