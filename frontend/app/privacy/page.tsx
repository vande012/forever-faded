import React from "react";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfadedmke.com';

export const metadata: Metadata = {
  title: "Privacy Policy | Forever Faded",
  description: "Privacy Policy for Forever Faded Barbershop - Learn how we protect your personal information.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | Forever Faded",
    description: "Privacy Policy for Forever Faded Barbershop - Learn how we protect your personal information.",
    type: "website",
    url: `${siteUrl}/privacy`,
    images: [
      {
        url: `${siteUrl}/hero-logo.png`,
        width: 1200,
        height: 630,
        alt: "Forever Faded Barbershop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Forever Faded",
    description: "Privacy Policy for Forever Faded Barbershop",
    images: [`${siteUrl}/hero-logo.png`],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-16 lg:pt-40">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gold-gradient-text text-center">Privacy Policy</h1>
        <p className="mb-6 text-gray-300"><strong>Last Updated:</strong> AprilS 28, 2025</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">1. Introduction</h2>
          <p className="mb-4 text-gray-300">
            Welcome to Forever Faded Barbershop (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We respect your privacy
            and are committed to protecting your personal data. This privacy policy will inform you about
            how we look after your personal data when you visit our website and tell you about your privacy
            rights and how the law protects you.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">2. Information We Collect</h2>
          
          <h3 className="text-xl font-bold mb-3 text-gray-200">2.1 Personal Information</h3>
          <p className="mb-4 text-gray-300">We may collect and process the following data:</p>
          <ul className="list-disc pl-8 mb-6 text-gray-300">
            <li className="mb-2"><strong>Identity Data:</strong> including name and title</li>
            <li className="mb-2"><strong>Contact Data:</strong> including email address and phone number</li>
            <li className="mb-2"><strong>Technical Data:</strong> including IP address, browser type, time zone setting, operating system, and device information</li>
            <li className="mb-2"><strong>Usage Data:</strong> information about how you use our website and services</li>
          </ul>

          <h3 className="text-xl font-bold mb-3 text-gray-200">2.2 Information Collection Methods</h3>
          <p className="mb-4 text-gray-300">We collect information through:</p>
          <ul className="list-disc pl-8 mb-4 text-gray-300">
            <li className="mb-2"><strong>Direct interactions:</strong> information you provide when booking appointments, filling out forms, or corresponding with us</li>
            <li className="mb-2"><strong>Automated technologies:</strong> as you navigate our website, cookies and other tracking technologies may automatically collect Technical Data</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">3. How We Use Your Information</h2>
          <p className="mb-4 text-gray-300">We will only use your personal data for the purpose for which we collected it, including:</p>
          <ul className="list-disc pl-8 mb-4 text-gray-300">
            <li className="mb-2">Providing barbering services requested by you</li>
            <li className="mb-2">Managing our relationship with you</li>
            <li className="mb-2">Improving our website and services</li>
            <li className="mb-2">Sending relevant marketing communications if you have opted in</li>
            <li className="mb-2">Complying with legal obligations</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">4. Data Security</h2>
          <p className="mb-4 text-gray-300">
            We have implemented appropriate security measures to prevent your personal data from being
            accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal
            data to employees and third parties who have a business need to know.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">5. Data Retention</h2>
          <p className="mb-4 text-gray-300">
            We will only retain your personal data for as long as necessary to fulfill the purposes
            we collected it for, including for the purposes of satisfying any legal, accounting,
            or reporting requirements.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">6. Your Legal Rights</h2>
          <p className="mb-4 text-gray-300">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:</p>
          <ul className="list-disc pl-8 mb-4 text-gray-300">
            <li className="mb-2">Request access to your personal data</li>
            <li className="mb-2">Request correction of your personal data</li>
            <li className="mb-2">Request erasure of your personal data</li>
            <li className="mb-2">Object to processing of your personal data</li>
            <li className="mb-2">Request restriction of processing your personal data</li>
            <li className="mb-2">Request transfer of your personal data</li>
            <li className="mb-2">Right to withdraw consent</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">7. Cookies</h2>
          <p className="mb-4 text-gray-300">
            Our website uses cookies to distinguish you from other users. This helps us provide you
            with a good experience and allows us to improve our site. You can set your browser to
            refuse all or some browser cookies, or to alert you when websites set or access cookies.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">8. Third-Party Links</h2>
          <p className="mb-4 text-gray-300">
            Our website may include links to third-party websites, plug-ins, and applications.
            Clicking on those links or enabling those connections may allow third parties to
            collect or share data about you. We do not control these third-party websites and
            are not responsible for their privacy statements.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">9. Changes to the Privacy Policy</h2>
          <p className="mb-4 text-gray-300">
            We may update our privacy policy from time to time. We will notify you of any changes
            by posting the new privacy policy on this page and updating the &ldquo;Last Updated&rdquo; date
            at the top of this policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 gold-gradient-text">10. Contact Us</h2>
          <p className="mb-4 text-gray-300">
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p className="mb-4 text-gray-300">
            Email: <a href="mailto:FOREVERFADED11@YAHOO.COM" className="text-[#D3A84C] hover:text-[#E6BE69]">FOREVERFADED11@YAHOO.COM</a>
          </p>
        </section>
      </div>
    </div>
  );
}
