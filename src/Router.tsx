import { createBrowserRouter } from "react-router";
import { Layout } from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import EducationPage from "./Pages/EducationPage";
import ContactPage from "./Pages/ContactPage";
import EdDetailsPage from "./Pages/EdDetailsPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // When path is exactly "/"
        element: <HomePage />,
      },
      {
        path: "education",
        element: <EducationPage />,
      },
      {
        path: "contact", // When path is "/contact"
        element: <ContactPage />,
      },
      {
        path: "education/:id", // When path is "/education/:id"
        element: <EdDetailsPage />,
      },
    ],
  },
]);
