import { createBrowserRouter } from "react-router-dom";
import {
  MainOutlet,
  SupportOutlet,
  SupportDashboardPage,
  ErrorPage,
  ListingDetailsPage,
  ActiveListingMasterlist,
  OpenListingMasterlist,
  PendingListingMasterlist,
  DisapprovedListingMasterlist,
} from "../pages/index.js";

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
            path: "open",
            element: <OpenListingMasterlist />,
          },
          {
            path: "pending",
            element: <PendingListingMasterlist />,
          },
          {
            path: "active",
            element: <ActiveListingMasterlist />,
          },
          {
            path: "disapproved",
            element: <DisapprovedListingMasterlist />,
          },
          {
            path: "listing-details/:listingId",
            element: <ListingDetailsPage />,
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
