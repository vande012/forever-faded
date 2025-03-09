export function getStrapiURL(path = "") {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  // Remove any existing http URLs from the path
  const cleanPath = path.replace(/https?:\/\/[^/]+/g, '').replace(/^\//, '');
  const cleanStrapiUrl = strapiUrl.replace(/\/$/, '');
  return `${cleanStrapiUrl}/${cleanPath}`;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return "";
  
  const mediaDomain = 'harmonious-luck-fd75090c58.media.strapiapp.com';
  
  try {
    // First, try to decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(url);
    
    // If it's already a media URL, return it as is
    if (decodedUrl.includes(mediaDomain)) {
      return decodedUrl;
    }
    
    // Extract just the filename/path part
    const matches = decodedUrl.match(/([^/]+\.[^/]+)$/);
    if (matches) {
      return `https://${mediaDomain}/${matches[1]}`;
    }
    
    // If no matches, clean the path and construct the URL
    const cleanPath = decodedUrl
      .replace(/https?:\/\/[^/]+/g, '')
      .replace(/^\//, '');
      
    return `https://${mediaDomain}/${cleanPath}`;
  } catch (error) {
    // If decoding fails, work with the original URL
    console.error('Error processing URL:', error);
    const cleanPath = url
      .replace(/https?:\/\/[^/]+/g, '')
      .replace(/^\//, '');
      
    return `https://${mediaDomain}/${cleanPath}`;
  }
}