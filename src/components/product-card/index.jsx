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
        const productInCart = productsInCart.find(
          (prod) => prod.id === product.id
        );
        if (productInCart) {
          const quantity = productInCart.quantity + 1;
          const productToSave = { ...product, quantity };
          const newProducts = productsInCart.filter(
            (prod) => prod.id !== productInCart.id
          );
          handleSubmit([...newProducts, productToSave]);
        } else {
          const productToSave = { ...product, quantity: 1 };
          handleSubmit([...productsInCart, productToSave]);
        }
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
