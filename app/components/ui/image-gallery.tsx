"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div {...handlers} className="relative h-[600px] w-full overflow-hidden">
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
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={previousSlide}
        className="group absolute left-4 top-1/2 z-40 -translate-y-1/2 transform rounded-full p-2 transition-all hover:bg-black/20"
        aria-label="Previous image"
      >
        <div className="relative overflow-hidden rounded-full gold-gradient-bg p-2">
          <ChevronLeft className="h-6 w-6 text-black transition-transform group-hover:-translate-x-0.5" />
        </div>
      </button>
      <button
        onClick={nextSlide}
        className="group absolute right-4 top-1/2 z-40 -translate-y-1/2 transform rounded-full p-2 transition-all hover:bg-black/20"
        aria-label="Next image"
      >
        <div className="relative overflow-hidden rounded-full gold-gradient-bg p-2">
          <ChevronRight className="h-6 w-6 text-black transition-transform group-hover:translate-x-0.5" />
        </div>
      </button>
    </div>
  );
}