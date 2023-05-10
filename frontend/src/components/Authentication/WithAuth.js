import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WithAuth = (WrappedComponent) => {
  const ComponentWrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        
        const unprotectedRoutes = ['/verify-email', '/reset-password', '/signup', '/generate-reset-link'];
        if (!localStorage.getItem('userToken') && !unprotectedRoutes.includes(window.location.pathname)) {
          navigate('/login');
        }
    }, [navigate]);

    return localStorage.getItem('userToken') ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWrapper;
};

export default WithAuth;
