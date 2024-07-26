import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    // const login = () => setIsAuthenticated(true);
    // const logout = () => setIsAuthenticated(false);

    useEffect(() => {
        const access_token = Cookies.get('access_token');
        const user = Cookies.get('user_details');

        if (access_token) {
            setIsAuthenticated(true);
            setUserDetails(user);
        }

    }, [isAuthenticated, userDetails])

    return (
        <AuthContext.Provider value={{ isAuthenticated, userDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
