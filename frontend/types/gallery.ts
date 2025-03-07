export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface GalleryImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
}

export interface GalleryItem {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  Category: string;
  Date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Image: GalleryImage;
}

export interface GalleryResponse {
  data: {
    id: number;
    documentId: string;
    Title: string;
    Description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    gallery_items: GalleryItem[];
  };
  meta: Record<string, any>;
}