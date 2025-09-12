import { useOutletContext } from "react-router";
import ProductCard from "../../components/product-card";

export default function ShopPage() {
  const product = { name: "test", id: 1 };
  // const [prods, saveProduct] = useOutletContext();
  const saveProducts = useOutletContext()[1];
  //TODO: Bring the data from the APi
  return (
    <main>
      <h1>Shop Page</h1>
      <ProductCard product={product} handleSubmit={saveProducts} />
    </main>
  );
}
