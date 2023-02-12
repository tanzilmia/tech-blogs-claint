import { createBrowserRouter } from "react-router-dom";
import DefaultPage from "../Dashboard/AuthorDashboard/DefaultPage";
import DashboardLayout from "../Dashboard/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import Aboutus from "../pages/Aboutus/Aboutus";
import AdminRoutes from "../pages/AdminRoutes/AdminRoutes";
import Author from "../pages/Author/Author";
import Blog from "../pages/blog/Blog";
import Blogpost from "../pages/BlogPost/Blogpost";
import Category from "../pages/category/Category";
import ContactUs from "../pages/contact/ContactUs";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import AuthorRouting from "./AuthorRouting";
import PrivetRouting from "./PrivetRouting";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blogpost/:id",
        element: <Blogpost />,
      },
      {
        path: "/aboutus",
        element: <Aboutus />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/author",
        element: (
          <PrivetRouting>
            {" "}
            <Author />{" "}
          </PrivetRouting>
        ),
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      // admin pannel routing
      {
        path: "/dashboard",
        element: (
          <PrivetRouting>
            {" "}
            <DashboardLayout />{" "}
          </PrivetRouting>
        ),
        children: [
          {
            path: "/dashboard",
            element: (
              <AdminRoutes>
                {" "}
                <DefaultPage/>{" "}
              </AdminRoutes>
            ),
          },
        ],
      },
      // author routing
      {
        path: "/authorPannel",
        element: (
          <PrivetRouting>
            {" "}
            <DashboardLayout />{" "}
          </PrivetRouting>
        ),
        children: [
          {
            path: "/authorPannel",
            element: (
              <AuthorRouting>
                {" "}
                <DefaultPage/>{" "}
              </AuthorRouting>
            ),
          },
        ],
      },
    ],
  },
]);
export default router;
