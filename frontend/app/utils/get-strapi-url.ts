export function getStrapiURL(path = "") {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  // Remove trailing slash from strapiUrl and leading slash from path if they exist
  const cleanStrapiUrl = strapiUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return `${cleanStrapiUrl}/${cleanPath}`;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return "";
  
  // If the URL already contains the media domain, return it as is
  if (url.includes('.media.strapiapp.com')) {
    return url;
  }
  
  // If it's a full URL but not a media URL, it might be incorrect
  if (url.startsWith('http')) {
    // Extract the path part of the URL
    try {
      const urlObj = new URL(url);
      return `https://harmonious-luck-fd75090c58.media.strapiapp.com${urlObj.pathname}`;
    } catch {
      return url;
    }
  }
  
  // If it's a relative URL, prepend the media domain
  return `https://harmonious-luck-fd75090c58.media.strapiapp.com${url.startsWith('/') ? url : `/${url}`}`;
}