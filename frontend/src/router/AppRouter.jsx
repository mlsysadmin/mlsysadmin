import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListingPage from "../pages/ListingPage";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/listing" element={<ListingPage />} />
            </Routes>
        </Router>
    );
}


export default AppRouter;
