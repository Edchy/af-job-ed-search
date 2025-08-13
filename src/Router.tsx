import { createBrowserRouter } from "react-router";
import { Layout } from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,        // When path is exactly "/"
        element: <HomePage />,
      },
      {
        path: "about",      // When path is "/about"
        element: <AboutPage />,
      },
      {
        path: "contact",    // When path is "/contact"
        element: <ContactPage />,
      },
    ],
  },
]);
