import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';

const WithAuth = (WrappedComponent) => {
  const ComponentWrapper = (props) => {
    const navigate = useNavigate();
    const {getUserDetails} = ChatState();
    let pathname = window.location.pathname;
    useEffect(() => {
  
        const unprotectedRoutes = ['/verify-email', '/reset-password', '/signup', '/generate-reset-link' , '/'];
        if (!localStorage.getItem('userToken') && !unprotectedRoutes.includes(window.location.pathname)) {
          navigate('/login');
        }
        else {
          console.log("I am in else");
          
          getUserDetails();
        }
    }, [pathname]);

    return localStorage.getItem('userToken') ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWrapper;
};

export default WithAuth;
