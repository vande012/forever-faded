"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Phone, MapPin, Clock, Menu, X, ShoppingCart } from "lucide-react";
import type React from "react"; // Added import for React

export default function Navbar() {
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState<string>("");
  const [navBgClass, setNavBgClass] = useState<string>("bg-transparent");

  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setCurrentDay(days[new Date().getDay()]);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavBgClass(
          scrollPosition > 0 ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
        );
      } else {
        setNavBgClass("bg-transparent");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollPosition]);

  return (
    <header className="fixed w-full z-50 font-urbanist">
      {/* Top Bar */}
      <div className="bg-black font-bold py-1 md:px-3">
        <div className="container mx-auto flex justify-between items-center text-xs sm:text-sm gap-3 sm:gap-6">
          {/* Left Section */}
          <div className="flex items-center space-x-10">
            <a
              href="tel:+1234567890"
              className="flex items-center hover:text-[#D1DCE5] text-white transition-color whitespace-nowrap"
            >
              <Phone size={14} className="mr-2" />
              (123) 456-7890
            </a>
          </div>

          {/* Center Section */}
          <div className="hidden md:flex items-center text-white absolute left-1/2 transform -translate-x-1/2">
            <Clock size={14} className="mr-2" />
            <span>{currentDay} Hours: 9AM - 5PM</span>
          </div>

          {/* Right Section */}
          <div className="flex ml-8">
            <a
              href="https://www.google.com/maps/place/Forever+Faded+Barber+Shop/data=!4m2!3m1!1s0x0:0x47c786d2974d42c9?sa=X&ved=1t:2428&ictx=111"
              className="flex items-center text-white hover:text-[#D1DCE5] transition-colors"
            >
              <MapPin size={14} className="mr-2" />
              1427 E Racine Ave # H, Waukesha, WI 53186
            </a>
          </div>
        </div>
      </div> 
      {/* Main Navigation */}
      <nav
        className={`${navBgClass} transition-all duration-300 py-2 px-4 md:px-6 w-full left-0`}
      >
        <div className="flex items-center justify-between z-50">
          <Link
            href="/"
            className="hidden md:flex items-center hover:text-[#CA2C2B] transition-colors"
          >
            <Image
              src="/navlogo.png"
              alt="Logo Title"
              width={25} // adjust based on your logo size
              height={25} // adjust based on your logo size
              className="object-contain ml-5 "
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-9">
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/shop">Shop Merch</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/testimonials">Testimonials</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/book"
              className="gold-gradient-bg text-white px-6 py-2 rounded hover:bg-[#262974] transition-colors shadow-md"
            >
              Book Now
            </Link>
            <Link
              href="/cart"
              className="text-white hover:text-[#CA2C2B] transition-colors"
            >
              <ShoppingCart size={24} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden md:hidden bg-black/90 rounded-md text-white mt-4 py-4 px-4 ">
            <div className="grid grid-cols-2 gap-8">
              <NavLink href="/" mobile>
                Home
              </NavLink>
              <NavLink href="/about" mobile>
                About Us
              </NavLink>
              <NavLink href="/shop" mobile>
                Shop Merch
              </NavLink>
              <NavLink href="/gallery" mobile>
                Gallery
              </NavLink>
              <NavLink href="/testimonials" mobile>
                Testimonials
              </NavLink>
              <NavLink href="/contact" mobile>
                Contact Us
              </NavLink>
              <NavLink href="/blog" mobile>
                Blog
              </NavLink>
              <Link
                href="/book"
                className="col-span-2 gold-gradient-bg text-white px-6 py-2 rounded text-center hover:bg-[#262974] transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

// Update the NavLink component
function NavLink({ href, children, mobile = false }: NavLinkProps) {
  const baseClasses = "transition-colors font-semibold";
  const desktopClasses =
    "text-white hover:text-[#CA2C2B] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]";
  const mobileClasses = "text-white hover:text-[#CA2C2B] block";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  );
}
