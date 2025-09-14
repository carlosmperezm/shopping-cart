import App from "./App.jsx";
import Home from "./pages/home";
import ShopPage from "./pages/shop/index.jsx";
import CartPage from "./pages/cart/index.jsx";
import ErrorPage from "./pages/error/index.jsx";

const routes = [
  {
    path: "/",
    Component: App,
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

export default routes;
