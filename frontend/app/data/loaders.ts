import { fetchAPI } from "../utils/fetch-api";
import { getStrapiURL } from "../utils/get-strapi-url";
import qs from "qs";
///api/homepage?populate[blocks][on][blocks.hero-section][populate][logo][fields][0]=url&populate[blocks][on][blocks.hero-section][populate][logo][fields][1]=alternativeText&populate[blocks][on][blocks.hero-section][populate][video][fields][0]=url&populate[blocks][on][blocks.hero-section][populate][cta1][populate]=*&populate[blocks][on][blocks.hero-section][populate][cta2][populate]=*


const homePageQuery = qs.stringify(
  {
    populate: {
      blocks: {
        on: {
          'blocks.hero-section': {
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
          'blocks.service': {
            populate: {
              
            }
          }
        },
      },
    },
  },
  {
    encodeValuesOnly: true, // This ensures that only the query values are encoded
  }
);

console.log(`/api/homepage?${homePageQuery}`);


export async function getHomepageData() {
    const path = "/api/homepage";
    const BASE_URL = getStrapiURL();

    const url = new URL(path, BASE_URL);

    url.search = homePageQuery;

    return await fetchAPI(url.toString(), { 
        method: "GET",
        next: {
            revalidate: 60 // Cache for 60 seconds
        }
    });
}
