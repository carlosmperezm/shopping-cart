import styles from "./styles.module.css";
import "../../measures.module.css";
import { Plus, Minus } from "lucide-react";

export default function QuantityInput({ product, setProduct }) {
  return (
    <div className={styles.buttonsContainer}>
      <button
        className={`${styles.button} ${styles.left}`}
        type="button"
        onClick={() =>
          product.quantity > 1 &&
          setProduct({ ...product, quantity: Number(product.quantity) - 1 })
        }
      >
        <Minus size={16} />
      </button>
      <input
        className={styles.input}
        type="number"
        value={product.quantity}
        min={1}
        onChange={(e) => {
          if (e.target.value == "") {
            setProduct({ ...product, quantity: 1 });
          }
          const inputValue = Number(e.target.value);
          if (inputValue >= 1) {
            setProduct({ ...product, quantity: inputValue });
          }
        }}
      />
      <button
        className={styles.button}
        type="button"
        onClick={() =>
          setProduct({ ...product, quantity: Number(product.quantity) + 1 })
        }
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
