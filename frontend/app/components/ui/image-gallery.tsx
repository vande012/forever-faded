"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { useSwipeable } from "react-swipeable";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: previousSlide,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="relative h-[500px] w-full overflow-hidden">
      <div className="relative h-full w-full">
        {images.map((image, index) => {
          // Calculate the position relative to current
          const position = (index - currentIndex + images.length) % images.length;
          const isCenter = position === 0;
          const isNext = position === 1;
          const isPrev = position === images.length - 1;

          return (
            <div
              key={`${image.src}-${index}`}
              className={cn(
                "absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out",
                isCenter && "z-30 scale-100 opacity-100",
                isNext && "z-20 translate-x-[40%] scale-90 opacity-50 blur-sm",
                isPrev && "z-20 -translate-x-[140%] scale-90 opacity-50 blur-sm",
                !isCenter && !isNext && !isPrev && "opacity-0"
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={isCenter}
                  unoptimized={image.src === "/placeholder.svg" || image.src?.endsWith(".svg")}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}