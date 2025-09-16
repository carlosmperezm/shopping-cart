import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { cleanup, screen, render } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  useOutletContext,
} from "react-router";
import ProductCard from "../product-card";

const testProducts = [{ id: 2, title: "Banana", price: 0.59 }];

expect.extend(matchers);

function MockApp() {
  // Mock App component to render only
  // the children component with outlet context
  return (
    <>
      <Outlet context={testProducts} />
    </>
  );
}

function MockShopPage() {
  // Mock Shop Page so that no products are pulled from the api
  const products = testProducts;
  const saveProducts = useOutletContext()[1];
  return (
    <main>
      <h1>Shop Page</h1>
      {products ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleSubmit={saveProducts}
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

beforeEach(() => {
  render(<RouterProvider router={router} />);
});

afterEach(cleanup);

describe("Product Card Component", () => {
  it("renders correctly", async () => {
    const card = screen.getByRole("form");
    expect(card).toBeInTheDocument();
  });
  it("displays a title", () => {
    const heading = screen.getByRole("heading", {
      name: testProducts[0].title,
    });
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
