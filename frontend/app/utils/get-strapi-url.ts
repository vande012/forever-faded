export function getStrapiURL(path = "") {
    return `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
  }
  
  // Add this new function to handle media URLs
  export function getStrapiMedia(url: string | null) {
    if (!url) return "";
    
    // If the URL already includes the backend hostname, ensure it's properly formatted
    if (url.includes('backend:1337')) {
      return url.replace('http://backend:1337', 'http://localhost:1337');
    }
    
    // If it's a relative URL, prepend the Strapi URL
    if (url.startsWith('/')) {
      return `${getStrapiURL()}${url}`;
    }
    
    // Otherwise return the URL as is
    return url;
  }