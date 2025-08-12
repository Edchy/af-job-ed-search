import { createBrowserRouter } from "react-router";
import { Layout } from "./Pages/Layout";

export const Router = createBrowserRouter([
  {
    path: "/",

    element: <Layout />,

    children: [],
  },
]);
