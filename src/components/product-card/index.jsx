import "./styles.module.css";
import QuantityInput from "../quantity-input";
import AddToCartButton from "../add-to-cart-button";
import { useOutletContext } from "react-router";
import { useState } from "react";

export default function ProductCard({ productData, handleSubmit }) {
  const productsInCart = useOutletContext()[0];
  const [product, setProduct] = useState({ ...productData, quantity: 1 });
  return (
    <form
      aria-label="product-card"
      onSubmit={(e) => {
        e.preventDefault();
        const productInCart = productsInCart.find(
          (prod) => prod.id === product.id
        );
        const productToSave = { ...product, quantity: product.quantity };
        if (productInCart) {
          const newProducts = productsInCart.filter(
            (prod) => prod.id !== productInCart.id
          );
          handleSubmit([...newProducts, productToSave]);
        } else {
          handleSubmit([...productsInCart, productToSave]);
        }
      }}
    >
      <div>
        <h2>{product.title}</h2>
      </div>
      <QuantityInput product={product} setProduct={setProduct} />
      <AddToCartButton />
    </form>
  );
}
