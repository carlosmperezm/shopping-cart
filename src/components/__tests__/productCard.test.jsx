import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, screen, render } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import ProductCard from "../product-card";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

const mockedSaveProducts = vi.fn((products) => products);
let testProducts = [{ id: 2, title: "Banana", price: 0.59 }];
let mockedProductsInCart = [];

expect.extend(matchers);

function MockApp() {
  // Mock App component to render only
  // the children component with outlet context
  const [productsInCart, setProductsInCart] = useState(mockedProductsInCart);
  return (
    <>
      <Outlet
        context={[
          productsInCart,
          vi.fn((newProducts) => {
            mockedSaveProducts(newProducts);
            setProductsInCart(newProducts);
          }),
        ]}
      />
    </>
  );
}

function MockShopPage() {
  // Mock Shop Page so that no products are pulled from the api
  const products = testProducts;
  return (
    <main>
      <h1>Shop Page</h1>
      {products ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
            handleSubmit={mockedSaveProducts}
          />
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </main>
  );
}
const mockRoutes = [
  // Mock routes to recreate the same components hierarchy but
  // with the mock components instead
  {
    path: "/",
    Component: MockApp,
    children: [
      {
        path: "/shop",
        Component: MockShopPage,
      },
    ],
  },
];

const router = createMemoryRouter(mockRoutes, { initialEntries: ["/shop"] });

afterEach(() => {
  cleanup();
});

describe("Product Card Component", () => {
  it("renders correctly", () => {
    render(<RouterProvider router={router} />);
    const card = screen.getByRole("form");
    expect(card).toBeInTheDocument();
  });
  it("displays a title", () => {
    render(<RouterProvider router={router} />);
    const heading = screen.getByRole("heading", {
      name: testProducts[0].title,
    });
    expect(heading).toBeInTheDocument();
  });
  it("displays product's quantity", () => {
    render(<RouterProvider router={router} />);
    const quantityInput = screen.getByRole("spinbutton", { value: 1 });
    expect(quantityInput).toBeInTheDocument();
  });
  it("has a button to add product to the cart", () => {
    render(<RouterProvider router={router} />);
    const cartButton = screen.getByRole("button", {
      name: "Add to the cart",
    });
    expect(cartButton).toBeInTheDocument();
  });
  it("does not modify the product when the product is in the cart with the same quantity already", async () => {
    const user = userEvent.setup();
    window.alert = () => {};

    //starts with quantity=1
    testProducts = [{ id: 2, title: "Banana", price: 0.59 }];

    // setting products in state
    mockedProductsInCart = [{ ...testProducts[0], quantity: 3 }];
    render(<RouterProvider router={router} />);
    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(incrementButton);
    await user.click(incrementButton);
    const cartButton = screen.getByRole("button", {
      name: "Add to the cart",
    });
    await user.click(cartButton);
    expect(mockedSaveProducts).not.toBeCalled();
  });
  it("sends incremented product's quantity", async () => {
    testProducts = [{ id: 2, title: "Banana", price: 0.59 }];
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const cartButton = screen.getByRole("button", { name: "Add to the cart" });
    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(incrementButton);
    await user.click(cartButton);
    expect(mockedSaveProducts).toHaveBeenCalledWith([
      {
        id: 2,
        title: "Banana",
        price: 0.59,
        quantity: 2,
      },
    ]);
  });
  it("sends decremented product's quantity", async () => {
    testProducts = [{ id: 2, title: "Banana", price: 0.59 }];
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const cartButton = screen.getByRole("button", { name: "Add to the cart" });
    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(cartButton);
    expect(mockedSaveProducts).toHaveBeenCalledWith([
      {
        id: 2,
        title: "Banana",
        price: 0.59,
        quantity: 4, // starts with 1 and then it gets incremeneted 3 times 1+3 = 4
      },
    ]);
  });
});
