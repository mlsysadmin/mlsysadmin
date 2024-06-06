import React, { useEffect } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  NewPage,
  MainOutlet,
} from "../pages";
const routes = [
  {
    path: "/",
    element: <MainOutlet />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" replace /> },
      { path: "/dashboard", element: <NewPage /> }
    ],
  },
//   {
//     path: "*",
//     element: <Error />,
//   },
];

const Router = createBrowserRouter(routes);

export default Router;