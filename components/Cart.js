import { useState, useEffect } from 'react';
import { useAppContext } from '../state';
import CartTable from './CartTable';
import CartTotal from './CartTotal';

export default function Cart() {
    const [showProducts, setShowProducts] = useState(true);
    const [products, setProducts] = useState([]);
    const [cost, setCost] = useState({});
    const { cartId, setCartId } = useAppContext();

    useEffect(() => {
        const localCart = cartId;

        let data;

        if (localCart === null) {
            setShowProducts(false);
        } else {
            setCartId(localCart);
            data = fetch(`${process.env.BASE_API_URL}/get-cart`, {
                method: 'post',
                body: JSON.stringify({
                    cartId: localCart,
                }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then((response) => {
                    const data = JSON.parse(response);
                    console.log("CART LISTING");
                    console.log("Products");
                    console.dir(data.cart?.lines.edges);
                    console.log("Costs");
                    console.dir(data.cart?.estimatedCost);
                    setProducts(data.cart?.lines.edges);
                    setCost(data.cart?.estimatedCost);
                    return response;
                });
        }
    }, []);

    return (
        <div>
            {showProducts && products?.length > 0 ? (
                <div>
                    <CartTable
                        cartItems={products}
                        cartId={cartId}
                        removeItem={setProducts}
                    />
                    <CartTotal cost={cost} />
                </div>
            ) : (
                <div className="cart-page-message">
                    No products to show! Get shopping!
                </div>
            )}
        </div>
    );
}