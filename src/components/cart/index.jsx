import { useOutletContext } from "react-router";
import "./styles.module.css";

export default function Cart() {
  // Todo: Create a button to modify the quantity of the same products in the cart

  const [productsInCart, setProductsInCart] = useOutletContext();

  return (
    <ul>
      {productsInCart.length > 0 ? (
        productsInCart.map((item) => (
          <li key={item.id} data-id={item.id}>
            {item.title} | Quantity: {item.quantity}
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
