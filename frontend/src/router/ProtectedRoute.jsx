import React, { useEffect } from 'react';
import { 
  useLocation, 
  useNavigate 
} from 'react-router-dom';

import { useAuth } from '../Context/AuthContext';
import { isCookiePresent } from '../utils/CookieChecker';
import { SupportOutlet } from '../pages';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, logout, userDeatils } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

   const sessionCookieName = process.env.REACT_APP_SESSION_COOKIE_NAME;
	 const accountCookieName = process.env.REACT_APP_ACCOUNT_COOKIE_NAME;
	 const isMLWWSPresent = isCookiePresent(sessionCookieName);
	 const isAccountDetailsPresent = isCookiePresent(accountCookieName);
	 const login = process.env.REACT_APP_LOGIN_URL;
	 const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

  useEffect(() => {
		if (!isMLWWSPresent || !isAccountDetailsPresent) {
			if (window.location.pathname !== login) {
				window.location.href = `${login}?redirect_url=${encodeURIComponent(
					redirectUrl
				)}`;
			}
		} else if (!isAuthenticated) {
			// Redirect to the login page if the user is not authenticated
			sessionStorage.removeItem("previous_path");
			navigate("/support/signin", {
				replace: true,
			});
		}

		sessionStorage.setItem("previous_path", location.pathname);
	}, [
		isAuthenticated,
		userDeatils,
		isMLWWSPresent,
		isAccountDetailsPresent,
		login,
		redirectUrl,
	]);

  // Render the children components if the user is authenticated
  return  element;
};

export default ProtectedRoute;
