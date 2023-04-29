import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mycontext } from "../../contextApi/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";

const NavTow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout,setsearchText } = useContext(mycontext);
  const [ismenuOpen, setismenuOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const [categorys, setcategorys] = useState([]);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleClick = () => {
    setIsClicked(true);
  };
  const toggleDropdown = () => {
    setismenuOpen(!ismenuOpen);
    setIsClicked(false);
  };

  const handlesearch = (e) =>{
    e.preventDefault();
    const searchText =  e.target.search.value;
    setsearchText(searchText);
    navigate("/blog/search-result");
  }

  useEffect(() => {
    axios
      .get(`https://tech-blog-server-jade.vercel.app/admin/categories`)
      .then((res) => {
        setcategorys(res.data);
      })
      .catch((e) => console.log(e.message));
  }, []);
  return (
    <div className="bg-gray-900 text-white md:sticky lg:sticky md:top-0 lg:top-0">
      <nav className="flex justify-between p-5">
      <h2 className={`${
              isOpen ? "hidden" : ""
            } text-2xl`}>Tanzil's Blogs</h2>
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
          <li className="block md:hidden md:mt-0 lg:hidden lg:mt-0 mr-1 ml-2">
            <form onSubmit={handlesearch} className="flex items-center ">
              <input
                type="text"
                name="search"
                placeholder="search by title"
                className="py-1 px-3 rounded-md text-gray-900 bg-gray-300 focus:outline-none focus:bg-white focus:text-gray-900"
              />
              <button
                type="submit"
                className="py-1 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
              >
                search
              </button>
            </form>
          </li>

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

          <li className="block mt-4 md:inline-block md:mt-0 lg:inline-block lg:mt-0 mr-6 relative">
            <div>
              <button
                type="button"
                className="text-gray-300 hover:text-white font-semibold tracking-tight flex items-center"
                onClick={toggleDropdown}
              >
                All Category
                <svg
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {ismenuOpen && (
              <ul className="absolute z-10 left-0 mt-2 w-32 bg-gray-800 rounded-md overflow-hidden shadow-lg">
                {/* map all list */}

                {categorys.length &&
                  categorys.map((category) => (
                    <React.Fragment key={category._id}>
                      {!isClicked && (
                        <li>
                          <Link
                            to={`/category-posts/${category._id}`}
                            onClick={handleClick}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#656363]"
                          >
                            {category.category}
                          </Link>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
              </ul>
            )}
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
          
          <li className="hidden md:inline-block md:mt-0 lg:inline-block lg:mt-0 mr-1 ml-2">
              <form onSubmit={handlesearch} className="flex items-center ">
                <input
                  type="text"
                  name="search"
                  placeholder="search by title"
                  className="py-1 px-3 rounded-md text-gray-900 bg-gray-300 focus:outline-none focus:bg-white focus:text-gray-900"
                />
                <button type="submit" className="py-1 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                search 
                </button>
              </form>
            </li>
          {user?.email ? (
            <>
              <li className="block md:ml-4 lg:ml-4 ml-0 mt-4 md:inline-block md:mt-0">
                <button
                  className="text-gray-300 hover:text-white font-semibold tracking-tight"
                  onClick={handleLogout}
                >
                  {" "}
                  Logout{" "}
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="block md:ml-4 lg:ml-4 ml-0 mt-4 md:inline-block md:mt-0">
                <Link
                  className="text-gray-300 hover:text-white font-semibold tracking-tight"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavTow;
