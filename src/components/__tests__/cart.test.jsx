import { afterEach, describe, expect, it } from "vitest";
import { screen, render, cleanup, waitFor } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import CartPage from "../../pages/cart";
import ErrorPage from "../../pages/error";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

expect.extend(matchers);

const mockProducts = [
  { id: 1, title: "Apple", price: 0.99 },
  { id: 2, title: "Banana", price: 0.59 },
  { id: 3, title: "Orange", price: 0.79 },
];

function renderMockedApp(mockProducts) {
  function MockApp() {
    /*
  Does not pull data from the api
   */
    // Mock products in the cart
    const [productsInCart, setProductsInCart] = useState(mockProducts);
    return (
      <div id="content">
        <Outlet context={[productsInCart, setProductsInCart]} />
      </div>
    );
  }

  const mockRoutes = [
    {
      path: "/",
      Component: MockApp,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/cart",
          Component: CartPage,
        },
      ],
    },
  ];

  const router = createMemoryRouter(mockRoutes, { initialEntries: ["/cart"] });
  render(<RouterProvider router={router} />);
}

afterEach(cleanup);

describe("Cart Component", () => {
  it("shows all items", () => {
    renderMockedApp(mockProducts);
    const elements = screen.getAllByRole("listitem");
    expect(elements).toHaveLength(mockProducts.length);
  });
  it("shows a message when cart is empty", () => {
    renderMockedApp([]);
    const elements = screen.queryAllByRole("listitem");
    expect(elements).toHaveLength(0);
    const message = screen.getByText("Cart is empty");
    expect(message).toBeInTheDocument();
  });
  it("deletes elements", async () => {
    const user = userEvent.setup();
    renderMockedApp(mockProducts);
    const listItems = screen.queryAllByRole("listitem");
    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    await user.click(deleteButtons[0]);
    expect(listItems[0]).not.toBeInTheDocument();
    waitFor(() => {
      expect(listItems).toHaveLength(mockProducts.length - 1);
    });
    await user.click(deleteButtons[0]);
    expect(listItems[0]).not.toBeInTheDocument();
    waitFor(() => {
      expect(listItems).toHaveLength(mockProducts.length - 2);
    });
  });
});
