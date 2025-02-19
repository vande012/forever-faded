"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useInterval } from "../hooks/useInterval";

interface SliderImage {
  src: string;
  alt: string;
}

interface FullScreenSliderProps {
  images: SliderImage[];
}

export default function FullScreenSlider({ images }: FullScreenSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useInterval(nextSlide, images.length > 1 ? 4000 : null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, images.length]);

  return (
    <div className="hidden md:block relative w-full h-[50vh] md:h-[500px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            className="object-cover object-center"
            style={{
              objectPosition: '50% 30%' // This helps center the subject matter
            }}
          />
        </div>
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}