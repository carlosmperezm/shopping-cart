import { describe, it, expect, afterEach } from "vitest";
import { render, screen, getAllByRole, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import * as matchers from "@testing-library/jest-dom/matchers";
import Home from "../../pages/home";
import ShopPage from "../../pages/shop";
import CartPage from "../../pages/cart";
import ErrorPage from "../../pages/error";
import { useState } from "react";
import NavBar from "../navbar";

expect.extend(matchers);

const mockProducts = [
  { id: 1, title: "Apple", price: 0.99 },
  { id: 2, title: "Banana", price: 0.59 },
  { id: 3, title: "Orange", price: 0.79 },
];
function MockApp() {
  /*
  Does not pull data from the api
   */
  // Mock products in the cart
  const [productsInCart, setProductsInCart] = useState(mockProducts);
  return (
    <>
      <NavBar productsInCart={productsInCart} />
      <div id="content">
        <Outlet context={[productsInCart, setProductsInCart]} />
      </div>
    </>
  );
}
const mockRoutes = [
  {
    path: "/",
    Component: MockApp,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/shop",
        Component: ShopPage,
      },
      {
        path: "/cart",
        Component: CartPage,
      },
    ],
  },
];

const router = createMemoryRouter(mockRoutes);

afterEach(() => cleanup());

describe("NavBar component", () => {
  it("displays the links", () => {
    render(<RouterProvider router={router} />);
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
    const links = getAllByRole(navbar, "link");
    links.forEach((link) => expect(link).toBeInTheDocument());
  });
  it("stays after links are clicked", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const navbar = screen.getByRole("navigation");
    const links = getAllByRole(navbar, "link");
    for (const link of links) {
      await user.click(link);
      expect(navbar).toBeInTheDocument();
    }
  });
  it("shows number of items in the cart", () => {
    render(<RouterProvider router={router} />);
    const cartLink = screen.getByRole("link", {
      name: "Cart " + mockProducts.length,
    });
    expect(cartLink).toBeInTheDocument();
  });
});
