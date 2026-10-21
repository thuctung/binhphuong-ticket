"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
const BANNER_IMAGES = [
  {
    src: "/banner/captreo.jpg",
    alt: "Banner Bà Nà Hills",
  },
  {
    src: "/banner/cauvang.jpg",
    alt: "Banner Núi Thần Tài",
  },
  {
    src: "/banner/langphap.png",
    alt: "Banner Bà Nà Hills",
  },
  {
    src: "/banner/park.png",
    alt: "Banner Núi Thần Tài",
  },
];

export function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BANNER_IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full aspect-video overflow-hidden bg-neutral-900 ">
      <div className="absolute inset-0 w-full h-full">
        {BANNER_IMAGES.map((imgUrl, index) => {
          const isActive = index === currentImageIndex;
          return (
            <Image
              key={imgUrl.src}
              src={imgUrl.src}
              fill
              priority={index === 0}
              sizes="100vw"
              alt={imgUrl.alt}
              className={`absolute inset-0 object-cover will-change-[opacity] transition-opacity ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDuration: "1200ms" }}
            />
          );
        })}
      </div>

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5">
        {BANNER_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-blue-600 w-6" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Chuyển đến ảnh banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
