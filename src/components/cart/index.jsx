import "./styles.module.css";

export default function Cart({ items }) {
  return (
    <ul>
      {items ? (
        items.map((item) => <li key={item.id}>{item.name}</li>)
      ) : (
        <h2>Cart is empty</h2>
      )}
    </ul>
  );
}
