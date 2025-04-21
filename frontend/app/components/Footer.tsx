import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiLinkedin, SiX, SiYoutube } from "react-icons/si";
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
      case 'Facebook': return <SiFacebook className="w-6 h-6 md:w-7 md:h-7" />;
      case 'LinkedIn': return <SiLinkedin className="w-6 h-6 md:w-7 md:h-7" />;
      case 'X': return <SiX className="w-6 h-6 md:w-7 md:h-7" />;
      case 'Youtube': return <SiYoutube className="w-6 h-6 md:w-7 md:h-7" />;
      default: return null;
    }
  };

  return (
    <footer className="w-full bg-black pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* Main Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 gold-gradient-bg rounded-xl p-6 md:p-10">
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" aria-label="Homepage">
              <Image
                priority
                src={logoUrl || "/LogoFooter.png"}
                alt={footerData.logo.alternativeText || "Forever Faded Logo"}
                width={150}
                height={150}
                className="w-auto h-auto max-h-[150px] mb-4"
              />
            </Link>
            <p className="text-sm mt-2 text-center md:text-left max-w-[250px]">
              Your premier destination for exceptional haircuts and styling in Waukesha.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="font-urbanist font-bold text-xl mb-4 text-center md:text-left">Quick Links</h3>
            <ul className="space-y-2 font-roboto text-center md:text-left">
              {footerData.links.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.url} 
                    className="text-base font-medium hover:text-[#CA2C2B] transition-colors inline-block py-1"
                  >
                    {link.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="font-urbanist font-bold text-xl mb-4 text-center md:text-left">Contact Us</h3>
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <a 
                href="mailto:FOREVERFADED11@YAHOO.COM"
                className="flex items-center space-x-2 text-base font-medium hover:text-[#CA2C2B] transition-colors py-1"
              >
                <MdEmail className="w-5 h-5 flex-shrink-0" />
                <span>Send us an Email</span>
              </a>
              <a 
                href="https://g.page/r/CclCTZfShsdHEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-base font-medium hover:text-[#CA2C2B] transition-colors py-1"
              >
                <MdStarRate className="w-5 h-5 flex-shrink-0" />
                <span>Leave us a Review</span>
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col">
            <h3 className="font-urbanist font-bold text-xl mb-4 text-center md:text-left">Follow Us</h3>
            <div className="flex items-center justify-center md:justify-start space-x-5">
              {/* Hardcoded social media icons */}
              <Link 
                href="https://www.facebook.com/foreverFadedwi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#CA2C2B] transition-colors p-2 hover:bg-black/10 rounded-full"
                aria-label="Follow us on Facebook"
              >
                <SiFacebook className="w-6 h-6 md:w-7 md:h-7" />
              </Link>
              
              <Link 
                href="https://www.linkedin.com/in/tretic/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#CA2C2B] transition-colors p-2 hover:bg-black/10 rounded-full"
                aria-label="Follow us on LinkedIn"
              >
                <SiLinkedin className="w-6 h-6 md:w-7 md:h-7" />
              </Link>
              
              <Link 
                href="https://www.youtube.com/user/tretic13"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#CA2C2B] transition-colors p-2 hover:bg-black/10 rounded-full"
                aria-label="Subscribe to our YouTube channel"
              >
                <SiYoutube className="w-6 h-6 md:w-7 md:h-7" />
              </Link>
              
              {/* Keep any remaining dynamic social icons that aren't duplicates */}
              {footerData.socials.map((social) => {
                // Skip if we've hardcoded this platform already
                if (social.platform === 'Facebook' || social.platform === 'LinkedIn' || social.platform === 'Youtube') {
                  return null;
                }
                
                return (
                  <Link 
                    key={social.id} 
                    href={social.url} 
                    className="hover:text-[#CA2C2B] transition-colors p-2 hover:bg-black/10 rounded-full"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    {getSocialIcon(social.platform)}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
            <p className="text-sm font-roboto text-gray-400 text-center md:text-left order-2 md:order-1">
              {footerData.Copyright}
            </p>
            <div className="flex items-center space-x-4 order-1 md:order-2 mb-3 md:mb-0">
              <Link href="/privacy" className="text-sm text-[#D3A84C] hover:text-[#E6BE69] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <a 
                href="https://layeroneconsultants.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-[#D3A84C] hover:text-[#E6BE69] transition-colors"
              >
                Powered by Layer One IT
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}