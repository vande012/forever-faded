"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Phone, MapPin, Clock, Menu, X } from "lucide-react";
import type React from "react"; // Added import for React

export default function Navbar() {
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState<string>("");

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
  }, []);

  // Update the navBgClass calculation
  const navBgClass =
    scrollPosition > 0 ? "bg-black/50 backdrop-blur-sm" : "bg-transparent";

  return (
    <header className="fixed w-full z-50 font-urbanist">
      {/* Top Bar */}
      <div className="bg-[#CA2C2B] text-white py-1 px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center text-sm">
          {/* Left Section */}
          <div className="flex items-center space-x-10">
            <a
              href="tel:+1234567890"
              className="flex items-center hover:text-[#393d41] transition-colors"
            >
              <Phone size={16} className="mr-2" />
              (123) 456-7890
            </a>
          </div>

          {/* Center Section */}
          <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
            <Clock size={16} className="mr-2" />
            <span>{currentDay} Hours: 9AM - 5PM</span>
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            <a
              href="#"
              className="hidden md:flex items-center hover:text-[#D1DCE5] transition-colors"
            >
              <MapPin size={16} className="mr-2" />
              Directions
            </a>
          </div>
        </div>
      </div>
      {/* Main Navigation */}
      {/* Update the main navigation section */}
      <nav
        className={`${navBgClass} transition-all duration-300 py-4 px-4 md:px-6 fixed w-full left-0`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center hover:text-[#CA2C2B] transition-colors"
          >
            <Image
              src="/logo.png"
              alt="Logo Title"
              width={50} // adjust based on your logo size
              height={50} // adjust based on your logo size
              className="object-contain ml-5"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/shop">Shop Merch</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/book"
              className="bg-[#CA2C2B] text-white px-6 py-2 rounded hover:bg-[#262974] transition-colors shadow-md"
            >
              Book Now
            </Link>
            <Link
              href="/new-page"
              className="bg-[#262974] text-white px-6 py-2 rounded hover:bg-[#CA2C2B] transition-colors shadow-md"
            >
              Podcast
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#CA2C2B] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden md:hidden bg-black/50 text-white mt-4 py-4 px-4">
            <div className="flex flex-col space-y-4">
              <NavLink href="/about" mobile>
                About Us
              </NavLink>
              <NavLink href="/shop" mobile>
                Shop Merch
              </NavLink>
              <NavLink href="/contact" mobile>
                Contact Us
              </NavLink>
              <Link
                href="/book"
                className="bg-[#CA2C2B] text-white px-6 py-2 rounded text-center hover:bg-[#262974] transition-colors"
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
