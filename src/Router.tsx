import { createBrowserRouter } from "react-router";
import { Layout } from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import JobsPage from "./Pages/JobsPage";
import EducationsPage from "./Pages/EducationsPage";
import EdDetailsPage from "./Pages/EdDetailsPage";
import JobDetailsPage from "./Pages/JobDetailsPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "utbildningar",
        element: <EducationsPage />,
      },
      {
        path: "jobb",
        element: <JobsPage />,
      },
      {
        path: "utbildningar/:id",
        element: <EdDetailsPage />,
      },
      {
        path: "jobb/:id",
        element: <JobDetailsPage />,
      },
    ],
  },
]);
