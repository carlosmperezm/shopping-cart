import { expect, describe, it, afterEach } from "vitest";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matcher from "@testing-library/jest-dom/matchers";
import QuantityInput from "../quantity-input";
import ProductCard from "../product-card";
import { useState } from "react";

expect.extend(matcher);

function MockProductCart({ productData }) {
  const [product, setProduct] = useState(productData);
  return (
    <form>
      <QuantityInput product={product} setProduct={setProduct} />
    </form>
  );
}
afterEach(cleanup);

describe("Quantity Input", () => {
  it("renders correctly", () => {
    const quantity = 2;
    render(<MockProductCart productData={{ title: "Apple", quantity }} />);
    const input = screen.getByRole("spinbutton");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(quantity);
  });
  it("changes the quantity when user types it", async () => {
    const user = userEvent.setup();
    const quantity = 1;
    render(<MockProductCart productData={{ title: "Apple", quantity }} />);
    const input = screen.getByRole("spinbutton");
    await user.type(input, "234");
    waitFor(() => expect(input).toHaveValue(1234));
    await user.clear(input);
    await user.type(input, "10");
    expect(input).toHaveValue(10);
  });
  it("does not allow type in quantities less than 1", async () => {
    const user = userEvent.setup();
    render(<MockProductCart productData={{ title: "Apple", quantity: 8 }} />);
    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "0");
    expect(input).toHaveValue(0);
  });
  it("increments quantity by 1 when the increment button is clicked", async () => {
    const user = userEvent.setup();
    render(<MockProductCart productData={{ title: "Apple", quantity: 1 }} />);
    const incrementButton = screen.getByRole("button", { name: "+" });
    const input = screen.getByRole("spinbutton");
    await user.click(incrementButton);
    expect(input).toHaveValue(2);
    await user.click(incrementButton);
    expect(input).toHaveValue(3);
  });
  it("decrements quantity by 1 when decrement button is clicked", async () => {
    const user = userEvent.setup();
    render(<MockProductCart productData={{ title: "Apple", quantity: 1 }} />);
    const decrementButton = screen.getByRole("button", { name: "-" });
    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "20");
    await user.click(decrementButton);
    expect(input).toHaveValue(19);
    await user.click(decrementButton);
    await user.click(decrementButton);
    expect(input).toHaveValue(17);
  });
  it("does not decrement when quantity is 1", async () => {
    const user = userEvent.setup();
    render(<MockProductCart productData={{ title: "Apple", quantity: 1 }} />);
    const decrementButton = screen.getByRole("button", { name: "-" });
    const input = screen.getByRole("spinbutton");
    await user.click(decrementButton);
    await user.click(decrementButton);
    expect(input).toHaveValue(1);
  });
});
