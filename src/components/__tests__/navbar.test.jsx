import { describe, it, expect, afterEach } from "vitest";
import {
  render,
  screen,
  getAllByRole,
  cleanup,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import * as matchers from "@testing-library/jest-dom/matchers";
import { products } from "../../data/cart-items";
import routes from "../../routes";

expect.extend(matchers);

const Stub = createRoutesStub(routes);

afterEach(() => cleanup());

describe("NavBar component", () => {
  it("renders correctly", () => {
    render(<Stub initialEntries={["/"]} />);
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
    const links = getAllByRole(navbar, "link");
    links.forEach((link) => expect(link).toBeInTheDocument());
  });
  it("stays after links are clicked", () => {
    const user = userEvent.setup();
    render(<Stub initialEntries={["/"]} />);
    const navbar = screen.getByRole("navigation");
    const links = getAllByRole(navbar, "link");
    links.forEach(async (link) => {
      await waitFor(async () => await user.click(link));
      expect(navbar).toBeInTheDocument();
    });
  });
  it("shows number of items in the cart", () => {
    render(<Stub initialEntries={["/"]} />);
    const cartLink = screen.getByRole("link", {
      name: "Cart " + products.length,
    });
    expect(cartLink).toBeInTheDocument();
  });
});
