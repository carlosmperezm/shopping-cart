import ProductCard from "../../components/product-card";
import useProducts from "../../hooks/useProducts";

export default function ShopPage() {
  const products = useProducts();
  return (
    <main>
      <h1>Shop Page</h1>
      {products ? (
        products.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </main>
  );
}
