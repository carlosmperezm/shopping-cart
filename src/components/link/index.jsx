import styles from "./styles.module.css";
import "../../colors.module.css";
import { NavLink } from "react-router";

export default function Link({ children, to, itemsQuantity }) {
  return (
    <NavLink to={to} className={styles.link}>
      {children}
      {itemsQuantity > 0 && <span>{itemsQuantity}</span>}
    </NavLink>
  );
}
