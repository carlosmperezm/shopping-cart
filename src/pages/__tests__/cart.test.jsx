import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { RouterProvider, createMemoryRouter } from "react-router";
import routes from "../../routes";

expect.extend(matchers);
const router = createMemoryRouter(routes, { initialEntries: ["/cart"] });
const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 25.99,
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 89.99,
  },
  {
    id: 3,
    name: "HD Monitor",
    price: 199.99,
  },
  {
    id: 4,
    name: "USB-C Hub",
    price: 39.99,
  },
  {
    id: 5,
    name: "Bluetooth Headphones",
    price: 59.99,
  },
];

describe("Cart Page", () => {
  it("renders correctly", () => {
    render(<RouterProvider router={router} />);
    const title = screen.getByRole("heading", { name: "Cart Page" });
    expect(title).toBeInTheDocument();
  });
});
