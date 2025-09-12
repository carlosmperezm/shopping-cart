import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { cleanup, screen, render } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import ProductCard from "../product-card";

const products = [
  { id: 1, name: "Apple", price: 0.99 },
  { id: 2, name: "Banana", price: 0.59 },
  { id: 3, name: "Orange", price: 0.79 },
];

expect.extend(matchers);

function App() {
  // App mock with a mocked Outtlet component so that useOutletContext
  // does not throw and error
  return (
    <>
      <Outlet context={products} />
    </>
  );
}

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ProductCard product={products[0]} />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
});

afterEach(cleanup);

describe("Product Card Component", () => {
  it("renders correctly", async () => {
    const card = screen.getByRole("form");
    expect(card).toBeInTheDocument();
  });
  it("displays a title", () => {
    const heading = screen.getByRole("heading", { name: products[0].name });
    expect(heading).toBeInTheDocument();
  });
  it("displays product's quantity", () => {
    const quantityInput = screen.getByRole("spinbutton", { value: 1 });
    expect(quantityInput).toBeInTheDocument();
  });
  it("has a button to add product to the cart", () => {
    const cartButton = screen.getByRole("button", {
      name: "Add to the cart",
    });
    expect(cartButton).toBeInTheDocument();
  });
});
