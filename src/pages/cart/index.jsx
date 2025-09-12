import Cart from "../../components/cart";
import { useOutletContext } from "react-router";

export default function CartPage() {
  const cartItems = useOutletContext()[0];
  return (
    <main>
      <h1>Cart Page</h1>
      <Cart items={cartItems} />
    </main>
  );
}
