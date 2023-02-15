import axios from 'axios';
import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { mycontext } from '../../contextApi/AuthContext';

const Setting = () => {
   const {user,header} = useContext(mycontext)
    const addCategory = (e) =>{
        e.preventDefault()
        const category =  e.target.category.value
        axios.post(`http://localhost:5000/admin/add-category?email=${user?.email}`,{category},header)
        .then(res=> {
            if(res.data.message === "Category created successfully"){
                 e.target.category.value = " ";
                 toast.success(`${category} added successFull`)

            }
            if(res.data.message === "This Category Already Exists"){
                 
                 toast.error(`${category} is Already Exist`)

            }
        })
        .catch((e) => console.log(e))
    }

    return (
        <div>
            <h2> Settings Page</h2>

           <form onSubmit={addCategory}>
            <input type="text" name = "category" placeholder='add Category' />
            <input type="submit" value="Add Category"/>
           </form>

        </div>
    );
};

export default Setting;