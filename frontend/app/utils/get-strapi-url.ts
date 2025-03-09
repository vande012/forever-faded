export function getStrapiURL(path = "") {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  // Remove trailing slash from strapiUrl and leading slash from path if they exist
  const cleanStrapiUrl = strapiUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return `${cleanStrapiUrl}/${cleanPath}`;
}

export function getStrapiMedia(url: string | null) {
  if (!url) return "";
  
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
  
  try {
    // Try to parse the URL to check if it's already a valid absolute URL
    new URL(url);
    return url;
  } catch {
    // If URL parsing fails, it's a relative URL
    // Remove any duplicate slashes and combine the URLs properly
    const cleanStrapiUrl = strapiUrl.replace(/\/$/, '');
    const cleanPath = url.replace(/^\//, '');
    return `${cleanStrapiUrl}/${cleanPath}`;
  }
}