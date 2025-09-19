import { useOutletContext } from "react-router";
import ProductCard from "../../components/product-card";
import useProducts from "../../hooks/useProducts";

export default function ShopPage() {
  const products = useProducts();
  const saveProducts = useOutletContext()[1];
  return (
    <main>
      <h1>Shop Page</h1>
      {products ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
            handleSubmit={saveProducts}
          />
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </main>
  );
}
