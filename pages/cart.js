import Head from 'next/head';


import { useAppContext } from '../state';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Cart from '../components/Cart'

export default function CartPage() {
    return (
        <>
            <Head>
                <title>Headless Shopify | Cart</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className="cart-page">
                <article className="cart-page-content">
                    <h1>Your cart</h1>
                    <Cart />
                </article>
            </main>
            <Footer />
        </>
    );
}