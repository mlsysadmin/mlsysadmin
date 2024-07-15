import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainOutlet from "../pages/MainOutlet";
import NewPage from "../pages/New.page";
import Dashboard from "../pages/Dashboard.page";
import Allpage from "../pages/Buyer.All.page";
import Featuredpage from "../pages/Buyer.Featured.page";

import {
  ShowDetailsProcessing,
  ListingPage,
  ListingFormPage,
  LoginModal,
  RegistrationModal,
  ModalComponents,
  Sidebar,
  ListingsTable,
  SoldPropertiesPage,
  MyDraftsPage,
  HouseForRentPage,
  DiscoverHomePage,
  BuyAHomePage,
  RefinancePage,
  InsuranceGuidePage,
  ContactUsPage,
  RentPage,
  SellPage,
  LoanCalculatorPage,
  MortagagePage,
  ActiveSummaryListsPage,
  ClientManagementPage,
  ListingSummaryListsPage,
  PreviewListing,
  ShowDetailsDenied,
  ActiveListingDetails,
  SoldPropertyDetailsPage,
} from "../pages";

const Routes = [
    {
        path: "/",
        element: <MainOutlet/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>
            },
            {
              path: "/new", // removed page
              element: <NewPage/>
            },
            {
                path: "/house-for-rent",
                element: <HouseForRentPage/>
            },
            {
                path: "/discover-home",
                element: <DiscoverHomePage/>
            },
            {
                path: "/buy-a-home",
                element: <BuyAHomePage/>
            },
            {
                path: "/refinance",
                element: <RefinancePage/>
            },
            {
                path: "/insurance-guide",
                element: <InsuranceGuidePage/>
            },
            {
                path: "/all",
                element: <Allpage/>
            },
            {
                path: "featured",
                element: <Featuredpage/>
            },
            {
                path: "/contact-us",
                element: <ContactUsPage/>
            },
            {
                path: "/rent",
                element: <RentPage/>
            },
            {
                path: "/sell",
                element: <SellPage/>
            },
            {
                path: "/loan-calculator",
                element: <LoanCalculatorPage/>
            },
            {
                path: "/mortgage",
                element: <MortagagePage/>
            },
            {
                path: "/listing",
                element: <ListingPage />,
              },
              {
                path: "/listing-form",
                element: <ListingFormPage />,
              },
              {
                path: "/drafts",
                element: <MyDraftsPage />,
              },
              {
                path: "/sold-properties",
                element: <SoldPropertiesPage />,
              },
              {
                path: "/active-summary-lists",
                element: <ActiveSummaryListsPage />,
              },
              {
                path: "/clientmanagement",
                element: <ClientManagementPage />,
              },
              {
                path: "/listing-summary-lists",
                element: <ListingSummaryListsPage />,
              },
              {
                path: "/listingsTable",
                element: <ListingsTable />,
              },
              {
                path: "/sidebar",
                element: <Sidebar />,
              },
              {
                path: "/previewListing",
                element: <PreviewListing />,
              },
              {
                path: "/Modalcomponents",
                element: <ModalComponents />,
              },
              {
                path: "/RegistrationModal",
                element: <RegistrationModal />,
              },
              {
                path: "/LoginModal",
                element: <LoginModal />,
              },
        ]
    }
]

const AppRouter = createBrowserRouter(Routes);

export default AppRouter;
