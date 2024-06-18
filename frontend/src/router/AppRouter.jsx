import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  MainOutlet,
  SupportOutlet,
  SupportDashboardPage,
  ErrorPage
} from "../pages/index.js"

const routes = [
  {
    path: "/dashboard",
    element: <MainOutlet />,
    children: [
      {
        path: "Support",
        element: <SupportOutlet />,
        children: [
          {
            index: true,
            element: <SupportDashboardPage />,
          },
          {
            path: "SupportDashboard",
            element: <SupportDashboardPage />,
          },
          {
            path: "Something/Similar",
            element: <h1>Simlar to Me</h1>,
          },
        ],
      },
      {
        path: "Something",
        element: <h1>Something</h1>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

const Router = createBrowserRouter(routes);

export default Router;