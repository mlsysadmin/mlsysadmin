import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainOutlet from '../pages/MainOutlet';
import NewPage from '../pages/New.page'
import Dashboard from '../pages/Dashboard.page';
import { 
    HouseForRentPage, 
    DiscoverHomePage, 
    BuyAHomePage, 
    RefinancePage, 
    InsuranceGuidePage, 
    ContactUsPage,
    RentPage,
    SellPage,
    LoanCalculatorPage,
    MortagagePage} from '../pages';
import Allpage from '../pages/Buyer.All.page';
import Featuredpage from '../pages/Buyer.Featured.page';

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
        ]
    }
]

const AppRouter = createBrowserRouter(Routes);

export default AppRouter
