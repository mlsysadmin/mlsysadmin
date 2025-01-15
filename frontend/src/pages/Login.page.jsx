import React, { useEffect } from "react";
import { LoginComponent } from "../components";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () =>{
    const {
        isAuthenticated, userDetails
    } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(-1);
        }
    }, [isAuthenticated]);
    return(
        <LoginComponent/>
    )
}
export default LoginPage;