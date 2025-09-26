import { useOutletContext } from "react-router";
import styles from "./styles.module.css";
import QuantityInput from "../quantity-input";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const [productsInCart, setProductsInCart] = useOutletContext();

  return (
    <ul className={styles.itemsContainer}>
      {productsInCart.length > 0 ? (
        productsInCart.map((item) => (
          <li key={item.id} data-id={item.id}>
            <div className={styles.contentContainer}>
              <div className={styles.imgContainer}>
                <img src={item.image} />
              </div>
              <div className={styles.middleContainer}>
                {item.title}
                <label>
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
              </div>
            </div>
            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                const productId = e.target.parentNode.dataset.id;
                const newProducts = productsInCart.filter(
                  (product) => product.id !== Number(productId)
                );
                setProductsInCart(newProducts);
              }}
            >
              <Trash2 />
            </button>
          </li>
        ))
      ) : (
        <p>Cart is empty</p>
      )}
    </ul>
  );
}
