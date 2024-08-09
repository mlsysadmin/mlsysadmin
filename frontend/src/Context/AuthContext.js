import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const [isMessageLoadingOpen, setIsMessageLoadingOpen] = useState(false);
    const [zIndex, setIndex] = useState(100);

    console.log('isMessageLoadingOpen', isMessageLoadingOpen);

    // const login = useCallback(user => {
    //     setIsAuthenticated(true);
    //     setUserDetails(user);
    // }, []);

    // const logout = useCallback(() => {
    //     setIsAuthenticated(false);
    //     setUserDetails(null);
    //     // sessionStorage.removeItem('previous_path');
    //     Cookies.remove('access_token');
    //     Cookies.remove('user_details');
    // }, []);

    const logout = () => {
        setIsAuthenticated(false);
        setUserDetails(null);
        // sessionStorage.removeItem('previous_path');
        Cookies.remove('access_token');
        Cookies.remove('user_details');
    };

    useEffect(() => {

        const access_token = Cookies.get('access_token');
        const user = Cookies.get('user_details');

        console.log('access_token', access_token);

        const checkAuth = () => {

            if (access_token) {
                const userParse = JSON.parse(user)
                console.log('userParse', userParse);
                // login(userParse);
                setIsAuthenticated(true);
                setUserDetails(userParse);
            } else {
                logout();
            }
        }

        checkAuth();

    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userDetails, logout, setIsMessageLoadingOpen, setIndex, zIndex }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
