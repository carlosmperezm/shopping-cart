import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { RouterProvider, createMemoryRouter } from "react-router";
import routes from "../../routes";

expect.extend(matchers);
const router = createMemoryRouter(routes, { initialEntries: ["/cart"] });
describe("Cart Page", () => {
  it("renders correctly", () => {
    render(<RouterProvider router={router} />);
    const title = screen.getByRole("heading", { name: "Cart Page" });
    expect(title).toBeInTheDocument();
  });
});
