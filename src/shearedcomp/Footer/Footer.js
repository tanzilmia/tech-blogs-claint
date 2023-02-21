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
        <>
         <footer className="bg-gray-800 py-10">
  <div className="container mx-auto flex justify-between">
    <div className="w-1/3">
      <h3 className="text-lg font-bold text-gray-100 mb-4">About Us</h3>
      <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum, erat id rhoncus bibendum, ex dolor faucibus libero, in laoreet purus orci sit amet leo.</p>
    </div>
    <div className="w-1/3">
      <h3 className="text-lg font-bold text-gray-100 mb-4">Contact Us</h3>
      <ul>
        <li className="mb-2"><i className="fas fa-phone-alt text-gray-400 mr-2"></i>123-456-7890</li>
        <li className="mb-2"><i className="fas fa-envelope text-gray-400 mr-2"></i>contact@example.com</li>
        <li className="mb-2"><i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>123 Main St, Anytown USA</li>
      </ul>
    </div>
    <div className="w-1/3">
      <h3 className="text-lg font-bold text-gray-100 mb-4">Follow Us</h3>
      <div className="flex">
        <a href="#" className="mr-4"><i className="fab fa-facebook-square text-gray-400 hover:text-gray-100"></i></a>
        <a href="#" className="mr-4"><i className="fab fa-twitter-square text-gray-400 hover:text-gray-100"></i></a>
        <a href="#" className="mr-4"><i className="fab fa-instagram-square text-gray-400 hover:text-gray-100"></i></a>
        <a href="#" className="mr-4"><i className="fab fa-linkedin text-gray-400 hover:text-gray-100"></i></a>
      </div>
    </div>
  </div>
  <div className="text-center mt-8">
    <p className="text-gray-400">Copyright &copy; 2023 - All rights reserved</p>
  </div>
</footer>

        </>
      )}
    </div>
    );
};

export default Footer;