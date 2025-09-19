import { useOutletContext } from "react-router";
import "./styles.module.css";

export default function Cart({ items }) {
  // Todo: Create a button to eliminate the item of the cart.
  // Todo: Create a button to modify the quantity of the same products in the cart

  const [productsInCart, setProductsInCart] = useOutletContext();

  return (
    <ul>
      {items.length > 0 ? (
        items.map((item) => (
          <li key={item.id} data-id={item.id}>
            {item.title} | Quantity: {item.quantity}
            <button
              onClick={(e) => {
                const productId = e.target.parentNode.dataset.id;
                console.log(typeof productId);
                const newProducts = productsInCart.filter(
                  (product) => product.id !== Number(productId)
                );
                console.log(newProducts);
                setProductsInCart(newProducts);
              }}
            >
              Delete
            </button>
          </li>
        ))
      ) : (
        <h2>Cart is empty</h2>
      )}
    </ul>
  );
}
