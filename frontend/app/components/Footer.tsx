import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { MdEmail, MdStarRate } from "react-icons/md";
import { getStrapiMedia } from "../utils/get-strapi-url";

interface FooterProps {
  data: {
    data: {
      logo: {
        url: string;
        alternativeText: string | null;
      };
      links: Array<{
        id: number;
        displayName: string;
        url: string;
      }>;
      socials: Array<{
        id: number;
        platform: string;
        url: string;
      }>;
      Copyright: string;
    };
  };
}
export default function Footer({ data }: FooterProps) {
  const footerData = data.data;
  const logoUrl = footerData.logo ? getStrapiMedia(footerData.logo.url) : "/LogoFooter.png";

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return <SiFacebook className="w-8 h-8" />;
      case 'Instagram': return <SiInstagram className="w-8 h-8" />;
      case 'X': return <SiX className="w-8 h-8" />;
      case 'Youtube': return <SiYoutube className="w-8 h-8" />;
      default: return null;
    }
  };

  return (
    <footer className="w-full bg-black">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 gold-gradient-bg rounded-xl p-8">
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              priority
              src={logoUrl || "/LogoFooter.png"}
              alt={footerData.logo.alternativeText || "Forever Faded Logo"}
              width={150}
              height={150}
              className="w-auto h-auto"
            />
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-urbanist font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-3 pl-4 font-roboto">
              {footerData.links.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.url} 
                    className="text-base font-semibold hover:text-[#CA2C2B] transition-colors"
                  >
                    {link.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-urbanist font-bold text-xl mb-4">Contact Us</h3>
            <div className="space-y-3 pl-4">
              <a 
                href="mailto:FOREVERFADED11@YAHOO.COM"
                className="flex items-center justify-center md:justify-start space-x-2 text-base font-semibold hover:text-[#CA2C2B] transition-colors"
              >
                <MdEmail className="w-6 h-6" />
                <span>Send us an Email</span>
              </a>
              <a 
                href="https://g.page/r/CclCTZfShsdHEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start space-x-2 text-base font-semibold hover:text-[#CA2C2B] transition-colors"
              >
                <MdStarRate className="w-6 h-6" />
                <span>Leave us a Review</span>
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="space-y-4 text-center md:text-left col-span-2">
            <h3 className="font-urbanist font-bold text-xl pl-6 mb-4">Follow Us</h3>
            <div className="flex items-center justify-center md:justify-start space-x-6 pl-6">
              {footerData.socials.map((social) => (
                <Link 
                  key={social.id} 
                  href={social.url} 
                  className="hover:text-[#CA2C2B] transition-colors"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright only */}
        <div className="flex justify-center pt-8 mt-8 border-t">
          <p className="text-sm font-roboto text-white text-center">
            {footerData.Copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}