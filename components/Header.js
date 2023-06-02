import Link from 'next/link';
import { useAppContext } from '../state';

export default function Header() {


  const { cartId } = useAppContext();

  return (
    <header className="app-header">
      <h1>
        <Link href="/">
          Headless Shopify Store Example {cartId}
        </Link>
      </h1>
      <nav className="main-nav">
        <ul>
          <li className="main-nav-item">
            <Link href="/">
              All Products
            </Link>
          </li>
          <li className="main-nav-item">
            <Link href="/cart" className='cart cartLink'>
              Shopping Cart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
