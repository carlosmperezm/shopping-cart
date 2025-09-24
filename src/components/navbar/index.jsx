import styles from "./styles.module.css";
import "../../colors.module.css";
import Link from "../link";
import { ShoppingCart } from "lucide-react";
import { House } from "lucide-react";
import { ShoppingBag } from "lucide-react";

export default function NavBar({ productsInCart = [] }) {
  return (
    <nav className={styles.navbar}>
      <Link to="home">
        <House size={30} />
      </Link>
      <Link to="shop">
        <ShoppingBag size={30} />
      </Link>
      <Link to="cart" itemsQuantity={productsInCart.length}>
        <ShoppingCart size={30} />
      </Link>
    </nav>
  );
}
