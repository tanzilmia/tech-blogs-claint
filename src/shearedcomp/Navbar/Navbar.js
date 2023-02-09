import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
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
    <div className="navbar_wrapping"> 
      {!hidden && (
        <nav className="flex justify-between  navbar_main p-5">
          <h2 className="text-2xl">Tanzil's Blogs</h2>
          <ul className="md:flex lg:flex navbar_menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/category">category</Link>
            </li>
            <li>
              <Link to="/author">Author</Link>
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};


export default Navbar;
