import { getArticles } from '../data/loaders';
import Link from 'next/link';
import ArticleCard from './ArticleCard';

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
    publishedAt: string;
  }

 async function RecentBlogPosts() {
  try {
    const response = await getArticles();
    // Get only the 3 most recent articles
    const recentArticles = response?.data?.slice(0, 3) || [];

    if (!recentArticles.length) {
      return null; // Don't render the section if there are no articles
    }

    return (
      <section className="w-full bg-[#1d1d1d] py-10 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 gold-gradient-text">
              Latest From Our Blog
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#8B7355] to-[#C0A172] mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Stay up to date with the latest news and updates from Forever Faded
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link 
              href="/blog"
              className="gold-gradient-bg px-8 py-3 rounded-md inline-flex items-center justify-center transition-all duration-300 text-black font-semibold"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    return null; // Don't render the section if there's an error
  }
}

export default RecentBlogPosts;