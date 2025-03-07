'use client';

import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { getStrapiMedia } from '../../utils/get-strapi-url';

interface ArticleContentProps {
    content: string;
  }
  
  export function ArticleContent({ content }: ArticleContentProps) {
    return (
        <div className="prose prose-lg max-w-none my-8">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-4xl font-bold my-6 gold-gradient-text" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-3xl font-bold my-6 gold-gradient-text" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-2xl font-bold my-4 gold-gradient-text" {...props} />,
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
            return <p className="my-4 text-gray-300">{children}</p>;
          },

          // Image handling
          img: ({src, alt}) => (
            <figure className="my-8">
              <div className="relative aspect-video w-full">
                <Image
                  src={getStrapiMedia(src || '')}
                  alt={alt || ''}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                />
              </div>
              {alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{alt}</figcaption>}
            </figure>
          ),

          // Other elements
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600" {...props} />
          ),
          a: ({node, ...props}) => (
            <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
          ),
          ul: ({node, ...props}) => <ul className="list-disc list-inside my-4" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4" {...props} />,
          code: ({node, ...props}) => (
            <code className="bg-gray-100 rounded px-2 py-1" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}