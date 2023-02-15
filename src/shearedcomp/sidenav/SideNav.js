import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';
import { BsFiles } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { HiOutlineLogout } from 'react-icons/hi';
import { ImUsers } from 'react-icons/im';
import { FaExchangeAlt } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import './sidenav.css'
import { useContext } from 'react';
import { mycontext } from '../../contextApi/AuthContext';
const SideNav = () => {
    const {logout,user} = useContext(mycontext)
    const handleLogout = () =>{
        logout()
    }
    return (
        <div className='sidenav_wrapping h-[100vh] py-5 w-full'>
            <ul>
                <li> <Link to ={user.role === "admin" ? "/dashboard/profile" : "/authorPannel/profile"} className='flex items-center'> <span className='mr-5'><FaUserAlt/> </span>  My Profile</Link> </li>
                {
                    user?.role === "admin" && <>
                     <li> <Link to = "/dashboard/all-user" className='flex items-center'> <span className='mr-5'><ImUsers/> </span> All Users</Link> </li>
                     <li> <Link to = "/dashboard/manage-post" className='flex items-center'> <span className='mr-5'><FaExchangeAlt/> </span> Manege Post</Link> </li>
                     <li> <Link to = "/dashboard/setting" className='flex items-center'> <span className='mr-5'><AiFillSetting/> </span> Setting</Link> </li>
                    </>
                }

                <li> <Link to ={user.role === "admin" ? "/dashboard/create-post" : "/authorPannel/create-post"}  className='flex items-center'> <span className='mr-5'><IoIosCreate/> </span> Create Post</Link> </li>
                <li> <Link to ={user.role === "admin" ? "/dashboard/all-post" : "/authorPannel/all-post"}  className='flex items-center'> <span className='mr-5'><BsFiles/> </span> All Posts</Link> </li>
                
                <li> <Link to = '/' className='flex items-center'> <span className='mr-5'><AiFillHome/> </span> Back To Home </Link></li>
                
                <li> <button onClick={handleLogout} className='flex items-center'> <span className='mr-5'> <HiOutlineLogout/> </span>  LogOut </button> </li> 

            </ul>
        </div>
    );
};

export default SideNav;