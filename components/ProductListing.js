import Image from 'next/image';
import Link from 'next/link';


export default function ProductListing({ product }) {

  let image = product.featuredImage;
  return (
    <div className="product-card">
      <Link href={`/product/${product.handle}`} >
        <div className="product-card-frame">
          {image &&
            <Image className='prodimg' src={image.url} alt='image.alt' width={200} height={200} />
          }
        </div>
        <div className="product-card-text">
          <h3 className="product-card-title">{product.title}</h3>
        </div>
      </Link>
    </div>
  );
}
