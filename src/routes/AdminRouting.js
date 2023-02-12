import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { mycontext } from '../contextApi/AuthContext';

const AdminRouting = ({children}) => {
    const {user,Loading} = useContext(mycontext)
    const location = useLocation();
    if(Loading){
          console.log("loadding state")
         return <h2>Loadding...</h2>
    }
    if (user?.role === "admin"){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default AdminRouting;