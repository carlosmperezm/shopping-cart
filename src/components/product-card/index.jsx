import styles from "./styles.module.css";
import "../../colors.module.css";
import "../../measures.module.css";
import QuantityInput from "../quantity-input";
import AddToCartButton from "../add-to-cart-button";
import { useOutletContext } from "react-router";
import { useState } from "react";

export default function ProductCard({ productData }) {
  const [productsInCart, saveProducts] = useOutletContext();
  const [product, setProduct] = useState({ ...productData, quantity: 1 });

  function handleSubmit(e) {
    e.preventDefault();
    let productInCart;
    const productsWithoutCurrentProduct = [];
    const productToSave = { ...product, quantity: product.quantity };

    for (const prod of productsInCart) {
      prod.id === product.id
        ? (productInCart = prod)
        : productsWithoutCurrentProduct.push(prod);
    }
    if (productInCart && product.quantity === productInCart.quantity) {
      alert(
        "Product with this quantity is already in the cart. Please change the quantity"
      );
    } else if (productInCart) {
      saveProducts([...productsWithoutCurrentProduct, productToSave]);
    } else {
      saveProducts([...productsInCart, productToSave]);
    }
  }
  return (
    <form
      className={styles.productCard}
      aria-label="product-card"
      onSubmit={handleSubmit}
    >
      <div className={styles.imgContainer}>
        <img className={styles.productImg} src={product.image} />
      </div>
      <p className={styles.productTitle}>{product.title}</p>
      <QuantityInput product={product} setProduct={setProduct} />
      <AddToCartButton />
    </form>
  );
}
