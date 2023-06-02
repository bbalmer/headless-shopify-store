import Head from 'next/head';
import ProductPageContent from '../../components/ProductPageContent'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useAppContext } from '../../state';

export default function ProductPage({ product }) {
    const { cartId } = useAppContext();

    // console.log("ProductPage");
    // console.dir(product);

    return (
        <div className="container">
            <Head>
                <title>Headless Shopify | Buy {product.node.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <div className="product-page">
                <article>
                    <ProductPageContent product={product.node} />
                </article>
            </div>
            <Footer />
        </div>
    );
}

export async function getProductList() {
    let products = await fetch(
        `${process.env.BASE_API_URL}/get-product-list`
    )

        .then((res) => res.json())
        .then((response) => {
            console.log('--- built product pages ---');
            let resp = JSON.parse(response);

            return resp.products.edges;
        });
    return products;
}

// export async function getStaticPaths() {
//     let products = await getProductList();
//     let routes = products.map((p) => {
//         console.log("ID: " + p.node.handle);


//         const params = `/product/${p.node.handle}`;
//         return params;
//     });

//     return { paths: routes, fallback: false };
// }

// export async function getStaticProps({ params }) {
//     let products = await getProductList();

//     let product = products.find((p) => {
//         return p.node.handle === params.product;
//     });

//     return {
//         props: {
//             product,
//         },
//     };
// }

export async function getServerSideProps({ params }) {
    let products = await getProductList();

    let product = products.find((p) => {
        return p.node.handle === params.product;
    });

    return {
        props: {
            product,
        },
    };
}