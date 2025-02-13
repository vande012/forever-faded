"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../components/ui/carousel";

const merchItems = [
  {
    id: 1,
    image: "/model.jpg",
    title: "Classic Black Hoodie",
    price: "$59.99",
  },
  {
    id: 2,
    image: "/model2.jpg",
    title: "Premium T-Shirt",
    price: "$29.99",
  },
  {
    id: 3,
    image: "/model3.jpg",
    title: "Signature Cap",
    price: "$24.99",
  },
  {
    id: 4,
    image: "/model4.jpg",
    title: "Urban Jacket",
    price: "$79.99",
  },
];

export default function MerchSlider() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const autoPlay = React.useCallback(() => {
    if (!api) return;

    api.scrollNext();
    if (current === count - 1) {
      api.scrollTo(0);
    }
  }, [api, current, count]);

  React.useEffect(() => {
    const timer = setInterval(autoPlay, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <section className="relative bg-[#1d1d1d] py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gold-gradient-text">
              Forever Faded Merch
            </h2>
            <p className="text-gray-300 md:text-xl">
              Match your fresh cut with our premium styles.
            </p>
            <p className="hidden md:block text-gray-400">
              Discover our exclusive collection of high-quality merchandise
              designed to complement your style. Each piece in our Forever Faded
              Merch line is crafted with premium materials to ensure durability
              and comfort. Our design process is meticulous, starting with trend
              research and customer feedback to create styles that are both
              timeless and contemporary. Whether you are looking for a classic
              black hoodie, a premium t-shirt, or a signature cap, our merch is
              designed to match your fresh cut and elevate your wardrobe. Shop
              now to experience the perfect blend of style and quality.
            </p>{" "}
            <div className="flex gap-4 justify-center">
              <Button className="gold-gradient-bg text-black">Shop Now</Button>
            </div>
          </div>
          <div className="relative w-full md:w-8/12 mx-auto">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {merchItems.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/1 ">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#1d1d1d]">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={item.id === 1}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-white">{item.price}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex justify-center gap-1 mt-4 md:mt-6">
              <div className="flex items-center gap-2 pr-4">
                <span className="text-sm text-gray-400">
                  {current + 1} / {count}
                </span>
              </div>
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 gold-gradient-bg"
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft className="h-4 w-4 text-black" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 gold-gradient-bg"
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className="h-4 w-4 text-black" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
