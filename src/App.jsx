import { useState } from "react";
import NavBar from "./components/navbar";
import { Outlet } from "react-router";

export default function App() {
  const [productsInCart, setProductsInCart] = useState([]);
  return (
    <>
      <NavBar productsInCart={productsInCart} />
      <div id="content">
        <Outlet context={[productsInCart, setProductsInCart]} />
      </div>
    </>
  );
}
