import { fetchAPI } from "../utils/fetch-api";
import qs from "qs";
import { CACHE_TIMES, CACHE_TAGS } from '../lib/cache-config';
import { cachedFetch } from '../lib/cached-fetch';

const homePageQuery = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          'blocks.hero': {
            populate: {
              logo: {
                fields: ['url', 'alternativeText'],
              },
              video: {
                fields: ['url'],
              },
              mobilevideo: {
                fields: ['url'],
              },
              cta1: '*',
              cta2: '*',
            },
          },
          'blocks.why-us': {
            populate: {
              image: {
                fields: ['url', 'alternativeText'],
              },
            },
          },
          'blocks.reviews': {
            populate: {
              review: {
                fields: ['name', 'body', 'stars'],
              },
            },
          },
          'blocks.service-section': {
            populate: {
              service: { fields: ['name', 'description', 'cost', 'time'] },  // Adjust based on the actual field names
              service1: { fields: ['name', 'description', 'cost', 'time'] },
              service2: { fields: ['name', 'description', 'cost', 'time'] },
            },
          },
          'blocks.merch-section': {
            populate: {
              merchslider: {
                populate: {
                  merchimage: {
                    fields: ['url', 'alternativeText'],
                  },
                },
              },
              cta: '*',
            }
          },
          'blocks.gallery': {
            populate: {
              galleryimages: { fields: ['url', 'alternativeText'] },
              cta: '*',
            },
          },
          'blocks.staff-section': {
            populate: {
              staffcard: {
                populate: {
                  image: {
                    fields: ['url', 'alternativeText']
                  },
                  socials: {
                    fields: ['platform', 'url']
                  },
                  cta: '*'
                },
              },
            },
          },
          'blocks.hours': {
            populate: {
              hours: {
                populate: '*'
            },
          },
        },
      },
    },
  },
    encodeValuesOnly: true
  },
);



export async function getHomepageData() {
  const cacheKey = `homepage:${homePageQuery}`;
  
  try {
    // Fetch from API with stronger caching
    const data = await fetchAPI(`/homepage?${homePageQuery}`, {
      method: "GET",
      next: {
        revalidate: CACHE_TIMES.LONG, // 24 hours instead of 30 seconds
        tags: [CACHE_TAGS.HOMEPAGE, CACHE_TAGS.SERVICES]
      }
    });

    return data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    throw error;
  }
}
const footerQuery = qs.stringify(
  {
    populate: {
      logo: {
        fields: ['url', 'alternativeText'],
      },
      links: {
        populate: '*',
      },
      socials: {
        populate: '*',
      },
    }
  },
  {
    encodeValuesOnly: true
  }
);


export async function getFooterData() {
  // Just use the path, not a full URL
  return await fetchAPI(`/footer?${footerQuery}`, {
    method: "GET",
    next: {
      revalidate: CACHE_TIMES.LONG, // 24 hours
      tags: [CACHE_TAGS.HOMEPAGE]
    }
  });
}

//navbar
const navbarQuery = qs.stringify(
  {
    populate: {
      navlogo: {
        fields: ['url', 'alternativeText'],
      },
      links: {
        populate: '*',
      },
      Address: {
        populate: '*',
      },
      NavHours: {
        populate: {
          hours: '*',
        }
      },
      cta: {
        populate: '*',
      },
     
    }
  },
  {
    encodeValuesOnly: true
  }
);


export async function getNavbarData() {
  // Just use the path, not a full URL
  return await fetchAPI(`/navbar?${navbarQuery}`, {
    method: "GET",
    next: {
      revalidate: CACHE_TIMES.LONG, // 24 hours
      tags: [CACHE_TAGS.HOMEPAGE]
    }
  });
}


const articleQuery = qs.stringify(
  {
    populate: {
      cover: {
        fields: ['url', 'alternativeText'],
      },
      author: {
        populate: '*'
      },
      category: {
        populate: '*'
      },
      blocks: {
        populate: '*'
      }
    }
  },
  {
    encodeValuesOnly: true
  }
);

export async function getArticles() {
  // Use longer cache for articles list
  return await fetchAPI('/articles?populate=*', {
    next: {
      revalidate: CACHE_TIMES.MEDIUM, // 2 hours
      tags: [CACHE_TAGS.BLOG]
    }
  });
}

export async function getArticleBySlug(slug: string) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        cover: {
          fields: ['url', 'alternativeText'],
        },
        blocks: {
          populate: '*',
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  
  return await fetchAPI(`/articles?${query}`, {
    next: {
      revalidate: CACHE_TIMES.MEDIUM, // 2 hours
      tags: [CACHE_TAGS.BLOG, `article:${slug}`]
    }
  });
}

const aboutPageHoursQuery = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          'blocks.hours': {
            populate: {
              hours: {
                populate: '*'
              },
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true
  }
);

export async function getAboutPageHours() {
  try {
    return await fetchAPI(`/homepage?${aboutPageHoursQuery}`, {
      method: "GET",
      next: {
        revalidate: 60
      }
    });
  } catch (error) {
    console.error("Failed to fetch hours data:", error);
    return { data: { attributes: { blocks: [] } } };
  }
}

const galleryQuery = qs.stringify(
  {
    populate: {
      gallery_items: {
        populate: ['Image'],
      },
    },
  },
  {
    encodeValuesOnly: true
  }
);

export async function getGalleryData() {
 
  try {
    const data = await fetchAPI(`/gallery?${galleryQuery}`, {
      method: "GET",
      next: {
        revalidate: 60
      }
    });
    return data;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    // Return a default structure to prevent errors
    return { 
      data: { 
        Title: "Gallery", 
        Description: "Error loading gallery items", 
        gallery_items: [] 
      } 
    };
  }
}