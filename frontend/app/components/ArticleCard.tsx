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
      <article className="overflow-hidden rounded-lg shadow-lg">
        {cover?.url && (
          <div className="relative h-48 w-full">
            <Image
              src={getStrapiMedia(cover.url)}
              alt={cover.alternativeText || title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4 gold-gradient-bg">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-2 text-gray-700 font-semibold">{description}</p>
        </div>
      </article>
    </Link>
  );
}