import { useEffect, useState } from 'react';
import { formatPrice } from '../utilityFunctions';
import { useAppContext } from '../state';

function getCurrentVariantObject(vars, id) {
    return vars.filter((v) => {
        return v.node.id === id;
    })[0];
}

function VariantForm({ vars, current, pick, setQ }) {
    return (
        <form className="addToCart">
            {vars.length > 1 &&
                vars.map((v, index) => {
                    return (
                        <div className="product-page-price" key={`variant${index}`}>
                            <label>
                                <input
                                    name="Product Variant"
                                    type="radio"
                                    id={v.node.id}
                                    defaultChecked={index === 0}
                                    onChange={() => {
                                        pick(v.node.id);
                                    }}
                                />
                                {` ${v.node.title}`}
                            </label>
                            <br />
                        </div>
                    );
                })}
            <input
                type="number"
                placeholder="Quantity"
                defaultValue={1}
                min={1}
                max={getCurrentVariantObject(vars, current).node.quantityAvailable}
                onChange={(e) => {
                    setQ(parseInt(e.target.value));
                }}
            />
        </form>
    );
}

export default function ProductPageContent({ product }) {

    let vars = product.variants.edges;
    // Chosen variant ID
    const [chosenVariant, setChosenVariant] = useState(vars[0].node.id);
    // Quantity of the chosen variant
    const [quantity, setQuantity] = useState(1);
    // Cost of the chosen variant
    const [cost, setCost] = useState('');

    const { cartId, setCartId } = useAppContext();

    useEffect(() => {
        let variantPrice = getCurrentVariantObject(vars, chosenVariant).node.price;

        setCost(formatPrice(variantPrice * quantity));
    }, [chosenVariant, quantity, cost]);

    let image = product.featuredImage;

    let handleAddToCart = async () => {
        console.log('--- Adding to cart ---');

        const body = {
            cartId: cartId || '',
            itemId: chosenVariant,
            quantity: quantity,
        };


        const cartResponse = await fetch(
            `${process.env.BASE_API_URL}/add-to-cart`,
            {
                method: 'post',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            }
        );


        const data = JSON.parse(await cartResponse.json());

        const dataId = data.id;
        setCartId(dataId);


        return data;
    };

    return (
        <section className="product-page-content">
            <div>
                <img
                    width={150}
                    src={image.url}
                    alt={image.altText}
                    className="product-page-image"
                />
            </div>
            <div className="product-copy">
                <h1>{product.title}</h1>
                <h2>{cost}</h2>
                <p>{product.description}</p>

                <VariantForm
                    vars={vars}
                    current={chosenVariant}
                    pick={setChosenVariant}
                    setQ={setQuantity}
                />

                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </section>
    );
}