"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Phone, MapPin, Clock, Menu, X, ShoppingCart, Briefcase } from "lucide-react";
import { getStrapiMedia } from "../utils/get-strapi-url";
import { usePathname } from "next/navigation";
import { useCareerModal } from "../components/CareerModalContext";

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
  transparentHeader?: boolean;
}

export default function Navbar({ data, transparentHeader = false }: NavbarProps) {
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState<string>("");
  const [navBgClass, setNavBgClass] = useState<string>("bg-transparent");
  const [currentHours, setCurrentHours] = useState<string>("Closed");
  const pathname = usePathname(); 
  const { openModal } = useCareerModal();

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
    ? getStrapiMedia(navData.navlogo.url)
    : "/navlogo.png";

    const convertTo12Hour = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes.slice(0,2)} ${ampm}`;
    };
    
    useEffect(() => {
      setIsMenuOpen(false);
    }, [pathname]);

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
          // Only make transparent if transparentHeader prop is true
          transparentHeader && scrollPosition === 0 ? "bg-transparent" : "bg-black/50 backdrop-blur-sm"
        );
      } else {
        setNavBgClass(transparentHeader ? "bg-transparent" : "bg-black/50 backdrop-blur-sm");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollPosition, navData.NavHours.hours, transparentHeader]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black font-bold py-2 md:py-3 md:px-6">
        <div className="container mx-auto flex justify-between items-center text-sm md:text-base gap-3 sm:gap-6 px-4">
          {/* Left Section */}
          <div className="flex items-center space-x-6 md:space-x-10">
            <Link
              href={`tel:${navData.phone}`}
              className="flex items-center hover:text-[#D1DCE5] text-white transition-color whitespace-nowrap"
              aria-label="Call us"
            >
              <Phone size={16} className="mr-2" aria-hidden="true" />
              {navData.phone}
            </Link>
          </div>

          {/* Center Section */}
          <div className="hidden lg:flex items-center text-white absolute left-1/2 transform -translate-x-1/2">
            <Clock size={16} className="mr-2" aria-hidden="true" />
            <span className="whitespace-nowrap">
              {currentDay} Hours: {currentHours}
            </span>
          </div>

          {/* Right Section */}
          <div className="flex">
            <Link
              href={navData.Address.url}
              className="flex items-center text-white hover:text-[#D1DCE5] transition-colors text-xs md:text-base"
              aria-label="Find our location"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={16} className="mr-2 flex-shrink-0" aria-hidden="true" />
              <span className="hidden md:inline">{navData.Address.Label}</span>
              <span className="md:hidden">Location</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`${navBgClass} transition-all duration-300 px-0 w-full left-0`}
        aria-label="Main navigation"
      >
        <div className="container-fluid w-full flex items-center justify-between z-50 px-4 md:px-8 lg:px-8">
          {/* Logo container - FAR LEFT */}
          <div className="hidden lg:block transition-all duration-300 ml-0">
            <Link
              href="/"
              className="flex items-center hover:text-[#CA2C2B] transition-colors"
              aria-label="Forever Faded Barbershop - Home"
            >
              <Image
                priority
                src={logoUrl}
                alt={navData.navlogo?.alternativeText || "Forever Faded Barbershop Logo"}
                width={110}
                height={110}
                className="object-contain w-auto h-[110px]"
              />
              {/* Text logo */}
              <div className="block pt-4">
                <div className="h-12 flex items-center">
                  <Image 
                    src="/FFText.png" 
                    alt="Forever Faded Text Logo" 
                    width={280} 
                    height={40} 
                    className="max-w-[280px] h-auto object-contain" 
                    loading="eager"
                    priority
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu - MIDDLE */}
          <div className="hidden lg:flex items-center justify-center flex-grow mx-8 xl:pr-72">
            <ul className="flex items-center gap-8 xl:gap-12">
              {navData.links.map((link) => (
                <li key={link.id}>
                  <NavLink href={link.href}>
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button - FAR RIGHT */}
          <div className="hidden lg:flex items-center justify-end mr-0">
            <Link
              href={navData.cta.href}
              className="gold-gradient-bg text-white px-6 py-2 rounded hover:bg-[#262974] transition-colors"
            >
              {navData.cta.text}
            </Link>
          </div>
          

          {/* Mobile Menu Button - Now visible on md screens too */}
          <button
            className="lg:hidden mt-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu - Now used on md screens too */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden bg-black/90 rounded-md text-center text-white mt-4 py-6 px-4 max-h-[calc(100vh-200px)] overflow-y-auto"
          >
            <ul className="grid grid-cols-1 gap-6">
              <li>
                <NavLink href="/" mobile>
                  Home
                </NavLink>
              </li>
              {navData.links.map((link) => (
                <li key={link.id}>
                  <NavLink href={link.href} mobile>
                    {link.text}
                  </NavLink>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => {
                    openModal();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full text-white hover:text-[#CA2C2B] transition-colors text-base md:text-lg text-center text-xl"
                >
                  <Briefcase className="mr-2 h-5 w-5" />
                  Careers
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
