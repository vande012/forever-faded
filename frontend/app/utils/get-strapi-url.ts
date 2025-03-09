export function getStrapiURL(path = "") {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  const cleanPath = path.replace(/^\//, '');
  return `${strapiUrl}/${cleanPath}`;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return "";
  
  // If the URL is already a media URL, return it
  if (url.includes('.media.strapiapp.com')) {
    return url;
  }
  
  // If the URL contains the API URL, extract just the media URL part
  if (url.includes('.strapiapp.com')) {
    const mediaUrlMatch = url.match(/https:\/\/[^/]+\.media\.strapiapp\.com\/[^/]+\.[^/]+$/);
    if (mediaUrlMatch) {
      return mediaUrlMatch[0];
    }
  }
  
  // For relative paths, construct the media URL
  const mediaDomain = 'harmonious-luck-fd75090c58.media.strapiapp.com';
  const cleanPath = url.replace(/^\//, '');
  return `https://${mediaDomain}/${cleanPath}`;
}