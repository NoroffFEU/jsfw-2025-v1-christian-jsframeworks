import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./state/CartProvider.tsx";

import "./index.css";
import Layout from "./components/Layout.tsx";
import Home from "./App.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import Cartpage from "./pages/CartPage.tsx";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "checkout", element: <Cartpage /> },
      { path: "checkout/success", element: <CheckoutSuccessPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
