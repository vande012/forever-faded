import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '../utils/get-strapi-url';

type Article = {
  id: number;
  title: string;
  description: string;
  slug: string;
  cover: {
    url: string;
    alternativeText: string | null;
  };
  author: {
    name: string;
  };
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { title, description, slug, cover } = article;

  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="overflow-hidden rounded-lg shadow-lg h-full flex flex-col bg-black/20 hover:transform hover:scale-[1.02] transition-all duration-200">
        {cover?.url && (
          <div className="relative h-64 w-full">
            <Image
              src={getStrapiMedia(cover.url)}
              alt={cover.alternativeText || title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4 gold-gradient-bg flex-grow">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-2 text-gray-700 font-semibold">{description}</p>
          <div className="mt-4 text-right">
            <span className="inline-block text-black font-bold hover:underline">Read More →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}