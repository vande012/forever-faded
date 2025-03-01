import { fetchAPI } from "../utils/fetch-api";
import { getStrapiURL } from "../utils/get-strapi-url";
import qs from "qs";
///api/homepage?populate[blocks][on][blocks.hero-section][populate][logo][fields][0]=url&populate[blocks][on][blocks.hero-section][populate][logo][fields][1]=alternativeText&populate[blocks][on][blocks.hero-section][populate][video][fields][0]=url&populate[blocks][on][blocks.hero-section][populate][cta1][populate]=*&populate[blocks][on][blocks.hero-section][populate][cta2][populate]=*


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
              service: { fields: ['name', 'description'] },  // Adjust based on the actual field names
              service1: { fields: ['name', 'description'] },
              service2: { fields: ['name', 'description'] },
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

console.log(`/api/homepage?${homePageQuery}`);


export async function getHomepageData() {
  // Just use the path, not a full URL
  return await fetchAPI(`/homepage?${homePageQuery}`, {
    method: "GET",
    next: {
      revalidate: 60
    }
  });
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

console.log(`/api/footer?${footerQuery}`);

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
console.log(`/api/navbar?${navbarQuery}`);

export async function getNavbarData() {
  // Just use the path, not a full URL
  return await fetchAPI(`/navbar?${navbarQuery}`, {
    method: "GET",
    next: {
      revalidate: 60
    }
  });
}