import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getStrapiMedia } from '../../utils/get-strapi-url';
import { getArticleBySlug } from '../../data/loaders';
import { ArticleContent } from './ArticleContent';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) return { title: 'Article Not Found' };

  try {
    const response = await getArticleBySlug(slug);
    const article = response.data?.[0];

    if (!article) return { title: 'Article Not Found' };

    return {
      title: article.title,
      description: article.description || article.title,
      openGraph: article.cover?.url
        ? {
            images: [{ url: getStrapiMedia(article.cover.url) }],
          }
        : undefined,
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
                <time className="text-gray-300">
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