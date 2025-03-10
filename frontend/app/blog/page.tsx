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

export const metadata: Metadata = {
  title: 'Blog | Forever Faded Barbershop',
  description: 'Stay updated with the latest news, trends, and updates from Forever Faded Barbershop in Waukesha, WI',
  openGraph: {
    title: 'Blog | Forever Faded Barbershop',
    description: 'Stay updated with the latest news, trends, and updates from Forever Faded Barbershop',
    type: 'website'
  }
};

export default async function Page() {
  try {
    const response = await getArticles();
    const articles = response?.data || [];

    return (
      <div className=" w-full bg-[#1d1d1d]">
        <main className="container mx-auto px-4 py-8 max-w-none">
        <div className="mb-8 mt-24 lg:mt-40">
          <h1 className="text-4xl font-bold gold-gradient-text">Our Blog</h1>
          <p className="mt-2 text-lg text-gray-300">Stay updated with our latest news and articles</p>
        </div>

        {!articles || articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
      </div>
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-600">Error loading articles. Please try again later.</p>
        </div>
      </main>
    );
  }
}