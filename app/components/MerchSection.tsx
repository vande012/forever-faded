"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";

const merchItems = [
  { id: 1, name: "Classic Gold Tee", price: "$29.99", image: "/unisex-staple-t-shirt-olive.png" },
  { id: 2, name: "Black Embroidered Cap", price: "$24.99", image: "/unisex-staple-t-shirt-burnt-orange-front.png" },
  { id: 3, name: "Sleek Hoodie", price: "$49.99", image: "/unisex-heavy-blend-hoodie-black-front.png" },
  { id: 4, name: "Limited Edition Jacket", price: "$79.99", image: "/unisex-heavy-blend-hoodie-maroon-front.png" },
  { id: 5, name: "Gold Chain Necklace", price: "$39.99", image: "/unisex-heavy-blend-hoodie-white-front.png" },
  { id: 6, name: "Signature Sneakers", price: "$89.99", image: "/unisex-premium-hoodie-black-front.png" },
];

const MerchItem = ({ item, index }: { item: (typeof merchItems)[0]; index: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.3, delay: index * 0.4 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-1">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={300}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href="/shop"
            className="gold-gradient-bg text-white font-urbanist font-bold py-2 px-4 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-urbanist text-xl font-semibold text-white">{item.name}</h3>
        <p className="font-roboto text-gray-300 mt-1">{item.price}</p>
      </div>
    </motion.div>
  );
};

export default function MerchSection() {
    const [scrollY, setScrollY] = useState(0);
    const [stars, setStars] = useState<{ x: number; y: number; opacity: number; id: number }[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
  
    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

 
  useEffect(() => {
    const generateStarsInSection = () => {
      if (!sectionRef.current) return;
      
      const sectionHeight = sectionRef.current.offsetHeight;
      const sectionWidth = sectionRef.current.offsetWidth;
      
      // Increase number of stars based on section size
      const starCount = Math.floor((sectionWidth * sectionHeight) / 10000); // Adjust density as needed

      const newStars = Array.from({ length: starCount }, (_, index) => ({
        x: Math.random() * sectionWidth,
        y: Math.random() * sectionHeight,
        opacity: 0,
        id: index,
      }));
      setStars(newStars);

      // Fade in the stars
      setTimeout(() => {
        setStars((prevStars) =>
          prevStars.map((star) => ({
            ...star,
            opacity: Math.random() * 0.8 + 0.2,
          }))
        );
      }, 100);
    };

    // Generate initial stars
    generateStarsInSection();

    // Handle window resize
    const handleResize = () => {
      generateStarsInSection();
    };
    window.addEventListener('resize', handleResize);

    // Set up the animation cycle
    const interval = setInterval(() => {
      // Step 1: Fade out stars completely
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          opacity: 0,
        }))
      );

      // Step 2: After complete fade-out, update positions while still invisible
      setTimeout(() => {
        if (!sectionRef.current) return;
        
        const sectionHeight = sectionRef.current.offsetHeight;
        const sectionWidth = sectionRef.current.offsetWidth;

        setStars((prevStars) =>
          prevStars.map((star) => ({
            ...star,
            x: Math.random() * sectionWidth,
            y: Math.random() * sectionHeight,
          }))
        );

        // Step 3: Short delay after position change, then fade in
        setTimeout(() => {
          setStars((prevStars) =>
            prevStars.map((star) => ({
              ...star,
              opacity: Math.random() * 0.8 + 0.2,
            }))
          );
        }, 50);
      }, 1000);
    }, 4000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-black bg-fixed relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-urbanist text-5xl md:text-6xl font-bold mb-8 text-center bg-gold-gradient gold-gradient-text bg-clip-text"
        >
          Forever Faded Merch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-roboto text-white text-center mb-12 max-w-2xl mx-auto"
        >
          Elevate your style with our exclusive collection. Each piece is designed to make you stand out, just like our
          cuts.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {merchItems.map((item, index) => (
            <MerchItem key={item.id} item={item} index={index} />
          ))}
        </div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          <Link
            href="/shop"
            className="inline-block bg-gold-gradient text-black gold-gradient-bg font-urbanist font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View All Merch
          </Link>
        </motion.div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute gold-gradient-bg rounded-full"
            style={{
              width: "4px",
              height: "4px",
              top: `${star.y}px`,
              left: `${star.x}px`,
              opacity: star.opacity,
              transition: "opacity 0.8s ease-in-out",
              transform: `translate(0, 0)`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
}