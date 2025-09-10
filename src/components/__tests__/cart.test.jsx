import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import Cart from "../cart";

expect.extend(matchers);

afterEach(cleanup);

describe("Cart Component", () => {
  it("renders", () => {
    render(<Cart />);
    const cart = screen.getByRole("list");
    expect(cart).toBeInTheDocument();
  });
  it("shows all items", () => {
    const items = [
      { id: 1, name: "Apple", price: 0.99 },
      { id: 2, name: "Banana", price: 0.59 },
      { id: 3, name: "Orange", price: 0.79 },
    ];
    render(<Cart items={items} />);
    const elements = screen.getAllByRole("listitem");
    expect(elements).toHaveLength(items.length);
  });
  it("shows a message when cart is empty", () => {
    render(<Cart />);
    const elements = screen.queryAllByRole("listitem");
    expect(elements).toHaveLength(0);
    const message = screen.getByRole("heading");
    expect(message).toBeInTheDocument();
  });
});
