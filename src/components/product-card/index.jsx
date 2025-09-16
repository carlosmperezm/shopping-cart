import "./styles.module.css";
import QuantityInput from "../quantity-input";
import AddToCartButton from "../add-to-cart-button";
import { useOutletContext } from "react-router";

export default function ProductCard({ product, handleSubmit }) {
  const productsInCart = useOutletContext()[0];
  return (
    <form
      aria-label="product-card"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit([...productsInCart, product]);
      }}
    >
      <div>
        <h2>{product.title}</h2>
      </div>
      <QuantityInput />
      <AddToCartButton />
    </form>
  );
}
