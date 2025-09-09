import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { cleanup, screen, render } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouter } from "react-router";
import ProductCard from "../product-card";

expect.extend(matchers);

beforeEach(() => {
  render(
    <MemoryRouter>
      <ProductCard />
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
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
  it("displays product's quantity", () => {
    const quantityInput = screen.getByRole("spinbutton", { value: 1 });
    expect(quantityInput).toBeInTheDocument();
  });
});
