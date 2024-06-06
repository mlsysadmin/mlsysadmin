import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainOutlet from '../pages/MainOutlet';
import Dashboard from '../pages/Dashboard.page';

const Routes = [
    {
        path: "/",
        element: <MainOutlet/>,
        children: [
            {
                path: "home",
                element: <Dashboard/>
            }
        ]
    }
]

const AppRouter = createBrowserRouter(Routes);

export default AppRouter
