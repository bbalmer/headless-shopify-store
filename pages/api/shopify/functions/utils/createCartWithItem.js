const { postToShopifyStorefront } = require('./postToShopifyStorefront')

// Creates a cart with a single item
exports.createCartWithItem = async ({ itemId, quantity }) => {
  try {

    const response = await postToShopifyStorefront({
      query: `
      mutation {
        cartCreate(
          input: {
            lines: [
              {
                quantity: ${quantity}, 
                merchandiseId: "${itemId}"
              }
            ]
          }
        ) 
        {
          cart {
            id
            createdAt
            updatedAt
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
                        id
                        title
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
      `
    })
    console.log("createCartWithItem");
    return response
  } catch (error) {
    console.log(error)
  }
}
