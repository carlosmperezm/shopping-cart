import "./styles.module.css";

export default function QuantityInput({ product, setProduct }) {
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          product.quantity > 1 &&
          setProduct({ ...product, quantity: product.quantity - 1 })
        }
      >
        -
      </button>
      <input
        type="number"
        value={product.quantity}
        min={1}
        onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
      />
      <button
        type="button"
        onClick={() =>
          setProduct({ ...product, quantity: product.quantity + 1 })
        }
      >
        +
      </button>
    </div>
  );
}
