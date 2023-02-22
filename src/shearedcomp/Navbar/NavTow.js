import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mycontext } from "../../contextApi/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

const NavTow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(mycontext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-white">
      <nav className="flex justify-between p-5">
        <h2 className="text-2xl text-white">Tanzil's Blogs</h2>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-500 hover:text-white focus:outline-none focus:text-white"
          >
            {isOpen ? (
              <FiX className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <FiMenu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex lg:flex md:items-center lg:items-center`}
        >
          <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 mr-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white font-semibold tracking-tight"
            >
              Home
            </Link>
          </li>
          <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 mr-6">
            <Link
              to="/blog"
              className="text-gray-300 hover:text-white font-semibold tracking-tight"
            >
              Blog
            </Link>
          </li>
          <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 mr-6">
            <Link
              to="/category"
              className="text-gray-300 hover:text-white font-semibold tracking-tight"
            >
              Category
            </Link>
          </li>
          <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 mr-6">
            <Link
              to="/author"
              className="text-gray-300 hover:text-white font-semibold tracking-tight"
            >
              Author
            </Link>
          </li>
          {user?.role === "admin" && (
            <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 mr-6">
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white font-semibold tracking-tight"
              >
                DashBoard
              </Link>
            </li>
          )}
          {user?.role === "author" && (
            <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 mr-6">
              <Link
                to="/authorPannel"
                className="text-gray-300 hover:text-white font-semibold tracking-tight"
              >
                Author Pannel
              </Link>
            </li>
          )}
          <li className="block mt-4 md:inline-block md:mt-0">
            <Link to="/aboutus">About Us</Link>
          </li>
          {user?.email ? (
            <>
              <li className="block md:ml-4 lg:ml-4 ml-0 mt-4 md:inline-block md:mt-0">
                <button className="text-gray-300 hover:text-white font-semibold tracking-tight" onClick={handleLogout}>
                  {" "}
                  Logout{" "}
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="block md:ml-4 lg:ml-4 ml-0 mt-4 md:inline-block md:mt-0">
                <Link className="text-gray-300 hover:text-white font-semibold tracking-tight" to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavTow;
