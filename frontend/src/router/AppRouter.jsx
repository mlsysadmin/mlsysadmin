import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import MainOutlet from '../pages/MainOutlet';
import NewPage from '../pages/New.page'
import Dashboard from '../pages/Dashboard.page';
import Allpage from '../pages/Buyer.All.page';
import Featuredpage from '../pages/Buyer.Featured.page';    

import { 
    MyDrafts,
    ListingPage,
    ListingFormPage,
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
    MyDraftsPage,
     ActiveSummaryListsPage, 
    ClientManagementPage,
    ListingSummaryListsPage,
    SoldPropertiesPage, 
   ListingsTablePage, 
    PreviewListingPage, 
    ModalComponentsPage, 
    RegistrationModalPage, 
    LoginModalPage} from '../pages';



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
                path: "/listing",
                element: <ListingPage/>
            },
            {
              path: "/new-page",
              element: <NewPage/>
            },
            {
                path: "/house-for-rent-page",
                element: <HouseForRentPage/>
            },
            {
                path: "/discover-home-page",
                element: <DiscoverHomePage/>
            },
            {
                path: "/buy-a-home-page",
                element: <BuyAHomePage/>
            },
            {
                path: "/refinance-page",
                element: <RefinancePage/>
            },
            {
                path: "/insurance-guide-page",
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
                path: "/rent-page",
                element: <RentPage/>
            },
            {
                path: "/sell-page",
                element: <SellPage/>
            },
            {
                path: "/loan-calculator",
                element: <LoanCalculatorPage/>
            },
            {
                path: "/mortgage-page",
                element: <MortagagePage/>
            },
            {
                path: "/listing",
                element: <ListingPage/>
            },
            {
                path: "/listing-form",
                element: <ListingFormPage/>
            }
            ,
            {
                path: "/MyDrafts",
                element: <MyDraftsPage/>
            },
            {
                path: "/active-summary-lists",
                element: <ActiveSummaryListsPage/>
            },
            {
                path: "/clientmanagement",
                element: <ClientManagementPage/>
            },
            {
                path: "/listings-table",
                element: <ListingsTablePage/>
            },
            {
                path: "/listing-summary-lists",
                element: <ListingSummaryListsPage/>
            },
            {
                path: "/sold-properties",
                element: <SoldPropertiesPage/>
            },
            {
                path: "/preview-listing-page",
                element: <PreviewListingPage/>
            },
            {
                path: "/modal-components",
                element: <ModalComponentsPage/>
            },
            {
                path: "/Registration-Modal",
                element: <RegistrationModalPage/>
            },
            {
                path: "/Login-Modal",
                element: <LoginModalPage/>
            }
        ]
    }
]

const AppRouter = createBrowserRouter(Routes);

export default AppRouter

