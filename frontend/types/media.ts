export interface Media {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    formats?: {
      thumbnail?: MediaFormat;
      small?: MediaFormat;
      medium?: MediaFormat;
      large?: MediaFormat;
    };
  }
  
  interface MediaFormat {
    url: string;
    width: number;
    height: number;
  }