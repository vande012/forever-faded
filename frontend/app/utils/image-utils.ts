import { ImageRotationConfig, GalleryImage, ImageFormat } from '@/types/gallery';

// Configuration object for image rotations
const imageRotationConfigs: ImageRotationConfig[] = [
  {
    pattern: '20230817_170228_e8f4ed11a7.jpg',
    rotation: 'rotate90',
    description: 'Gallery image from August 2023'
  },
  {
    pattern: 'DSC_02306_6b32e163e3.jpg',
    rotation: 'rotate270',
    description: 'DSC image'
  },
  {
    pattern: 'DSC_03821_477cecff57.JPG',
    rotation: 'rotate270',
    description: 'DSC image'
  },
  {
    pattern: 'a78dd97649.jpg',
    rotation: 'rotate90',
    description: 'Gallery image'
  },
  {
    pattern: '20230817_161702_f52387162a.jpg',
    rotation: 'rotate90',
    description: 'Gallery image from August 2023'
  },
  {
    pattern: '20230817_161205_fd6299da89.jpg',
    rotation: 'rotate90',
    description: 'Gallery image from August 2023'
  }
];

export type ImageRotation = 'auto' | 'rotate90' | 'rotate180' | 'rotate270';

/**
 * Detects if an image needs rotation based on its URL or EXIF data
 * @param url - The URL of the image
 * @param metadata - Optional EXIF metadata for the image
 * @returns The rotation value for the image
 */
export function detectImageRotation(url: string | null, metadata?: any): ImageRotation {
  if (!url) return 'auto';

  // Check against our configuration patterns
  const matchingConfig = imageRotationConfigs.find(config => 
    url.toLowerCase().includes(config.pattern.toLowerCase())
  );

  // Debug log
  console.log('Image rotation check:', {
    url,
    matchingPattern: matchingConfig?.pattern,
    rotation: matchingConfig?.rotation || 'auto'
  });

  if (matchingConfig) {
    return matchingConfig.rotation as ImageRotation;
  }

  // If we have EXIF metadata, check orientation
  if (metadata?.orientation) {
    switch (metadata.orientation) {
      case 6: return 'rotate90';
      case 3: return 'rotate180';
      case 8: return 'rotate270';
      default: return 'auto';
    }
  }

  return 'auto';
}

/**
 * Adds a new image rotation configuration
 * @param pattern - The filename pattern to match
 * @param rotation - The rotation to apply
 * @param description - Optional description of the image
 */
export function addImageRotationConfig(
  pattern: string,
  rotation: ImageRotation,
  description: string = ''
) {
  // Check if pattern already exists
  const existingIndex = imageRotationConfigs.findIndex(
    config => config.pattern === pattern
  );

  if (existingIndex >= 0) {
    // Update existing config
    imageRotationConfigs[existingIndex] = { pattern, rotation, description };
  } else {
    // Add new config
    imageRotationConfigs.push({ pattern, rotation, description });
  }
}

/**
 * Gets the CSS class for a given rotation
 * @param rotation - The rotation value
 * @returns The corresponding CSS class
 */
export function getRotationClass(rotation: ImageRotation): string {
  switch (rotation) {
    case 'rotate90': return 'rotate-90';
    case 'rotate180': return 'rotate-180';
    case 'rotate270': return '-rotate-90';
    default: return '';
  }
}

/**
 * Checks if an image needs rotation
 * @param rotation - The rotation value
 * @returns Whether the image needs rotation
 */
export function isRotatedImage(rotation: string): boolean {
  return ['rotate90', 'rotate180', 'rotate270'].includes(rotation);
}

/**
 * Gets the best image format based on viewport size
 * @param image - The gallery image object
 * @param preferredSize - The preferred size (thumbnail, small, medium, large)
 * @returns The best format to use and its dimensions
 */
export function getBestImageFormat(
  image: GalleryImage,
  preferredSize: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'
): { url: string; width: number; height: number } {
  // If no formats available, return original
  if (!image.formats) {
    return {
      url: image.url,
      width: image.width || 800, // Default width if not provided
      height: image.height || 600 // Default height if not provided
    };
  }

  // Get the preferred format or fall back to original
  const format = image.formats[preferredSize] || {
    url: image.url,
    width: image.width,
    height: image.height
  };

  return {
    url: format.url,
    width: format.width || image.width || 800,
    height: format.height || image.height || 600
  };
} 