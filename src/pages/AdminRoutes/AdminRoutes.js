import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { mycontext } from '../../contextApi/AuthContext';
import Loadding from '../../shearedcomp/Loadding/Loadding';
import './AuthorRoutes.css'
const AdminRoutes = ({children}) => {
    const {user,Loading} = useContext(mycontext)
    const location = useLocation();
    if(Loading){
          
         return <Loadding/>
    }
    if (user?.role === "admin"){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default AdminRoutes;