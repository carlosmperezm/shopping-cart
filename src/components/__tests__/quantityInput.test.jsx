import { expect, describe, it, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matcher from "@testing-library/jest-dom/matchers";
import QuantityInput from "../quantity-input";

expect.extend(matcher);

beforeEach(() => {
  render(<QuantityInput />);
});
afterEach(cleanup);

describe("Quantity Input", () => {
  it("renders correctly", () => {
    const input = screen.getByRole("spinbutton");
    expect(input).toBeInTheDocument();
  });
  it("changes the quantity when user types on it", async () => {
    const user = userEvent.setup();
    const input = screen.getByRole("spinbutton");
    await act(async () => await user.type(input, "234"));
    expect(input).toHaveValue(1234);
    await act(async () => {
      await user.clear(input); // clears to 1 because 1 is the minumin allowed
      await user.type(input, "10");
    });
    expect(input).toHaveValue(110);
  });
  it("does not allow type in quantities less than 1", async () => {
    const user = userEvent.setup();
    const input = screen.getByRole("spinbutton");
    await act(async () => {
      await user.clear(input);
      await user.type(input, "0");
    });
    expect(input).toHaveValue(10);
  });
  it("increments quantity by 1 when the increment button is clicked", async () => {
    const user = userEvent.setup();
    const incrementButton = screen.getByRole("button", { name: "+" });
    const input = screen.getByRole("spinbutton");
    await act(async () => await user.click(incrementButton));
    expect(input).toHaveValue(2);
    await act(async () => await user.click(incrementButton));
    expect(input).toHaveValue(3);
  });
  it("decrements quantity by 1 when decrement button is clicked", async () => {
    const user = userEvent.setup();
    const decrementButton = screen.getByRole("button", { name: "-" });
    const input = screen.getByRole("spinbutton");
    await act(async () => await user.type(input, "2"));
    await act(async () => await user.click(decrementButton));
    expect(input).toHaveValue(11);
    await act(async () => {
      await user.click(decrementButton);
      await user.click(decrementButton);
    });
    expect(input).toHaveValue(9);
  });
  it("does not decrement when quantity is 1", async () => {
    const user = userEvent.setup();
    const decrementButton = screen.getByRole("button", { name: "-" });
    const input = screen.getByRole("spinbutton");
    await act(async () => {
      await user.clear(input); // set the input value to 1 because is the minimun allowed
      await user.click(decrementButton);
      await user.click(decrementButton);
    });
    expect(input).toHaveValue(1);
  });
});
