'use client';

import { useEffect } from 'react';

export default function ClientImageFixer() {
  useEffect(() => {
    // Find all image elements with backend:1337 in their src
    const images = document.querySelectorAll('img[src*="backend:1337"]');
    
    // Replace the URLs
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        img.setAttribute('src', src.replace('http://backend:1337', 'http://localhost:1337'));
      }
    });
  }, []);
  
  return null;
}