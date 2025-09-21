import { useOutletContext } from "react-router";
import "./styles.module.css";
import QuantityInput from "../quantity-input";

export default function Cart() {
  const [productsInCart, setProductsInCart] = useOutletContext();

  return (
    <ul>
      {productsInCart.length > 0 ? (
        productsInCart.map((item) => (
          <li key={item.id} data-id={item.id}>
            {item.title}
            {" | "}
            <label>
              Quantity
              <QuantityInput
                product={item}
                setProduct={(updatedProduct) => {
                  const updatedProducts = [];
                  productsInCart.forEach((prod) => {
                    if (prod.id === item.id) {
                      updatedProducts.push(updatedProduct);
                    } else {
                      updatedProducts.push(prod);
                    }
                  });
                  setProductsInCart(updatedProducts);
                }}
              />
            </label>
            <button
              onClick={(e) => {
                const productId = e.target.parentNode.dataset.id;
                const newProducts = productsInCart.filter(
                  (product) => product.id !== Number(productId)
                );
                setProductsInCart(newProducts);
              }}
            >
              Delete
            </button>
          </li>
        ))
      ) : (
        <p>Cart is empty</p>
      )}
    </ul>
  );
}
