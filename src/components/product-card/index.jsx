import "./styles.module.css";
import QuantityInput from "../quantity-input";

export default function ProductCard() {
  return (
    <form aria-label="product-card">
      <h2>Product's title</h2>
      <QuantityInput />
    </form>
  );
}
