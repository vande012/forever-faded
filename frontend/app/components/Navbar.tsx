"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Phone, MapPin, Clock, Menu, X, ShoppingCart } from "lucide-react";
import { getStrapiURL } from "../utils/get-strapi-url";

interface NavbarProps {
  data: {
    data: {
      id: number;
      documentId: string;
      phone: string;
      navlogo: {
        id: number;
        documentId: string;
        url: string;
        alternativeText: string | null;
      };
      links: Array<{
        id: number;
        text: string;
        href: string;
        isExternal: boolean | null;
      }>;
      Address: {
        id: number;
        Label: string;
        url: string;
      };
      NavHours: {
        id: number;
        hours: Array<{
          id: number;
          Day: string;
          Open: string;
          Close: string;
        }>;
      };
      cta: {
        id: number;
        text: string;
        href: string;
        isExternal: boolean;
      };
    };
    meta: Record<string, unknown>;
  };
}

export default function Navbar({ data }: NavbarProps) {
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState<string>("");
  const [navBgClass, setNavBgClass] = useState<string>("bg-transparent");
  const [currentHours, setCurrentHours] = useState<string>("Closed");
  const NavLink = ({
    href,
    children,
    mobile = false,
  }: {
    href: string;
    children: React.ReactNode;
    mobile?: boolean;
  }) => (
    <Link
      href={href}
      className={`text-white hover:text-[#CA2C2B] transition-colors text-base md:text-lg ${mobile ? "text-center text-xl" : ""}`}
    >
      {children}
    </Link>
  );

  const navData = data.data;
  const logoUrl = navData.navlogo
    ? `${getStrapiURL()}${navData.navlogo.url}`
    : "/navlogo.png";

    const convertTo12Hour = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes.slice(0,2)} ${ampm}`;
    };
    

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
    const today = days[new Date().getDay()];
    setCurrentDay(today);

    // Find today's hours
    const todayHours = navData.NavHours.hours.find((h) => h.Day === today);
    if (todayHours) {
      setCurrentHours(
        `${convertTo12Hour(todayHours.Open)} - ${convertTo12Hour(todayHours.Close)}`
      );
    } else {
      setCurrentHours("Closed Today");
    }

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
  }, [scrollPosition, navData.NavHours.hours]);

  return (
    <header className="fixed w-full z-50 font-urbanist">
      {/* Top Bar */}
      <div className="bg-black font-bold py-2 md:py-3 md:px-6">
        <div className="container mx-auto flex justify-between items-center text-sm md:text-base gap-3 sm:gap-6 px-4">
          {/* Left Section */}
          <div className="flex items-center space-x-6 md:space-x-10">
            <a
              href={`tel:${navData.phone}`}
              className="flex items-center hover:text-[#D1DCE5] text-white transition-color whitespace-nowrap"
            >
              <Phone size={16} className="mr-2" />
              {navData.phone}
            </a>
          </div>

          {/* Center Section */}
          <div className="hidden md:flex items-center text-white absolute left-1/2 transform -translate-x-1/2">
            <Clock size={16} className="mr-2" />
            <span className="whitespace-nowrap">
              {currentDay} Hours: {currentHours}
            </span>
          </div>

          {/* Right Section */}
          <div className="flex">
            <a
              href={navData.Address.url}
              className="flex items-center text-white hover:text-[#D1DCE5] transition-colors text-xs md:text-base"
            >
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span className="hidden md:inline">{navData.Address.Label}</span>
              <span className="md:hidden">Location</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`${navBgClass} transition-all duration-300 py-6 px-4 md:px-6 w-full left-0`}
      >
        <div className="flex items-center justify-between z-50">
          <Link
            href="/"
            className="hidden md:flex items-center hover:text-[#CA2C2B] transition-colors"
          >
            <Image
              priority
              src={logoUrl}
              alt={navData.navlogo?.alternativeText || "Logo Title"}
              width={50}
              height={50}
              className="object-contain ml-5"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-9">
            {navData.links.map((link) => (
              <NavLink key={link.id} href={link.href}>
                {link.text}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href={navData.cta.href}
              className="gold-gradient-bg text-white px-6 py-2 rounded hover:bg-[#262974] transition-colors shadow-md"
            >
              {navData.cta.text}
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
          <div className="md:hidden bg-black/90 rounded-md text-white mt-4 py-6 px-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-1 gap-6">
              {navData.links.map((link) => (
                <NavLink key={link.id} href={link.href} mobile>
                  {link.text}
                </NavLink>
              ))}
              <Link
                href={navData.cta.href}
                className="gold-gradient-bg text-white px-6 py-3 rounded text-center text-xl hover:bg-[#262974] transition-colors"
              >
                {navData.cta.text}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
