'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper({ data }: { data: any }) {
  const isHomePage = usePathname() === '/';
  
  return (
    <div className="fixed w-full z-50 font-urbanist">
      <Navbar data={data} transparentHeader={isHomePage} />
    </div>
  );
}