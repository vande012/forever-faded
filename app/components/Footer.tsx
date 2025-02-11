import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-full gold-gradient-bg">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Logo Column */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/LogoFooter.png"
              alt="Forever Faded Logo"
              width={150} // Adjust the width as needed
              height={150} // Adjust the height as needed
              className="w-auto h-auto"
            />
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="font-urbanist font-semibold">Quick Links</h3>
            <ul className="space-y-2 font-roboto text-sm">
              <li>
                <Link href="/book-now">Book Now</Link>
              </li>
              <li>
                <Link href="/our-services">Our Services</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="font-urbanist font-semibold">Stay Connected</h3>
            <ul className="space-y-2 font-roboto text-sm">
              <li>
                <Link href="/instagram">Instagram</Link>
              </li>
              <li>
                <Link href="/facebook">Facebook</Link>
              </li>
              <li>
                <Link href="/X">X</Link>
              </li>
              <li>
                <Link href="/yelp">Yelp</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-black/10 md:flex-row">
          <p className="text-sm font-roboto text-center md:text-left">© {new Date().getFullYear()} Forever Faded. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/facebook" className="hover:opacity-80">
              <SiFacebook className="w-5 h-5" />
            </Link>
            <Link href="/instagram" className="hover:opacity-80">
              <SiInstagram className="w-5 h-5" />
            </Link>
            <Link href="/X" className="hover:opacity-80">
              <SiX className="w-5 h-5" />
            </Link>
            <Link href="/youtube" className="hover:opacity-80">
              <SiYoutube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}