// Define the Article types
export interface Article {
    id: number;
    attributes: {
      title: string;
      slug: string;
      content: string;
      description: string;
      publishedAt: string;
      createdAt: string;
      updatedAt: string;
      coverImage?: {
        data: {
          attributes: {
            url: string;
            alternativeText: string;
          }
        }
      };
      author?: {
        data: {
          attributes: {
            name: string;
            avatar?: {
              data: {
                attributes: {
                  url: string;
                  alternativeText: string;
                }
              }
            }
          }
        }
      };
    }
  }
  
  export interface ArticleResponse {
    data: Article;
    meta: any;
  }
  
  export interface ArticlesResponse {
    data: Article[];
    meta: any;
  }