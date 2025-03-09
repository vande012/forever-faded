export function getStrapiURL(path = "") {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  // Remove trailing slash from strapiUrl and leading slash from path if they exist
  const cleanStrapiUrl = strapiUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return `${cleanStrapiUrl}/${cleanPath}`;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return "";
  
  // If it's already a full URL, return it as is
  if (url.startsWith('http')) {
    return url;
  }
  
  // If it's a relative path, construct the full URL
  const mediaDomain = 'harmonious-luck-fd75090c58.media.strapiapp.com';
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `https://${mediaDomain}${cleanPath}`;
}