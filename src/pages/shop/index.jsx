import "./styles.module.css";
import ProductCard from "../../components/product-card";
import useProducts from "../../hooks/useProducts";

export default function ShopPage() {
  const products = useProducts();
  return (
    <main>
      <h1>Time to shop!</h1>
      {products ? (
        <ul>
          {products.map((product) => (
            <ProductCard key={product.id} productData={product} />
          ))}
        </ul>
      ) : (
        <h3>Loading...</h3>
      )}
    </main>
  );
}
