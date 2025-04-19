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
  // Add a cache-busting timestamp to force a fresh request
  const cacheBuster = `&_t=${Date.now()}`;
  
  try {
    // Bypass session storage caching temporarily to ensure fresh data
    // if (typeof window !== 'undefined') {
    //   const cached = sessionStorage.getItem(cacheKey);
    //   if (cached) {
    //     const { data, timestamp } = JSON.parse(cached);
    //     if (Date.now() - timestamp < CACHE_TIMES.MEDIUM * 1000) {
    //       return data;
    //     }
    //   }
    // }

    // Fetch from API with short cache time
    const data = await fetchAPI(`/homepage?${homePageQuery}${cacheBuster}`, {
      method: "GET",
      next: {
        revalidate: 30, // Changed from 0 to 30 seconds to enable static generation
        tags: [CACHE_TAGS.HOMEPAGE, CACHE_TAGS.SERVICES]
      }
    });

    // Temporarily disable session storage caching
    // if (typeof window !== 'undefined') {
    //   sessionStorage.setItem(cacheKey, JSON.stringify({
    //     data,
    //     timestamp: Date.now()
    //   }));
    // }

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
      revalidate: 60
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
      revalidate: 60
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
  return await fetchAPI(`/articles?${articleQuery}`, {
    method: "GET",
    next: {
      revalidate: 60
    }
  });
}

export async function getArticleBySlug(slug: string) {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug
      }
    },
    populate: '*'
  }, {
    encodeValuesOnly: true
  });

  return await fetchAPI(`/articles?${query}`, {
    method: "GET",
    next: {
      revalidate: 60
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