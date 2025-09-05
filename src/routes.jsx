import App from "./App.jsx";
import Home from "./pages/home";
import ShopPage from "./pages/shop/index.jsx";
import CartPage from "./pages/cart/index.jsx";
import ErrorPage from "./pages/error/index.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
];

export default routes;
