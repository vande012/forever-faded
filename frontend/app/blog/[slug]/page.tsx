

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getStrapiMedia } from '../../utils/get-strapi-url';
import { getArticleBySlug } from '../../data/loaders';
import { ArticleContent } from './ArticleContent';

interface PageProps {
    params: {
      slug: string;
    };
  }
  
  // Make this an async server component
  export default async function ArticlePage({ params }: PageProps) {
    if (!params?.slug) return notFound();
  
    const response = await getArticleBySlug(params.slug);
    const article = response.data[0];
  
    if (!article) return notFound();
    
    const richTextContent = article.blocks[0].body;
  
    return (
      <div className="pt-[160px] bg-[#1d1d1d]"> {/* Add padding-top here in a wrapper */}
        <article className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          {/* Article Header */}
          <div className="mb-8 md:mb-12 mt-14">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight gold-gradient-text">
              {article.title}
            </h1>
            {article.author && (
              <div className="mt-4 md:mt-6 flex items-center text-sm md:text-base">
                <span className="text-gray-300">By {article.author.name}</span>
                <span className="mx-2 text-gray-500">•</span>
                <time className="text-gray-300">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            )}
          </div>
  
          {/* Featured Image */}
          {article.cover?.url && (
            <div className="relative aspect-[16/9] w-full mb-8 md:mb-12 rounded-xl overflow-hidden">
              <Image
                src={getStrapiMedia(article.cover.url)}
                alt={article.cover.alternativeText || article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
            </div>
          )}
  
          {/* Article Content */}
          <div className="prose prose-lg md:prose-xl prose-invert max-w-none pb-10">
            <ArticleContent content={richTextContent} />
          </div>
        </article>
      </div>
    );
  }