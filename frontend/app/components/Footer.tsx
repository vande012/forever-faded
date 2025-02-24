import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { getStrapiURL } from "../utils/get-strapi-url";

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
  const logoUrl = footerData.logo ? `${getStrapiURL()}${footerData.logo.url}` : "/LogoFooter.png";

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return <SiFacebook className="w-5 h-5" />;
      case 'Instagram': return <SiInstagram className="w-5 h-5" />;
      case 'X': return <SiX className="w-5 h-5" />;
      case 'Youtube': return <SiYoutube className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <footer className="w-full bg-black">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 gold-gradient-bg rounded-xl p-8">
          {/* Logo Column */}
          <div className="flex justify-center md:justify-start">
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
          <div className="space-y-3 text-center md:text-left">
            <h3 className="font-urbanist font-semibold">Quick Links</h3>
            <ul className="space-y-2 font-roboto text-sm">
              {footerData.links.map((link) => (
                <li key={link.id}>
                  <Link href={link.url}>{link.displayName}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="font-urbanist font-semibold">Stay Connected</h3>
            <ul className="space-y-2 font-roboto text-sm">
              {footerData.socials.map((social) => (
                <li key={social.id}>
                  <Link href={social.url}>{social.platform}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t md:flex-row text-white">
          <p className="text-sm font-roboto text-center md:text-left">{footerData.Copyright}</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {footerData.socials.map((social) => (
              <Link key={social.id} href={social.url} className="hover:opacity-80">
                {getSocialIcon(social.platform)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}