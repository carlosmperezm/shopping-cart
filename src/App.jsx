import { useState } from "react";
import NavBar from "./components/navbar";
import { Outlet } from "react-router";
import { products } from "./hooks/useProducts";

export default function App() {
  const [productsInCart, setProductsInCart] = useState(products);
  return (
    <>
      <NavBar productsInCart={productsInCart} />
      <div id="content">
        <Outlet context={[productsInCart, setProductsInCart]} />
      </div>
    </>
  );
}
