import React from 'react';
import { useContext } from 'react';
import { mycontext } from '../../contextApi/AuthContext';
import './Home.css'
const Home = () => {
    const {user} = useContext(mycontext)
    return (
        <div>
            <h2>Home Page {user?.name} </h2>
        </div>
    );
};

export default Home;