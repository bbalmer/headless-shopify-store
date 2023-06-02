/**
 * API Endpoint
 *
 * Purpose: Fetch first 100 products of the store 
 *
 * Example:
 * ```
 * fetch('/.netlify/functions/get-product-list', {
 *   method: 'POST'
 * })
 * ```
 *
 * ! POST method is intentional for future enhancement
 *
 * TODO: Add enhancement for pagination
 */

const { postToShopify } = require('./utils/postToShopify');

export default async function handler(req, res) {
  try {
    const shopifyResponse = await postToShopify({
      query: `
        query getProductList {
          products(first: 110, query: "published_status:published") {
            edges {
              node {
                id
                title
                description
                handle
                status
                featuredImage {
                  id
                  altText
                  url
                }
                variants(first: 5) {
                  edges {
                      node {
                          id
                          title
                          sku
                          price

                      }
                  }
                }
              }
            }
          
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `,
    });

    res.status(200).json(JSON.stringify(shopifyResponse));
  } catch (error) {
    console.log(error);
  }

};
