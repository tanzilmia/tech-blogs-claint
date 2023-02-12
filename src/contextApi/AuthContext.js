import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const mycontext = createContext()
const AuthContext = ({children }) => {
    
    const [user, setuser] = useState(null)
    const [islogin, setisLogedind] = useState(false)
    const [Loading, setLoading] = useState(true) 

    const token = localStorage.getItem("accessToken")
    console.log(token)

    useEffect(() => {
      if(token || islogin){
        axios.post(`http://localhost:5000/authentication/user-info`,{token})
        .then(res => {
            
            if(res.data.data){
                const userinfo = res.data.data;
                setisLogedind(true)
                setuser(userinfo)
                setLoading(false)
            }
        })
        .catch((e)=> console.log(e))
      }else{
        setLoading(false)
      }
    
    }, [token,islogin])
    
    // logout 

    const logout = () =>{
        localStorage.removeItem("accessToken")
        setLoading(false)
        setisLogedind(false)
        window.location.reload()
    }

   
    const contextValue = {
        setisLogedind,
        user,
        setLoading,
        Loading,
        logout
    }
    return (
        <mycontext.Provider value={contextValue}> {children} </mycontext.Provider>
    );
};

export default AuthContext;