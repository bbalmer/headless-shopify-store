/**
 * Add to Cart API Endpoint
 *
 * * Purpose: Add a single item to the cart
 * @param {string} cartId (Optional)
 * @param {string} itemId - Usually it's the product variant id
 * @param {number} quantity - Minimum 1
 *
 * @returns {object} cart that contains lines of items inside
 * See './utils/createCartWithItem' for the data structure
 *
 * Examples:
 *
 * If a cart does not exist yet,
 * ```
 * fetch('/.netlify/functions/add-to-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     cardId: '', // cardId can also be omitted if desired
 *     itemId: 'Z2lkOi8vc2hvcGlmFyaWFudC8zOTc0NDEyMDEyNzY5NA==',
 *     quantity: 4
 *   })
 * })
 * ```
 *
 * Add item to an existing cart
 * ```
 * fetch('/.netlify/functions/add-to-cart', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     cartId: 'S9Qcm9kdWN0VmFyaWFudC8zOTc0NDEyMDEyNzY5NA',
 *     itemId: 'Z2lkOi8vc2hvcGlmFyaWFudC8zOTc0NDEyMDEyNzY5NA==',
 *     quantity: 4
 *   })
 * })
 * ```
 */

const { createCartWithItem } = require('./utils/createCartWithItem')
const { addItemToCart } = require('./utils/addItemToCart')

export default async function handler(req, res) {



  try {

    const cartId = req.body.cartId;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;
    let cartResponse = null;

    if (cartId) {
      console.log('--------------------------------')
      console.log('Adding item to existing cart...')
      console.log('--------------------------------')

      const shopifyResponse = await addItemToCart({
        cartId,
        itemId,
        quantity,
      })

      cartResponse = shopifyResponse;
      const cart = cartResponse.cartLinesAdd.cart;


      res.status(200).json(JSON.stringify(cart));
    } else {
      console.log('--------------------------------')
      console.log('Creating new cart with item...')
      console.log('--------------------------------')
      const createCartResponse = await createCartWithItem({
        itemId,
        quantity,
      });
      cartResponse = createCartResponse;
      const cart = cartResponse.cartCreate.cart;


      res.status(200).json(JSON.stringify(cart));
    }


  } catch (error) {
    console.log(error);
  }
};