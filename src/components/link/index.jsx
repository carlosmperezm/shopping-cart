import { NavLink } from "react-router";

export default function Link({ children, to, itemsQuantity }) {
  return (
    <NavLink to={to}>
      {children}
      <span>{itemsQuantity}</span>
    </NavLink>
  );
}
