import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../shearedcomp/Footer/Footer';
import Navbar from '../shearedcomp/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;