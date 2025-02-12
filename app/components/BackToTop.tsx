"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isVisible ? "block" : "hidden"}`}>
      <button
        onClick={scrollToTop}
        className="p-3 rounded-full bg-black text-white hover:bg-gray-700 transition-colors"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
}