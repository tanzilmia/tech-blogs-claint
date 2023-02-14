import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { BiMessage } from 'react-icons/bi';
import { BsFillBellFill } from 'react-icons/bs';
import SideNav from '../shearedcomp/sidenav/SideNav';
import './styles/AuthorPanel.css'
import { useContext } from 'react';
import { mycontext } from '../contextApi/AuthContext';

const DashboardLayout = () => {
    const {user} = useContext(mycontext)
    
    return (
        <div className='full_page'>
            {/* top navbar  */}
            <div className=" px-10 py-4 w-full flex top_navbar justify-between">
                <div className="w-2/12"> <h2 className="text-2xl text-white">  DashBoard <span className="text-xs"> {user?.role}</span> </h2></div>
                    <ul className='flex ul_menu'>
                        <li>
                            {user.porfilepic === "null" ?  <span> <FaUserAlt/> </span>
                            :
                            <div className='navbar_img'><img src={user.porfilepic} alt="" /></div>



                        }   
                         </li>
                        <li> <Link> <BiMessage/> </Link> </li>
                        <li> <Link> <BsFillBellFill/> </Link> </li>
                    </ul>
            </div>

            {/* maain content page  */}

            <div className='flex'>
            <div className="w-2/12">
                <SideNav/>
            </div>
            <div className="content w-10/12">
                <Outlet/>
            </div>
            </div>
        </div>
    );
};

export default DashboardLayout;