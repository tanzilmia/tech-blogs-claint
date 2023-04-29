import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { BsFillPenFill } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { mycontext } from '../../contextApi/AuthContext';

const AllUser = () => {
    const {user,header} = useContext(mycontext)
    const [users, setusers] = useState([])

    useEffect(() => {
      axios.get(`https://tech-blog-server-jade.vercel.app/admin/all-user?email=${user.email}`,header)
      .then(res => {
        setusers(res.data)
      })
      .catch((e)=> console.log(e))
    }, [user?.email,header])
    
    const handleAuthor = (id) =>{
        axios.put(`https://tech-blog-server-jade.vercel.app/admin/make-autor?email=${user?.email}`, {id}, header)
        .then(res =>{
          setusers(res.data)
         
        })
        .catch((e)=>console.log(e))
    }
    const resetAuthor = (id) =>{
        axios.put(`https://tech-blog-server-jade.vercel.app/admin/make-user?email=${user?.email}`, {id}, header)
        .then(res =>{
          setusers(res.data)
          
        })
        .catch((e)=>console.log(e))
    }
    const handledelete = (id) =>{
      
      axios.delete(`https://tech-blog-server-jade.vercel.app/admin/delete-user?id=${id}&&email=${user.email}`, header)
      .then(res =>{
        setusers(res.data)
       
      })
      .catch((e)=>console.log(e))
    }

    return (
        <div>
            <h2 className='md:hidden lg:hidden text-2xl text-center mb-2'>All User  </h2>
            <Table className="w-full border-collapse bg-white shadow-md">
        <Thead>
          <Tr className="bg-gray-200 text-gray-700">
            <Th className="py-2 px-4 border">Name</Th>
            <Th className="py-2 px-4 border">Emaii</Th>
            <Th className="py-2 px-4 border">Roll</Th>
            <Th className="py-2 px-4 border">Action</Th>
            <Th className="py-2 px-4 border">Action</Th>
            <Th className="py-2 px-4 border">Delete</Th>
            <Th className="py-2 px-4 border">Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user._id} className="bg-gray-100 text-gray-800">
              <Td className="py-2 px-4 border text-sm"> {user.name} </Td>
              <Td className="py-2 px-4 border text-sm"> {user.email} </Td>
              <Td className="py-2 px-4 border text-sm"> {user.role} </Td>
              
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button className='btn btn-sm btn-success' onClick={() => handleAuthor(user._id)} disabled = {user.role === "admin" || user.role === "author"}>
                Make Author
                </button>{" "}
              </Td>
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button className='btn btn-sm btn-success' onClick={() => resetAuthor(user._id)} disabled = {user.role === "admin" || user.role === "null"}>
                  Delete Author
                </button>{" "}
              </Td>
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button onClick={() => handledelete(user._id)} disabled = {user.role === "admin"}>
                  {" "}
                  <RiDeleteBin5Fill />{" "}
                </button>{" "}
              </Td>
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <Link to = {`/dashboard/all-user/author-post/${user._id}`} className='btn btn-sm btn-info' disabled = {user.role === "null" }>
                  See Details
                </Link>{" "}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
        </div>
    );
};

export default AllUser;