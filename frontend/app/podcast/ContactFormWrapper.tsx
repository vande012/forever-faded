'use client'

import dynamic from 'next/dynamic'

// Import the ContactForm component with dynamic import to avoid SSR issues
const ContactForm = dynamic(() => import('./ContactForm'), { ssr: false })

export default function ContactFormWrapper() {
  return <ContactForm />
} 