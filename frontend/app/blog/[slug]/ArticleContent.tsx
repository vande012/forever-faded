'use client';

import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { getStrapiMedia } from '../../utils/get-strapi-url';
import '../blog.css';

interface ArticleContentProps {
    content: string;
  }
  
  export function ArticleContent({ content }: ArticleContentProps) {
    return (
        <div className="prose prose-lg max-w-none my-8 prose-invert blog-content">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-4xl font-bold my-6 gold-gradient-text" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-3xl font-bold my-6 gold-gradient-text" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-2xl font-bold my-4 gold-gradient-text" {...props} />,
            h4: ({node, ...props}) => <h4 className="text-xl font-bold my-4 gold-gradient-text" {...props} />,
            h5: ({node, ...props}) => <h5 className="text-lg font-bold my-3 gold-gradient-text" {...props} />,
            h6: ({node, ...props}) => <h6 className="text-base font-bold my-3 gold-gradient-text" {...props} />,

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
            return <p className="my-4 text-gray-300 leading-relaxed">{children}</p>;
          },

          // Image handling with proper semantic markup
          img: ({src, alt}) => (
            <figure className="my-8">
              <div className="relative aspect-video w-full">
                <Image
                  src={getStrapiMedia(src || '')}
                  alt={alt || 'Blog image'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                  loading="lazy"
                />
              </div>
              {alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{alt}</figcaption>}
            </figure>
          ),

          // Other elements with semantic improvements
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic text-gray-400" {...props} />
          ),
          a: ({node, href, ...props}) => (
            <a 
              href={href} 
              className="text-[#D4AF37] hover:text-[#E6BE69] underline" 
              target={href?.startsWith('http') ? "_blank" : undefined}
              rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
              {...props} 
            />
          ),
          ul: ({node, ...props}) => <ul className="list-disc list-inside my-4 text-gray-300 pl-4" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4 text-gray-300 pl-4" {...props} />,
          li: ({node, ...props}) => <li className="text-gray-300 my-2 leading-relaxed" {...props} />,
          b: ({node, ...props}) => <b className="font-bold text-white" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
          em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
          code: ({node, className, ...props}) => (
            <code className={`${className || 'bg-gray-800 text-gray-200'} rounded px-2 py-1 font-mono text-sm`} {...props} />
          ),
          pre: ({node, ...props}) => (
            <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto my-6" {...props} />
          ),
          hr: ({node, ...props}) => (
            <hr className="border-gray-700 my-8" {...props} />
          ),
          table: ({node, ...props}) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-gray-700" {...props} />
            </div>
          ),
          th: ({node, ...props}) => (
            <th className="bg-gray-800 border border-gray-700 px-4 py-2 text-left text-white" {...props} />
          ),
          td: ({node, ...props}) => (
            <td className="border border-gray-700 px-4 py-2 text-gray-300" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}