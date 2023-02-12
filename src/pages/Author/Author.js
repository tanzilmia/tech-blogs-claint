import React from 'react';
import { useContext } from 'react';
import { mycontext } from '../../contextApi/AuthContext';
import './Author.css'
const Author = () => {
    const {loading} = useContext(mycontext)
    if(loading){
        return <p>Loadding...</p>
    }
    return (
        <div>
            <h2>Author Page</h2>
        </div>
    );
};

export default Author;