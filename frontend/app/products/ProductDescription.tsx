'use client';

import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { getStrapiMedia } from '../utils/get-strapi-url';

interface ProductDescriptionProps {
  content: string;
}

export function ProductDescription({ content }: ProductDescriptionProps) {
  return (
    <div className="prose prose-sm max-w-none my-4">
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-4" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold my-3" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold my-2" {...props} />,
          
          // Special handling for paragraphs that might contain images
          p: ({children, node}) => {
            // Check if this paragraph contains only an image
            const containsOnlyImage = 
              node?.children?.length === 1 && 
              node?.children[0].type === 'element' && 
              node?.children[0].tagName === 'img';

            // If it's just an image, don't wrap in p
            if (containsOnlyImage) {
              return <>{children}</>;
            }

            // Regular paragraph
            return <p className="my-3 text-gray-700">{children}</p>;
          },

          // Image handling
          img: ({src, alt}) => (
            <figure className="my-4">
              <div className="relative aspect-video w-full">
                <Image
                  src={getStrapiMedia(src || '')}
                  alt={alt || ''}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                />
              </div>
              {alt && <figcaption className="text-center text-sm text-gray-500 mt-1">{alt}</figcaption>}
            </figure>
          ),

          // Other elements
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-3 italic text-gray-600" {...props} />
          ),
          a: ({node, ...props}) => (
            <a className="text-indigo-600 hover:text-indigo-800 underline" {...props} />
          ),
          ul: ({node, ...props}) => <ul className="list-disc list-inside my-3" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside my-3" {...props} />,
          code: ({node, ...props}) => (
            <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}