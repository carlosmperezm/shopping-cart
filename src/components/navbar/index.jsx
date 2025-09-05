import "./styles.module.css";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav>
      <Link to="home">Home</Link>
      <Link to="shop">Shop</Link>
      <Link to="cart">Cart </Link>
    </nav>
  );
}
