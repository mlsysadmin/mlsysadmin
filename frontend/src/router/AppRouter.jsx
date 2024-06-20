import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainOutlet from '../pages/MainOutlet';
import Dashboard from '../pages/Dashboard.page';
import Allpage from '../pages/Buyer.All.page';
import Featuredpage from '../pages/Buyer.Featured.page';

const Routes = [
    {
        path: "/",
        element: <MainOutlet/>,
        children: [
            {
                path: "home",
                element: <Dashboard/>
            },
            {
                path: "all",
                element: <Allpage/>
            },
            {
                path: "featured",
                element: <Featuredpage/>
            }
        ]
    }
]

const AppRouter = createBrowserRouter(Routes);

export default AppRouter