import { createBrowserRouter } from "react-router-dom";
import {
  MainOutlet,
  SupportOutlet,
  SupportDashboardPage,
  SupportCreateListingComponent,
  ErrorPage,
  ListingDetailsPage,
  ActiveListingMasterlist,
  OpenListingMasterlist,
  PendingListingMasterlist,
  DisapprovedListingMasterlist,
  PendingApplicationpage,
  OpenApplicationpage,
  DisapprovedApplicationpage,
  ApplicationDetailspage,
  Signinpage,
  CancelledApplicationpage,
  ClosedApplicationpage,
} from "../support/pages/index.js";

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
            path: "Signin",
            element: <Signinpage />,
          },
          {
            path: "SupportDashboard",
            element: <SupportDashboardPage />,
          },
          {
            path: "openApplication",
            element: <OpenApplicationpage />,
          },
          {
            path: "pendingApplication",
            element: <PendingApplicationpage />,
          },
          {
            path: "disapprovedApplication",
            element: <DisapprovedApplicationpage />,
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
            path: "SupportCreateListingPage",
            element: <SupportCreateListingComponent />,
          },
          {
            path: "listing-details/:listingId",
            element: <ListingDetailsPage />,
          },
          {
            path: "Application-details/:listingId",
            element: <ApplicationDetailspage />,
          },
          {
            path: "CanceledApplications",
            element: <CancelledApplicationpage />,
          },
          {
            path: "ClosedApplications",
            element: <ClosedApplicationpage />,
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
