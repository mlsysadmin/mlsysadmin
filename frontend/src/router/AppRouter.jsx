import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  MainOutlet,
  SupportOutlet,
  SupportDashboardPage,
  SupportCreateListingPage,
  SupportListingMasterlistPage,
  ErrorPage,
} from "../pages/index.js";

const routes = [
  {
    path: "/ML-Brokerage",
    element: <MainOutlet />,
    children: [
      {
        path: "Support",
        element: <SupportOutlet />,
        children: [
          {
            index: true,
            element: <div />,
          },
          {
            path: "SupportDashboard",
            element: <SupportDashboardPage />,
          },
          {
            path: "SupportListingMasterlist/:status",
            element: <SupportListingMasterlistPage />,
          },
          {
            path: "SupportCreateListingPage",
            element: <SupportCreateListingPage />,
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
