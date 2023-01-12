import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Aboutus from "../pages/Aboutus/Aboutus";
import Author from "../pages/Author/Author";
import Blog from "../pages/blog/Blog";
import Blogpost from "../pages/BlogPost/Blogpost";
import Category from "../pages/category/Category";
import ContactUs from "../pages/contact/ContactUs";
import Home from "../pages/home/Home";
const router = createBrowserRouter([
   {
    path : '/', element : <MainLayout/>, children : [
        {
            path : '/',
            element : <Home/>
        },
        {
            path : '/blog',
            element : <Blog/>
        },
        {
            path : '/blogpost/:id',
            element : <Blogpost/>
        },
        {
            path : '/aboutus',
            element : <Aboutus/>
        },
        {
            path : '/category',
            element : <Category/>
        },
        {
            path : '/author',
            element : <Author/>
        },
        {
            path : '/contact',
            element : <ContactUs/>
        }
       
    ]
   }
])
export default router

