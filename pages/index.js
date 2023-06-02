import Head from 'next/head';
import Image from 'next/image'

import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductListing from '../components/ProductListing'

import { useAppContext } from '../state';


export default function Home({ products }) {


  return (
    <>
      <Head>
        <title>Headless Shopify Site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>

        <div className="product-grid">
          {products.map((p, index) => {
            return <ProductListing key={`product${index}`} product={p.node} />;
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}


export async function getServerSideProps(context) {
  let products = await fetch(`${process.env.BASE_API_URL}/get-product-list`)
    .then((res) => res.json())
    .then((response) => {
      let resp = JSON.parse(response);
      return resp.products.edges;
    });
  // console.dir(products);
  return {
    props: {
      products,
    },
  };
}

