import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { checkSession, searchKyc } from '../api/Public/User.api';
import { isCookiePresent } from '../utils/CookieChecker';

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const [isMessageLoadingOpen, setIsMessageLoadingOpen] = useState(false);
    const [zIndex, setIndex] = useState(100);
    const [isSeller, setIsSeller] = useState(false);
	const [pageLoad, setPageLoad] = useState(true);

    const logout = () => {
        setIsAuthenticated(false);
        setUserDetails(null);
        setIsSeller(false);
        Cookies.remove('access_token');
        Cookies.remove('account_details');
        setIsMessageLoadingOpen(true);
    };

    useEffect(() => {
        
        const checkAuth = () => {
            
            checkSession().then(session => {
                
                const sessionData = session.data;
                const isLoggedIn = sessionData.isLoggedIn;
                const account_details = sessionData.accountDetails;
                
                if (isLoggedIn) {
                    // const userParse = JSON.parse(user.slice(2)); // Remove the 'j:' prefix;
                    setIsAuthenticated(isLoggedIn);
                    setUserDetails(account_details);                    
                }else{
                    logout();
                }
            }).catch(err => {
                console.log(err);
                
                logout();
            }).finally(() =>{
                setPageLoad(false);
            })
            
        }

        checkAuth();

    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userDetails, logout, 
        setIsMessageLoadingOpen, setIndex, zIndex, isSeller, setIsSeller, pageLoad, setPageLoad
         }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
