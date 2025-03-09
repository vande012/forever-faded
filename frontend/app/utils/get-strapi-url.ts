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
  
  // If it's already a media URL, return it as is
  if (url.includes(mediaDomain)) {
    return url;
  }
  
  // Remove any existing URLs from the path
  const cleanPath = url
    .replace(/https?:\/\/[^/]+/g, '')
    .replace(/^\//, '');
    
  return `https://${mediaDomain}/${cleanPath}`;
}