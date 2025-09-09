import "./styles.module.css";
import { useState } from "react";

export default function QuantityInput() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <button
        type="button"
        onClick={() => (quantity > 1 ? setQuantity(quantity - 1) : quantity)}
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        min={1}
        onChange={(e) =>
          e.target.value > 1 ? setQuantity(e.target.value) : setQuantity(1)
        }
      />
      <button type="button" onClick={() => setQuantity(quantity + 1)}>
        +
      </button>
    </div>
  );
}
