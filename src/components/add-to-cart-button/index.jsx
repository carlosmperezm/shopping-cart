import styles from "./styles.module.css";

export default function AddToCartButton() {
  return (
    <button className={styles.button} type="submit">
      Add to the cart
    </button>
  );
}
