import React, { useEffect } from 'react';
import { 
  useLocation, 
  useNavigate 
} from 'react-router-dom';

import { useAuth } from '../Context/AuthContext';
import { SupportOutlet } from '../pages';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, logout, userDeatils } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    if (!isAuthenticated) {
        
      // Redirect to the login page if the user is not authenticated
      sessionStorage.removeItem('previous_path');
      navigate( '/support/signin', { 
        replace: true
      })
      
    }

    sessionStorage.setItem('previous_path', location.pathname);

  }, [isAuthenticated, userDeatils])

  // Render the children components if the user is authenticated
  return  element;
};

export default ProtectedRoute;
