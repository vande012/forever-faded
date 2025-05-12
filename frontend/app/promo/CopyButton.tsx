'use client';

import { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

export default function CopyButton({ textToCopy, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button 
      onClick={copyToClipboard}
      className={`${className} relative`}
      aria-label="Copy promo code"
    >
      {copied ? 'Copied!' : 'Copy Code'}
      {copied && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </button>
  );
} 