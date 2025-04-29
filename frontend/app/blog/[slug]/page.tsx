import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStrapiMedia } from '../../utils/get-strapi-url';
import { getArticleBySlug } from '../../data/loaders';
import { ArticleContent } from './ArticleContent';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

// Define the base URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfadedmke.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return { title: 'Article Not Found' };

  try {
    const response = await getArticleBySlug(slug);
    const article = response.data?.[0];

    if (!article) return { title: 'Article Not Found' };

    const imageUrl = article.cover?.url 
      ? getStrapiMedia(article.cover.url) 
      : `${siteUrl}/hero-logo.png`;

    return {
      title: article.title,
      description: article.description || article.title,
      alternates: {
        canonical: `${siteUrl}/blog/${slug}`,
      },
      openGraph: {
        title: article.title,
        description: article.description || article.title,
        type: 'article',
        url: `${siteUrl}/blog/${slug}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.cover?.alternativeText || article.title,
          },
        ],
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        authors: article.author ? [article.author.name] : ['Forever Faded Barbershop'],
        siteName: 'Forever Faded Barbershop',
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description || article.title,
        images: [imageUrl],
      },
      authors: article.author ? [{ name: article.author.name }] : [{ name: 'Forever Faded Barbershop' }],
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Blog Article' };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) return notFound();

  try {
    const response = await getArticleBySlug(slug);

    if (!response || !response.data) {
      console.error('Failed to fetch article data');
      return (
        <div className="pt-[160px] bg-[#1d1d1d] min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Loading Article...</h1>
            <p className="text-gray-400">Please wait while we fetch the content</p>
          </div>
        </div>
      );
    }

    const article = response.data[0];
    if (!article) return notFound();

    const richTextContent = article.blocks?.[0]?.body || '';

    return (
      <div className="pt-[160px] bg-[#1d1d1d]">
        <article className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="mb-8 md:mb-12 mt-14">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight gold-gradient-text">
              {article.title}
            </h1>
            {article.author && (
              <div className="mt-4 md:mt-6 flex items-center text-sm md:text-base">
                <span className="text-gray-300">By {article.author.name}</span>
                <span className="mx-2 text-gray-500">•</span>
                <time className="text-gray-300" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            )}
          </div>

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

          <div className="prose prose-lg md:prose-xl prose-invert max-w-none pb-10">
            <ArticleContent content={richTextContent} />
          </div>
          
          {/* Navigation CTA Section */}
          <div className="border-t border-gray-800 pt-10 pb-16 mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/blog" 
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md flex items-center transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Posts
              </Link>
              
              <Link 
                href="/" 
                className="px-6 py-3 gold-gradient-bg text-black font-bold rounded-md flex items-center hover:opacity-90 transition-opacity duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Homepage
              </Link>
              
              <Link 
                href="https://getsquire.com/booking/brands/forever-faded-llc" 
                target="_blank"
                rel="noopener noreferrer" 
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#C4A027] text-black font-bold rounded-md flex items-center transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book an Appointment
              </Link>
            </div>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    return (
      <div className="pt-[160px] bg-[#1d1d1d] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-gray-400">We could not load this article. Please try again later.</p>
        </div>
      </div>
    );
  }
}