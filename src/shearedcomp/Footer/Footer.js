import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const [hidden, setHidden] = useState(false);
    const location = useLocation();
  
    const updateHidden = () => {
      if (location.pathname === "/login" || location.pathname === "/register") {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };
  
  
  useEffect(() => {
    updateHidden();
  }, [location.pathname])
    return (
        <div className="footer_main"> 
      {!hidden && (
        <div>
            This is Footer Page
        </div>
      )}
    </div>
    );
};

export default Footer;