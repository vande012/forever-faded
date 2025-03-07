'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper({ data }: { data: any }) {
  const isHomePage = usePathname() === '/';
  
  return <Navbar data={data} transparentHeader={isHomePage} />;
}