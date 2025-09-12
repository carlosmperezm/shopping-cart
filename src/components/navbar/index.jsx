import "./styles.module.css";
import Link from "../link";

export default function NavBar({ productsInCart = [] }) {
  return (
    <nav>
      <Link to="home">Home</Link>
      <Link to="shop">Shop</Link>
      <Link to="cart" itemsQuantity={productsInCart.length}>
        Cart
      </Link>
    </nav>
  );
}
