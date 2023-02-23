import { createBrowserRouter } from "react-router-dom";
import AllUser from "../Dashboard/Admin/AllUser";
import AuthorPost from "../Dashboard/Admin/AuthorPost";
import ManagePost from "../Dashboard/Admin/ManagePost";
import Setting from "../Dashboard/Admin/Setting";
import DefaultPage from "../Dashboard/AuthorDashboard/DefaultPage";
import AllPost from "../Dashboard/commonPages/AllPost";
import CreatePost from "../Dashboard/commonPages/CreatePost";
import EditePost from "../Dashboard/commonPages/EditePost";
import DashboardLayout from "../Dashboard/DashboardLayout";
import MyProfile from "../Dashboard/MyProfile";
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
import SearchPost from "../pages/searchitems/SearchPost";
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
        path: "/blog/search-result",
        element: <SearchPost/>,
      },
      {
        path: "/blogpost/:id",
        element: <Blogpost />,
        loader: ({params}) => fetch(`http://localhost:5000/single-post/${params.id}`)
      },
      {
        path: "/aboutus",
        element: <Aboutus />,
      },
      {
        path: "/category-posts/:id",
        element: <Category />,
        loader: ({params}) => fetch(`http://localhost:5000/category-posts-data/${params.id}`)
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

          {
            path: "/dashboard/edete-post/:id",
            element: <AdminRoutes> <EditePost/> </AdminRoutes>,
            loader: ({params})=> fetch(`http://localhost:5000/author/edite-post/${params.id}`)
          },
          {
            path: "/dashboard/profile",
            element: (
              <AdminRoutes>
                {" "}
                <MyProfile/>{" "}
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/create-post",
            element: (
              <AdminRoutes>
                {" "}
                <CreatePost/>{" "}
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/all-post",
            element: (
              <AdminRoutes>
                {" "}
                <AllPost/>{" "}
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/all-user",
            element: (
              <AdminRoutes>
                {" "}
                <AllUser/>{" "}
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/manage-post",
            element: (
              <AdminRoutes>
                {" "}
                <ManagePost/>{" "}
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/setting",
            element: (
              <AdminRoutes>
                {" "}
                <Setting/>{" "}
              </AdminRoutes>
            ),
          },
          {
            path: "/dashboard/all-user/author-post/:id",
            element: (
              <AdminRoutes>
                {" "}
                <AuthorPost/>{" "}
              </AdminRoutes>
            ),
            loader : ({params})=> fetch(`http://localhost:5000/admin/user-posts/${params.id}`)
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

          {
            path: "/authorPannel/edete-post/:id",
            element: <AuthorRouting> <EditePost/> </AuthorRouting>,
            loader: ({params})=> fetch(`http://localhost:5000/author/edite-post/${params.id}`)
          },
          {
            path: "/authorPannel/profile",
            element: (
              <AuthorRouting>
                {" "}
                <MyProfile/>{" "}
              </AuthorRouting>
            ),
          },
          {
            path: "/authorPannel/all-post",
            element: (
              <AuthorRouting>
                {" "}
                <AllPost/>{" "}
              </AuthorRouting>
            ),
          },
          {
            path: "/authorPannel/create-post",
            element: (
              <AuthorRouting>
                {" "}
                <CreatePost/>{" "}
              </AuthorRouting>
            ),
          },
        ],
      },
    ],
  },
]);
export default router;
