const { postToShopifyStorefront } = require('./postToShopifyStorefront')

exports.addItemToCart = async ({ cartId, itemId, quantity }) => {
  try {
    const shopifyResponse = postToShopifyStorefront({
      query: `
        mutation addItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        priceV2 {
                          amount
                          currencyCode
                        }
                        product {
                          title
                          handle
                        }
                      }
                    }
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
      variables: {
        cartId,
        lines: [
          {
            merchandiseId: itemId,
            quantity,
          },
        ],
      },
    })
    console.log("addItemToCart");
    return shopifyResponse
  } catch (error) {
    console.log(error)
  }
}
