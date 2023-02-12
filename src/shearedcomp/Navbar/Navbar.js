import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { mycontext } from "../../contextApi/AuthContext";
import "./navbar.css";
const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const {user,logout} = useContext(mycontext)
  const naviget = useNavigate()
  const location = useLocation();

  const updateHidden = () => {
    switch (location.pathname) {
      case "/login":
      case "/register":
      case "/dashboard":
      case "/authorPannel":
        setHidden(true);
        break;
      default:
        setHidden(false);
        break;
    }
  };
  
useEffect(() => {
  updateHidden();
}, [location.pathname])


const handlelogout = () =>{
  console.log("log out");
  logout()
  naviget('/')
}

  return (
    <div className="navbar_wrapping"> 
      {!hidden && (
        <nav className="flex justify-between  navbar_main p-5">
          <h2 className="text-2xl text-white">Tanzil's Blogs</h2>
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
            {
              user?.role === "admin"  && 
              <li>
              <Link to="/dashboard">DashBoard</Link>
            </li>
            }

            {
              user?.role === "author"  && 
              <li>
              <Link to="/authorPannel">Author Pannel</Link>
            </li>
            }
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            {
              user?.email ?
              <>
              <li><button className="text-white text-xl" onClick={handlelogout}> Logout </button></li>
              </>
              :
              <>
               <li>
              <Link to="/login">Login</Link>
            </li>
              </>
            }
          </ul>
        </nav>
      )}
    </div>
  );
};


export default Navbar;
