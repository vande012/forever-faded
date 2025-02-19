// types/api.ts
export interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: null | string;
    width: number;
    height: number;
    size: number;
    sizeInBytes?: number;
    url: string;
  }
  
  export interface MediaFile {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: null;
    width: number | null;
    height: number | null;
    formats: {
      thumbnail?: ImageFormat;
    } | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface HomepageData {
    data: {
      id: number;
      documentId: string;
      Title: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      Logo: MediaFile;
      Video: MediaFile;
    };
    meta: Record<string, unknown>;
  }