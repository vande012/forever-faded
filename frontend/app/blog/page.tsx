import { getArticles } from '../data/loaders';
import ArticleCard from '../components/ArticleCard';
import { Metadata } from 'next';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foreverfadedmke.com';

export const metadata: Metadata = {
  title: 'Blog | Forever Faded Barbershop',
  description: 'Stay updated with the latest haircut trends, grooming tips, and barbershop news from Forever Faded Barbershop in Waukesha, WI',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'Blog | Forever Faded Barbershop',
    description: 'Stay updated with the latest haircut trends, grooming tips, and barbershop news from Forever Faded Barbershop',
    type: 'website',
    url: `${siteUrl}/blog`,
    images: [
      {
        url: `${siteUrl}/FFlogo.jpg`,
        width: 1200,
        height: 630,
        alt: 'Forever Faded Barbershop Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forever Faded Barbershop Blog',
    description: 'Stay updated with the latest haircut trends, grooming tips, and barbershop news',
    images: [`${siteUrl}/FFlogo.jpg`],
  },
};

export default async function Page() {
  try {
    const response = await getArticles();
    const articles = response?.data || [];

    return (
      <div className="w-full bg-[#1d1d1d] min-h-screen">
        <main className="container mx-auto px-4 py-8 max-w-screen-xl">
          <div className="mb-12 mt-24 lg:mt-40">
            <h1 className="text-5xl font-bold gold-gradient-text">Our Blog</h1>
            <p className="mt-4 text-xl text-gray-300">Stay updated with our latest news and articles</p>
          </div>

          {!articles || articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl">No articles found. Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {articles.map((article: Article) => (
                <div key={article.id} className="h-full">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="text-center py-16">
          <p className="text-red-500 text-xl">Error loading articles. Please try again later.</p>
        </div>
      </main>
    );
  }
}