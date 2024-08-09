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
	MortgagePage,
	ActiveSummaryListsPage,
	ClientManagementPage,
	ListingSummaryListsPage,
	PreviewListing,
	ShowDetailsDenied,
	ActiveListingDetails,
	SoldPropertyDetailsPage,
	SupportOutlet,
	SignIn,
	SupportDashboardPage,
	OpenApplication,
	PendingApplication,
	DisapprovedApplication,
	ListingDetails,
	ApplicationDetails,
	CancelledApplication,
	PreApprovalRequest,
	PreApprovalRequestListing,
	CloseApplication,
	PendingApplicationpage,
	CancelledApplicationpage,
	SupportCreateListingComponent,
	SupportDashboard,
	SupportApplicationOutlet,
	SupportListingOutlet,
	PendingMasterList,
	ActiveMasterList,
	DeniedMasterList,
	ApprovedApplication,
	SupportCreateListing,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";


const Routes = [
	{
		path: "/",
		element: <MainOutlet />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/new", // removed page
				element: <NewPage />,
			},
			{
				path: "/house-for-rent",
				element: <HouseForRentPage />,
			},
			{
				path: "/discover-home",
				element: <DiscoverHomePage />,
			},
			{
				path: "/buy-a-home",
				element: <BuyAHomePage />,
			},
			{
				path: "/refinance",
				element: <RefinancePage />,
			},
			{
				path: "/insurance-guide",
				element: <InsuranceGuidePage />,
			},
			{
				path: "/all",
				element: <Allpage />,
			},
			{
				path: "featured",
				element: <Featuredpage />,
			},
			{
				path: "/contact-us",
				element: <ContactUsPage />,
			},
			{
				path: "/rent",
				element: <RentPage />,
			},
			{
				path: "/sell",
				element: <SellPage />,
			},
			{
				path: "/loan-calculator",
				element: <LoanCalculatorPage />,
			},
			{
				path: "/mortgage",
				element: <MortgagePage />,
			},
			{
				path: "/listing",
				element: <ListingPage />,
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
			{
				path: "/show-details-processing",
				element: <ShowDetailsProcessing />,
			},
			{
				path: "/show-details-denied",
				element: <ShowDetailsDenied />,
			},
			{
				path: "/active-listing-details",
				element: <ActiveListingDetails />,
			},
			{
				path: "/sold-property-details",
				element: <SoldPropertyDetailsPage />,
			},
			{
				path: "/previewListing/:new_id",
				element: <PreviewListing />,
			},
		],
	},
	{
		path: "support/signin",
		element: <SignIn />,
	},
	{
		path: "support",
		element: <ProtectedRoute element={<SupportOutlet />} />,
		children: [
			{
				index: true,
				element: <div />,
			},
			{
				path: "client-management",
				// element: <SupportDashboardPage />,
				element: <SupportDashboard />,
			},
			{
				path: "applications",
				element: <SupportApplicationOutlet />,
				children: [
					{
						path: "open-application",
						element: <OpenApplication />,
					},
					{
						path: "denied",
						element: <DisapprovedApplication />,
					},

					{
						path: "pending",
						element: <PendingApplication />,
					},
					{
						path: "canceled",
						element: <CancelledApplication />,
					},
					{
						path: "closed",
						element: <CloseApplication />,
					},
					{
						path: "approved",
						element: <ApprovedApplication />,
					},
					{
						path: "listing-details",
						element: <ListingDetails />,
					},
				],
			},
			{
				path: "master-list",
				element: <SupportListingOutlet />,
				children: [
					{
						path: "active",
						element: <ActiveMasterList />,
					},
					{
						path: "pending",
						element: <PendingMasterList />,
					},
					{
						path: "denied",
						element: <DeniedMasterList />,
					},
					{
						path: "listing-details",
						element: <ListingDetails />,
					},
				],
			},
			{
				path: "create-listing",
				element: <SupportCreateListing />,
			},
			{
				path: "listing-details/:listingId",
				element: <ListingDetails />,
			},
			{
				path: "Application-details/:listingId",
				element: <ApplicationDetails />,
			},
			{
				path: "Something/Similar",
				element: <h1>Simlar to Me</h1>,
			},
			{
				path: "pre-approval-request",
				element: <PreApprovalRequest />,
			},
			{
				path: "pre-approved/:listingId",
				element: <PreApprovalRequestListing />,
			},
		],
	},
];


const AppRouter = createBrowserRouter(Routes);


export default AppRouter;
