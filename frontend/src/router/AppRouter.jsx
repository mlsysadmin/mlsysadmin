import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainOutlet from "../pages/MainOutlet";
import NewPage from "../pages/New.page";
import Dashboard from "../pages/Dashboard.page";
import Allpage from "../pages/Buyer.All.page";
import ApplicationHistoryPage from "../pages/ApplicationHistory.page";
import Featuredpage from "../pages/Buyer.Featured.page";


import {
	ShowDetailsProcessing,
	ListingPage,
	ListingFormPage,
	LoginModal,
	// RegistrationModal,
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
	SavedPropertiespage,
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
	PropertySearchPage,
	ComingSoonPage,
	FaqsPage,
	TermsandConditionPage,
	DevelopersPage,
	LoginPage,
	DevelopersListing,
	PreSelling,
	ListingPreview,
	ReadyForOccupancy
} from "../pages";
import { ProtectedRoute, BuyerSellerProtectedRoute } from "./ProtectedRoute";
import { SaleComponent, SearchListingComponent } from "../components";
import Error from "../components/ErrorComponent";
import NotFoundComponent from "../components/Errors/NotFoundComponent";


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
				path: "/sale",
				element: <SaleComponent />,
			},
			{
				// path: "/pre-selling",
				path: "/developers",
				element: <DevelopersPage />,
			},
			{
				path: "/pre-selling",
				element: <PreSelling />,
			},
			{
				path: "/ready-for-occupancy",
				element: <ReadyForOccupancy />,
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
				element: <BuyerSellerProtectedRoute element={<ListingPage />} />,
				// element: <ListingPage />,
			},

			{
				path: "/saved-properties",
				element: <BuyerSellerProtectedRoute element={<SavedPropertiespage /> }/>
				// element: <ListingPage />,
			},
			{
				path: "/comingsoon",
				element: <ComingSoonPage />,
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
			// {
			// 	path: "/RegistrationModal",
			// 	element: <RegistrationModal />,
			// },
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
				path: "/previewListing",
				element: <ListingPreview />,
				// element: <PreviewListing />,se
			},
			{
				path: "/propertySearch",
				element: <PropertySearchPage />,
			},
			{
				path: "/buyer-application-history",
				element: (
					<BuyerSellerProtectedRoute element={<ApplicationHistoryPage />} />
					// <ApplicationHistoryPage />
				),
			},
			{
				path: "/faqs",
				element: <FaqsPage />,
			},
			{
				path: "/search",
				element: <SearchListingComponent />,
			},
			{
				path: "/termsandcondition",
				element: <TermsandConditionPage />,
			},
			{
				path: "/documents/mlprop_TermsCondition.pdf",
			},
			{
				path: "/developer",
				element: <DevelopersListing/>
			}
		],
	},
	{
		path: "support/signin",
		element: <SignIn />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "error",
		element: <Error />,
	},
	{
		path: "*",
		element: <NotFoundComponent />,
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
				path: "dashboard",
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
			{
				path: "property-inquiry",
				element: <PreApprovalRequest />,
			},
		],
	},
];



const AppRouter = createBrowserRouter(Routes);


export default AppRouter;
