import { getArticles } from '../data/loaders';
import Link from 'next/link';
import { formatDistance } from 'date-fns';

type Article = {
    id: number;
    title: string;
    slug: string;
    publishedAt: string;
  }
  

export const metadata = {
  title: 'Blog Sitemap | Forever Faded',
  description: 'Complete listing of all blog posts on Forever Faded',
  robots: 'noindex, follow' // We don't want this page indexed
};

export default async function BlogSitemap() {
    const response = await getArticles();
    const articles = (response?.data || []) as Article[];
  
    // Group articles by year
    const groupedArticles = articles.reduce((acc, article) => {
      const year = new Date(article.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(article);
      return acc;
    }, {} as Record<number, Article[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(groupedArticles)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen w-full bg-[#1d1d1d]">
      <main className="container mx-auto px-4  md:px-6 lg:px-8 py-8 pt-[160px]">
        <h1 className="text-4xl mt-5 font-bold text-white mb-8">Blog Sitemap</h1>
        
        {sortedYears.map(year => (
          <div key={year} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 gold-gradient-text">
              {year}
            </h2>
            <div className="grid gap-4">
              {groupedArticles[year]
                .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
                .map(article => (
                  <div 
                    key={article.id} 
                    className="border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-colors"
                  >
                    <Link 
                      href={`/blog/${article.slug}`}
                      className="group flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                    >
                      <h3 className="text-white group-hover:text-[#C0A172] transition-colors">
                        {article.title}
                      </h3>
                      <div className="text-gray-400 text-sm">
                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        <span className="ml-2 text-gray-500">
                          ({formatDistance(new Date(article.publishedAt), new Date(), { addSuffix: true })})
                        </span>
                      </div>
                    </Link>
                  </div>
              ))}
            </div>
          </div>
        ))}

        {articles.length === 0 && (
          <p className="text-gray-400 text-center py-12">
            No blog posts found.
          </p>
        )}
      </main>
    </div>
  );
}