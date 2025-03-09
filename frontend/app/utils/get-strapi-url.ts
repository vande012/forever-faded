export function getStrapiURL(path = "") {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  // Remove trailing slash from strapiUrl and leading slash from path if they exist
  const cleanStrapiUrl = strapiUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return `${cleanStrapiUrl}/${cleanPath}`;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return "";
  
  // Define the media domain
  const mediaDomain = 'harmonious-luck-fd75090c58.media.strapiapp.com';
  
  try {
    // Try to parse the URL to check if it's already a valid URL
    const parsedUrl = new URL(url);
    
    // If it's already a media URL, return it as is
    if (parsedUrl.hostname === mediaDomain) {
      return url;
    }
    
    // If it's a different URL, use just the pathname with the media domain
    return `https://${mediaDomain}${parsedUrl.pathname}`;
  } catch {
    // If URL parsing fails, it's a relative path
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `https://${mediaDomain}${cleanPath}`;
  }
}