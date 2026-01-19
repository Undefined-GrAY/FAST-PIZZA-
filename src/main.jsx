import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./ui/Error.jsx";
import "./index.css";
import Home from "./ui/Home.jsx";
import Menu from "./features/menu/Menu.jsx";
import { loader as menuLoader } from "./loaders/menuLoader.js";
import Cart from "./features/cart/Cart.jsx";
import Order from "./features/order/Order.jsx";
import { loader as orderLoader } from "./loaders/orderLoader.js";
import CreateOrder from "./features/order/CreateOrder.jsx";
import { action as createOrderAction } from "./actions/createOrderAction.js";
import AppLayout from "./ui/AppLayout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { action as updateOrderAction } from "./actions/updateOrderAction.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <NotFound />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <NotFound />,
        action: updateOrderAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <AppLayout />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
