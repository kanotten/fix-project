import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Home } from "./routes/Home.jsx";

import { Product } from "./routes/Product.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/:id", element: <Product /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
